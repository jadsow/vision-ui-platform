<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string
    description?: string
    tone?: "info" | "success" | "warning" | "danger"
  }>(),
  {
    title: "",
    description: "",
    tone: "info",
  }
);
</script>

<template>
  <div :class="['alert', `alert--${tone}`]" role="status" aria-live="polite">
    <p v-if="title" class="alert__title">{{ title }}</p>
    <p v-if="description" class="alert__description">{{ description }}</p>
    <slot />
  </div>
</template>

<style scoped>
.alert {
  border-radius: var(--radius-md);
  border: 1px solid transparent;
  padding: var(--space-sm) var(--space-md);
}

.alert__title {
  margin: 0;
  font-size: var(--font-size-md);
  font-weight: 700;
}

.alert__description {
  margin: var(--space-xs) 0 0;
  font-size: var(--font-size-sm);
}

.alert--info {
  background: color-mix(in srgb, var(--color-primary) 16%, transparent);
  border-color: color-mix(in srgb, var(--color-primary) 45%, transparent);
  color: var(--color-primary);
}

.alert--success {
  background: color-mix(in srgb, var(--color-success) 15%, transparent);
  border-color: color-mix(in srgb, var(--color-success) 38%, transparent);
  color: var(--color-success);
}

.alert--warning {
  background: color-mix(in srgb, var(--color-warning) 14%, transparent);
  border-color: color-mix(in srgb, var(--color-warning) 35%, transparent);
  color: var(--color-warning);
}

.alert--danger {
  background: color-mix(in srgb, var(--color-danger) 13%, transparent);
  border-color: color-mix(in srgb, var(--color-danger) 34%, transparent);
  color: var(--color-danger);
}
</style>
