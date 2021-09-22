import { Figma } from "@design-sdk/figma-types";
import { blendBaseNode } from "../blenders";
import { Group } from "@design-sdk/figma-remote-types";
import { MappingGroupNode } from "./mapping-instance";

export function mapFigmaRemoteGroupToFigma(
  remGroup: Group,
  parent?
): Figma.GroupNode {
  const mapping = new MappingGroupNode();
  blendBaseNode({
    target: mapping,
    source: remGroup,
    parent,
  });

  return <Figma.GroupNode>{
    ...mapping,
    type: "GROUP",
    layoutAlign: remGroup.layoutAlign,
  };
}
