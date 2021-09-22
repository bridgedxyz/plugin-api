import { FigmaNodeActionNavigation } from "./figma-node-action-navigation";

/* figma types for transition is not ready. using native type instead. */ import type { Transition } from "@design-sdk/figma-types";

export type FigmaReactionNodeAction = {
  readonly type: "NODE";
  readonly destinationId: string | null;
  readonly navigation: FigmaNodeActionNavigation;
  readonly transition: Transition | null;
  readonly preserveScrollPosition: boolean;

  /**
   * Only present if navigation == "OVERLAY" and the destination uses
   * overlay position export type "RELATIVE"
   */
  readonly overlayRelativePosition?: { x: number; y: number };
};
