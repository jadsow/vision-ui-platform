<script setup lang="ts">
import { useToast } from "./toastStore";

const { toasts, remove } = useToast();
</script>

<template>
  <section class="toast-viewport" aria-label="Notifications" aria-live="polite" aria-relevant="additions">
    <article
      v-for="toast in toasts"
      :key="toast.id"
      :class="['toast', `toast--${toast.tone}`]"
      :role="toast.tone === 'danger' ? 'alert' : 'status'"
    >
      <div class="toast__content">
        <p class="toast__title">{{ toast.title }}</p>
        <p v-if="toast.description" class="toast__description">{{ toast.description }}</p>
      </div>
      <button class="toast__close" type="button" aria-label="Dismiss notification" @click="remove(toast.id)">
        Dismiss
      </button>
    </article>
  </section>
</template>

<style scoped>
.toast-viewport {
  position: fixed;
  right: var(--space-md);
  bottom: var(--space-md);
  z-index: 120;
  display: grid;
  gap: var(--space-sm);
  width: min(360px, calc(100vw - 2 * var(--space-md)));
}

.toast {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-sm);
  background: color-mix(in srgb, var(--color-surface) 94%, transparent);
  box-shadow: var(--shadow-md);
  display: grid;
  gap: var(--space-xs);
}

.toast--info {
  border-color: color-mix(in srgb, var(--color-info) 48%, var(--color-border));
}

.toast--success {
  border-color: color-mix(in srgb, var(--color-success) 58%, var(--color-border));
}

.toast--warning {
  border-color: color-mix(in srgb, var(--color-warning) 62%, var(--color-border));
}

.toast--danger {
  border-color: color-mix(in srgb, var(--color-danger) 64%, var(--color-border));
}

.toast__content {
  display: grid;
  gap: 2px;
}

.toast__title {
  margin: 0;
  color: var(--color-text);
  font-weight: 700;
  font-size: var(--font-size-md);
}

.toast__description {
  margin: 0;
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
  line-height: 1.5;
}

.toast__close {
  justify-self: end;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-pill);
  background: transparent;
  color: var(--color-text);
  padding: 6px 12px;
  font-family: var(--font-family);
  font-size: var(--font-size-sm);
  cursor: pointer;
}

.toast__close:focus-visible {
  outline: none;
  box-shadow: var(--shadow-focus);
}
</style>
