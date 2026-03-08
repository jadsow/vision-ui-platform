# Vue Design System Portfolio

A Vue 3 + TypeScript project focused on design system engineering:

- Token-first architecture
- Reusable typed components
- Storybook-style in-app playground
- Visual consistency and scalable conventions

## Why This Stands Out

- Distinct visual identity instead of generic template UI.
- Single-source token pipeline with light/dark parity.
- Interactive component explorer with preview, code, and design rules.
- Automation hook for importing Figma variables into TypeScript tokens.

## Stack

- Vue 3
- TypeScript
- Vite

## Project Structure

```txt
src/
  components/
    Alert/
    Avatar/
    Badge/
    Button/
    Card/
    EmptyState/
    KpiTile/
    Progress/
    TextInput/
    Toggle/
    index.ts
  tokens/
    colorThemes.ts
    foundations.ts
    figma.generated.ts
    runtime.ts
    colors.ts
    spacing.ts
    typography.ts
    index.ts
  App.vue
  main.ts
  style.css
```

## Run

```bash
npm install
npm run dev
```

Validate production build:

```bash
npm run build
```

Import Figma variables into TS token overrides:

```bash
npm run tokens:figma:import
```

## Design System Decisions

- `src/tokens/*.ts` is the semantic source of truth for token values.
- CSS variables are generated from TS tokens at runtime (`mountTokenStyles`).
- Components use explicit APIs (`variant`, `size`, states) for predictable composition.
- `src/components/index.ts` works as a central export surface for library growth.

Token details:

- [`docs/TOKENS.md`](./docs/TOKENS.md)
- [`docs/INTERVIEW_STUDY_GUIDE.md`](./docs/INTERVIEW_STUDY_GUIDE.md)
- [`docs/VUETIFY_MIGRATION.md`](./docs/VUETIFY_MIGRATION.md)

## Component Playground

The project includes an in-app explorer in `App.vue`:

- Component navigation sidebar
- Story tabs: `Preview`, `Code`, and `Design`
- Live state example with `v-model`
- Reusable primitives: Button, Badge, TextInput, FormField, Alert, Avatar, Card, Toggle, Progress, KpiTile, EmptyState, CommandBar, MetricRing, Dialog, Timeline, Toast
- Accessibility baseline: ARIA labels, focus-visible states, keyboard and reduced-motion support

## Next Up (Enterprise-Ready Roadmap)

1. Add visual regression tests for component states.
2. Add unit tests with Vitest + Vue Testing Library.
3. Add CI quality gates for tokens and accessibility checks.
4. Add packaging for npm distribution.
