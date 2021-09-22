////
//// Mapping instance is a class that follows the target interfaces.
//// since we are converting interface to interface, we cannot use functionalities of mixin blending.
//// to make the blending code simpler, we are making this abstract mapping instance for temporary mapping usage
////
import { Figma } from "@design-sdk/figma-types";

export type MappingNode =
  | MappingRectangleNode
  | MappingEllipseNode
  | MappingVectorNode
  | MappingFrameNode
  | MappingGroupNode
  | MappingTextNode;

/**
 * RectangleNode Mapping
 */
export class MappingRectangleNode implements Figma.RectangleNode {
  type: "RECTANGLE";
  clone(): Figma.RectangleNode {
    throw new Error("Method not implemented.");
  }
  id: string;
  parent: Figma.BaseNode & Figma.ChildrenMixin;
  name: string;
  removed: boolean;
  toString(): string {
    throw new Error("Method not implemented.");
  }
  remove(): void {
    throw new Error("Method not implemented.");
  }
  getPluginData(key: string): string {
    throw new Error("Method not implemented.");
  }
  setPluginData(key: string, value: string): void {
    throw new Error("Method not implemented.");
  }
  getSharedPluginData(namespace: string, key: string): string {
    throw new Error("Method not implemented.");
  }
  setSharedPluginData(namespace: string, key: string, value: string): void {
    throw new Error("Method not implemented.");
  }
  setRelaunchData(data: { [command: string]: string }): void {
    throw new Error("Method not implemented.");
  }
  visible: boolean;
  locked: boolean;
  reactions: readonly Figma.Reaction[];
  opacity: number;
  blendMode: "PASS_THROUGH" | Figma.BlendMode;
  isMask: boolean;
  effects: readonly Figma.Effect[];
  effectStyleId: string;
  fills: readonly Figma.Paint[] | Figma.PluginAPI["mixed"];
  strokes: readonly Figma.Paint[];
  strokeWeight: number;
  strokeMiterLimit: number;
  strokeAlign: "CENTER" | "INSIDE" | "OUTSIDE";
  strokeCap: Figma.PluginAPI["mixed"] | Figma.StrokeCap;
  strokeJoin: Figma.PluginAPI["mixed"] | Figma.StrokeJoin;
  dashPattern: readonly number[];
  fillStyleId: string | Figma.PluginAPI["mixed"];
  strokeStyleId: string;
  outlineStroke(): Figma.VectorNode {
    throw new Error("Method not implemented.");
  }
  absoluteTransform: Figma.Transform;
  relativeTransform: Figma.Transform;
  x: number;
  y: number;
  rotation: number;
  width: number;
  height: number;
  constrainProportions: boolean;
  layoutAlign: "CENTER" | "MIN" | "MAX" | "STRETCH" | "INHERIT";
  layoutGrow: number;
  resize(width: number, height: number): void {
    throw new Error("Method not implemented.");
  }
  resizeWithoutConstraints(width: number, height: number): void {
    throw new Error("Method not implemented.");
  }
  rescale(scale: number): void {
    throw new Error("Method not implemented.");
  }
  exportSettings: readonly Figma.ExportSettings[];
  exportAsync(settings?: Figma.ExportSettings): Promise<Uint8Array> {
    throw new Error("Method not implemented.");
  }
  constraints: Figma.Constraints;
  cornerRadius: number | Figma.PluginAPI["mixed"];
  cornerSmoothing: number;
  topLeftRadius: number;
  topRightRadius: number;
  bottomLeftRadius: number;
  bottomRightRadius: number;
}

