import { typographyIntelisenceMapping } from "@reflect-ui/namings";
import { TextStyleManifest } from "@reflect-ui/core";
import { convertTextStyleToReflect } from "@design-sdk/figma-node-conversion";
import { figma } from "@design-sdk/figma-types";

export function getTextStyleById(id: string): TextStyleManifest {
  if (id === undefined || id === null || id === "") {
    throw `the parameter id of ${id} is not valid. maybe your text does not have a assiged textstyle`;
  }
  for (const s of figma.getLocalTextStyles()) {
    if (id === s.id) {
      return convertTextStyleToReflect(s);
    }
  }
  throw `text style of id "${id}" is not found by api`;
}

/**
 * if the last index is older than 1 second, re index in next execution. this is just to prevent performance leak while running single build process
 */
const INDEX_UPDATE_INTERVAL_MS = 1000;
export class TextStyleRepository {
  private static _textThemeMapping: Map<
    TextThemeStyles,
    Map<string, TextStyleManifest>
  >;
  private static _mapping: Map<string, TextStyleManifest>;
  private static _lastIndex: number = 0;
  static get textThemeMapping(): Map<
    TextThemeStyles,
    Map<string, TextStyleManifest>
  > {
    const indexingRequired =
      !this._textThemeMapping ||
      Date.now() - this._lastIndex > INDEX_UPDATE_INTERVAL_MS;
    if (indexingRequired) {
      this.index();
    }
    return this._textThemeMapping;
  }

  private static index() {
    this._textThemeMapping = new Map<
      TextThemeStyles,
      Map<string, TextStyleManifest>
    >();
    this._mapping = new Map<string, TextStyleManifest>();
    const textThemeStyles = figma.getLocalTextStyles();
    for (let textThemeStyle of textThemeStyles) {
      const convertedTextThemeStyle = convertTextStyleToReflect(textThemeStyle);
      this._mapping[textThemeStyle.name] = convertedTextThemeStyle;
      const style = findOneStyle(convertedTextThemeStyle.name);
      if (style) {
        if (!this._textThemeMapping[style.type]) {
          this._textThemeMapping[style.type] = new Map<
            string,
            TextStyleManifest
          >();
        }
        (this._textThemeMapping[style.type] as Map<string, TextStyleManifest>)[
          style.variant
        ] = convertedTextThemeStyle;
      }
    }
  }

  static getDefaultDesignTextStyleFromRegistry(
    textStyle: TextThemeStyles
  ): TextStyleManifest {
    const set = this.getDesignTextStyleSetFromRegistry(textStyle);
    const keys = Object.keys(set);
    // return first as default
    return set[keys[0]];
  }

  static getDesignTextStyleSetFromRegistry(
    textStyle: TextThemeStyles
  ): Map<string, TextStyleManifest> {
    return this.textThemeMapping[textStyle];
  }

  static getStyleDefFromTextStyleName(textStyleName: string): TextThemeStyles {
    const themeMapping = this.textThemeMapping;
    for (const typekey of Object.keys(themeMapping)) {
      const variantMap = themeMapping[typekey];
      for (const variantkey of Object.keys(variantMap)) {
        const textStyle: TextStyleManifest = variantMap[
          variantkey
        ] as TextStyleManifest;
        if (textStyle.name === textStyleName) {
          return TextThemeStyles[typekey];
        }
      }
    }
    throw `No matching textstyle guideline for name "${textStyleName}" found.`;
  }
}

// todo - migrate this to reflect core
export enum TextThemeStyles {
  headline1 = "headline1",
  headline2 = "headline2",
  headline3 = "headline3",
  headline4 = "headline4",
  headline5 = "headline5",
  headline6 = "headline6",
  subtitle1 = "subtitle1",
  subtitle2 = "subtitle2",
  bodyText1 = "bodyText1",
  bodyText2 = "bodyText2",
  button = "button",
  caption = "caption",
  overline = "overline",
}

function findOneStyle(
  textStyleName: string
): {
  // the type
  type: TextThemeStyles;
  // the variant, e.g. sm/h1, xl/h1
  variant: string;
} {
  for (const key of typographyIntelisenceMapping.keys()) {
    for (const canditate of typographyIntelisenceMapping.get(key)) {
      if (textStyleName.toLowerCase().includes(canditate)) {
        return {
          type: TextThemeStyles[key] as TextThemeStyles,
          variant: textStyleName, // TODO update this logic to include size variants or some what helpful
        };
      }
    }
  }
}
