import { BorderRadiusManifest } from "@reflect-ui/core";
import {
  Axis,
  CrossAxisAlignment,
  EdgeInsets,
  MainAxisAlignment,
} from "@reflect-ui/core";
import {
  IReflectGeometryMixin,
  IReflectCornerMixin,
  IReflectBlendMixin,
  IReflectLayoutMixin,
} from "./mixins";

// FIXME - migrate this to reflect core
import {
  LayoutGrid,
  Guide,
  Constraints,
  Paint,
  StrokeJoin,
  StrokeCap,
  Effect,
  Transform,
  FimgaLayoutAlign,
  FigmaLayoutGrow,
} from "@design-sdk/figma-types";

import { ReflectSceneNodeType } from "./node-type";
import type { ReflectSceneNode } from "./node-type-alias";
import { ReflectChildrenMixin } from "./mixins/children.mixin";
import { BlendMode } from "@reflect-ui/core/lib/cg/filters";
import { checkIfAutoLayout } from "@design-sdk/core/utils/check-if-auto-layout";

//#region frame
interface IReflectFrameMixin {
  /**
   * figma: this property is only available when layoutMode != "NONE"
   */
  itemSpacing: number;

  layoutGrids: ReadonlyArray<LayoutGrid>;
  gridStyleId: string;
  clipsContent: boolean;
  guides: ReadonlyArray<Guide>;
}

export class ReflectFrameNode
  extends ReflectChildrenMixin
  implements
    IReflectFrameMixin,
    IReflectGeometryMixin,
    IReflectCornerMixin,
    IReflectBlendMixin,
    IReflectLayoutMixin {
  type = ReflectSceneNodeType.frame;

  absoluteTransform: Transform;

  constraints: Constraints;

  // frame mixin
  layoutGrow: FigmaLayoutGrow;
  mainAxisAlignment: MainAxisAlignment;
  crossAxisAlignment: CrossAxisAlignment;
  layoutMode?: Axis | undefined;
  primaryAxisSizingMode: "FIXED" | "AUTO";
  counterAxisSizingMode: "FIXED" | "AUTO";
  itemSpacing: number;
  padding: EdgeInsets;
  layoutGrids: ReadonlyArray<LayoutGrid>;
  gridStyleId: string;
  clipsContent: boolean;
  guides: ReadonlyArray<Guide>;

  // children mixin
  children: Array<ReflectSceneNode>;
  isRelative?: boolean;

  // geometry mixin
  fills: ReadonlyArray<Paint> | undefined;
  strokes: ReadonlyArray<Paint>;
  strokeWeight: number;
  strokeMiterLimit: number;
  strokeAlign: "CENTER" | "INSIDE" | "OUTSIDE";
  strokeCap: StrokeCap | undefined;
  strokeJoin: StrokeJoin | undefined;
  dashPattern: ReadonlyArray<number>;
  fillStyleId: string | undefined;
  strokeStyleId: string;

  // corner mixin
  cornerRadius: BorderRadiusManifest;
  cornerSmoothing: number;

  // rectangle corner mixin
  topLeftRadius: number;
  topRightRadius: number;
  bottomLeftRadius: number;
  bottomRightRadius: number;

  // blend mixin
  opacity: number;
  blendMode: "PASS_THROUGH" | BlendMode;
  isMask: boolean;
  effects: ReadonlyArray<Effect>;
  effectStyleId: string;
  visible: boolean;
  radius: number;

  // layout mixin
  x: number;
  y: number;
  rotation: number; // In degrees
  width: number;
  height: number;
  layoutAlign: FimgaLayoutAlign;

  get isAutoLayout(): boolean {
    return checkIfAutoLayout(this);
  }
}
//#endregion
