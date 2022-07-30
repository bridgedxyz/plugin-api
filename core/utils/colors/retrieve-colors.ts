import type { Paint } from "@design-sdk/figma-types";
import type { ReflectSceneNode } from "@design-sdk/figma-node";
import { calculateContrastRatio } from "@reflect-ui/uiutils";
import { converters } from "@reflect-ui/core";
import { retrieveFill } from "@design-sdk/figma-utils";

export function retrieveColorsFrom(
  sceneNode: Array<ReflectSceneNode>
): Array<contrastedColor> {
  const selectedChildren = deepFlatten(sceneNode);

  const colorStr: Array<contrastedColor> = [];

  // collect all fill[0] and stroke[0] SOLID colors
  selectedChildren.forEach((d) => {
    if ("fills" in d) {
      const fills = colorFromFills(d.fills);
      if (fills) {
        colorStr.push(fills);
      }
    }
    if ("strokes" in d) {
      const strokes = colorFromFills(d.strokes);
      if (strokes) {
        colorStr.push(strokes);
      }
    }
  });

  // retrieve only unique colors
  // from https://stackoverflow.com/a/18923480/4418073
  const unique: Record<string, boolean> = {};
  const distinct: Array<contrastedColor> = [];
  colorStr.forEach(function (x) {
    if (!unique[x.hex]) {
      distinct.push(x);
      unique[x.hex] = true;
    }
  });

  return distinct.sort((a, b) => a.hex.localeCompare(b.hex));
}

type contrastedColor = {
  hex: string;
  contrastWhite: number;
  contrastBlack: number;
};

export function colorFromFills(
  fills: ReadonlyArray<Paint>
): contrastedColor | null {
  // kind can be text, bg, border...
  // [when testing] fills can be undefined
  const fill = retrieveFill(fills);

  if (fill?.type === "SOLID") {
    const black = {
      r: 0,
      g: 0,
      b: 0,
    };

    const white = {
      r: 1,
      g: 1,
      b: 1,
    };

    return {
      hex: converters.color.rgbTo6hex(fill.color),
      contrastBlack: calculateContrastRatio(fill.color, black),
      contrastWhite: calculateContrastRatio(fill.color, white),
    };
  }

  return null;
}

export function deepFlatten(
  arr: Array<ReflectSceneNode>
): Array<ReflectSceneNode> {
  let result: Array<ReflectSceneNode> = [];

  arr.forEach((d) => {
    if ("children" in d) {
      result.push(d);
      result = result.concat(deepFlatten(d.children));
    } else {
      result.push(d);
    }
  });

  return result;
}
