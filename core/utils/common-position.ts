import type { ReflectSceneNode } from "@design-sdk/core";
import { coordinates } from "./coordinates";

type Position =
  | "None"
  | "Absolute"
  | "TopStart"
  | "TopCenter"
  | "TopEnd"
  | "CenterStart"
  | "Center"
  | "CenterEnd"
  | "BottomStart"
  | "BottomCenter"
  | "BottomEnd";

/**
 * @deprecated do not use this for future usage, this implementation is incomplete
 * retrieves the common position relative to its parent (constraint)
 * @param node
 * @returns
 */
export function commonPosition(node: ReflectSceneNode): Position {
  // if node is same size as height, position is not necessary
  // detect if Frame's width is same as Child when Frame has Padding.
  // warning: this may return true even when false, if size is same, but position is different. However, it would be an unexpected layout.
  let hPadding = 0;
  let vPadding = 0;
  if (node.hasParent && node.parent.layoutMode) {
    hPadding =
      (node.parent.padding.left ?? 0) + (node.parent.padding.right ?? 0);
    vPadding =
      (node.parent.padding.top ?? 0) + (node.parent.padding.bottom ?? 0);
  }

  if (
    !node.parent ||
    (node.width === node.parent.width - hPadding &&
      node.height === node.parent.height - vPadding)
  ) {
    return "None";
  }

  const relativeLCRS = node.relativeLcrs;

  // position is absolute, parent is relative
  const [parentX, parentY] = coordinates(node.parent);

  // TODO
  // top, center, bottom is not handled.

  switch (relativeLCRS) {
    case "Center":
      return "TopCenter";
      break;
    case "Left":
      return "TopStart";

    case "Right":
      return "TopEnd";
    default:
      break;
  }

  return "Absolute";
}
