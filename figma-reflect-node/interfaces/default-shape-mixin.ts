import { IReflectCornerMixin } from "../mixins/corner.mixin";
import { IReflectGeometryMixin } from "../mixins/geometry.mixin";
import { IReflectLayoutMixin } from "../mixins/layout.mixin";

export interface IReflectDefaultShapeMixin
  extends IReflectGeometryMixin,
    IReflectCornerMixin,
    IReflectLayoutMixin {}
