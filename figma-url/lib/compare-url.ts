import { analyze, FigmaUrlType } from "./analyze-url";
import { parseFileAndNodeId } from "./parse-url";

export function isSameDesignUrl(url1: string, url2: string): boolean {
  const analysis = analyze(url1);
  switch (analysis) {
    case FigmaUrlType.embed:
    case FigmaUrlType.empty:
    case FigmaUrlType.file:
      return false;
    case FigmaUrlType.node:
      const parsed = parseFileAndNodeId(url1);
      const _this_parsed = parseFileAndNodeId(url2);
      return (
        _this_parsed.file === parsed.file && _this_parsed.node === parsed.node
      );
  }
}
