import { FontWeight, TextStyleManifest } from "@reflect-ui/core";
import { convertFontStyleToReflect } from "./font-style.convert";
import { convertFontStyleNameToFontWeightReflect } from "@design-sdk/core/converters";
import { convertLetterSpacingToReflect } from "./letter-spacing.convert";
import { convertLineHeightToReflect } from "./line-height.convert";
import { convertTextDecorationToReflect } from "./tetx-decoration.convert";
import {
  TextStyle,
  TextNode,
  LetterSpacing,
  LineHeight,
} from "@design-sdk/figma-types";
import { ReflectTextNode } from "@design-sdk/core";

export function convertTextStyleToReflect(
  origin: TextStyle,
  node?: TextNode
): TextStyleManifest {
  return {
    name: origin.name,
    fontFamily: origin.fontName.family,
    fontWeight: convertFontStyleNameToFontWeightReflect(origin.fontName.style),
    fontStyle: convertFontStyleToReflect(origin.fontName),
    fontSize: origin.fontSize,
    wordSpacing: undefined, // non-figma property
    decoration: convertTextDecorationToReflect(origin.textDecoration),
    decorationStyle: undefined,
    decorationThickness: undefined,
    letterSpacing: convertLetterSpacingToReflect(origin.letterSpacing, node),
    lineHeight: convertLineHeightToReflect(origin.lineHeight),
    color: undefined, // non-figma property (figma does not contain color to text style)
  };
}

export function extractTextStyleFromTextNode(
  origin: ReflectTextNode
): TextStyleManifest {
  let _fontFamily = origin.fontName?.family;
  let _fontWeight = convertFontStyleNameToFontWeightReflect(
    origin.fontName?.style
  );
  if (!origin.fontName) {
    console.warn(
      "this might be a bug (or by multiple textstyle). no fontName was found in text node. the text node was",
      origin
    );
    console.info(
      'since no fontName was provided, falling back to "Roboto Regular"'
    );
    _fontFamily = "Roboto";
    _fontWeight = FontWeight.normal;
  }

  return {
    name: undefined,
    fontFamily: _fontFamily,
    fontWeight: _fontWeight,
    fontStyle: convertFontStyleToReflect(origin.fontName),
    fontSize: origin.fontSize,
    wordSpacing: undefined, // non-figma property
    decoration: convertTextDecorationToReflect(origin.textDecoration),
    decorationStyle: undefined,
    decorationThickness: undefined,
    letterSpacing: convertLetterSpacingToReflect(
      origin.letterSpacing as LetterSpacing
    ),
    lineHeight: convertLineHeightToReflect(origin.lineHeight as LineHeight),
    color: origin.primaryColor,
  };
}
