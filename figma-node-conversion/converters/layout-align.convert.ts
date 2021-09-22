import { FimgaLayoutAlign } from "@design-sdk/figma-types";
import { MainAxisSize } from "@reflect-ui/core";

/**
 * read the [figma's layout-align docs](https://www.figma.com/plugin-docs/api/properties/nodes-layoutalign/)
 * @param layoutAlign
 * @returns
 */
export function layoutAlignToReflectMainAxisSize(
  layoutAlign: FimgaLayoutAlign
): MainAxisSize {
  switch (layoutAlign) {
    case "CENTER":
    case "MAX":
    case "MIN":
      /**
       * ⚠️ Previously, layoutAlign also determined counter axis alignment of auto-layout frame children. Counter axis alignment is now set on the auto-layout frame itself through counterAxisAlignItems. Note that this means all layers in an auto-layout frame must now have the same counter axis alignment. This means "MIN", "CENTER", and "MAX" are now deprecated values of layoutAlign.
       */
      return;
      throw "deprecated";
    case "INHERIT":
      /**
       * Setting "INHERIT" does not "stretch" the node.
       */
      return MainAxisSize.min;
    case "STRETCH":
      /**
       * - Setting "STRETCH" will make the node "stretch" to fill the width of the parent vertical auto-layout frame, or the height of the parent horizontal auto-layout frame excluding the frame's padding.
       * - If the current node is an auto layout frame (e.g. an auto layout frame inside a parent auto layout frame) if you set layoutAlign to “STRETCH” you should set the corresponding axis – either primaryAxisSizingMode or counterAxisSizingMode – to be“FIXED”. This is because an auto-layout frame cannot simultaneously stretch to fill its parent and shrink to hug its children.
       */
      return MainAxisSize.max;
  }
}
