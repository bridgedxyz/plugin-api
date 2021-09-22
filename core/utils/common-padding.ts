import { ReflectSceneNode } from "@design-sdk/core";
import { EdgeInsets } from "@reflect-ui/core";

type Padding = {
  horizontal: number;
  left: number;
  right: number;
  vertical: number;
  top: number;
  bottom: number;
};

/**
 * Add padding if necessary.
 * Padding is currently only valid for auto layout.
 * Padding can have values even when AutoLayout is off
 */
export function commonPadding(
  node: ReflectSceneNode
): { all: number } | Padding | null {
  if ("layoutMode" in node && node.layoutMode !== undefined) {
    // round the numbers to avoid 5 being different than 5.00001
    // fix it if undefined (in tests)

    node.padding = new EdgeInsets({
      left: Math.round(node.padding.left ?? 0),
      right: Math.round(node.padding.right ?? 0),
      top: Math.round(node.padding.top ?? 0),
      bottom: Math.round(node.padding.bottom ?? 0),
    });

    const arr: Padding = {
      horizontal: 0,
      vertical: 0,
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    };

    if (
      node.padding.left > 0 &&
      node.padding.left === node.padding.right &&
      node.padding.left === node.padding.bottom &&
      node.padding.top === node.padding.bottom
    ) {
      return { all: node.padding.left };
    } else if (
      node.padding.left > 0 &&
      node.padding.left === node.padding.right
    ) {
      // horizontal padding + vertical + individual paddings
      arr.horizontal = node.padding.left;

      if (node.padding.top > 0 && node.padding.top === node.padding.bottom) {
        arr.vertical = node.padding.top;
      } else {
        if (node.padding.top > 0) {
          arr.top = node.padding.top;
        }
        if (node.padding.bottom > 0) {
          arr.bottom = node.padding.bottom;
        }
      }
    } else if (
      node.padding.top > 0 &&
      node.padding.top === node.padding.bottom
    ) {
      // vertical padding + individual paddings
      arr.vertical = node.padding.bottom;

      if (node.padding.left > 0) {
        arr.left = node.padding.left;
      }
      if (node.padding.right > 0) {
        arr.right = node.padding.right;
      }
    } else {
      // individual paddings
      if (node.padding.left > 0) {
        arr.left = node.padding.left;
      }
      if (node.padding.right > 0) {
        arr.right = node.padding.right;
      }
      if (node.padding.top > 0) {
        arr.top = node.padding.top;
      }
      if (node.padding.bottom > 0) {
        arr.bottom = node.padding.bottom;
      }
    }

    return arr;
  }

  return null;
}
