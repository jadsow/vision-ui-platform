<script setup lang="ts">
import { computed, ref } from "vue";
import Alert from "./components/Alert/Alert.vue";
import Avatar from "./components/Avatar/Avatar.vue";
import Badge from "./components/Badge/Badge.vue";
import Button from "./components/Button/Button.vue";
import Card from "./components/Card/Card.vue";
import CommandBar from "./components/CommandBar/CommandBar.vue";
import Dialog from "./components/Dialog/Dialog.vue";
import EmptyState from "./components/EmptyState/EmptyState.vue";
import FormField from "./components/FormField/FormField.vue";
import KpiTile from "./components/KpiTile/KpiTile.vue";
import MetricRing from "./components/MetricRing/MetricRing.vue";
import Progress from "./components/Progress/Progress.vue";
import TextInput from "./components/TextInput/TextInput.vue";
import Timeline from "./components/Timeline/Timeline.vue";
import ToastViewport from "./components/Toast/ToastViewport.vue";
import { useToast } from "./components/Toast/toastStore";
import Toggle from "./components/Toggle/Toggle.vue";

type StoryId =
  | "button"
  | "badge"
  | "text-input"
  | "alert"
  | "avatar"
  | "toggle"
  | "progress"
  | "kpi-tile"
  | "empty-state"
  | "command-bar"
  | "metric-ring"
  | "dialog"
  | "timeline"
  | "form-field"
  | "toast";
type PanelTab = "preview" | "code" | "design";

const isDark = ref(true);
const denseMode = ref(false);
const highContrast = ref(false);
const query = ref("");
const commandValue = ref("Sync tokens from Figma");
const dialogOpen = ref(false);
const inputState = ref<"default" | "success" | "error">("default");
const commandState = ref<"default" | "success" | "error">("default");
const emailValue = ref("");
const selectedStory = ref<StoryId>("button");
const selectedTab = ref<PanelTab>("preview");
const { show: showToast } = useToast();

const stories = [
  { id: "button", name: "Button", category: "Actions" },
  { id: "badge", name: "Badge", category: "Metadata" },
  { id: "text-input", name: "TextInput", category: "Forms" },
  { id: "alert", name: "Alert", category: "Feedback" },
  { id: "avatar", name: "Avatar", category: "Identity" },
  { id: "toggle", name: "Toggle", category: "Utilities" },
  { id: "progress", name: "Progress", category: "Data" },
  { id: "kpi-tile", name: "KpiTile", category: "Analytics" },
  { id: "empty-state", name: "EmptyState", category: "Feedback" },
  { id: "command-bar", name: "CommandBar", category: "Workflows" },
  { id: "metric-ring", name: "MetricRing", category: "Data Viz" },
  { id: "dialog", name: "Dialog", category: "Overlay" },
  { id: "timeline", name: "Timeline", category: "Activity" },
  { id: "form-field", name: "FormField", category: "Forms" },
  { id: "toast", name: "Toast", category: "Feedback" },
] as const;

