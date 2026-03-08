<script setup lang="ts">
withDefaults(
  defineProps<{
    label?: string
    tone?: "neutral" | "info" | "success" | "warning" | "danger"
  }>(),
  {
    label: "",
    tone: "neutral",
  }
);
</script>

<template>
  <span :class="['badge', `badge--${tone}`]">
    <slot>
      {{ label }}
    </slot>
  </span>
</template>

<style scoped>
.badge {
  display: inline-flex;
  align-items: center;
  border-radius: var(--radius-pill);
  padding: 2px var(--space-sm);
  font-size: var(--font-size-sm);
  font-weight: 700;
  letter-spacing: 0.02em;
}

.badge--neutral {
  background: color-mix(in srgb, var(--color-secondary) 18%, transparent);
  color: var(--color-secondary-hover);
}

.badge--info {
  background: color-mix(in srgb, var(--color-primary) 22%, transparent);
  color: var(--color-primary);
}

.badge--success {
  background: color-mix(in srgb, var(--color-success) 22%, transparent);
  color: var(--color-success);
}

.badge--warning {
  background: color-mix(in srgb, var(--color-warning) 24%, transparent);
  color: var(--color-warning);
}

.badge--danger {
  background: color-mix(in srgb, var(--color-danger) 20%, transparent);
  color: var(--color-danger);
}
</style>
