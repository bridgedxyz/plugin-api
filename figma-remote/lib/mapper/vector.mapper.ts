import { VectorNode } from "@design-sdk/figma-types";
import { Vector } from "@design-sdk/figma-remote-types";
import { MappingVectorNode } from "./mapping-instance";
import { blendBaseNode } from "../blenders";
import { blendVectorNode } from "../blenders/vector.blend";

export function mapFigmaRemoteVectorToFigma(
  remRect: Vector,
  parent?
): VectorNode {
  const mapping = new MappingVectorNode();

  blendBaseNode({
    target: mapping,
    source: remRect,
    parent,
  });

  blendVectorNode({
    target: mapping,
    source: remRect,
    parent,
  });

  return <VectorNode>{
    ...mapping,
    type: "VECTOR",
  };
}