const codeByStory: Record<StoryId, string> = {
  button: `<Button label="Get Started" />
<Button label="Secondary" variant="secondary" />
<Button label="Processing..." :loading="true" />`,
  badge: `<Badge label="Draft" />
<Badge label="In Review" tone="warning" />
<Badge label="Approved" tone="success" />`,
  "text-input": `<TextInput
  v-model="query"
  state="success"
  label="Search components"
  placeholder="Type to filter..."
/>`,
  alert: `<Alert
  tone="warning"
  title="Contrast review needed"
  description="One semantic color is below target ratio."
/>`,
  avatar: `<Avatar name="Sophia Chen" size="sm" />
<Avatar name="Sophia Chen" size="md" />
<Avatar name="Sophia Chen" size="lg" />`,
  toggle: `<Toggle v-model="isDark" label="Dark mode" />`,
  progress: `<Progress :value="72" label="Token coverage" />`,
  "kpi-tile": `<KpiTile
  label="Adoption"
  value="94%"
  trend="+11% this month"
  tone="success"
/>`,
  "empty-state": `<EmptyState
  title="No components found"
  description="Try a different search term."
>
  <Button label="Create Component" />
</EmptyState>`,
  "command-bar": `<CommandBar
  v-model="command"
  state="success"
  placeholder="Run a design system command"
  action-label="Execute"
/>`,
  "metric-ring": `<MetricRing value="86" label="Token parity" />
<MetricRing value="93" label="Accessibility baseline" />`,
  dialog: `<Dialog
  :open="dialogOpen"
  title="Publish token update"
  description="Review changes before publishing."
  @close="dialogOpen = false"
>
  <Button label="Confirm publish" />
</Dialog>`,
  timeline: `<Timeline
  :items="[
    { title: 'Token sync completed', time: '10m ago', tone: 'success' },
    { title: 'Accessibility report updated', time: '1h ago', tone: 'info' },
    { title: 'Contrast warning detected', time: '3h ago', tone: 'warning' },
  ]"
/>`,
  "form-field": `<FormField
  label="Work email"
  :required="true"
  caption="Notifications enabled"
  :max-length="40"
  :current-length="emailValue.length"
  helper-text="Use your company address"
>
  <template #default="{ inputId, describedBy, invalid }">
    <input
      :id="inputId"
      type="email"
      maxlength="40"
      :aria-describedby="describedBy || undefined"
      :aria-invalid="invalid ? 'true' : 'false'"
    />
  </template>
</FormField>`,
  toast: `<Button
  label="Show success toast"
  @click="showToast({
    tone: 'success',
    title: 'Token sync completed',
    description: 'Variables imported from Figma.',
    duration: 3200
  })"
/>`,
};

const designByStory: Record<StoryId, string[]> = {
  button: [
    "Primary buttons should be unique per view context.",
    "Keep visual hierarchy clear with secondary and ghost variants.",
    "Ensure focus ring remains visible in all themes.",
  ],
  badge: [
    "Use concise labels and semantic tone mapping.",
    "Avoid using color alone for critical status communication.",
    "Align badge tone with alert semantics.",
  ],
  "text-input": [
    "Always provide explicit labels.",
    "Keep helper text short and actionable.",
    "Use consistent field spacing and height scale.",
    "Use semantic visual states: default, success, and error.",
  ],
  alert: [
    "Pair title and description for readable system feedback.",
    "Only use danger for blocking or high-risk events.",
    "Use warning for recoverable or pre-error states.",
  ],
  avatar: [
    "Fallback initials should be deterministic and readable.",
    "Use consistent sizing scale across modules.",
    "Preserve circular shape for identity consistency.",
  ],
  toggle: [
    "Use toggle for binary state changes with immediate effect.",
    "Place descriptive label close to control.",
    "Reflect current state in nearby interface feedback.",
  ],
  progress: [
    "Use progress for measurable completion only.",
    "Attach numeric value whenever possible.",
    "Pair progress bars with meaningful milestones.",
  ],
  "kpi-tile": [
    "Use KPI tiles for headline metrics and directional trend.",
    "Place short labels above value for faster scanning.",
    "Avoid more than four KPIs per row in dense layouts.",
  ],
  "empty-state": [
    "Explain why content is empty and what action to take.",
    "Keep one primary CTA in the empty area.",
    "Use friendly language without losing clarity.",
  ],
  "command-bar": [
    "Use for fast workflow actions in design engineering tooling.",
    "Keep action labels explicit and verb-oriented.",
    "Provide keyboard submit support for command execution.",
    "Use state colors to confirm success or highlight failures.",
  ],
  "metric-ring": [
    "Use for high-level score communication, not detailed analytics.",
    "Always pair percentages with short labels.",
    "Avoid too many rings in one row on small screens.",
  ],
  dialog: [
    "Use for high-impact or blocking decisions only.",
    "Provide clear title, description, and explicit action labels.",
    "Support close actions via button, overlay, and Escape key.",
  ],
  timeline: [
    "Use for release history, audit trails, and async workflow visibility.",
    "Prefer concise event titles with optional context and timestamp.",
    "Use semantic tones to communicate event importance quickly.",
  ],
  "form-field": [
    "Use one FormField wrapper for label, hint and validation semantics.",
    "Always connect input with label and helper/error text via ID references.",
    "Use caption/meta and counter only when they add clear user value.",
    "Use required marker and error state only when truly necessary.",
  ],
  toast: [
    "Use toast for brief, non-blocking feedback after user actions.",
    "Prefer concise titles and optional contextual description.",
    "Use danger tone only for critical failures that need attention.",
  ],
};

