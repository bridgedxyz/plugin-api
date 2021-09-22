import { FimgaLayoutAlign } from "@design-sdk/figma-types";
import { types } from "@reflect-ui/uiutils";

export interface IReflectLayoutMixin {
  absoluteTransform: types.Transform;
  x: number;
  y: number;
  rotation: number; // In degrees

  width: number;
  height: number;

  /**
   * fimgma: this property is only applicable when frame is auto-layout frame.
   */
  layoutAlign: FimgaLayoutAlign;

  /**
   * figma: [layout grow](https://www.figma.com/plugin-docs/api/properties/nodes-layoutgrow)
   */
  layoutGrow: number;
}
