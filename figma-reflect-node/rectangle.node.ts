import { ReflectDefaultShapeMixin, IReflectCornerMixin } from "./mixins";
import { ReflectSceneNodeType } from "./node-type";

export class ReflectRectangleNode
  extends ReflectDefaultShapeMixin
  implements IReflectCornerMixin {
  type = ReflectSceneNodeType.rectangle;
}
