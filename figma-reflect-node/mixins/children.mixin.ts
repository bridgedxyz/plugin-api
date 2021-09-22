import type { ReflectSceneNode } from "../node-type-alias";
import { ReflectConstraintMixin } from "./constraint.mixin";
import { types } from "@reflect-ui/uiutils";

export interface IChildrenMixin<T> {
  children: Array<T>;
}

export interface IReflectChildrenMixin
  extends IChildrenMixin<ReflectSceneNode> {
  children: Array<ReflectSceneNode>;
}
export abstract class ReflectChildrenMixin
  extends ReflectConstraintMixin
  implements IReflectChildrenMixin {
  children: Array<ReflectSceneNode>;
  get constraintableChildren(): Array<ReflectConstraintMixin> {
    return filterConstraintableChildren(this);
  }
  isRelative?: boolean;

  get mostUsedColor(): ReadonlyArray<types.RGBAF> {
    throw "not implemented";
  }
}

function filterConstraintableChildren(node: ReflectChildrenMixin) {
  const constraintables: Array<ReflectConstraintMixin> = [];
  for (const childNode of node.children) {
    if (
      childNode.type == "INSTANCE" ||
      childNode.type == "COMPONENT" ||
      childNode.type == "FRAME" ||
      childNode.type == "RECTANGLE" ||
      childNode.type == "GROUP" ||
      childNode.type == "LINE" ||
      childNode.type == "ELLIPSE" ||
      childNode.type == "TEXT"
    ) {
      constraintables.push(childNode as ReflectConstraintMixin);
    }
  }
  return constraintables;
}
