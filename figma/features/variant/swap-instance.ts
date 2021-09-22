import { figma, InstanceNode, ComponentNode } from "@design-sdk/figma";
import { isVariantMatchingName } from "./variant-name-utils";

/**
 * uses swapIntance internally. this is a wrapper function for swapInstance that takes variant instance node and target swapping variant's name as input
 * @deprecated - use figma's official API instead
 * @param from
 * @param name
 */
export function swapVariant(from: InstanceNode, name: string): InstanceNode {
  if (!from) {
    throw `cannot swap variant to "${name}". from instance not provided. the value is undefined (null)`;
  }

  try {
    const swapTargetMasterComponent = from.mainComponent.parent.children.find(
      (c) => isVariantMatchingName(c.name, name)
    );

    if (!swapTargetMasterComponent) {
      throw `there are no matching variant to swap with name "${name}" for currently existing instance node ${from.name}`;
    }

    return swapInstance(
      // safely retrieve origin node again
      figma.getNodeById(from.id) as InstanceNode,
      // safely retrieve origin node again
      figma.getNodeById(swapTargetMasterComponent.id) as ComponentNode
    );
  } catch (_) {
    // somehow failed
    console.warn("swapping variant failed", _);
    return from;
  }
}

/**
 * swaps current instance to other component instance (variant)
 * this is mostly used for mocking user's variant switch action in figma, which is not provided by the figma plugin api
 */
export function swapInstance(
  from: InstanceNode,
  swapTo: ComponentNode
): InstanceNode {
  const sharedParent = from.parent;
  const indexInParent = from.parent.children.findIndex((c) => c.id == from.id);
  const instance = swapTo.createInstance();

  //#region sync transform
  instance.x = from.x;
  instance.y = from.y;
  // apply scale factor before resizing
  instance.scaleFactor = from.scaleFactor;
  instance.resize(from.width, from.height);
  instance.rotation = from.rotation;
  //#endregion

  // todo handle data preservation
  // component override data can be infered.
  // https://github.com/figma/plugin-typings/issues/26 - currently figma does not provided swapComponent api on plugin sdk of their own.

  // insesrt child and remove origin (from)
  sharedParent.insertChild(indexInParent, instance);
  // remove origin
  from.remove();

  return instance;
}
