<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    value?: number
    label?: string
  }>(),
  {
    value: 0,
    label: "",
  }
);

const normalized = computed(() => Math.max(0, Math.min(100, props.value)));
</script>

<template>
  <div class="progress">
    <div class="progress__meta">
      <p v-if="label">{{ label }}</p>
      <span>{{ normalized }}%</span>
    </div>
    <div class="progress__track">
      <span class="progress__bar" :style="{ width: `${normalized}%` }" />
    </div>
  </div>
</template>

<style scoped>
.progress {
  display: grid;
  gap: var(--space-xs);
}

.progress__meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-sm);
}

.progress__meta p {
  margin: 0;
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  font-weight: 600;
}

.progress__meta span {
  font-size: var(--font-size-sm);
  color: var(--color-text);
  font-weight: 700;
}

.progress__track {
  height: 10px;
  border-radius: var(--radius-pill);
  background: var(--color-surface-muted);
  overflow: hidden;
}

.progress__bar {
  display: block;
  height: 100%;
  border-radius: var(--radius-pill);
  background: linear-gradient(90deg, #3b82f6 0%, #22d3ee 100%);
  transition: width 300ms ease;
}
</style>