export class MappingEllipseNode implements Figma.EllipseNode {
  type: "ELLIPSE";
  clone(): Figma.EllipseNode {
    throw new Error("Method not implemented.");
  }
  arcData: Figma.ArcData;
  id: string;
  parent: Figma.BaseNode & Figma.ChildrenMixin;
  name: string;
  removed: boolean;
  toString(): string {
    throw new Error("Method not implemented.");
  }
  remove(): void {
    throw new Error("Method not implemented.");
  }
  getPluginData(key: string): string {
    throw new Error("Method not implemented.");
  }
  setPluginData(key: string, value: string): void {
    throw new Error("Method not implemented.");
  }
  getSharedPluginData(namespace: string, key: string): string {
    throw new Error("Method not implemented.");
  }
  setSharedPluginData(namespace: string, key: string, value: string): void {
    throw new Error("Method not implemented.");
  }
  setRelaunchData(data: { [command: string]: string }): void {
    throw new Error("Method not implemented.");
  }
  visible: boolean;
  locked: boolean;
  reactions: readonly Figma.Reaction[];
  opacity: number;
  blendMode: "PASS_THROUGH" | Figma.BlendMode;
  isMask: boolean;
  effects: readonly Figma.Effect[];
  effectStyleId: string;
  fills: Figma.PluginAPI["mixed"] | readonly Figma.Paint[];
  strokes: readonly Figma.Paint[];
  strokeWeight: number;
  strokeMiterLimit: number;
  strokeAlign: "CENTER" | "INSIDE" | "OUTSIDE";
  strokeCap: Figma.PluginAPI["mixed"] | Figma.StrokeCap;
  strokeJoin: Figma.PluginAPI["mixed"] | Figma.StrokeJoin;
  dashPattern: readonly number[];
  fillStyleId: string | Figma.PluginAPI["mixed"];
  strokeStyleId: string;
  outlineStroke(): Figma.VectorNode {
    throw new Error("Method not implemented.");
  }
  absoluteTransform: Figma.Transform;
  relativeTransform: Figma.Transform;
  x: number;
  y: number;
  rotation: number;
  width: number;
  height: number;
  constrainProportions: boolean;
  layoutAlign: "CENTER" | "MIN" | "MAX" | "STRETCH" | "INHERIT";
  layoutGrow: number;
  resize(width: number, height: number): void {
    throw new Error("Method not implemented.");
  }
  resizeWithoutConstraints(width: number, height: number): void {
    throw new Error("Method not implemented.");
  }
  rescale(scale: number): void {
    throw new Error("Method not implemented.");
  }
  exportSettings: readonly Figma.ExportSettings[];
  exportAsync(settings?: Figma.ExportSettings): Promise<Uint8Array> {
    throw new Error("Method not implemented.");
  }
  constraints: Figma.Constraints;
  cornerRadius: number | Figma.PluginAPI["mixed"];
  cornerSmoothing: number;
}

export class MappingVectorNode implements Figma.VectorNode {
  type: "VECTOR";
  clone(): Figma.VectorNode {
    throw new Error("Method not implemented.");
  }
  vectorNetwork: Figma.VectorNetwork;
  vectorPaths: Figma.VectorPaths;
  handleMirroring: Figma.PluginAPI["mixed"] | Figma.HandleMirroring;
  id: string;
  parent: Figma.BaseNode & Figma.ChildrenMixin;
  name: string;
  removed: boolean;
  toString(): string {
    throw new Error("Method not implemented.");
  }
  remove(): void {
    throw new Error("Method not implemented.");
  }
  getPluginData(key: string): string {
    throw new Error("Method not implemented.");
  }
  setPluginData(key: string, value: string): void {
    throw new Error("Method not implemented.");
  }
  getSharedPluginData(namespace: string, key: string): string {
    throw new Error("Method not implemented.");
  }
  setSharedPluginData(namespace: string, key: string, value: string): void {
    throw new Error("Method not implemented.");
  }
  setRelaunchData(data: { [command: string]: string }): void {
    throw new Error("Method not implemented.");
  }
  visible: boolean;
  locked: boolean;
  reactions: readonly Figma.Reaction[];
  opacity: number;
  blendMode: "PASS_THROUGH" | Figma.BlendMode;
  isMask: boolean;
  effects: readonly Figma.Effect[];
  effectStyleId: string;
  strokeCap: Figma.PluginAPI["mixed"] | Figma.StrokeCap;
  strokeMiterLimit: number;
  outlineStroke(): Figma.VectorNode {
    throw new Error("Method not implemented.");
  }
  strokes: readonly Figma.Paint[];
  strokeStyleId: string;
  strokeWeight: number;
  strokeJoin: Figma.PluginAPI["mixed"] | Figma.StrokeJoin;
  strokeAlign: "CENTER" | "INSIDE" | "OUTSIDE";
  dashPattern: readonly number[];
  fills: Figma.PluginAPI["mixed"] | readonly Figma.Paint[];
  fillStyleId: string | Figma.PluginAPI["mixed"];
  absoluteTransform: Figma.Transform;
  relativeTransform: Figma.Transform;
  x: number;
  y: number;
  rotation: number;
  width: number;
  height: number;
  constrainProportions: boolean;
  layoutAlign: "CENTER" | "MIN" | "MAX" | "STRETCH" | "INHERIT";
  layoutGrow: number;
  resize(width: number, height: number): void {
    throw new Error("Method not implemented.");
  }
  resizeWithoutConstraints(width: number, height: number): void {
    throw new Error("Method not implemented.");
  }
  rescale(scale: number): void {
    throw new Error("Method not implemented.");
  }
  exportSettings: readonly Figma.ExportSettings[];
  exportAsync(settings?: Figma.ExportSettings): Promise<Uint8Array> {
    throw new Error("Method not implemented.");
  }
  constraints: Figma.Constraints;
  cornerRadius: number | Figma.PluginAPI["mixed"];
  cornerSmoothing: number;
}

