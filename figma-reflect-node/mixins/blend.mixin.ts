// FIXME
import { Effect } from "@design-sdk/figma";
import { BlendMode } from "@reflect-ui/core/lib/cg/filters";

export interface IReflectBlendMixin {
  opacity: number;
  blendMode: "PASS_THROUGH" | BlendMode;
  isMask: boolean;
  effects: ReadonlyArray<Effect>;
  effectStyleId: string;
  visible: boolean;
  radius: number;
}
