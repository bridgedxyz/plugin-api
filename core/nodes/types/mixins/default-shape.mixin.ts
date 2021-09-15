import { ReflectConstraintMixin } from "../mixins/constraint.mixin";

import { BorderRadiusManifest } from "@reflect-ui/core";
import { IReflectDefaultShapeMixin } from "../interfaces/default-shape-mixin";
import { BlendMode } from "@reflect-ui/core/lib/cg/filters";

// FIXME - migrate this
import { Paint, Effect, StrokeCap, StrokeJoin } from "@design-sdk/figma";

export class ReflectDefaultShapeMixin
  extends ReflectConstraintMixin
  implements IReflectDefaultShapeMixin {
  layoutGrow: "FIXED" | "STRETCH";
  opacity: number;
  blendMode: "PASS_THROUGH" | BlendMode;
  isMask: boolean;
  effects: ReadonlyArray<Effect>;
  effectStyleId: string;
  visible: boolean;
  radius: number;

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

  cornerRadius: BorderRadiusManifest;
  cornerSmoothing: number;

  x: number;
  y: number;
  rotation: number;
  width: number;
  height: number;
  layoutAlign: "MIN" | "CENTER" | "MAX" | "STRETCH" | "INHERIT";
}