const currentStory = computed(() => {
  return stories.find((item) => item.id === selectedStory.value) ?? stories[0];
});

const runCommand = (value: string) => {
  query.value = value || "No command executed yet";
  commandState.value = "success";
  showToast({
    tone: "success",
    title: "Command executed",
    description: value || "No command text provided.",
    duration: 2800,
  });
};

const showSuccessToast = () => {
  showToast({
    tone: "success",
    title: "Token sync completed",
    description: "Light and dark variables were updated successfully.",
    duration: 3200,
  });
};

const showWarningToast = () => {
  showToast({
    tone: "warning",
    title: "Accessibility warning",
    description: "One color pair is below contrast target.",
    duration: 3600,
  });
};

const showDangerToast = () => {
  showToast({
    tone: "danger",
    title: "Publish failed",
    description: "Token release was blocked by validation rules.",
    duration: 4200,
  });
};

const selectStory = (id: StoryId) => {
  selectedStory.value = id;
  selectedTab.value = "preview";
};
</script>

<template>
  <div
    :data-theme="isDark ? 'dark' : 'light'"
    :data-density="denseMode ? 'compact' : 'default'"
    :data-contrast="highContrast ? 'high' : 'default'"
    class="apple-shell"
  >
    <div class="backdrop-orb backdrop-orb--left" />
    <div class="backdrop-orb backdrop-orb--right" />

    <header class="topbar">
      <div class="topbar__brand">
        <Avatar name="Design System" size="sm" />
        <div>
          <p>Vision UI Platform</p>
          <small>Component Architecture Workspace</small>
        </div>
      </div>
      <div class="topbar__controls">
        <Toggle v-model="denseMode" label="Compact Density" />
        <Toggle v-model="highContrast" label="High Contrast" />
        <Toggle v-model="isDark" label="Dark Mode" />
      </div>
    </header>

    <section class="hero">
      <div class="hero__labels">
        <Badge label="Production-grade" tone="success" />
        <Badge label="Token-driven UI" tone="info" />
        <Badge label="Vue 3 + TypeScript" tone="neutral" />
      </div>
      <h1>A modern design system surface engineered for speed, scale, and consistency.</h1>
      <p>
        Built to communicate product quality in seconds: clear component APIs, robust token
        foundations, and a visually distinctive interface with enterprise-ready workflows.
      </p>
    </section>

    <section class="signature-grid">
      <KpiTile label="Built by" value="Jadson Pereira" trend="Design System Engineer" tone="success" />
      <Card title="Author">
        <p class="signature-grid__text">
          End-to-end implementation by Jadson Pereira, including tokens, components, docs, dark
          mode, and design-to-code automation flow.
        </p>
        <a
          class="signature-grid__link"
          href="https://www.linkedin.com/in/jadson-pereira-a64421191/"
          target="_blank"
          rel="noopener noreferrer"
        >
          View LinkedIn profile
        </a>
      </Card>
      <KpiTile label="Platform Goal" value="Scalable UI" trend="Production-ready component architecture" />
    </section>

    <main class="workspace" id="content">
      <aside class="navigator" aria-label="Component navigation">
        <p class="navigator__title">Component Stories</p>
        <button
          v-for="story in stories"
          :key="story.id"
          :class="['story-item', selectedStory === story.id && 'story-item--active']"
          type="button"
          :aria-current="selectedStory === story.id ? 'page' : undefined"
          :aria-label="`${story.name} story in ${story.category}`"
          @click="selectStory(story.id)"
        >
          <span>{{ story.name }}</span>
          <small>{{ story.category }}</small>
        </button>
      </aside>

      <section class="viewer">
        <div class="viewer__head">
          <div>
            <p>{{ currentStory.category }}</p>
            <h2>{{ currentStory.name }}</h2>
          </div>
          <div class="tabs" role="tablist" aria-label="Story panel tabs">
            <button
              :class="['tabs__item', selectedTab === 'preview' && 'tabs__item--active']"
              type="button"
              role="tab"
              :aria-selected="selectedTab === 'preview'"
              aria-controls="story-panel"
              @click="selectedTab = 'preview'"
            >
              Preview
            </button>
            <button
              :class="['tabs__item', selectedTab === 'code' && 'tabs__item--active']"
              type="button"
              role="tab"
              :aria-selected="selectedTab === 'code'"
              aria-controls="story-panel"
              @click="selectedTab = 'code'"
            >
              Code
            </button>
            <button
              :class="['tabs__item', selectedTab === 'design' && 'tabs__item--active']"
              type="button"
              role="tab"
              :aria-selected="selectedTab === 'design'"
              aria-controls="story-panel"
              @click="selectedTab = 'design'"
            >
              Design
            </button>
          </div>
        </div>

        <Card id="story-panel" class="viewer__body" role="tabpanel" :aria-label="`${currentStory.name} ${selectedTab} panel`">
          <div v-if="selectedTab === 'preview'" class="preview">
            <template v-if="selectedStory === 'button'">
              <div class="row">
                <Button label="Get Started" />
                <Button label="Secondary" variant="secondary" />
                <Button label="Learn More" variant="ghost" />
                <Button label="Processing" :loading="true" />
              </div>
              <div class="row">
                <Button label="Small" size="sm" />
                <Button label="Medium" size="md" />
                <Button label="Large" size="lg" />
              </div>
            </template>

            <template v-else-if="selectedStory === 'badge'">
              <div class="row">
                <Badge label="Draft" />
                <Badge label="In Review" tone="warning" />
                <Badge label="Approved" tone="success" />
                <Badge label="Blocked" tone="danger" />
              </div>
            </template>

            <template v-else-if="selectedStory === 'text-input'">
              <div class="stack">
                <TextInput
                  v-model="query"
                  :state="inputState"
                  label="Search"
                  placeholder="Try Button, Badge, Alert..."
                  helper-text="Type anything to see live state."
                  :message="
                    inputState === 'error'
                      ? 'This query returned no results.'
                      : inputState === 'success'
                        ? 'Query validated successfully.'
                        : ''
                  "
                />
                <div class="row">
                  <Button label="Default" variant="ghost" @click="inputState = 'default'" />
                  <Button label="Success" variant="secondary" @click="inputState = 'success'" />
                  <Button label="Error" @click="inputState = 'error'" />
                </div>
              </div>
              <div class="live-value">
                <p>Live value</p>
                <code>{{ query || "No value yet" }}</code>
              </div>
            </template>

            <template v-else-if="selectedStory === 'alert'">
              <div class="stack">
                <Alert
                  tone="info"
                  title="New release candidate"
                  description="UI package version 0.2.0 is ready for review."
                />
                <Alert
                  tone="success"
                  title="Accessibility checks passed"
                  description="Focus and contrast baseline validated."
                />
                <Alert
                  tone="warning"
                  title="One warning remains"
                  description="Typography token naming needs final cleanup."
                />
              </div>
            </template>

            <template v-else-if="selectedStory === 'avatar'">
              <div class="row row--center">
                <Avatar name="Sophia Chen" size="sm" />
                <Avatar name="Sophia Chen" size="md" />
                <Avatar name="Sophia Chen" size="lg" />
                <Avatar name="Alex Ford" size="lg" />
              </div>
            </template>

            <template v-else-if="selectedStory === 'toggle'">
              <div class="row row--center">
                <Toggle v-model="isDark" label="Enable dark mode" />
                <Badge :label="isDark ? 'Dark active' : 'Light active'" tone="info" />
              </div>
            </template>

            <template v-else-if="selectedStory === 'progress'">
              <div class="stack">
                <Progress :value="42" label="Migration from legacy UI kit" />
                <Progress :value="72" label="Component documentation" />
                <Progress :value="96" label="Token consistency audit" />
              </div>
            </template>

            <template v-else-if="selectedStory === 'kpi-tile'">
              <div class="row">
                <KpiTile label="Adoption" value="94%" trend="+11% this month" tone="success" />
                <KpiTile label="Regression risk" value="Low" trend="Monitored daily" />
              </div>
            </template>

            <template v-else-if="selectedStory === 'empty-state'">
              <EmptyState
                title="No components found"
                description="Try another query or create a new primitive for your design system."
              >
                <Button label="Create Component" />
                <Button label="Read Docs" variant="ghost" />
              </EmptyState>
            </template>

            <template v-else-if="selectedStory === 'command-bar'">
              <div class="stack">
                <CommandBar
                  v-model="commandValue"
                  :state="commandState"
                  placeholder="Run a design system command"
                  action-label="Execute"
                  @submit="runCommand"
                />
                <div class="live-value">
                  <p>Last command</p>
                  <code>{{ query || "No command executed yet" }}</code>
                </div>
                <div class="row">
                  <Button label="Mark Success" variant="secondary" @click="commandState = 'success'" />
                  <Button label="Mark Error" @click="commandState = 'error'" />
                  <Button label="Reset" variant="ghost" @click="commandState = 'default'" />
                </div>
              </div>
            </template>

            <template v-else-if="selectedStory === 'metric-ring'">
              <div class="row row--center">
                <MetricRing :value="86" label="Token parity" />
                <MetricRing :value="93" label="Accessibility baseline" />
                <MetricRing :value="78" label="Migration progress" />
              </div>
            </template>

            <template v-else-if="selectedStory === 'dialog'">
              <div class="stack">
                <Button label="Open Publish Dialog" @click="dialogOpen = true" />
                <Dialog
                  :open="dialogOpen"
                  title="Publish token update"
                  description="Review all changes and publish this version to consumers."
                  @close="dialogOpen = false"
                >
                  <div class="stack">
                    <p style="margin: 0; color: var(--color-text-muted)">
                      Version: <strong style="color: var(--color-text)">v0.3.0</strong>
                    </p>
                    <div class="row">
                      <Button label="Cancel" variant="ghost" @click="dialogOpen = false" />
                      <Button label="Confirm Publish" @click="dialogOpen = false" />
                    </div>
                  </div>
                </Dialog>
              </div>
            </template>

            <template v-else-if="selectedStory === 'timeline'">
              <Timeline
                :items="[
                  {
                    title: 'Token sync completed',
                    description: 'Figma light and dark variable updates were imported successfully.',
                    time: '10m ago',
                    tone: 'success',
                  },
                  {
                    title: 'Accessibility report updated',
                    description: 'Focus and keyboard navigation checks passed for latest components.',
                    time: '1h ago',
                    tone: 'info',
                  },
                  {
                    title: 'Contrast warning detected',
                    description: 'Badge warning tone needs contrast review before release.',
                    time: '3h ago',
                    tone: 'warning',
                  },
                ]"
              />
            </template>

            <template v-else-if="selectedStory === 'form-field'">
              <div class="stack">
                <FormField
                  label="Work email"
                  :required="true"
                  caption="Notifications enabled"
                  :max-length="40"
                  :current-length="emailValue.length"
                  helper-text="Use your company email for notifications."
                  :message="emailValue && !emailValue.includes('@') ? 'Enter a valid email.' : ''"
                  :state="emailValue && !emailValue.includes('@') ? 'error' : 'default'"
                >
                  <template #default="{ inputId, describedBy, invalid }">
                    <input
                      :id="inputId"
                      v-model="emailValue"
                      class="field-demo-input"
                      type="email"
                      placeholder="you@company.com"
                      maxlength="40"
                      :aria-describedby="describedBy || undefined"
                      :aria-invalid="invalid ? 'true' : 'false'"
                    />
                  </template>
                </FormField>
                <div class="live-value">
                  <p>Live value</p>
                  <code>{{ emailValue || "No value yet" }}</code>
                </div>
              </div>
            </template>

            <template v-else-if="selectedStory === 'toast'">
              <div class="stack">
                <p class="toast-intro">
                  Trigger global notifications to validate non-blocking feedback and semantic tones.
                </p>
                <div class="row">
                  <Button label="Success Toast" variant="secondary" @click="showSuccessToast" />
                  <Button label="Warning Toast" variant="ghost" @click="showWarningToast" />
                  <Button label="Danger Toast" @click="showDangerToast" />
                </div>
              </div>
            </template>
          </div>

          <pre v-else-if="selectedTab === 'code'" class="code"><code>{{ codeByStory[selectedStory] }}</code></pre>

          <ul v-else class="guidelines">
            <li v-for="rule in designByStory[selectedStory]" :key="rule">{{ rule }}</li>
          </ul>
        </Card>
      </section>
    </main>

    <section class="documentation">
      <div class="documentation__head">
        <h2>System Architecture Notes</h2>
        <p>
          A concise operational view of how tokens, components, and quality controls map to product
          delivery.
        </p>
      </div>

      <div class="documentation__grid">
        <Card title="Quality Score Method">
          <ul class="doc-list">
            <li>Component Coverage = implemented stories divided by target stories.</li>
            <li>Token Maturity = token completeness + light/dark parity checks.</li>
            <li>UI Consistency = checklist score for spacing, contrast, and states.</li>
          </ul>
        </Card>

        <Card title="Token Pipeline">
          <ul class="doc-list">
            <li><code>colorThemes.ts</code>: semantic light and dark color maps.</li>
            <li><code>foundations.ts</code>: spacing, type, radius, shadow, motion.</li>
            <li><code>runtime.ts</code>: TS tokens converted to CSS variables at runtime.</li>
            <li><code>main.ts</code> mounts token styles before app rendering.</li>
          </ul>
        </Card>

        <Card title="Engineering Capabilities">
          <ul class="doc-list">
            <li>Production-ready token pipeline from TypeScript source to runtime CSS variables.</li>
            <li>Component primitives with typed APIs, state coverage, and dark mode support.</li>
            <li>Interactive explorer for preview, code examples, and design usage guidance.</li>
            <li>Automation hooks for importing Figma variables into the token source layer.</li>
          </ul>
        </Card>

        <Card title="Execution Roadmap">
          <ul class="doc-list">
            <li>Expand component state coverage with focused visual snapshots.</li>
            <li>Create Vue + Vuetify migration mapping for equivalent components.</li>
            <li>Expand token quality checks with CI validation gates.</li>
            <li>Add unit and visual regression tests to prove reliability.</li>
          </ul>
        </Card>
      </div>
    </section>

    <ToastViewport />
  </div>
