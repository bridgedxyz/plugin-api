import { ReflectBaseNode } from "../base.node";
import {
  LCRS,
  getNodeActualLCRS,
  getReletiveLCRS,
} from "@design-sdk/core/features/constraints/lcrs";
import type { ReflectSceneNode } from "../node-type-alias";

// FIXME - migrate this to reflect core cg
import { Constraints } from "@design-sdk/figma";

export class ReflectConstraintMixin extends ReflectBaseNode {
  constraints: Constraints;

  /**
   * the current node's constraint LCRS positioning. as is.
   */
  get constraintLcrs(): LCRS {
    return getNodeActualLCRS(this);
  }

  /**
   * the cureent node's visual LCRS positioning actually relative to parent.
   */
  get relativeLcrs(): LCRS {
    return getReletiveLCRS(this, this.parent);
  }

  getRelativeToLcrs(to: ReflectSceneNode) {
    // TODO add validation if 'to' node is somewhere on the parent tree of this node
    return getReletiveLCRS(this, to);
  }
}
