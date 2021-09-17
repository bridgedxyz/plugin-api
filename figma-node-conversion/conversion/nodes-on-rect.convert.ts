import { CrossAxisAlignment, MainAxisAlignment } from "@reflect-ui/core";
import {
  ReflectFrameNode,
  ReflectRectangleNode,
  ReflectGroupNode,
} from "@design-sdk/core/nodes";
import type { ReflectSceneNode } from "@design-sdk/core/nodes";
import { convertToAutoLayout } from "./auto-layout.convert";

/**
 * Identify all nodes that are inside Rectangles and transform those Rectangles into Frames containing those nodes.
 */
export function convertNodesOnRectangle(
  node: ReflectFrameNode | ReflectGroupNode
): ReflectFrameNode | ReflectGroupNode {
  if (node.children.length < 2) {
    return node;
  }
  if (!node.id) {
    throw new Error(
      "Node is missing an id! This error should only happen in tests."
    );
  }

  const colliding = retrieveCollidingItems(node.children);

  const parentsKeys = Object.keys(colliding);
  // start with all children. This is going to be filtered.
  let updatedChildren: Array<ReflectSceneNode> = [...node.children];

  parentsKeys.forEach((key) => {
    // dangerous cast, but this is always true
    const parentNode = node.children.find(
      (d) => d.id === key
    ) as ReflectRectangleNode;

    // retrieve the position. Key should always be at the left side, so even when other items are removed, the index is kept the same.
    const indexPosition = updatedChildren.findIndex((d) => d.id === key);

    // filter the children to remove those that are being modified
    updatedChildren = updatedChildren.filter(
      (d) => !colliding[key].map((dd) => dd.id).includes(d.id) && key !== d.id
    );

    const frameNode = convertRectangleToFrame(
      parentNode,
      /**
       *  -1 for the rect being converted.
       */
      node.children.length - 1
    );

    // todo when the soon-to-be-parent is larger than its parent, things get weird. Happens, for example, when a large image is used in the background. Should this be handled or is this something user should never do?
    frameNode.children = [...colliding[key]];
    colliding[key].forEach((d) => {
      d.parent = frameNode;
      d.x = d.x - frameNode.x;
      d.y = d.y - frameNode.y;
    });

    // try to convert the children to AutoLayout, and insert back at updatedChildren.
    updatedChildren.splice(indexPosition, 0, convertToAutoLayout(frameNode));
  });

  if (updatedChildren.length > 0) {
    node.children = updatedChildren;
  }

  // convert the resulting node to AutoLayout.
  node = convertToAutoLayout(node);

  return node;
}

// TODO - Additional feature, this needs to be migrated to @designto/token/logics
function convertRectangleToFrame(
  rect: ReflectRectangleNode,
  inferedChildrenCound: number
) {
  // if a Rect with elements inside were identified, extract this Rect
  // outer methods are going to use it.
  const frameNode = new ReflectFrameNode({
    id: rect.id,
    name: rect.name,
    origin: rect.origin,
    originParentId: rect.originParentId,
    parent: rect.parent,
    absoluteTransform: rect.absoluteTransform,
    childrenCount: inferedChildrenCound,
  });

  frameNode.parent = rect.parent;

  frameNode.width = rect.width;
  frameNode.height = rect.height;
  frameNode.x = rect.x;
  frameNode.y = rect.y;
  frameNode.rotation = rect.rotation;
  frameNode.layoutMode = undefined;

  // opacity should be ignored, else it will affect children
  // when invisible, add the layer but don't fill it; he designer might use invisible layers for alignment.
  // visible can be undefined in tests
  if (rect.visible !== false) {
    // FIXEME - on converting fills, it does not handles the rectnode's layer opacity. so dimmed color rect will be convered as non-dimmed color frame node.
    frameNode.fills = rect.fills;
    frameNode.fillStyleId = rect.fillStyleId;

    frameNode.strokes = rect.strokes;
    frameNode.strokeStyleId = rect.strokeStyleId;

    frameNode.effects = rect.effects;
    frameNode.effectStyleId = rect.effectStyleId;
  }

  frameNode.crossAxisAlignment = CrossAxisAlignment.start;
  frameNode.counterAxisSizingMode = "FIXED";
  frameNode.mainAxisAlignment = MainAxisAlignment.start;
  frameNode.primaryAxisSizingMode = "FIXED";

  frameNode.strokeAlign = rect.strokeAlign;
  frameNode.strokeCap = rect.strokeCap;
  frameNode.strokeJoin = rect.strokeJoin;
  frameNode.strokeMiterLimit = rect.strokeMiterLimit;
  frameNode.strokeWeight = rect.strokeWeight;

  frameNode.cornerRadius = rect.cornerRadius;
  frameNode.cornerSmoothing = rect.cornerSmoothing;
  frameNode.constraints = rect.constraints;

  return frameNode;
}

/**
 * Iterate over each Rectangle and check if it has any child on top.
 * This is O(n^2), but is optimized to only do j=i+1 until length, and avoid repeated entries.
 * A Node can only have a single parent. The order is defined by layer order.
 */
function retrieveCollidingItems(
  children: ReadonlyArray<ReflectSceneNode>
): Record<string, Array<ReflectSceneNode>> {
  const used: Record<string, boolean> = {};
  const groups: Record<string, Array<ReflectSceneNode>> = {};

  for (let i = 0; i < children.length - 1; i++) {
    const item1 = children[i];

    // ignore items that are not Rectangles
    if (item1.type !== "RECTANGLE") {
      continue;
    }

    for (let j = i + 1; j < children.length; j++) {
      const item2 = children[j];

      if (
        !used[item2.id] &&
        item1.x <= item2.x &&
        item1.y <= item2.y &&
        item1.x + item1.width >= item2.x + item2.width &&
        item1.y + item1.height >= item2.y + item2.height
      ) {
        if (!groups[item1.id]) {
          groups[item1.id] = [item2];
        } else {
          groups[item1.id].push(item2);
        }
        used[item2.id] = true;
      }
    }
  }

  return groups;
}
