import type {
  DimensionLength,
  TextAlign,
  TextAlignVertical,
  TextDecoration,
  TextManifest,
  TextStyleManifest,
  TextOverflow,
  TextTransform,
} from "@reflect-ui/core";
import type {
  TextAutoResize,
  FontName,
  LetterSpacing,
} from "@design-sdk/figma-types";
import { FontWeight } from "@reflect-ui/core";
import { ReflectSceneNodeType } from "./node-type";
import { ReflectDefaultShapeMixin } from "./mixins";

// region FIXME - migrate this
import { getTextStyleById } from "@design-sdk/figma";
import { extractTextStyleFromTextNode } from "@design-sdk/figma-node-conversion";
import { inferFontWeight } from "@reflect-ui/font-utils";
// endregion

export class ReflectTextNode
  extends ReflectDefaultShapeMixin
  implements Omit<TextManifest, "style">
{
  readonly type: ReflectSceneNodeType.text = ReflectSceneNodeType.text;

  autoRename: boolean;

  /**
   * text content; text characters
   */
  data: string;

  // omitted - style: TextStyleManifest; (FIXME: make text style as unified property)
  overflow: TextOverflow;
  maxLines: number;

  textAutoResize: TextAutoResize;

  textAlign: TextAlign;
  textAlignVertical: TextAlignVertical;

  paragraphIndent: number;
  paragraphSpacing: number;

  fontSize: number | undefined;
  fontName: FontName | undefined;
  textStyleId: string | undefined;
  textCase: TextTransform | undefined;
  textDecoration?: TextDecoration;

  letterSpacing: LetterSpacing;
  lineHeight: DimensionLength;

  get hasTextStyle(): boolean {
    if (this.textStyleId !== "") {
      return true;
    }
    return false;
  }

  get textStyle(): TextStyleManifest {
    try {
      return getTextStyleById(this.textStyleId as string);
    } catch (e) {
      // console.error(`error occcured while getting text style by id`, e)
      return extractTextStyleFromTextNode(this);
    }
  }

  get fontFamily(): string {
    return this.fontName.family;
  }

  get fontWeight(): FontWeight {
    try {
      return inferFontWeight(this.fontName.style);
    } catch (_) {
      // fallback.
      return FontWeight.normal;
    }
  }
}
