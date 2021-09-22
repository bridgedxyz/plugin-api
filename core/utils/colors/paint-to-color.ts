import { Figma } from "@design-sdk/figma-types";
import { Color } from "@reflect-ui/core";

export function paintToColor(paint: Figma.SolidPaint): Color {
  return (
    paint && {
      r: paint.color.r,
      g: paint.color.g,
      b: paint.color.b,
      a: paint.opacity,
    }
  );
}
