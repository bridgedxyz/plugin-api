import { ReflectSceneNodeType } from "@design-sdk/core";
import type { IReflectNodeReference } from "@design-sdk/core";
import { SchemaDefinitionLike } from "./type";

export function analyzeNode(node: IReflectNodeReference): SchemaDefinitionLike {
  if (!node) {
    return;
  }

  if (
    node.origin != ReflectSceneNodeType.component &&
    node.origin != ReflectSceneNodeType.variant_set &&
    node.origin != ReflectSceneNodeType.instance
  ) {
    const _is_parent_component_like = isMemberOfComponentLike(node);
    if (_is_parent_component_like) {
      return "single-layer-property";
    } else {
      return "invalid-target";
    }
  } else if (node?.origin == ReflectSceneNodeType.variant_set) {
    return "variant-set";
  } else if (node?.origin == ReflectSceneNodeType.instance) {
    if (isThisInstanceAVariantInstance(node)) {
      return "variant-instance";
    } else {
      return "instance-component";
    }
  } else if (node?.origin == ReflectSceneNodeType.component) {
    if (isMasterVariant(node)) {
      return "master-variant-compoent";
    } else {
      return "master-component";
    }
  }

  // default
  return "invalid-target";
}

/**
 * rathers check if the node is inside a component-like node
 *
 * go up to root until there is no more parent. if one of the parent is component-like, the target is a configurable layer for the compoent-like.
 * WARNING: since IReflectNodeReference#parent is just a reference, even if parent of parent exists, it won't be present. use with your own notice.
 * otherwise, when running this on code-thread with RawInput, it will work. @lastupdated Sep 9 2021
 * @param node
 * @returns
 */
export function isMemberOfComponentLike(
  node: IReflectNodeReference
):
  | {
      parent: {
        node: IReflectNodeReference;
        type: SchemaDefinitionLike;
      };
    }
  | false {
  let parent = node.parent;
  while (parent) {
    const parentIs = analyzeNode(parent as IReflectNodeReference);
    switch (parentIs) {
      case "base-master-component":
      case "instance-component":
      case "master-component":
      case "master-variant-compoent":
      case "variant-instance":
        return {
          parent: {
            node: parent as IReflectNodeReference,
            type: parentIs,
          },
        };
      case "single-layer-property":
        return isMemberOfComponentLike(parent as IReflectNodeReference);
      case "invalid-target":
      case "variant-set":
        return false;
    }
  }
  return false;
}

export function isThisInstanceAVariantInstance(node: IReflectNodeReference) {
  const _master = node.mainComponent;
  return isMasterVariant(_master);
}

export function isMasterVariant(node: IReflectNodeReference) {
  return isPossibleBeingAVariant(node) && isParentAVariantSet(node);
}

export function isPossibleBeingAVariant(node: IReflectNodeReference) {
  // at the point of 2021.9, figma requires a variat-set to be a frame and a variant must live under it. variant itself is also a compoennt.
  // so, we check
  // 1. if node is type of a component
  // 2. if node has a parent.
  return node?.origin == ReflectSceneNodeType.component && _hasParent(node);
  // thant this has a minimal requirement for the possibility being a variant.
  // the exceptional case is that master-component being placed uner some sort of frame. (even if it is not a variant.)
}

/**
 * is parent a variant set?
 */
export function isParentAVariantSet(node?: IReflectNodeReference) {
  return node?.parent?.origin == ReflectSceneNodeType.variant_set;
}

export function isThisAInstanceOfVariant(node: IReflectNodeReference): boolean {
  throw "no impl";
  return false;
}

function _hasParent(n: IReflectNodeReference): boolean {
  return n.parent != null;
}
