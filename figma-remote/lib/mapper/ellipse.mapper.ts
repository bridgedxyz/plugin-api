import { Ellipse } from "@design-sdk/figma-remote-types";
import { EllipseNode } from "@design-sdk/figma-types";
import { MappingEllipseNode } from "./mapping-instance";
import { blendBaseNode } from "../blenders";

export function mapFigmaRemoteEllipseToFigma(
  remRect: Ellipse,
  parent?
): EllipseNode {
  const mapping = new MappingEllipseNode();
  blendBaseNode({
    target: mapping,
    source: remRect,
    parent,
  });

  return <EllipseNode>{
    ...mapping,
    type: "ELLIPSE",
  };
}
