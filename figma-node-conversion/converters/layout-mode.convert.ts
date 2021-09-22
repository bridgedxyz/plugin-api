import { Axis } from "@reflect-ui/core";
import { FigmaLayoutMode } from "@design-sdk/figma-types";

export function convertLayoutModeToAxis(origin: FigmaLayoutMode): Axis {
  switch (origin) {
    case "NONE":
      return undefined;
    case "HORIZONTAL":
      return Axis.horizontal;
    case "VERTICAL":
      return Axis.vertical;
  }
}