</template>

<style scoped>
.apple-shell {
  position: relative;
  overflow: hidden;
  min-height: 100vh;
  padding: var(--space-xl);
  background:
    radial-gradient(circle at 15% 10%, rgba(94, 161, 255, 0.22), transparent 35%),
    radial-gradient(circle at 85% 0%, rgba(45, 212, 191, 0.2), transparent 34%),
    var(--color-page-bg);
  color: var(--color-text);
  transition: background 250ms ease, color 250ms ease;
}

.apple-shell[data-density="compact"] {
  --space-xs: 2px;
  --space-sm: 6px;
  --space-md: 12px;
  --space-lg: 18px;
  --space-xl: 24px;
  --font-size-sm: 11px;
  --font-size-md: 13px;
}

.apple-shell[data-contrast="high"] {
  --color-text: #ffffff;
  --color-text-muted: #d1defa;
  --color-border: #7f94c7;
  --color-border-strong: #9db3e6;
  --color-primary: #86b9ff;
}

.backdrop-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  pointer-events: none;
  animation: float 9s ease-in-out infinite;
}

.backdrop-orb--left {
  width: 280px;
  height: 280px;
  left: -100px;
  top: -80px;
  background: rgba(94, 161, 255, 0.35);
}

.backdrop-orb--right {
  width: 320px;
  height: 320px;
  right: -120px;
  top: 100px;
  background: rgba(45, 212, 191, 0.25);
  animation-delay: 1s;
}

