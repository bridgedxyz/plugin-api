import {
  HandleMirroring,
  VectorNetwork,
  VectorPaths,
} from "@design-sdk/figma-types";
import { ReflectDefaultShapeMixin } from "./mixins";
import { ReflectSceneNodeType } from "./node-type";

export class ReflectVectorNode extends ReflectDefaultShapeMixin {
  type = ReflectSceneNodeType.vector;
  /**
   * Exposes a simple, but incomplete representation of vectors as path. See VectorPaths
   */
  vectorPaths: VectorPaths;
  /**
   * Exposes a complete, but more complex representation of vectors as a network of edges between vectices. See VectorNetwork.
   */
  vectorNetwork: VectorNetwork;
  /**
   * Whether the vector handles are mirrored or independent.
   */
  handleMirroring: HandleMirroring; // TODO: mixed type not supported.
}
