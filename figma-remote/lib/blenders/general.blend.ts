import { convertFigmaRemoteEffectsToFigma } from "../converters/effect.convert";
import { convertFigmaRemoteFillsToFigma } from "../converters/fills.convert";
import { convertFigmaRemoteLayoutConstraintsToFigmaConstraints } from "../converters/layout-constraints.convert";
import { convertFigmaRemoteStrokesToFigma } from "../converters/strokes.convert";
import { MappingBlendInput } from "./_in";

export function blendBaseNode(p: MappingBlendInput) {
  const { target, source } = p;
  target.id = source.id;
  target.name = source.name;
  target.visible = source.visible ?? true;
  target.opacity = source.opacity ?? 1;
  target.layoutAlign = source.layoutAlign;
  target.layoutGrow = source.layoutGrow ?? 0;
  target.exportSettings = source.exportSettings;
  target.blendMode = source.blendMode ?? "NORMAL";
  target.isMask = source.isMask ?? false;

  if (target.type !== "GROUP") {
    target.strokes = convertFigmaRemoteStrokesToFigma(...source.strokes);
    target.strokeWeight = source.strokeWeight;
    target.strokeAlign = source.strokeAlign;
    target.fills = convertFigmaRemoteFillsToFigma(...source.fills);
    target.constraints = convertFigmaRemoteLayoutConstraintsToFigmaConstraints(
      source.constraints
    );
  }

  target.effects = convertFigmaRemoteEffectsToFigma(...source.effects);

  target.relativeTransform = source.relativeTransform as [
    [number, number, number],
    [number, number, number]
  ];

  // for some reason, xywh is not available for some node types by figma rem api.
  const xy = xy_as_relative(
    p?.parent?.absoluteBoundingBox,
    source.absoluteBoundingBox,
    p?.parent === undefined
  );
  target.x = xy.x; // this is converted to relative position.
  target.y = xy.y; // this is converted to relative position.
  target.width = source.absoluteBoundingBox.width;
  target.height = source.absoluteBoundingBox.height;

  // static override
  target.effectStyleId = undefined;
  target.removed = false;
  target.locked = false;
  target.parent = undefined;
  target.constrainProportions = undefined;
  target.layoutGrow = undefined;
  if (target.type !== "GROUP") {
    target.strokeStyleId = undefined;
    target.fillStyleId = undefined;
    target.strokeMiterLimit = undefined;
    target.strokeCap = undefined;
    target.dashPattern = undefined;
    target.strokeJoin = undefined;
  }

  // TODO:
  target.reactions = undefined;
  target.rotation = 0; // calculate with transform
  // TODO: use  `source.relativeTransform`
  target.absoluteTransform = [
    [1, 0, 0],
    [0, 1, 0],
  ]; // calculate with transform
}

function xy_as_relative(
  parent: { x: number; y: number },
  child: { x: number; y: number },
  isRoot = false
) {
  if (isRoot) {
    return {
      x: 0,
      y: 0,
    };
  }

  return {
    x: child.x - parent.x,
    y: child.y - parent.y,
  };
}