.topbar,
.hero,
.signature-grid,
.workspace {
  position: relative;
  z-index: 1;
}

.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-md);
  margin-bottom: var(--space-lg);
  opacity: 0;
  animation: reveal 550ms ease forwards;
}

.topbar__brand {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.topbar__brand p {
  margin: 0;
  font-weight: 700;
}

.topbar__brand small {
  color: var(--color-text-muted);
}

.topbar__controls {
  display: flex;
  gap: var(--space-md);
  flex-wrap: wrap;
}

.hero {
  max-width: 960px;
  margin-bottom: var(--space-xl);
  opacity: 0;
  animation: reveal 550ms ease forwards;
  animation-delay: 90ms;
}

.hero__labels {
  display: flex;
  gap: var(--space-sm);
  flex-wrap: wrap;
  margin-bottom: var(--space-sm);
}

.hero h1 {
  margin: 0;
  font-size: clamp(34px, 5vw, 60px);
  line-height: 1.03;
  letter-spacing: -0.02em;
}

.hero p {
  margin: var(--space-md) 0 0;
  max-width: 780px;
  color: var(--color-text-muted);
  font-size: var(--font-size-lg);
}

.signature-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--space-md);
  margin-bottom: var(--space-xl);
  opacity: 0;
  animation: reveal 550ms ease forwards;
  animation-delay: 170ms;
}

