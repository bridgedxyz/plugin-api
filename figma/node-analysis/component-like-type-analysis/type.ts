export type ComponentLikeType =
  // componennt with/without variant compat (can be used for both, but use it only for non variant component)
  | "master-component"
  // instance of simple or varianted component
  | "instance-component"
  // component set frame
  | "variant-set"
  // the single master variant of variant set
  | "master-variant-compoent"
  // the single instance variant
  | "variant-instance"
  | "invalid-target";

export type ExtendedComponentLilkeType =
  | ComponentLikeType
  // base master component that is used as a constraint for variant set variants masters.
  | "base-master-component";

export type SchemaDefinitionLike =
  | ExtendedComponentLilkeType
  // single layer - no matter where it lives under a componennt or a raw group, etc.
  | "single-layer-property";
