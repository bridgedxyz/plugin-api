import { ReflectDefaultShapeMixin } from "./mixins";
import { ReflectSceneNodeType } from "./node-type";

export class ReflectEllipseNode extends ReflectDefaultShapeMixin {
  type = ReflectSceneNodeType.ellipse;
}
