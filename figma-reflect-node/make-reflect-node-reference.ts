import type { ReflectBaseNode } from "./base.node";
import { Figma } from "@design-sdk/figma";
import type {
  InfiniteChildrenReference,
  IReflectNodeBasicReference,
  IReflectNodeReference,
  MinimalNoDependencyNodeReference,
  ParentWithSingleDepthChildrenReference,
  SingleDepthChildReference,
} from "./reflect-node-reference";

export function makeReference(r: ReflectBaseNode): IReflectNodeReference {
  if (!r) {
    throw 'cannot perform "makeReference". input node to make reference was empty';
  }

  // figma node
  if ("$schema" in r) {
    return <IReflectNodeReference>{
      name: r.name,
      type: r.type,
      origin: r.origin,
      id: r.id,
      parent: make_infinite_parent_reference(r.parent),
      children:
        "children" in r ? r.children.map((c) => makeReference(c)) : undefined,
      mainComponent: r.mainComponent,
      variantProperties: r.variantProperties,
      fills: r.fills,
    };
  }
}

function _safely_makeComponentReference(r: IReflectNodeReference) {
  if (r.origin === "COMPONENT" || r.type == "COMPONENT") {
    return makeComponentReference((r as any) as Figma.ComponentNode);
  }
}

interface ComponentReference extends IReflectNodeBasicReference {
  type;
  origin;
  name;
  parent: ParentWithSingleDepthChildrenReference;
  children: InfiniteChildrenReference[];
}

export function makeComponentReference(
  r: Figma.ComponentNode
): ComponentReference {
  if (!r) {
    console.warn(
      "the givven input was empty. cannot perform 'makeComponentReference'"
    );
    return;
  }

  if (r.type == "COMPONENT") {
    return <ComponentReference>{
      name: r.name,
      type: r.type,
      origin: r.type,
      id: r.id,
      parent: r.parent && {
        name: r.parent.name,
        type: r.parent.type,
        origin: r.parent.type,
        id: r.parent.id,
        children: r.parent.children.map(
          (c) =>
            c && {
              name: c.name,
              type: c.type,
              origin: c.type,
              id: c.id,
            }
        ),
      },
      children:
        "children" in r
          ? make_infinite_children_reference(r.children)
          : undefined,
      variantProperties: r.variantProperties,
    };
  }
}

interface InfiniteParentReference extends MinimalNoDependencyNodeReference {
  id;
  name;
  type;
  origin;
  parent: InfiniteParentReference;
  mainComponent;
  variantProperties;
  children: SingleDepthChildReference[] | InfiniteChildrenReference[];
}

const make_infinite_parent_reference = (
  r: IReflectNodeReference
): InfiniteParentReference => {
  return <InfiniteParentReference>{
    name: r.name,
    type: r.type,
    // FIXME: somehow parent origin is undefined. (handling this with temporary ?? operator)
    // this is caused because initially converting the node, we use figma's raw nod as a parent.
    // reflect conversion must be fixed before resolving this issue.
    origin: r.origin ?? r.type,
    id: r.id,
    parent:
      r.parent &&
      make_infinite_parent_reference(r.parent as IReflectNodeReference),
    mainComponent:
      r.mainComponent && _safely_makeComponentReference(r.mainComponent),
    variantProperties: r.variantProperties,
    children: should_hold_infinite_children(r)
      ? make_infinite_children_reference(
          (r.children as any) as ReadonlyArray<Figma.SceneNode>
        )
      : r.children.map((c) => ({
          name: c.name,
          type: c.type,
          origin: c.origin,
          id: c.id,
        })),
  };
};

const make_infinite_children_reference = (
  children: ReadonlyArray<Figma.SceneNode>
): Array<InfiniteChildrenReference> => {
  return children?.map((c) => {
    return <InfiniteChildrenReference>{
      id: c.id,
      name: c.name,
      origin: c.type,
      type: c.type,
      parent: {
        id: c.parent.id,
        name: c.parent.name,
        origin: c.parent.type,
      },
      children:
        "children" in c
          ? make_infinite_children_reference(c.children)
          : undefined,
    };
  });
};

const should_hold_infinite_children = (r: IReflectNodeReference): boolean => {
  if (r.origin ?? r.type == "COMPONENT") {
    return true;
  }
};
