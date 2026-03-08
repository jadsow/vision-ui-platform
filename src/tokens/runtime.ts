import { colorThemes } from "./colorThemes";
import { motion, radius, shadow, spacing, typography } from "./foundations";

type TokenMap = Record<string, string>;

const toKebabCase = (value: string) => {
  return value.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
};

const buildVariableBlock = (prefix: string, values: TokenMap) => {
  return Object.entries(values)
    .map(([key, token]) => `  --${prefix}-${toKebabCase(key)}: ${token};`)
    .join("\n");
};

const buildTokenCss = () => {
  const lightVariables = [
    buildVariableBlock("color", colorThemes.light),
    buildVariableBlock("space", spacing),
    buildVariableBlock("font", { family: typography.fontFamily }),
    buildVariableBlock("font-size", typography.fontSize),
    buildVariableBlock("radius", radius),
    buildVariableBlock("shadow", {
      focus: shadow.focus,
      sm: shadow.sm,
      md: shadow.md,
    }),
    buildVariableBlock("transition", { fast: motion.transitionFast }),
  ].join("\n");

  const darkVariables = [
    buildVariableBlock("color", colorThemes.dark),
    buildVariableBlock("shadow", {
      sm: shadow.darkSm,
      md: shadow.darkMd,
    }),
  ].join("\n");

  return `:root {\n${lightVariables}\n}\n\n[data-theme="dark"] {\n${darkVariables}\n}\n`;
};

export const mountTokenStyles = () => {
  if (typeof document === "undefined") return;

  const styleId = "design-system-token-vars";
  const existing = document.getElementById(styleId);
  const styleContent = buildTokenCss();

  if (existing) {
    existing.textContent = styleContent;
    return;
  }

  const styleElement = document.createElement("style");
  styleElement.id = styleId;
  styleElement.textContent = styleContent;
  document.head.prepend(styleElement);
};

