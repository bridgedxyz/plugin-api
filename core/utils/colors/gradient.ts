import type { GradientPaint } from "@design-sdk/figma-types";

export function gradientAngle(fill: GradientPaint): number {
  const decomposed = decomposeRelativeTransform(
    fill.gradientTransform[0],
    fill.gradientTransform[1]
  );

  return (decomposed.rotation * 180) / Math.PI;
}

/**
 * from https://math.stackexchange.com/a/2888105
 * @param t1 from 3x3 matrix[0]
 * @param t2 from 3x3 matrix[1]
 * @returns
 */
export function decomposeRelativeTransform(
  t1: [number, number, number],
  t2: [number, number, number]
): {
  translation: [number, number];
  rotation: number;
  scale: [number, number];
  skew: [number, number];
} {
  const a: number = t1[0];
  const b: number = t1[1];
  const c: number = t1[2];
  const d: number = t2[0];
  const e: number = t2[1];
  const f: number = t2[2];

  const delta = a * d - b * c;

  const result: {
    translation: [number, number];
    rotation: number;
    scale: [number, number];
    skew: [number, number];
  } = {
    translation: [e, f],
    rotation: 0,
    scale: [0, 0],
    skew: [0, 0],
  };

  // Apply the QR-like decomposition.
  if (a != 0 || b != 0) {
    var r = Math.sqrt(a * a + b * b);
    result.rotation = b > 0 ? Math.acos(a / r) : -Math.acos(a / r);
    result.scale = [r, delta / r];
    result.skew = [Math.atan((a * c + b * d) / (r * r)), 0];
  } else if (c != 0 || d != 0) {
    var s = Math.sqrt(c * c + d * d);
    result.rotation =
      Math.PI / 2 - (d > 0 ? Math.acos(-c / s) : -Math.acos(c / s));
    result.scale = [delta / s, s];
    result.skew = [0, Math.atan((a * c + b * d) / (s * s))];
  } else {
    // a = b = c = d = 0
  }
  return result;
}
