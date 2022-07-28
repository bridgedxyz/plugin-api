import { plugin } from "@design-sdk/figma-types";
import type { NodeType, SceneNode } from "@design-sdk/figma-types";

/**
 * list nodes in the document via iteration. page nodes are not supported by design.
 * @param types
 */
export function listAllNodes(types: NodeType[]): Array<SceneNode> {
  const all = plugin.root.findAll();
  const targets = [];
  all.forEach((n) => {
    if (types.includes(n.type)) {
      targets.push(n);
    }
  });
  return targets;
}
