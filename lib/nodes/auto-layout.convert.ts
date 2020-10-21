import { ReflectFrameNode, ReflectGroupNode, ReflectSceneNode } from "./mixin";
import { convertGroupToFrame } from "./group-to-frame.convert";

/**
 * Add AutoLayout attributes if layout has items aligned (either vertically or horizontally).
 * To make the calculation, the average position of every child, ordered, needs to pass a threshold.
 * If it fails for both X and Y axis, there is no AutoLayout and return it unchanged.
 * If it finds, add the correct attributes. When original node is a Group,
 * convert it to Frame before adding the attributes. Group doesn't have AutoLayout properties.
 */
export function convertToAutoLayout(node: ReflectFrameNode | ReflectGroupNode): ReflectFrameNode | ReflectGroupNode {
  // only go inside when AutoLayout is not already set.
  if (("layoutMode" in node &&
    node.layoutMode === "NONE" &&
    node.children.length > 0) ||
    node.type === "GROUP") {
    const [orderedChildren, direction, itemSpacing] = reorderChildrenIfAligned(
      node.children
    );
    node.children = orderedChildren;

    if (direction === "NONE" && node.children.length > 1) {
      node.isRelative = true;
    }

    if (direction === "NONE" && node.children.length !== 1) {
      // catches when children is 0 or children is larger than 1
      return node;
    }

    // if node is a group, convert to frame
    if (node.type === "GROUP") {
      node = convertGroupToFrame(node);
    }

    if (direction === "NONE" && node.children.length === 1) {
      // Add fake AutoLayout when there is a single item. This is done for the Padding.
      node.layoutMode = "HORIZONTAL";
    } else {
      node.layoutMode = direction;
    }

    node.itemSpacing = itemSpacing > 0 ? itemSpacing : 0;

    // todo while this is similar to Figma, verify if this is good enough or if padding should be allowed in all four directions.
    const padding = detectAutoLayoutPadding(node);

    node.paddingTop = padding.top;
    node.paddingBottom = padding.bottom;
    node.paddingLeft = padding.left;
    node.paddingRight = padding.right;

    // update the layoutAlign attribute for every child
    node.children = node.children.map((d) => {
      // @ts-ignore current node can't be AltGroupNode because it was converted into AltFrameNode
      d.layoutAlign = layoutAlignInChild(d, node);
      return d;
    });

    // todo counterAxisSizingMode = ??? auto when autolayout? auto when it was a group?
  }

  return node;
}

/**
 * Standard average calculation. Length must be > 0
 */
function average(arr: Array<number>) {
  return arr.reduce((p, c) => p + c, 0) / arr.length;
}

/**
 * Check the average of children positions against this threshold;
 * This allows a small tolerance, which is useful when items are slightly overlayed.
 * If you set this lower, layouts will get more responsive but with less visual fidelity.
 */
const threshold = -2;

/**
 * Verify if children are sorted by their relative position and return them sorted, if identified.
 */
function reorderChildrenIfAligned(children: ReadonlyArray<ReflectSceneNode>): [Array<ReflectSceneNode>, "HORIZONTAL" | "VERTICAL" | "NONE", number] {
  if (children.length === 1) {
    return [[...children], "NONE", 0];
  }

  const updateChildren = [...children];
  const [visit, avg] = shouldVisit(updateChildren);

  // check against a threshold
  if (visit === "VERTICAL") {
    // if all elements are horizontally aligned
    return [updateChildren.sort((a, b) => a.y - b.y), "VERTICAL", avg];
  } else {
    if (visit === "HORIZONTAL") {
      // if all elements are vertically aligned
      return [updateChildren.sort((a, b) => a.x - b.x), "HORIZONTAL", avg];
    }
  }

  return [updateChildren, "NONE", 0];
}

/**
 * Checks if layout is horizontally or vertically aligned.
 * First verify if all items are vertically aligned in Y axis (spacing > 0), then for X axis, then the average for Y and finally the average for X.
 * If no correspondence is found, returns "NONE".
 * In a previous version, it used a "standard deviation", but "average" performed better.
 */
function shouldVisit(children: ReadonlyArray<ReflectSceneNode>): ["HORIZONTAL" | "VERTICAL" | "NONE", number] {
  const intervalY = calculateInterval(children, "y");
  const intervalX = calculateInterval(children, "x");

  const avgX = average(intervalX);
  const avgY = average(intervalY);

  if (!intervalY.every((d) => d >= threshold)) {
    if (!intervalX.every((d) => d >= threshold)) {
      if (avgY <= threshold) {
        if (avgX <= threshold) {
          return ["NONE", 0];
        }
        return ["HORIZONTAL", avgX];
      }
      return ["VERTICAL", avgY];
    }
    return ["HORIZONTAL", avgX];
  }
  return ["VERTICAL", avgY];
}