export class MappingTextNode implements Figma.TextNode {
  type: "TEXT";
  clone(): Figma.TextNode {
    throw new Error("Method not implemented.");
  }
  hasMissingFont: boolean;
  textAlignHorizontal: "LEFT" | "CENTER" | "RIGHT" | "JUSTIFIED";
  textAlignVertical: "CENTER" | "TOP" | "BOTTOM";
  textAutoResize: "NONE" | "WIDTH_AND_HEIGHT" | "HEIGHT";
  paragraphIndent: number;
  paragraphSpacing: number;
  autoRename: boolean;
  textStyleId: string | Figma.PluginAPI["mixed"];
  fontSize: number | Figma.PluginAPI["mixed"];
  fontName: Figma.PluginAPI["mixed"] | Figma.FontName;
  textCase: Figma.PluginAPI["mixed"] | Figma.TextCase;
  textDecoration: Figma.PluginAPI["mixed"] | Figma.TextDecoration;
  letterSpacing: Figma.PluginAPI["mixed"] | Figma.LetterSpacing;
  lineHeight: Figma.PluginAPI["mixed"] | Figma.LineHeight;
  characters: string;
  hyperlink: Figma.PluginAPI["mixed"] | Figma.HyperlinkTarget;

  insertCharacters(
    start: number,
    characters: string,
    useStyle?: "BEFORE" | "AFTER"
  ): void {
    throw new Error("Method not implemented.");
  }
  deleteCharacters(start: number, end: number): void {
    throw new Error("Method not implemented.");
  }
  getRangeFontSize(
    start: number,
    end: number
  ): number | Figma.PluginAPI["mixed"] {
    throw new Error("Method not implemented.");
  }
  setRangeFontSize(start: number, end: number, value: number): void {
    throw new Error("Method not implemented.");
  }
  getRangeAllFontNames(start: number, end: number): Figma.FontName[] {
    throw new Error("Method not implemented.");
  }
  getRangeFontName(
    start: number,
    end: number
  ): Figma.PluginAPI["mixed"] | Figma.FontName {
    throw new Error("Method not implemented.");
  }
  setRangeFontName(start: number, end: number, value: Figma.FontName): void {
    throw new Error("Method not implemented.");
  }
  getRangeTextCase(
    start: number,
    end: number
  ): Figma.PluginAPI["mixed"] | Figma.TextCase {
    throw new Error("Method not implemented.");
  }
  setRangeTextCase(start: number, end: number, value: Figma.TextCase): void {
    throw new Error("Method not implemented.");
  }
  getRangeTextDecoration(
    start: number,
    end: number
  ): Figma.PluginAPI["mixed"] | Figma.TextDecoration {
    throw new Error("Method not implemented.");
  }
  setRangeTextDecoration(
    start: number,
    end: number,
    value: Figma.TextDecoration
  ): void {
    throw new Error("Method not implemented.");
  }
  getRangeLetterSpacing(
    start: number,
    end: number
  ): Figma.PluginAPI["mixed"] | Figma.LetterSpacing {
    throw new Error("Method not implemented.");
  }
  setRangeLetterSpacing(
    start: number,
    end: number,
    value: Figma.LetterSpacing
  ): void {
    throw new Error("Method not implemented.");
  }
  getRangeLineHeight(
    start: number,
    end: number
  ): Figma.PluginAPI["mixed"] | Figma.LineHeight {
    throw new Error("Method not implemented.");
  }
  setRangeLineHeight(
    start: number,
    end: number,
    value: Figma.LineHeight
  ): void {
    throw new Error("Method not implemented.");
  }
  getRangeFills(
    start: number,
    end: number
  ): Figma.PluginAPI["mixed"] | Figma.Paint[] {
    throw new Error("Method not implemented.");
  }
  setRangeFills(start: number, end: number, value: Figma.Paint[]): void {
    throw new Error("Method not implemented.");
  }
  getRangeTextStyleId(
    start: number,
    end: number
  ): string | Figma.PluginAPI["mixed"] {
    throw new Error("Method not implemented.");
  }
  setRangeTextStyleId(start: number, end: number, value: string): void {
    throw new Error("Method not implemented.");
  }
  getRangeFillStyleId(
    start: number,
    end: number
  ): string | Figma.PluginAPI["mixed"] {
    throw new Error("Method not implemented.");
  }
  setRangeFillStyleId(start: number, end: number, value: string): void {
    throw new Error("Method not implemented.");
  }
  id: string;
  parent: Figma.BaseNode & Figma.ChildrenMixin;
  name: string;
  removed: boolean;
  toString(): string {
    throw new Error("Method not implemented.");
  }
  remove(): void {
    throw new Error("Method not implemented.");
  }
  getPluginData(key: string): string {
    throw new Error("Method not implemented.");
  }
  setPluginData(key: string, value: string): void {
    throw new Error("Method not implemented.");
  }
  getSharedPluginData(namespace: string, key: string): string {
    throw new Error("Method not implemented.");
  }
  setSharedPluginData(namespace: string, key: string, value: string): void {
    throw new Error("Method not implemented.");
  }
  setRelaunchData(data: { [command: string]: string }): void {
    throw new Error("Method not implemented.");
  }
  visible: boolean;
  locked: boolean;
  reactions: readonly Figma.Reaction[];
  opacity: number;
  blendMode: "PASS_THROUGH" | Figma.BlendMode;
  isMask: boolean;
  effects: readonly Figma.Effect[];
  effectStyleId: string;
  fills: Figma.PluginAPI["mixed"] | readonly Figma.Paint[];
  strokes: readonly Figma.Paint[];
  strokeWeight: number;
  strokeMiterLimit: number;
  strokeAlign: "CENTER" | "INSIDE" | "OUTSIDE";
  strokeCap: Figma.PluginAPI["mixed"] | Figma.StrokeCap;
  strokeJoin: Figma.PluginAPI["mixed"] | Figma.StrokeJoin;
  dashPattern: readonly number[];
  fillStyleId: string | Figma.PluginAPI["mixed"];
  strokeStyleId: string;
  outlineStroke(): Figma.VectorNode {
    throw new Error("Method not implemented.");
  }
  absoluteTransform: Figma.Transform;
  relativeTransform: Figma.Transform;
  x: number;
  y: number;
  rotation: number;
  width: number;
  height: number;
  constrainProportions: boolean;
  layoutAlign: "CENTER" | "MIN" | "MAX" | "STRETCH" | "INHERIT";
  layoutGrow: number;
  resize(width: number, height: number): void {
    throw new Error("Method not implemented.");
  }
  resizeWithoutConstraints(width: number, height: number): void {
    throw new Error("Method not implemented.");
  }
  rescale(scale: number): void {
    throw new Error("Method not implemented.");
  }
  exportSettings: readonly Figma.ExportSettings[];
  exportAsync(settings?: Figma.ExportSettings): Promise<Uint8Array> {
    throw new Error("Method not implemented.");
  }
  constraints: Figma.Constraints;