.signature-grid > * {
  opacity: 0;
  animation: reveal 500ms ease forwards;
}

.signature-grid > :nth-child(1) {
  animation-delay: 220ms;
}

.signature-grid > :nth-child(2) {
  animation-delay: 300ms;
}

.signature-grid > :nth-child(3) {
  animation-delay: 380ms;
}

.signature-grid__text {
  margin: 0 0 var(--space-sm);
  color: var(--color-text-muted);
  font-size: var(--font-size-md);
  line-height: 1.5;
}

.signature-grid__link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 700;
}

.signature-grid__link:hover {
  text-decoration: underline;
}

.workspace {
  display: grid;
  grid-template-columns: 270px 1fr;
  gap: var(--space-lg);
  margin-bottom: var(--space-xl);
  opacity: 0;
  animation: reveal 550ms ease forwards;
  animation-delay: 260ms;
}

.navigator {
  border: 1px solid var(--color-border);
  background: color-mix(in srgb, var(--color-surface) 88%, transparent);
  backdrop-filter: blur(10px);
  border-radius: var(--radius-lg);
  padding: var(--space-md);
  position: sticky;
  top: var(--space-sm);
  box-shadow: var(--shadow-sm);
}

.navigator__title {
  margin: 0 0 var(--space-sm);
  font-weight: 700;
  color: var(--color-text-muted);
}

