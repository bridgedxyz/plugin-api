import type { ReflectSceneNodeType } from "./node-type";
export {
  makeComponentReference,
  makeReference,
} from "./make-reflect-node-reference";
import type { NodeType } from "@design-sdk/figma";

export type IReflectNodeReference =
  | IReflectNodeRootLikeReference
  | IReflectNodeBasicReference;

export type IReflectNodeChildrenReference =
  | IReflectNodeReference
  | InfiniteChildrenReference;

export type IReflectParentNodeReference =
  | IReflectNodeReference
  | ParentWithSingleDepthChildrenReference;

export interface IReflectNodeBasicReference {
  readonly type: ReflectSceneNodeType;
  /**
   * origin type
   */
  origin: ReflectSceneNodeType;
  name: string;
  id: string;
  parent?: IReflectParentNodeReference;
  children?: Array<IReflectNodeChildrenReference>;
  mainComponent?: IReflectNodeReference;
  variantProperties?: { [property: string]: string } | null;
}

export interface IReflectNodeBaseReference extends IReflectNodeBasicReference {
  readonly isInstance: boolean;
  readonly isMasterComponent: boolean;
  readonly isRoot: boolean;
}

export type IReflectNodeRootLikeReference = IReflectNodeRootShapeReference;
export interface IReflectNodeRootShapeReference
  extends IReflectNodeBasicReference {
  fills: any[];
}

export interface MinimalNoDependencyNodeReference {
  id: string;
  name: string;
  origin: NodeType;
}
export interface InfiniteChildrenReference
  extends MinimalNoDependencyNodeReference {
  id: string;
  name: string;
  type;
  parent: MinimalNoDependencyNodeReference;
  children?: ReadonlyArray<InfiniteChildrenReference>;
}

export interface SingleDepthChildReference
  extends MinimalNoDependencyNodeReference {
  id;
  name: string;
  type;
  origin;
}

/**
 * parent reference that contains only 1 depth of its children.
 */
export interface ParentWithSingleDepthChildrenReference
  extends MinimalNoDependencyNodeReference {
  children: SingleDepthChildReference[];
}
