import type { ReflectSceneNode } from "@design-sdk/core";
import type { IReflectNodeReference } from "@design-sdk/core";
import { analyzeNode } from "../../node-analysis";
import {
  getVariantNamesSetFromReference_Figma,
  extractTypeFromVariantNames_Figma,
  extractDataByKey,
} from "./variant-name-utils";
import { VariantProperty } from "./variant-property-type";

type VariantLikeNode = ReflectSceneNode | IReflectNodeReference;
export class VariantPropertyParser {
  readonly _variant_raw_names: string[];
  readonly properties: VariantProperty[] = [];
  readonly keys: string[];
  constructor(readonly set: VariantLikeNode) {
    // 0. check if variant compat component (if it's parent is variant-set then it is.)
    // load default property set by variant namings.
    this._variant_raw_names = getVariantNamesSetFromReference_Figma(set);
    this.properties = extractTypeFromVariantNames_Figma(
      this._variant_raw_names
    );
    this.keys = this.properties.map((p) => p.key);
  }

  static from(node: VariantLikeNode): VariantPropertyParser {
    const _ = analyzeNode(node);
    if (
      _ == "variant-set" ||
      _ == "variant-instance" ||
      _ == "master-variant-compoent"
    ) {
      if (_ == "variant-set") {
        return new VariantPropertyParser(node);
      } else if (_ == "master-variant-compoent") {
        return new VariantPropertyParser(node.parent as IReflectNodeReference);
      } else if (_ == "variant-instance") {
        return new VariantPropertyParser(
          node.mainComponent.parent as IReflectNodeReference
        );
      }
    } else {
      throw "invalid input";
    }
    //
  }

  /**
   * get data in a format of the defined property.
   * @param ofchild
   */
  getData(ofchild: VariantLikeNode): { [key: string]: string } {
    const _name = ofchild.name;
    const _data = {};
    this.keys.forEach((k) => {
      _data[k] = extractDataByKey(_name, k);
    });
    return _data;
  }
}
