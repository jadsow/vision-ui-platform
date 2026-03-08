<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    value?: number
    label?: string
    size?: number
  }>(),
  {
    value: 0,
    label: "",
    size: 120,
  }
);

const normalized = computed(() => Math.min(100, Math.max(0, props.value)));

const ringStyle = computed(() => ({
  width: `${props.size}px`,
  height: `${props.size}px`,
  background: `conic-gradient(var(--color-primary) ${normalized.value * 3.6}deg, color-mix(in srgb, var(--color-border) 45%, transparent) 0deg)`,
}));
</script>

<template>
  <figure class="metric-ring">
    <div class="metric-ring__track" :style="ringStyle">
      <div class="metric-ring__center">
        <strong>{{ normalized }}%</strong>
      </div>
    </div>
    <figcaption v-if="label">{{ label }}</figcaption>
  </figure>
</template>

<style scoped>
.metric-ring {
  margin: 0;
  display: grid;
  justify-items: center;
  gap: var(--space-sm);
}

.metric-ring__track {
  border-radius: 50%;
  display: grid;
  place-items: center;
  box-shadow: var(--shadow-sm);
}

.metric-ring__center {
  width: calc(100% - 20px);
  height: calc(100% - 20px);
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: var(--color-surface);
  color: var(--color-text);
}

.metric-ring__center strong {
  font-size: var(--font-size-lg);
}

figcaption {
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
}
</style>

