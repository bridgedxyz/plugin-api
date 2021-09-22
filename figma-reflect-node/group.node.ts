import { Effect } from "@design-sdk/figma"; // FIXME: - migrate this

import { types } from "@reflect-ui/uiutils";
import { ReflectChildrenMixin } from "./mixins/children.mixin";
import { IReflectBlendMixin, IReflectLayoutMixin } from "./mixins";
import { ReflectSceneNodeType } from "./node-type";
import { ReflectSceneNode } from "./node-type-alias";
import { BlendMode } from "@reflect-ui/core/lib/cg/filters";
import { FigmaLayoutGrow, FimgaLayoutAlign } from "@design-sdk/figma-types";

//#region group node
export class ReflectGroupNode
  extends ReflectChildrenMixin
  implements ReflectChildrenMixin, IReflectBlendMixin, IReflectLayoutMixin {
  opacity: number;
  blendMode: "PASS_THROUGH" | BlendMode;
  isMask: boolean;
  effects: readonly Effect[];
  effectStyleId: string;
  visible: boolean;
  radius: number;
  absoluteTransform: types.Transform;
  x: number;
  y: number;
  rotation: number;
  width: number;
  height: number;
  layoutAlign: FimgaLayoutAlign;
  layoutGrow: FigmaLayoutGrow;

  type = ReflectSceneNodeType.group;

  children: Array<ReflectSceneNode>;
}

//#endregion