// todo improve this method to try harder. Idea: maybe use k-means or hierarchical cluster?

/**
 * This function calculates the distance (interval) between items.
 * Example: for [item]--8--[item]--8--[item], the result is [8, 8]
 */
function calculateInterval(children: ReadonlyArray<ReflectSceneNode>,
  xOrY: "x" | "y"): Array<number> {
  const hOrW: "width" | "height" = xOrY === "x" ? "width" : "height";

  // sort children based on X or Y values
  const sorted: Array<ReflectSceneNode> = [...children].sort(
    (a, b) => a[xOrY] - b[xOrY]
  );

  // calculate the distance between values (either vertically or horizontally)
  const interval = [];
  for (let i = 0; i < sorted.length - 1; i++) {
    interval.push(sorted[i + 1][xOrY] - (sorted[i][xOrY] + sorted[i][hOrW]));
  }
  return interval;
}

/**
 * Calculate the Padding.
 * This is very verbose, but also more performant than calculating them independently.
 */
function detectAutoLayoutPadding(node: ReflectFrameNode): {
  left: number;
  right: number;
  top: number;
  bottom: number;
} {
  // this need to be run before VERTICAL or HORIZONTAL
  if (node.children.length === 1) {
    // left padding is first element's y value
    const left = node.children[0].x;

    const right = node.width - (node.children[0].x + node.children[0].width);

    const top = node.children[0].y;

    const bottom = node.height - (node.children[0].y + node.children[0].height);

    // return the smallest padding in each axis
    return {
      left: left,
      right: right,
      top: top,
      bottom: bottom,
    };
  } else if (node.layoutMode === "VERTICAL") {
    // top padding is first element's y value
    const top = node.children[0].y;

    // bottom padding is node height - last position + last height
    const last = node.children[node.children.length - 1];
    const bottom = node.height - (last.y + last.height);

    // the closest value to the left border
    const left = Math.min(...node.children.map((d) => d.x));

    // similar to [bottom] calculation, but using height and getting the minimum
    const right = Math.min(
      ...node.children.map((d) => node.width - (d.width + d.x))
    );

    // return the smallest padding in each axis
    return {
      left: left,
      right: right,
      top: top,
      bottom: bottom,
    };
  } else {
    // node.layoutMode === "HORIZONTAL"
    // left padding is first element's y value
    const left = node.children[0].x;

    // right padding is node width - last position + last width
    const last = node.children[node.children.length - 1];
    const right = node.width - (last.x + last.width);

    // the closest value to the top border
    const top = Math.min(...node.children.map((d) => d.y));

    // similar to [right] calculation, but using height and getting the minimum
    const bottom = Math.min(
      ...node.children.map((d) => node.height - (d.height + d.y))
    );

    // return the smallest padding in each axis
    return {
      left: left,
      right: right,
      top: top,
      bottom: bottom,
    };
  }
}

/**
 * Detect if children are aligned at the start, end or center of parent.
 * Result is the layoutAlign attribute
 */
function layoutAlignInChild(node: ReflectSceneNode,
  parentNode: ReflectFrameNode): "MIN" | "CENTER" | "MAX" | "STRETCH" {
  // parentNode.layoutMode can't be NONE.
  if (parentNode.layoutMode === "VERTICAL") {
    const nodeCenteredPosX = node.x + node.width / 2;
    const parentCenteredPosX = parentNode.width / 2;

    const paddingX = nodeCenteredPosX - parentCenteredPosX;

    // allow a small threshold
    if (paddingX < -4) {
      return "MIN";
    } else if (paddingX > 4) {
      return "MAX";
    } else {
      return "CENTER";
    }
  } else {
    // parentNode.layoutMode === "HORIZONTAL"
    const nodeCenteredPosY = node.y + node.height / 2;
    const parentCenteredPosY = parentNode.height / 2;

    const paddingY = nodeCenteredPosY - parentCenteredPosY;

    // allow a small threshold
    if (paddingY < -4) {
      return "MIN";
    } else if (paddingY > 4) {
      return "MAX";
    } else {
      return "CENTER";
    }
  }
}