  getRangeHyperlink(
    start: number,
    end: number
  ): Figma.PluginAPI["mixed"] | Figma.HyperlinkTarget {
    throw new Error("Method not implemented.");
  }
  setRangeHyperlink(
    start: number,
    end: number,
    value: Figma.HyperlinkTarget
  ): void {
    throw new Error("Method not implemented.");
  }
  getRangeListOptions(
    start: number,
    end: number
  ): Figma.PluginAPI["mixed"] | Figma.TextListOptions {
    throw new Error("Method not implemented.");
  }
  setRangeListOptions(
    start: number,
    end: number,
    value: Figma.TextListOptions
  ): void {
    throw new Error("Method not implemented.");
  }
  getRangeIndentation(
    start: number,
    end: number
  ): number | Figma.PluginAPI["mixed"] {
    throw new Error("Method not implemented.");
  }
  setRangeIndentation(start: number, end: number, value: number): void {
    throw new Error("Method not implemented.");
  }
}

export class MappingFrameNode implements Figma.FrameNode {
  type: "FRAME";
  clone(): Figma.FrameNode {
    throw new Error("Method not implemented.");
  }
  layoutMode: "NONE" | "HORIZONTAL" | "VERTICAL";
  primaryAxisSizingMode: "FIXED" | "AUTO";
  counterAxisSizingMode: "FIXED" | "AUTO";
  primaryAxisAlignItems: "CENTER" | "MIN" | "MAX" | "SPACE_BETWEEN";
  counterAxisAlignItems: "CENTER" | "MIN" | "MAX";
  paddingLeft: number;
  paddingRight: number;
  paddingTop: number;
  paddingBottom: number;
  itemSpacing: number;
  layoutGrids: readonly Figma.LayoutGrid[];
  gridStyleId: string;
  clipsContent: boolean;
  guides: readonly Figma.Guide[];
  id: string;
  parent: Figma.BaseNode & Figma.ChildrenMixin;
  name: string;
  removed: boolean;
  toString(): string {
    throw new Error("Method not implemented.");
  }
  remove(): void {
    throw new Error("Method not implemented.");
  }
  getPluginData(key: string): string {
    throw new Error("Method not implemented.");
  }
  setPluginData(key: string, value: string): void {
    throw new Error("Method not implemented.");
  }
  getSharedPluginData(namespace: string, key: string): string {
    throw new Error("Method not implemented.");
  }
  setSharedPluginData(namespace: string, key: string, value: string): void {
    throw new Error("Method not implemented.");
  }
  setRelaunchData(data: { [command: string]: string }): void {
    throw new Error("Method not implemented.");
  }
  visible: boolean;
  locked: boolean;
  children: readonly Figma.SceneNode[];
  appendChild(child: Figma.SceneNode): void {
    throw new Error("Method not implemented.");
  }
  insertChild(index: number, child: Figma.SceneNode): void {
    throw new Error("Method not implemented.");
  }
  findChildren(
    callback?: (node: Figma.SceneNode) => boolean
  ): Figma.SceneNode[] {
    throw new Error("Method not implemented.");
  }
  findChild(callback: (node: Figma.SceneNode) => boolean): Figma.SceneNode {
    throw new Error("Method not implemented.");
  }
  findAll(callback?: (node: Figma.SceneNode) => boolean): Figma.SceneNode[] {
    throw new Error("Method not implemented.");
  }
  findOne(callback: (node: Figma.SceneNode) => boolean): Figma.SceneNode {
    throw new Error("Method not implemented.");
  }
  expanded: boolean;
  backgrounds: readonly Figma.Paint[];
  backgroundStyleId: string;
  fills: readonly Figma.Paint[] | Figma.PluginAPI["mixed"];
  strokes: readonly Figma.Paint[];
  strokeWeight: number;
  strokeMiterLimit: number;
  strokeAlign: "CENTER" | "INSIDE" | "OUTSIDE";
  strokeCap: Figma.PluginAPI["mixed"] | Figma.StrokeCap;
  strokeJoin: Figma.PluginAPI["mixed"] | Figma.StrokeJoin;
  dashPattern: readonly number[];
  fillStyleId: string | Figma.PluginAPI["mixed"];
  strokeStyleId: string;
  outlineStroke(): Figma.VectorNode {
    throw new Error("Method not implemented.");
  }
  cornerRadius: number | Figma.PluginAPI["mixed"];
  cornerSmoothing: number;
  topLeftRadius: number;
  topRightRadius: number;
  bottomLeftRadius: number;
  bottomRightRadius: number;
  opacity: number;
  blendMode: "PASS_THROUGH" | Figma.BlendMode;
  isMask: boolean;
  effects: readonly Figma.Effect[];
  effectStyleId: string;
  constraints: Figma.Constraints;
  absoluteTransform: Figma.Transform;
  relativeTransform: Figma.Transform;
  x: number;
  y: number;
  rotation: number;
  width: number;
  height: number;
  constrainProportions: boolean;
  layoutAlign: "CENTER" | "MIN" | "MAX" | "STRETCH" | "INHERIT";
  layoutGrow: number;
  resize(width: number, height: number): void {
    throw new Error("Method not implemented.");
  }
  resizeWithoutConstraints(width: number, height: number): void {
    throw new Error("Method not implemented.");
  }
  rescale(scale: number): void {
    throw new Error("Method not implemented.");
  }
  exportSettings: readonly Figma.ExportSettings[];
  exportAsync(settings?: Figma.ExportSettings): Promise<Uint8Array> {
    throw new Error("Method not implemented.");
  }
  overflowDirection: Figma.OverflowDirection;
  numberOfFixedChildren: number;
  overlayPositionType: Figma.OverlayPositionType;
  overlayBackground: Figma.OverlayBackground;
  overlayBackgroundInteraction: Figma.OverlayBackgroundInteraction;
  reactions: readonly Figma.Reaction[];
}

