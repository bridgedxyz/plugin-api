import { CrossAxisAlignment } from "@reflect-ui/core";
import { FigmaCrossAxisAligment } from "@design-sdk/figma-types";

export function convertCounterAxisAlignItemsToCrossAxisAlignment(
  origin: FigmaCrossAxisAligment
): CrossAxisAlignment {
  switch (origin) {
    case "MIN":
      return CrossAxisAlignment.start;
    case "CENTER":
      return CrossAxisAlignment.center;
    case "MAX":
      return CrossAxisAlignment.end;
  }
}
