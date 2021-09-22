import { Vector } from "@design-sdk/figma-remote-types";
import { MappingVectorNode } from "../mapper/mapping-instance";
import { MappingBlendInput } from "./_in";

export function blendVectorNode(
  p: MappingBlendInput<MappingVectorNode, Vector>
) {
  const { target, source } = p;
  target.vectorPaths = source.fillGeometry
    // we do not add stroke geometry to vector paths for now.
    // TODO: how to handle "strokeGeometry"?
    // .concat(source.strokeGeometry)
    .map((g) => {
      return {
        data: g.path,
        windingRule: g.windingRule,
      };
    });

  // this is only available via plugin api
  // learn more at https://www.figma.com/plugin-docs/api/VectorNetwork/
  target.vectorNetwork = undefined;
  target.handleMirroring = "NONE";
}
