import { BaseFrameMixin } from "@design-sdk/figma";
import { convertLayoutModeToAxis } from "@design-sdk/figma-node-conversion";
import { Axis } from "@reflect-ui/core";
import { ReflectFrameNode } from "@design-sdk/figma-node";

export function checkIfAutoLayout(
  node: ReflectFrameNode | BaseFrameMixin
): boolean {
  if (node instanceof ReflectFrameNode) {
    return checkWithProps({
      layoutMode: node.layoutMode,
    });
  }

  // figma raw node
  return checkWithProps({
    layoutMode:
      "layoutMode" in node
        ? convertLayoutModeToAxis(node.layoutMode)
        : undefined,
  });
}

// FIXME ?
// This part needs to be fixed. this may not be a correct way to detemine autolayout. -> this.layoutMode !== undefined
function checkWithProps(props: { layoutMode: Axis }): boolean {
  return props.layoutMode !== undefined;
}
