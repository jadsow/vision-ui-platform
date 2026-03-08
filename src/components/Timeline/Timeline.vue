<script setup lang="ts">
type TimelineTone = "neutral" | "info" | "success" | "warning" | "danger";

type TimelineItem = {
  title: string;
  description?: string;
  time?: string;
  tone?: TimelineTone;
};

withDefaults(
  defineProps<{
    items?: TimelineItem[];
  }>(),
  {
    items: () => [],
  }
);
</script>

<template>
  <ol class="timeline">
    <li v-for="(item, index) in items" :key="`${item.title}-${index}`" class="timeline__item">
      <span :class="['timeline__dot', `timeline__dot--${item.tone || 'neutral'}`]" aria-hidden="true" />
      <div class="timeline__content">
        <div class="timeline__head">
          <h4>{{ item.title }}</h4>
          <small v-if="item.time">{{ item.time }}</small>
        </div>
        <p v-if="item.description">{{ item.description }}</p>
      </div>
    </li>
  </ol>
</template>

<style scoped>
.timeline {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: var(--space-md);
}

.timeline__item {
  display: grid;
  grid-template-columns: 18px 1fr;
  gap: var(--space-sm);
  align-items: start;
}

.timeline__dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-top: 4px;
  border: 2px solid var(--color-border);
  background: var(--color-surface);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--color-surface-muted) 65%, transparent);
}

.timeline__dot--neutral {
  border-color: var(--color-border-strong);
}

.timeline__dot--info {
  border-color: var(--color-primary);
}

.timeline__dot--success {
  border-color: var(--color-success);
}

.timeline__dot--warning {
  border-color: var(--color-warning);
}

.timeline__dot--danger {
  border-color: var(--color-danger);
}

.timeline__content {
  border-left: 1px dashed var(--color-border);
  padding-left: var(--space-sm);
}

.timeline__head {
  display: flex;
  justify-content: space-between;
  gap: var(--space-sm);
}

.timeline__head h4 {
  margin: 0;
  color: var(--color-text);
  font-size: var(--font-size-md);
}

.timeline__head small {
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
}

.timeline__content p {
  margin: var(--space-xs) 0 0;
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
}
</style>

