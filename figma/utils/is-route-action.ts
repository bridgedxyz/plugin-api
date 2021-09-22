import {
  Figma,
  FigmaNodeActionNavigation,
  FigmaReactionAction,
  FigmaReactionNodeAction,
} from "@design-sdk/figma-types";

/**
 * interpret https://www.figma.com/plugin-docs/api/Action/
 * @param reaction
 * @returns
 */
export function isRouteAction(
  reaction: Figma.Reaction,
  q?: {
    valid_trigger_types?: ReadonlyArray<Figma.Trigger["type"]>;
  }
) {
  const valid_trigger_types = (q && q.valid_trigger_types) || [
    /* defeault route trigger-like actions*/
    "ON_CLICK",
    "ON_PRESS",
  ];

  const is_valid_trigger = valid_trigger_types.some(
    (t) => t === reaction.trigger.type
  );

  if (!is_valid_trigger) {
    return false;
  }

  const is_navigation_action = route_like_reaction_action_types.some(
    (t) => t === reaction.action.type
  );
  if (is_navigation_action) {
    if (reaction.action.type === "NODE") {
      const is_valid_node_route_navigation_action = route_like_node_actions.some(
        (a) => a === (reaction.action as FigmaReactionNodeAction).navigation
      );
      if (!is_valid_node_route_navigation_action) {
        return false;
      }
    }
  } else {
    return false;
  }

  return true;
}

/**
 * other navigation actions are overlay-related or variant-swap related. currently (Sppt 2021) only NAVIGATE type actually refers to route navigation action.
 */
const route_like_node_actions: FigmaNodeActionNavigation[] = ["NAVIGATE"];

/**
 * allowed reaction action types.
 * we don't use this currently because all action types are valid.
 * below code snippet is just for future reference.
 */
const route_like_reaction_action_types: ReadonlyArray<
  FigmaReactionAction["type"]
> = [
  "BACK",
  "CLOSE",
  "NODE",
  /// ----------
  /* DO NOT UNCOMMENT THIS.
   you might wonder why url action is not a route action, the url action is just a event callback type. does not refer to internal system's route.
   this might have exception on web platform in the future, but for now, we don't have any use case for this.
  */
  // "URL"
  /// ----------
];
