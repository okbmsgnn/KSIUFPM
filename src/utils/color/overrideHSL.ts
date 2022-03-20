import { HSL } from 'color-convert/conversions';

const HSL_MAX: HSL = [360, 256, 101];

export const overrideHSL = (
  color: HSL,
  override: [
    number | undefined,
    number | undefined,
    number | undefined
  ]
) =>
  color.map(
    (channel, idx) => (override[idx] ?? channel) % HSL_MAX[idx]
  ) as HSL;
