import { ReflectDefaultShapeMixin } from "./mixins";
import { ReflectSceneNodeType } from "./node-type";

export class ReflectLineNode extends ReflectDefaultShapeMixin {
  type = ReflectSceneNodeType.line;
}
