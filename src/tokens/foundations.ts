import { figmaTokenOverrides } from "./figma.generated";

const spacingDefaults = {
  xs: "4px",
  sm: "8px",
  md: "16px",
  lg: "24px",
  xl: "32px",
  "2xl": "48px",
} as const;

export const spacing = {
  ...spacingDefaults,
  ...figmaTokenOverrides.spacing,
} as const;

const fontSizeDefaults = {
  sm: "12px",
  md: "14px",
  lg: "16px",
  xl: "24px",
  "2xl": "36px",
} as const;

export const typography = {
  fontFamily:
    figmaTokenOverrides.typography.fontFamily ??
    '"Space Grotesk", "Avenir Next", "Segoe UI", sans-serif',
  fontSize: {
    ...fontSizeDefaults,
    ...figmaTokenOverrides.typography.fontSize,
  },
} as const;

const radiusDefaults = {
  sm: "6px",
  md: "8px",
  lg: "14px",
  pill: "999px",
} as const;

export const radius = {
  ...radiusDefaults,
  ...figmaTokenOverrides.radius,
} as const;

const shadowDefaults = {
  focus: "0 0 0 3px var(--color-focus-ring)",
  sm: "0 8px 24px rgba(15, 23, 42, 0.08)",
  md: "0 16px 40px rgba(15, 23, 42, 0.12)",
  darkSm: "0 12px 32px rgba(0, 0, 0, 0.35)",
  darkMd: "0 20px 56px rgba(0, 0, 0, 0.5)",
} as const;

export const shadow = {
  ...shadowDefaults,
  ...figmaTokenOverrides.shadow,
} as const;

const motionDefaults = {
  transitionFast: "150ms ease-in-out",
} as const;

export const motion = {
  ...motionDefaults,
  ...figmaTokenOverrides.motion,
} as const;
