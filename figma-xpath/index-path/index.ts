import type { IReflectNodeReference } from "@design-sdk/core/nodes/lignt";

/**
 * relative path of current node. (not main component)
 * e.g. 0/1
 * ```
 * instance
 *   - layer
 *     - layer
 *     - THIS
 *   - layer
 * ```
 */
export function getRelativeIndexPath(
  root: IReflectNodeReference,
  target: IReflectNodeReference
) {
  const paths = [];
  while (target) {
    if (target.id === root.id) {
      break;
    }
    paths.push(target.parent.children.findIndex((c) => c.id === target.id));
    target = target.parent as IReflectNodeReference;
  }

  return paths.reverse().join("/");
}

export function findWithRelativeIndexPath(
  root: IReflectNodeReference,
  indexPath: string | number[]
): IReflectNodeReference {
  if (typeof indexPath === "string") {
    indexPath = indexPath.split("/").map(Number);
  }

  let children = root.children;
  let i = 0;
  for (const at of indexPath) {
    if (i === indexPath.length - 1) {
      return children[at] as IReflectNodeReference;
    }
    try {
      children = children[at].children as IReflectNodeReference[];
    } catch (_) {
      console.error(_, root.children, indexPath);
      throw `givven data is incorrect. we couldn't find target layer from "${
        root.name
      }" with givven path ${indexPath.join("/")}`;
    }
    i++;
  }
}
