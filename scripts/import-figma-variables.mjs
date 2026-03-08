import fs from "node:fs";
import path from "node:path";

const cwd = process.cwd();
const inputArg = process.argv[2] ?? "docs/figma/variables.sample.json";
const inputPath = path.resolve(cwd, inputArg);
const outputPath = path.resolve(cwd, "src/tokens/figma.generated.ts");

const emptyOutput = {
  lightColors: {},
  darkColors: {},
  spacing: {},
  typography: { fontFamily: null, fontSize: {} },
  radius: {},
  shadow: {},
  motion: {},
};

const kebabToCamel = (value) =>
  value.replace(/[-_\s]+([a-zA-Z0-9])/g, (_, chr) => chr.toUpperCase()).replace(/[^a-zA-Z0-9]/g, "");

const normalizeName = (name) => {
  const clean = String(name).trim().replace(/^\/+|\/+$/g, "");
  const parts = clean.split("/").filter(Boolean);
  const key = parts[parts.length - 1] ?? clean;
  return kebabToCamel(key);
};

const rgbaFromObject = (color) => {
  if (!color || typeof color !== "object") return null;
  const r = Math.round((color.r ?? 0) * 255);
  const g = Math.round((color.g ?? 0) * 255);
  const b = Math.round((color.b ?? 0) * 255);
  const a = color.a ?? 1;
  if (a === 1) {
    return (
      "#" +
      [r, g, b]
        .map((num) => num.toString(16).padStart(2, "0"))
        .join("")
        .toLowerCase()
    );
  }
  return `rgba(${r}, ${g}, ${b}, ${Number(a.toFixed(3))})`;
};

const ensurePx = (value) => {
  if (typeof value !== "number") return null;
  return `${value}px`;
};

const parseRawValue = (raw) => {
  if (typeof raw === "string") return raw;
  if (typeof raw === "number") return ensurePx(raw);
  if (raw && typeof raw === "object") return rgbaFromObject(raw);
  return null;
};

const safeReadJson = (targetPath) => {
  const raw = fs.readFileSync(targetPath, "utf8");
  return JSON.parse(raw);
};

const resolveModes = (json) => {
  const fromRoot = Array.isArray(json.modes) ? json.modes : [];
  if (fromRoot.length > 0) return fromRoot;

  const firstCollection = Array.isArray(json.collections) ? json.collections[0] : null;
  return Array.isArray(firstCollection?.modes) ? firstCollection.modes : [];
};

const classifyMode = (name) => {
  const lowered = String(name || "").toLowerCase();
  return lowered.includes("dark") ? "dark" : "light";
};

const toGeneratedSource = (payload) => {
  return `/**
 * Auto-generated file for Figma token overrides.
 * Source: ${path.relative(cwd, inputPath).replace(/\\/g, "/")}
 * Run \`npm run tokens:figma:import\` to regenerate.
 */
export const figmaTokenOverrides = ${JSON.stringify(payload, null, 2)} as const;
`;
};

const assignByPrefix = (target, fullName, parsedValue) => {
  if (!parsedValue) return;
  const lowered = fullName.toLowerCase();
  const key = normalizeName(fullName);

  if (lowered.startsWith("spacing/")) {
    target.spacing[key] = parsedValue;
    return;
  }
  if (lowered.startsWith("radius/")) {
    target.radius[key] = parsedValue;
    return;
  }
  if (lowered.startsWith("shadow/")) {
    target.shadow[key] = parsedValue;
    return;
  }
  if (lowered.startsWith("motion/")) {
    target.motion[key] = parsedValue;
    return;
  }
  if (lowered.startsWith("typography/font-size/")) {
    target.typography.fontSize[key] = parsedValue;
    return;
  }
  if (lowered.startsWith("typography/font-family/")) {
    target.typography.fontFamily = parsedValue;
  }
};

const run = () => {
  if (!fs.existsSync(inputPath)) {
    throw new Error(`Input file not found: ${inputPath}`);
  }

  const json = safeReadJson(inputPath);
  const variables = Array.isArray(json.variables) ? json.variables : [];
  const modes = resolveModes(json);

  const modeMap = new Map();
  for (const mode of modes) {
    const id = mode.modeId ?? mode.id;
    if (!id) continue;
    modeMap.set(id, classifyMode(mode.name));
  }

  const output = structuredClone(emptyOutput);

  for (const variable of variables) {
    const name = String(variable.name ?? "");
    const resolvedType = String(variable.resolvedType ?? "").toUpperCase();
    const valuesByMode = variable.valuesByMode ?? {};
    const modeEntries = Object.entries(valuesByMode);

    if (resolvedType === "COLOR") {
      for (const [modeId, modeValue] of modeEntries) {
        const theme = modeMap.get(modeId) ?? "light";
        const parsed = parseRawValue(modeValue);
        if (!parsed) continue;
        const tokenKey = normalizeName(name);
        if (theme === "dark") output.darkColors[tokenKey] = parsed;
        else output.lightColors[tokenKey] = parsed;
      }
      continue;
    }

    const firstModeValue = modeEntries[0]?.[1];
    const parsed = parseRawValue(firstModeValue);
    assignByPrefix(output, name, parsed);
  }

  const source = toGeneratedSource(output);
  fs.writeFileSync(outputPath, source, "utf8");
  console.log(`Generated token overrides at: ${path.relative(cwd, outputPath)}`);
};

run();
