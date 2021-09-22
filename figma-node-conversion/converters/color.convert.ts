import { Color as ReflectColor, ColorFormat } from "@reflect-ui/core/lib/color";
import { converters } from "@reflect-ui/core";
import {
  FigmaColor,
  FigmaColorFormat,
  FigmaRGB,
  FigmaRGBA,
} from "@design-sdk/figma-types";

export function reflectColorToFigmaColor(
  reflectColor: ReflectColor,
  format: FigmaColorFormat = FigmaColorFormat.rgb
): FigmaColor {
  const convertedColor = converters.color.colorToRGBA(
    reflectColor,
    ColorFormat.rgbaF
  );
  if (format == FigmaColorFormat.rgb) {
    return {
      r: convertedColor.r,
      g: convertedColor.g,
      b: convertedColor.b,
    };
  } else if (format == FigmaColorFormat.rgba) {
    return {
      r: convertedColor.r,
      g: convertedColor.g,
      b: convertedColor.b,
      a: convertedColor.a,
    };
  }

  throw "unsupported format type";
}

export function reflectColorToFigmaRGB(reflectColor: ReflectColor): FigmaRGB {
  return reflectColorToFigmaColor(
    reflectColor,
    FigmaColorFormat.rgb
  ) as FigmaRGB;
}

export function reflectColorToFigmaRGBA(reflectColor: ReflectColor): FigmaRGBA {
  return reflectColorToFigmaColor(
    reflectColor,
    FigmaColorFormat.rgba
  ) as FigmaRGBA;
}
