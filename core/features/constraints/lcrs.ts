import type {
  ReflectGroupNode,
  ReflectSceneNode,
} from "@design-sdk/figma-node";
import { ReflectSceneNodeType } from "@design-sdk/figma-node";

/**
 * @deprecated
 * this only follows figma's constraint type. this needs to be re organized and be moved to reflect-coer
 */
type ConstraintType = "MIN" | "MAX" | "CENTER" | "STRETCH" | "SCALE";

/**
 * represents a constraints relative to parent node
 */
export type LCRS = "Left" | "Center" | "Right" | "Stretch" | "Scale" | "Mixed";

export function getNodeActualLCRS(node: ReflectSceneNode): LCRS {
  if (node.type == ReflectSceneNodeType.group) {
    return getGroupLCRS(node as ReflectGroupNode);
  } else {
    try {
      return X_ALIGN_FIGMA_TO_REFLECT.get(node.constraints.horizontal);
    } catch (e) {
      /* ignore */
    }
  }
}

/**
 * check group's constraint
 * https://github.com/figma/plugin-typings/issues/9
 * @param node
 */
export function getGroupLCRS(node: ReflectGroupNode): LCRS {
  let lastChildLCRS: LCRS;
  for (const c of node.children) {
    const childLCRS = getNodeActualLCRS(c);
    console.warn(c, childLCRS);
    if (lastChildLCRS) {
      if (lastChildLCRS === childLCRS) {
        // do nothing if lcrs matches
      } else {
        // return mixed, if last lcrs does not match current one.
        return "Mixed";
      }
    } else {
      lastChildLCRS = childLCRS;
    }
  }
  return lastChildLCRS;
}

/**
 *
 * @param target the target node a.k.a current node
 * @param reletiveTo the parent node of target node in generatl.
 */
export function getReletiveLCRS(
  target: ReflectSceneNode,
  reletiveTo: ReflectSceneNode
): LCRS {
  // FIXME rel does not work with group as expected.

  // the x position of the target node. this is a x start position.
  const relX = target.absoluteX;

  // the center x position of the target node. since x is a start position, we have to add half of the width to the start point to get the center x position.
  const relXCenter = relX + target.width / 2;

  const lcrs = calculateLCRS({
    centerPosition: relXCenter,
    containerStartPosition: reletiveTo.absoluteX,
    startPosition: target.absoluteX,
    containerWidth: reletiveTo.width,
    width: target.width,
  });

  return lcrs;
}

const X_ALIGN_FIGMA_TO_REFLECT: Map<ConstraintType, LCRS> = new Map([
  ["MIN", "Left"],
  ["MAX", "Right"],
  ["CENTER", "Center"],
  ["STRETCH", "Stretch"],
  ["SCALE", "Scale"],
]);

/**
 * safe damping value for addjusting non even number devision addjustment.
 * If the parent and child's center position is not an even number allow it to be calculdated with this damping value,
 * so 0.5 px can be ignored, even if it does not match exactly.
 */
const SAFE_DAMPING_PX = 0.5;
/**
 * calculate the position element in X plane of givven container
 *
 * |L--------|
 *
 * |----C----|
 *
 * |--------R|
 *
 * the safe margin in non even numbers of PXs are dampped with @const SAFE_DAMPING_PX
 * @param containerWidth aka parent's width
 * @param centerPosition
 */
export function calculateLCRS(args: {
  containerWidth: number;
  containerStartPosition: number;
  centerPosition: number;
  startPosition: number;
  width: number;
}): LCRS {
  const {
    containerWidth,
    containerStartPosition,
    centerPosition,
    startPosition,
    width,
  } = args;
  // console.log('calculateLCRS', containerWidth, containerStartPosition, startPosition, width, centerPosition)

  // stretch inspection
  // if the size of child is same as parent, and start point is starting from 0, inspect it as "Stretch"
  if (containerWidth == width && startPosition == containerStartPosition) {
    return "Stretch";
  }

  // check if container (parent)'s width value is a even number
  const isContainerWidthEven = containerWidth % 2 == 0;
  // check if target's center position value is a even number
  const isCenterPositionEven = centerPosition % 2 == 0;

  // the center point x of the container
  const containerCenterXPos = containerStartPosition + containerWidth / 2;

  /** if one of the givven parameter is not a even number, than apply damping rule with @const SAFE_DAMPING_PX */
  const damp =
    isContainerWidthEven && isCenterPositionEven ? 0 : SAFE_DAMPING_PX;

  const centerDiff = containerCenterXPos - centerPosition;
  if (centerDiff - damp > 0) {
    // this is visually on the left side
    return "Left";
  } else if (centerDiff + damp < 0) {
    // this is visually on the right side
    return "Right";
  }
  // this is visually on the center
  return "Center";
}
