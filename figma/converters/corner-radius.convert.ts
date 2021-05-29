import { BorderRadiusManifest } from "@reflect-ui/core/lib/ui/border-radius";
import { mixed } from "@design-sdk/core/nodes";
import { FigmaCornerRadius } from "../../figma/types";

export function convertFigmaCornerRadiusToBorderRadius(
  origin: FigmaCornerRadius
): BorderRadiusManifest {
  if (origin.cornerRadius == mixed) {
    return {
      tl: origin.topLeftRadius,
      tr: origin.topRightRadius,
      bl: origin.bottomLeftRadius,
      br: origin.bottomRightRadius,
    };
  } else {
    return {
      all: origin.cornerRadius,
    };
  }
}