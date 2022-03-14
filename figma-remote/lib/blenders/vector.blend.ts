import { VectorBase } from "@design-sdk/figma-remote-types";
import { convertFigmaRemoteStrokeCapToFigmaStrokeCap } from "../converters/stroke-cap.convert";
import {
  MappingEllipseNode,
  MappingLineNode,
  MappingPolygonNode,
  MAppingStarNode,
  MappingVectorNode,
} from "../mapper/mapping-instance";
import { MappingBlendInput } from "./_in";

export function blendVectorNode(
  p: MappingBlendInput<
    | MappingVectorNode
    | MappingPolygonNode
    | MAppingStarNode
    | MappingLineNode
    | MappingEllipseNode,
    VectorBase
  >
) {
  const { target, source } = p;

  // below properties are only present to VectorBase node from figma api. ---------------
  // i.e. the Frame also contains the dashes info, but api won't provide one. so at this point (Mar 2022) we only support dashes to vector oriented nodes.
  target.strokeCap = convertFigmaRemoteStrokeCapToFigmaStrokeCap(
    source.strokeCap
  );
  target.strokeJoin = source.strokeJoin;
  target.strokeMiterLimit = source.strokeMiterAngle;
  target.dashPattern = source.strokeDashes;
  // ------------------------------------------------------------------------------------

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
}
