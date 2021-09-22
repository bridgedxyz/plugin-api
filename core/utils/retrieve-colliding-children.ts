import type { ReflectSceneNode } from "@design-sdk/figma-node";

/**
 * Iterate over each Rectangle and check if it has any child on top.
 * This is O(n^2), but is optimized to only do j=i+1 until length, and avoid repeated entries.
 * A Node can only have a single parent. The order is defined by layer order.
 */
export function retrieveCollidingChildren(
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