.story-item {
  width: 100%;
  text-align: left;
  border: 1px solid transparent;
  border-radius: var(--radius-md);
  background: transparent;
  padding: var(--space-sm);
  margin-bottom: var(--space-xs);
  cursor: pointer;
  transition: all var(--transition-fast);
  opacity: 0;
  animation: reveal 480ms ease forwards;
}

.story-item:nth-child(2) { animation-delay: 320ms; }
.story-item:nth-child(3) { animation-delay: 350ms; }
.story-item:nth-child(4) { animation-delay: 380ms; }
.story-item:nth-child(5) { animation-delay: 410ms; }
.story-item:nth-child(6) { animation-delay: 440ms; }
.story-item:nth-child(7) { animation-delay: 470ms; }
.story-item:nth-child(8) { animation-delay: 500ms; }
.story-item:nth-child(9) { animation-delay: 530ms; }
.story-item:nth-child(10) { animation-delay: 560ms; }
.story-item:nth-child(11) { animation-delay: 590ms; }

.story-item span,
.story-item small {
  display: block;
}

.story-item span {
  color: var(--color-text);
}

.story-item small {
  color: var(--color-text-muted);
}

.story-item:hover {
  background: color-mix(in srgb, var(--color-primary) 12%, transparent);
  border-color: color-mix(in srgb, var(--color-primary) 30%, transparent);
}

.story-item:focus-visible {
  outline: none;
  box-shadow: var(--shadow-focus);
}

