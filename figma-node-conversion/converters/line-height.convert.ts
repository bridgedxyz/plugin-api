import { LineHeight } from "@design-sdk/figma-types";
export function convertLineHeightToReflect(origin: LineHeight): number {
  if (origin.unit === "PIXELS") {
    return origin.value;
  } else {
    return undefined;
  }
}
