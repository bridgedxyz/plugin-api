///
/// this file's function implementation follows figma's variant component naming convention, which splits property and value by comma (,) in single line node name.
///

import { array } from "@reflect-ui/uiutils";
import { ReflectSceneNodeType } from "@design-sdk/core";
import type { IReflectNodeReference } from "@design-sdk/core";

import { Figma } from "../..";
import {
  FigmaBoolean,
  FigmaNumber,
  FigmaUnique,
  FigmaVariantPropertyCompatType,
  VariantProperty,
} from "./variant-property-type";

export function getVariantNamesSetFromRawNode_Figma(from: Figma.SceneNode) {
  let masterVariantSet: Figma.ComponentSetNode;

  if (from.type == "COMPONENT") {
    masterVariantSet = from.parent as Figma.ComponentSetNode;
  }

  if (from.type == "INSTANCE") {
    masterVariantSet = from.mainComponent.parent as Figma.ComponentSetNode;
  }

  if (from.type == "COMPONENT_SET") {
    masterVariantSet = from;
  }

  return masterVariantSet.children.map((c) => c.name);
}

export function getVariantNamesSetFromReference_Figma(
  from: IReflectNodeReference
): string[] {
  let masterVariantSet: IReflectNodeReference;
  if (from.origin == ReflectSceneNodeType.component) {
    // if component & parent is variant set
    if (from.parent.origin == ReflectSceneNodeType.variant_set) {
      masterVariantSet = from.parent as IReflectNodeReference;
    } else {
      throw "the givven component is not variant compat component";
    }
  } else if (from.origin == ReflectSceneNodeType.variant_set) {
    masterVariantSet = from;
  } else {
    throw `currently, nothing than variant set or variant component is supported. the input node's type was "${from.origin}"`;
  }
  return masterVariantSet.children.map((c) => c.name);
}

/**
 * builds property map to figma variant component node name
 * e.g. { on: false, variant: hover } -> "on=false, variant=hover"
 * @param properties
 */
export function buildVariantName_Figma(
  properties: Map<string, string>
): string {
  return Array.from(properties)
    .map(([key, value]) => {
      return `${key}=${value}`;
    })
    .join(", ");
}

/**
 * e.g.
 * serching targets : ['a=1, b=1, c=1', 'a=1, b=2', 'a=1, b=2, c=1']
 * origin : 'a=1, b=1, c=1'
 * changing property: b to 2
 * result: 'a=1, b=2, c=1'
 * @param params
 */
export function buildVariantNameIncluding_Figma(params: {
  including: {
    swapPropertyName: string;
    swapPropertyValue: string;
    thisOriginName: string;
  };
  existing: {
    names: string[];
  };
}): string {
  const { including, existing } = params;

  const f_o_n = formatName(including.thisOriginName);
  const f_o_v = extractPropertiesFromVariantName_Figma(f_o_n);

  const origin_replacingPartialParamName = buildVariantName_Figma(f_o_v);
  const target_replacingPartialParamName = buildVariantName_Figma(
    new Map([[including.swapPropertyName, including.swapPropertyValue]])
  );

  // "a=1, b=1, c=1" to "a=2, b=1, c=1"
  const _built_name = f_o_n.replace(
    origin_replacingPartialParamName,
    target_replacingPartialParamName
  );

  const existingName = existing.names.find((exn) => {
    return formatName(exn) == _built_name;
  });

  return existingName;
}

/**
 * extracts property map from variant component node's name
 * e.g. "on=false, variant=hover" -> { on: false, variant: hover }
 * this does not contains the type of the property. only value.
 * @param name
 * @returns
 */
export function extractPropertiesFromVariantName_Figma(
  name: string
): Map<string, string> {
  const properties = new Map<string, string>();
  name.split(",").forEach((propertyPair) => {
    const [k, v] = propertyPair.split("=");
    properties.set(k, v);
  });
  return properties;
}

/**
 * figma's variant values' type are ok to be translated as enum (custom type alias) or boolean value since it's all selectable
 * at this point (2021), only boolean and string types are supported and string are hanlded as selectable on figma editor ui.
 * the special strings are ["on", "off", "true", "false", "yes", "no"]
 * some values may be nullable if there is a variant that contains no value.
 * @param params
 */
