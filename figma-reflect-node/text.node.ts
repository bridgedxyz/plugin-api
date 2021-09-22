import {
  FontWeight,
  TextAlign,
  TextAlignVertical,
  TextManifest,
  TextStyleManifest,
} from "@reflect-ui/core";
import { ReflectSceneNodeType } from "./node-type";
import { ReflectDefaultShapeMixin } from "./mixins";

// region FIXME - migrate this
import { getTextStyleById } from "@design-sdk/figma";
import { TextAutoResize } from "@design-sdk/figma-types";
import {
  FontName,
  TextCase,
  TextDecoration,
  LetterSpacing,
  LineHeight,
} from "@design-sdk/figma";
import { extractTextStyleFromTextNode } from "@design-sdk/figma-node-conversion";
import { convertFontStyleNameToFontWeightReflect } from "@design-sdk/core/converters";
import { TextOverflow } from "@reflect-ui/core/lib/text-overflow";
// endregion

export class ReflectTextNode
  extends ReflectDefaultShapeMixin
  implements Omit<TextManifest, "style"> {
  type = ReflectSceneNodeType.text;

  /**
   * text content; text characters
   */
  text: string;

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
  textCase: TextCase | undefined;

  // FIXME: - this conversion is not working
  textDecoration: TextDecoration | undefined;
  // FIXME: - this conversion is not working
  letterSpacing: LetterSpacing | undefined;
  // FIXME: - this conversion is not working
  lineHeight: LineHeight | undefined;

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
    return convertFontStyleNameToFontWeightReflect(this.fontName.style);
  }
}
