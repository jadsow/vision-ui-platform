import { figmaTokenOverrides } from "./figma.generated";

const lightColorDefaults = {
  pageBg: "#f4f6fb",
  surface: "#ffffff",
  surfaceMuted: "#eef2ff",
  primary: "#0f62fe",
  primaryHover: "#0353e9",
  secondary: "#334155",
  secondaryHover: "#1e293b",
  border: "#cbd5e1",
  borderStrong: "#94a3b8",
  text: "#0f172a",
  textMuted: "#475569",
  textInverse: "#ffffff",
  focusRing: "rgba(15, 98, 254, 0.25)",
  success: "#0f766e",
  warning: "#b45309",
  danger: "#b91c1c",
} as const;

const darkColorDefaults = {
  pageBg: "#05070d",
  surface: "#0e111b",
  surfaceMuted: "#161b2a",
  primary: "#5ea1ff",
  primaryHover: "#7ab2ff",
  secondary: "#cbd5e1",
  secondaryHover: "#e2e8f0",
  border: "#273043",
  borderStrong: "#3c4966",
  text: "#f2f6ff",
  textMuted: "#9fb0cc",
  textInverse: "#081224",
  focusRing: "rgba(94, 161, 255, 0.32)",
  success: "#2dd4bf",
  warning: "#fbbf24",
  danger: "#fb7185",
} as const;

export const colorThemes = {
  light: { ...lightColorDefaults, ...figmaTokenOverrides.lightColors },
  dark: { ...darkColorDefaults, ...figmaTokenOverrides.darkColors },
} as const;
