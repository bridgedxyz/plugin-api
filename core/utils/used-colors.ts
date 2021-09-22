import {
  ReflectChildrenMixin,
  ReflectDefaultShapeMixin,
  ReflectSceneNode,
} from "@design-sdk/figma-node";

export function getAllUsedColors(
  node: ReflectSceneNode,
  options?: {
    runOnGrandchild: boolean;
  }
): ReadonlyArray<string> {
  const colors = [];

  //  organize targets
  const targetNodes: Array<ReflectSceneNode> = [];
  if (options?.runOnGrandchild) {
    if (node instanceof ReflectChildrenMixin) {
      targetNodes.push(...node.getGrandchildren({ includeThis: true }));
    }
  } else {
    targetNodes.push(node);
  }
  //

  // run color extractions on nodes
  for (const tn of targetNodes) {
    (tn as ReflectDefaultShapeMixin).primaryColor;
  }

  return;
}