.story-item--active {
  background: color-mix(in srgb, var(--color-primary) 18%, transparent);
  border-color: color-mix(in srgb, var(--color-primary) 46%, transparent);
}

.viewer__head {
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: var(--space-sm);
  margin-bottom: var(--space-sm);
}

.viewer__head p {
  margin: 0;
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-weight: 700;
}

.viewer__head h2 {
  margin: var(--space-xs) 0 0;
  font-size: clamp(24px, 3vw, 34px);
  color: var(--color-text);
}

.tabs {
  border: 1px solid var(--color-border);
  background: color-mix(in srgb, var(--color-surface) 90%, transparent);
  border-radius: var(--radius-pill);
  padding: 4px;
  display: inline-flex;
  gap: 4px;
}

.tabs__item {
  border: 0;
  border-radius: var(--radius-pill);
  background: transparent;
  color: var(--color-text-muted);
  padding: 8px 14px;
  font-weight: 700;
  cursor: pointer;
}

.tabs__item--active {
  background: var(--color-primary);
  color: var(--color-text-inverse);
}

.tabs__item:focus-visible {
  outline: none;
  box-shadow: var(--shadow-focus);
}

.viewer__body {
  animation: reveal 280ms ease both;
}

.preview,
.stack {
  display: grid;
  gap: var(--space-md);
}

.row {
  display: flex;
  gap: var(--space-sm);
  flex-wrap: wrap;
}

.row--center {
  align-items: center;
}

.live-value {
  border: 1px dashed var(--color-border-strong);
  border-radius: var(--radius-md);
  padding: var(--space-sm);
  background: var(--color-surface-muted);
}

.live-value p {
  margin: 0;
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}

.live-value code {
  display: block;
  margin-top: var(--space-xs);
  font-family: "Consolas", "Menlo", monospace;
}

.field-demo-input {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  min-height: 44px;
  padding: 0 var(--space-md);
  font-size: var(--font-size-md);
  font-family: var(--font-family);
  color: var(--color-text);
  background: var(--color-surface);
}

.field-demo-input:focus-visible {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: var(--shadow-focus);
}

.toast-intro {
  margin: 0;
  color: var(--color-text-muted);
}

.code {
  margin: 0;
  border-radius: var(--radius-md);
  padding: var(--space-md);
  background: #02050c;
  color: #bfdbfe;
  overflow-x: auto;
  line-height: 1.6;
}

.guidelines {
  margin: 0;
  padding-left: 20px;
  display: grid;
  gap: var(--space-sm);
  color: var(--color-text-muted);
}

.documentation {
  position: relative;
  z-index: 1;
  opacity: 0;
  animation: reveal 550ms ease forwards;
  animation-delay: 340ms;
}

.documentation__head h2 {
  margin: 0;
  font-size: clamp(24px, 3vw, 34px);
  color: var(--color-text);
}

.documentation__head p {
  margin: var(--space-sm) 0 0;
  color: var(--color-text-muted);
}

.documentation__grid {
  margin-top: var(--space-md);
  display: grid;
  gap: var(--space-md);
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
}

.doc-list {
  margin: 0;
  padding-left: 20px;
  display: grid;
  gap: var(--space-sm);
  color: var(--color-text-muted);
}

.documentation__grid > * {
  opacity: 0;
  animation: reveal 500ms ease forwards;
}

.documentation__grid > :nth-child(1) { animation-delay: 390ms; }
.documentation__grid > :nth-child(2) { animation-delay: 460ms; }
.documentation__grid > :nth-child(3) { animation-delay: 530ms; }
.documentation__grid > :nth-child(4) { animation-delay: 600ms; }

@keyframes reveal {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(14px);
  }
}

@media (max-width: 1024px) {
  .signature-grid {
    grid-template-columns: 1fr;
  }

  .workspace {
    grid-template-columns: 1fr;
  }

  .navigator {
    position: static;
  }

  .documentation__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .apple-shell {
    padding: var(--space-md);
  }

  .hero p {
    font-size: var(--font-size-md);
  }

  .viewer__head {
    flex-direction: column;
    align-items: start;
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation: none !important;
    transition: none !important;
  }
}
</style>
