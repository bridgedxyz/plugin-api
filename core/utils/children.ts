import type {
  IChildrenMixin,
  IReflectChildrenMixin,
  ReflectSceneNode,
  IReflectNodeReference,
} from "@design-sdk/figma-node";
import { ReflectSceneNodeType } from "@design-sdk/figma-node";

type MaybeChildrenMixin<T = any> = IChildrenMixin<T> | object;

/**
 * maps all children under complex object determined by property name "children" and it's type (if its a array)
 * @param node
 * @param options
 * @returns
 */
export function mapGrandchildren<
  I extends MaybeChildrenMixin<any> = IReflectChildrenMixin,
  O = ReflectSceneNode,
  ITEMS = O
>(
  node: I,
  depth?: number,
  options?: {
    includeThis?: boolean;
    depthLimit?: number;
  },
  /**
   * filter won't be applied to root. rather `includeThis` is set to true or not.
   */
  filter?: (node: ITEMS) => boolean
): Array<O> {
  const _current_depth = depth ?? 0;

  // depth limit check
  // this logic barier wont be executed if "depthLimit" is not provided
  if (
    options?.depthLimit !== undefined &&
    options?.depthLimit == _current_depth
  ) {
    return [];
  }

  const children: Array<O> = [];
  // if includeThis option enabled, add this.
  if (options?.includeThis) {
    children.push(node as any);
  }

  const add = (...items: ITEMS[]) => {
    children.push(...(items.filter(filter ?? ((_) => true)) as any));
  };

  if ("children" in node) {
    const castedNode = node as IChildrenMixin<I>;
    // children field may exist, but not a array or undefined
    if (castedNode.children && Array.isArray(castedNode.children)) {
      for (const child of castedNode.children) {
        if ("children" in child && Array.isArray((child as any).children)) {
          const grandchildren = mapGrandchildren(
            child as IReflectChildrenMixin,
            _current_depth + 1,
            {
              depthLimit: options?.depthLimit,
            }
          );
          add(...(grandchildren as any));
        }

        // frame can be also a child, but not group. group only holds children, so we do not push group nodes
        if (!((child as any).type == ReflectSceneNodeType.group)) {
          add(child as any);
        }
      }
    }
  }

  return children;
}

export function mapChildren<
  I extends MaybeChildrenMixin<any> = IReflectChildrenMixin,
  O = ReflectSceneNode
>(
  node: I,
  options?: {
    includeThis?: boolean;
  }
): Array<O> {
  return mapGrandchildren(node, null, {
    includeThis: options?.includeThis,
    // depth limit 1 indicates to fetch only direct children
    depthLimit: 1,
  });
}

/**
 * used for determining if wrapping frame can be ignored - (base) usages.
 * @param node
 * @returns
 */
export function isTheOnlyChild(node: IReflectNodeReference) {
  if (node.parent.children) {
    return node.parent.children.length === 1;
  }
  throw `cannot operate "isTheOnlyChild". children is undefined for node "${node.parent.name}""`;
}
