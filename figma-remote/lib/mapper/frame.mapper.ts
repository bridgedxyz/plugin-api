import { Figma } from "@design-sdk/figma-types";
import {
  blendBaseNode,
  blendCornerNode,
  blendRectangleCornerNode,
} from "../blenders";
import { Frame } from "@design-sdk/figma-remote-types";
import { MappingFrameNode } from "./mapping-instance";

export function mapFigmaRemoteFrameToFigma(
  remFrame: Frame,
  parent?
): Figma.FrameNode {
  const mapping = new MappingFrameNode();
  blendBaseNode({
    target: mapping,
    source: remFrame,
    parent,
  });

  blendCornerNode({
    target: mapping,
    source: remFrame,
  });

  blendRectangleCornerNode({
    target: mapping,
    source: remFrame,
  });

  return <Figma.FrameNode>{
    ...mapping,
    type: "FRAME",

    layoutAlign: remFrame.layoutAlign,
    layoutMode: remFrame.layoutMode ?? "NONE",
    primaryAxisSizingMode: remFrame.primaryAxisSizingMode ?? "AUTO",
    counterAxisSizingMode: remFrame.counterAxisSizingMode ?? "AUTO",
    primaryAxisAlignItems: remFrame.primaryAxisAlignItems ?? "MIN",
    counterAxisAlignItems: remFrame.counterAxisAlignItems ?? "MIN",
    itemSpacing: remFrame.itemSpacing ?? 0,
    paddingLeft: remFrame.paddingLeft ?? 0,
    paddingRight: remFrame.paddingRight ?? 0,
    paddingTop: remFrame.paddingTop ?? 0,
    paddingBottom: remFrame.paddingBottom ?? 0,
  };
}
