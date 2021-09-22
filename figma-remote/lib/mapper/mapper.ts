import { SceneNode } from "@design-sdk/figma-types";
import { Node } from "@design-sdk/figma-remote-types";
import { mapFigmaRemoteEllipseToFigma } from "./ellipse.mapper";
import { mapFigmaRemoteFrameToFigma } from "./frame.mapper";
import { mapFigmaRemoteGroupToFigma } from "./group.mapper";
import { mapFigmaRemoteRectangleToFigma } from "./rectangle.mapper";
import { mapFigmaRemoteTextToFigma } from "./text.mapper";
import { mapFigmaRemoteVectorToFigma } from "./vector.mapper";
export function mapFigmaRemoteToFigma(remNode: Node, parent?): SceneNode {
  let preConvertedChildren: SceneNode[];
  if ("children" in remNode) {
    preConvertedChildren = remNode.children.map((c) =>
      mapFigmaRemoteToFigma(c, remNode)
    );
  }

  let nonchildreninstance: SceneNode;
  switch (remNode.type) {
    case "TEXT":
      nonchildreninstance = mapFigmaRemoteTextToFigma(remNode, parent);
      break;

    case "RECTANGLE":
      nonchildreninstance = mapFigmaRemoteRectangleToFigma(remNode, parent);
      break;

    case "ELLIPSE":
      nonchildreninstance = mapFigmaRemoteEllipseToFigma(remNode, parent);
      break;

    case "VECTOR":
      nonchildreninstance = mapFigmaRemoteVectorToFigma(remNode, parent);
      break;

    case "INSTANCE":
    case "COMPONENT":
    case "FRAME":
      //@ts-ignore
      nonchildreninstance = mapFigmaRemoteFrameToFigma(remNode, parent);
      break;

    case "GROUP":
      nonchildreninstance = mapFigmaRemoteGroupToFigma(remNode, parent);
      break;

    default:
      console.warn(`type "${remNode.type}" not handled`);
      nonchildreninstance = (remNode as any) as SceneNode;
      break;
  }

  if ("children" in nonchildreninstance && preConvertedChildren) {
    // @ts-ignore - ignoring readonly
    nonchildreninstance.children = preConvertedChildren;
  }
  return nonchildreninstance;
}
