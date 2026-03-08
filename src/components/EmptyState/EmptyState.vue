<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string
    description?: string
  }>(),
  {
    title: "",
    description: "",
  }
);
</script>

<template>
  <section class="empty-state">
    <div class="empty-state__icon" aria-hidden="true">◦</div>
    <h3 class="empty-state__title">{{ title }}</h3>
    <p class="empty-state__description">{{ description }}</p>
    <div class="empty-state__actions">
      <slot />
    </div>
  </section>
</template>

<style scoped>
.empty-state {
  border: 1px dashed var(--color-border-strong);
  border-radius: var(--radius-lg);
  background: var(--color-surface-muted);
  padding: var(--space-lg);
  text-align: center;
}

.empty-state__icon {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  margin: 0 auto var(--space-sm);
  display: grid;
  place-items: center;
  font-size: 30px;
  line-height: 1;
  color: var(--color-primary);
  background: color-mix(in srgb, var(--color-primary) 16%, transparent);
}

.empty-state__title {
  margin: 0;
  color: var(--color-text);
}

.empty-state__description {
  margin: var(--space-sm) 0 0;
  color: var(--color-text-muted);
  font-size: var(--font-size-md);
}

.empty-state__actions {
  margin-top: var(--space-md);
  display: flex;
  gap: var(--space-sm);
  justify-content: center;
}
</style>

