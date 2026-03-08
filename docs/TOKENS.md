# Token System Guide

This project uses a **single source of truth** token model in TypeScript.

## Why Tokens

Design tokens are named values used across UI:

- Colors
- Spacing
- Typography
- Radius
- Shadow
- Motion

Instead of hardcoding values in each component, components consume CSS variables like:

- `var(--color-primary)`
- `var(--space-md)`
- `var(--font-size-lg)`

## Architecture

Token files are separated by concern:

- `src/tokens/colorThemes.ts`: semantic colors for `light` and `dark`
- `src/tokens/foundations.ts`: spacing, typography, radius, shadow, motion
- `src/tokens/runtime.ts`: transforms TS tokens into CSS variables and injects them at runtime
- `src/tokens/index.ts`: aggregation exports

## Runtime Flow

1. `main.ts` calls `mountTokenStyles()`.
2. `mountTokenStyles()` builds CSS from TS objects.
3. A `<style id="design-system-token-vars">` block is injected into `document.head`.
4. Components consume generated CSS variables.

## Theme Switching

- Light tokens are attached to `:root`.
- Dark overrides are attached to `[data-theme="dark"]`.
- `App.vue` toggles `data-theme` dynamically.

## Update Process

To change a token:

1. Edit source token values in `colorThemes.ts` or `foundations.ts`.
2. Run `npm run build`.
3. Validate components in the explorer (`Preview` tab).

You do not need to manually edit CSS variable files.

## Figma Variable Import Automation

This repository includes an importer that converts Figma variable exports into TS overrides.

Command:

```bash
npm run tokens:figma:import
```

Custom input file:

```bash
npm run tokens:figma:import -- path/to/figma-variables.json
```

Input format:

- JSON with `variables` array
- Optional `modes` array (`Light`, `Dark`, etc.)
- Supports `COLOR` plus numeric variables for spacing/typography/radius/motion/shadow by name prefix

Output:

- `src/tokens/figma.generated.ts` (auto-generated)
- Values are merged with defaults in `colorThemes.ts` and `foundations.ts`

## Practical Talking Points

- Token source is centralized in TypeScript for automation.
- Runtime generation keeps component styling consistent.
- Theme parity is explicit (`light` and `dark` maps).
- Structure is ready for future Figma token sync.
