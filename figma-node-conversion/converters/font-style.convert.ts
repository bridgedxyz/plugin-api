import { FontStyle } from "@reflect-ui/core";
import { FontName } from "@design-sdk/figma-types";
export function convertFontStyleToReflect(
  original: FontName
): FontStyle | undefined {
  if (!original) {
    return;
  }

  let fontStyle: FontStyle;
  if (original && original.style?.toLowerCase().match("italic")) {
    fontStyle = FontStyle.italic;
  }
  return fontStyle;
}
