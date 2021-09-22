import { Paint, StrokeCap, StrokeJoin } from "@design-sdk/figma";

export interface IReflectGeometryMixin {
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
}
