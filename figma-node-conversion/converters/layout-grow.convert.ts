export function convertLayoutGrowToReflect(layoutGrow: number): number {
  if (layoutGrow === undefined) {
    return undefined;
  }

  if (layoutGrow === 0) {
    return 0;
  } else if (layoutGrow === 1) {
    return 1;
  } else {
    console.error(
      "not handled figma api is updated. layout grow value not supported : ",
      layoutGrow
    );
  }
}