export function extractTypeFromVariantNames_Figma(
  names: string[],
  defaultName?: string
): VariantProperty[] {
  if (!names || names.length == 0) {
    console.log("you might want to check this. input names were empty");
    return [];
  }

  // some names may not contain value, which means there are some blanked property by names (varaints)
  // so, we'll need to find the longest property container to be a sample.

  const propertyMaps = names.map((n) =>
    extractPropertiesFromVariantName_Figma(n)
  );

  // 1. find the sample map

  const i_highestBidder = propertyMaps
    .map((a) => a.size)
    .indexOf(Math.max(...propertyMaps.map((a) => a.size)));
  const highestBidder = propertyMaps[i_highestBidder];

  // this stores infered property type of the iterated property value
  // it's lke this.
  // case 1. isOn: ["boolean", "boolean"] -> this type can be fixed as boolean
  // case 2. isOn: ["string", "boolean"] -> this type is fallbacking to enum
  const inferedPropertyTypeMap = new Map<
    string,
    Array<FigmaVariantPropertyCompatType>
  >();

  const _tmp_uniqueValuesMap = new Map<string, Array<string>>();

  // iterates throught all so we can collect all values for properties
  propertyMaps.forEach((v) => {
    v.forEach((p_value, p_name) => {
      const p_infered_type = inferTypeFromVariantValue_Figma(p_value);

      //
      const _tmp_uniquValuesForThis = _tmp_uniqueValuesMap.get(p_name);
      if (_tmp_uniquValuesForThis) {
        _tmp_uniqueValuesMap.set(
          p_name,
          _tmp_uniquValuesForThis.concat(p_value)
        );
      } else {
        _tmp_uniqueValuesMap.set(p_name, [p_value]);
      }
      //

      //
      const inferedPropertyTypesForThis = inferedPropertyTypeMap.get(p_name);
      if (inferedPropertyTypesForThis) {
        inferedPropertyTypeMap.set(
          p_name,
          inferedPropertyTypesForThis.concat(p_infered_type)
        );
      } else {
        inferedPropertyTypeMap.set(p_name, [p_infered_type]);
      }
      //
    });
  });

  // the final solid fixed type map by key (property name)
  const fixedPropertyTypeMap = new Map<
    string,
    FigmaVariantPropertyCompatType
  >();
  // inferedPropertyTypeMap to fixed type
  inferedPropertyTypeMap.forEach((v, k) => {
    const _len = v.length;

    if (_len == 1) {
      // fallback to string
      fixedPropertyTypeMap.set(k, <FigmaUnique>{
        type: "unique",
        value: k, // TODO: inspect me is this the right value?
      });
    } else if (_len >= 2) {
      if (array.isAllEqual(v)) {
        switch (
          v[0] // since it is all equal, we can use first value.
        ) {
          case FigmaBoolean:
            // return boolean
            fixedPropertyTypeMap.set(k, FigmaBoolean);
            break;
          case FigmaNumber:
            fixedPropertyTypeMap.set(k, FigmaNumber);
            break;
        }
      } else {
        // if not all equal or not boolean (string, string) will be treated as (enum)
        // fallback to enum

        // set unum
        const uniqueValues = _tmp_uniqueValuesMap
          .get(k)
          .filter(array.filters.onlyUnique);
        fixedPropertyTypeMap.set(k, {
          type: "enum",
          values: uniqueValues,
        });
      }
    } else {
      // when len is 0
      throw "this cannot be happening";
    }
  });

  // set default value map if possible
  let defaultPropertyValuesMap: Map<string, string> | undefined;
  if (defaultName) {
    defaultPropertyValuesMap = extractPropertiesFromVariantName_Figma(
      defaultName
    );
  }
  //

  const final: VariantProperty[] = [];

  fixedPropertyTypeMap.forEach((v, k) => {
    final.push({
      key: k,
      defaultValue: defaultPropertyValuesMap
        ? defaultPropertyValuesMap.get(k)
        : null,
      type: v,
      // implement nullable feature
      nullable: true,
    });
  });

  return final;
}

export function extractDataByKey(name: string, key: string) {
  const _props_of_this_single_name = extractPropertiesFromVariantName_Figma(
    name
  );
  return _props_of_this_single_name.get(key);
}

const FIGMA_BOOLEAN_REPRESENTERS = ["on", "off", "true", "false", "yes", "no"];
function inferTypeFromVariantValue_Figma(
  value: string
): FigmaVariantPropertyCompatType {
  /// !note. figma ignores casing of the variant value. e.g. TrUe & FaLsE also are considered as boolean type on figma.
  const _flat_value = value.toLowerCase();
  if (value === undefined) {
    throw "value is undefined. cannot infer type.";
  }

  // /^[+-]?\d+(\.\d+)?$/ we can use regex also.
  if (!Number.isNaN(Number(value))) {
    // e.g. - if "0" -> may be figma number
    return FigmaNumber;
  }
  if (FIGMA_BOOLEAN_REPRESENTERS.includes(_flat_value)) {
    return FigmaBoolean;
  }

  // else
  return <FigmaUnique>{
    type: "unique",
    value: value,
  };
}

/**
 * the formatting of variant name may slightly differ. mostly the empty spacing between the comma.
 * this function flats all givven and target and find the matching pattern so that slightly differing variant can be recognized
 * @param from
 * @param target
 */
export function findMatchingVariantName(
  from: string[],
  target: string
): string | undefined {
  const normalizedTarget = _normalizeName(target);
  for (const origin of from) {
    const normalizedOrigin = _normalizeName(origin);
    if (normalizedOrigin == normalizedTarget) {
      return origin;
    }
  }
  return undefined;
}

/**
 * compares two raw input after normalizing with same logic.
 * checks if two name represents the same value
 * @param _with
 * @param _this
 * @returns
 */
export function isVariantMatchingName(_with: string, _this: string): boolean {
  return _normalizeName(_with) == _normalizeName(_this);
}

/**
 * used for comparing the generated variant name and existing variant name to be indicating the same value
 * @param name
 * @returns
 */
function _normalizeName(name: string): string {
  let final = name;
  // replace empty spaces
  final = final.replace(/\s/g, "");
  // replace commas
  final = final.replace(/,/g, "");

  return final;
}

/**
 * used for comparing persice value
 *
 * from : "a=1,  b=1 , c= 3"
 *
 * to: "a=1, b=1, c=3"
 *
 * rulse are...
 * 1. no double spaces
 * 2. no spaces before and after "="
 * 3. no spaces before ","
 * 4. one space after ","
 * @param name
 * @returns
 */
function formatName(name: string): string {
  const invalidPatterns = ["  ", " =", "= ", " ,"];
  const _max_loop = 200;
  let final = name;

  const containsInvalid = () => invalidPatterns.some((s) => final.includes(s));

  let _i = 0;
  while (containsInvalid()) {
    final = final.replace("  ", " ");
    final = final.replace(" =", "=");
    final = final.replace("= ", "=");
    final = final.replace(" ,", ",");

    // safe break
    _i++;
    if (_i > _max_loop) {
      break;
    }
  }

  return final;
}
