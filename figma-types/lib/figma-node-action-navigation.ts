/**
 * https://www.figma.com/plugin-docs/api/Action/#node-action
 */
export type FigmaNodeActionNavigation =
  /**
   * Replaces the current screen with the destination, also closing all overlays
   */
  | "NAVIGATE"
  /**
   * Opens the destination as an overlay on the current screen.
   */
  | "OVERLAY"
  /**
   * On an overlay, replaces the current (topmost) overlay with the destination. On a top-level frame, behaves the same as "NAVIGATE" except that no entry is added to the navigation history.
   */
  | "SWAP"
  /**
   * Scrolls to the destination on the current screen.
   */
  | "SCROLL_TO"
  /**
   * Changes the closest ancestor instance of source node to the specified variant.
   */
  | "CHANGE_TO";
