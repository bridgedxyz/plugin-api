import { ReflectFrameNode, ReflectRectangleNode } from "@design-sdk/core";
import { CrossAxisAlignment, MainAxisAlignment } from "@reflect-ui/core";

// TODO - Additional feature, this needs to be migrated to @designto/token/logics
export function forceRectangleToFrame(
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
