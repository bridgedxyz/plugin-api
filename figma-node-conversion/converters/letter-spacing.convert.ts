import { TextNode, LetterSpacing, figma } from "@design-sdk/figma-types";
export function convertLetterSpacingToReflect(
  origin: LetterSpacing,
  node?: TextNode
): number {
  if (origin && Math.round(origin.value) !== 0) {
    if (origin.unit === "PIXELS") {
      return origin.value;
    } else {
      if (node) {
        if (node.fontSize !== figma.mixed) {
          // read [commonLineHeight] comment to understand what is going on here.
          return (
            ((node.fontSize as number) *
              ((node.letterSpacing as LetterSpacing).value as number)) /
            100
          );
        }
      }
    }
  }

  return 0;
}
