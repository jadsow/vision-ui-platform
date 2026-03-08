<script setup lang="ts">
withDefaults(
  defineProps<{
    label?: string
    value?: string
    trend?: string
    tone?: "default" | "success" | "warning"
  }>(),
  {
    label: "",
    value: "",
    trend: "",
    tone: "default",
  }
);
</script>

<template>
  <article :class="['kpi', `kpi--${tone}`]">
    <p class="kpi__label">{{ label }}</p>
    <strong class="kpi__value">{{ value }}</strong>
    <small v-if="trend" class="kpi__trend">{{ trend }}</small>
  </article>
</template>

<style scoped>
.kpi {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: color-mix(in srgb, var(--color-surface) 92%, transparent);
  padding: var(--space-md);
  box-shadow: var(--shadow-sm);
}

.kpi__label {
  margin: 0;
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}

.kpi__value {
  display: block;
  margin-top: var(--space-xs);
  font-size: var(--font-size-xl);
  line-height: 1.1;
}

.kpi__trend {
  display: inline-block;
  margin-top: var(--space-sm);
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}

.kpi--success .kpi__trend {
  color: var(--color-success);
}

.kpi--warning .kpi__trend {
  color: var(--color-warning);
}
</style>

