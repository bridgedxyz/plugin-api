import type { FigmaReactionNodeAction } from "./figma-reaction-node-action";
import type { FigmaReactionPopAction } from "./figma-reaction-pop-action";
import type { FigmaReactionUrlAction } from "./figma-reaction-url-action";

export type FigmaReactionAction =
  | FigmaReactionPopAction
  | FigmaReactionUrlAction
  | FigmaReactionNodeAction;
