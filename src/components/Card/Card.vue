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
  <article class="card">
    <header v-if="title || description" class="card__header">
      <h3 v-if="title" class="card__title">{{ title }}</h3>
      <p v-if="description" class="card__description">{{ description }}</p>
    </header>
    <div class="card__body">
      <slot />
    </div>
  </article>
</template>

<style scoped>
.card {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  box-shadow: var(--shadow-sm);
  padding: var(--space-lg);
  color: var(--color-text);
}

.card__header {
  margin-bottom: var(--space-md);
}

.card__title {
  margin: 0;
  font-size: var(--font-size-lg);
  color: var(--color-text);
}

.card__description {
  margin: var(--space-xs) 0 0;
  color: var(--color-text-muted);
  font-size: var(--font-size-md);
}

.card__body {
  display: grid;
  gap: var(--space-md);
}
</style>
