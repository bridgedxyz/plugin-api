import { Figma } from "@design-sdk/figma-types";
import { blendBaseNode } from "../blenders";
import { Group } from "@design-sdk/figma-remote-types";
import { MappingGroupNode } from "./mapping-instance";

export function mapFigmaRemoteGroupToFigma(remGroup: Group): Figma.GroupNode {
  const mapping = new MappingGroupNode();
  blendBaseNode({
    target: mapping,
    source: remGroup,
  });

  return <Figma.GroupNode>{
    ...mapping,
    type: "GROUP",
    layoutAlign: remGroup.layoutAlign,
  };
}