export class MappingGroupNode implements Figma.GroupNode {
  type: "GROUP";
  clone(): Figma.GroupNode {
    throw new Error("Method not implemented.");
  }
  id: string;
  parent: Figma.BaseNode & Figma.ChildrenMixin;
  name: string;
  removed: boolean;
  toString(): string {
    throw new Error("Method not implemented.");
  }
  remove(): void {
    throw new Error("Method not implemented.");
  }
  getPluginData(key: string): string {
    throw new Error("Method not implemented.");
  }
  setPluginData(key: string, value: string): void {
    throw new Error("Method not implemented.");
  }
  getSharedPluginData(namespace: string, key: string): string {
    throw new Error("Method not implemented.");
  }
  setSharedPluginData(namespace: string, key: string, value: string): void {
    throw new Error("Method not implemented.");
  }
  setRelaunchData(data: { [command: string]: string }): void {
    throw new Error("Method not implemented.");
  }
  visible: boolean;
  locked: boolean;
  reactions: readonly Figma.Reaction[];
  children: readonly Figma.SceneNode[];
  appendChild(child: Figma.SceneNode): void {
    throw new Error("Method not implemented.");
  }
  insertChild(index: number, child: Figma.SceneNode): void {
    throw new Error("Method not implemented.");
  }
  findChildren(
    callback?: (node: Figma.SceneNode) => boolean
  ): Figma.SceneNode[] {
    throw new Error("Method not implemented.");
  }
  findChild(callback: (node: Figma.SceneNode) => boolean): Figma.SceneNode {
    throw new Error("Method not implemented.");
  }
  findAll(callback?: (node: Figma.SceneNode) => boolean): Figma.SceneNode[] {
    throw new Error("Method not implemented.");
  }
  findOne(callback: (node: Figma.SceneNode) => boolean): Figma.SceneNode {
    throw new Error("Method not implemented.");
  }
  expanded: boolean;
  backgrounds: readonly Figma.Paint[];
  backgroundStyleId: string;
  opacity: number;
  blendMode: "PASS_THROUGH" | Figma.BlendMode;
  isMask: boolean;
  effects: readonly Figma.Effect[];
  effectStyleId: string;
  absoluteTransform: Figma.Transform;
  relativeTransform: Figma.Transform;
  x: number;
  y: number;
  rotation: number;
  width: number;
  height: number;
  constrainProportions: boolean;
  layoutAlign: "CENTER" | "MIN" | "MAX" | "STRETCH" | "INHERIT";
  layoutGrow: number;
  resize(width: number, height: number): void {
    throw new Error("Method not implemented.");
  }
  resizeWithoutConstraints(width: number, height: number): void {
    throw new Error("Method not implemented.");
  }
  rescale(scale: number): void {
    throw new Error("Method not implemented.");
  }
  exportSettings: readonly Figma.ExportSettings[];
  exportAsync(settings?: Figma.ExportSettings): Promise<Uint8Array> {
    throw new Error("Method not implemented.");
  }
}
