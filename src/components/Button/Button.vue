<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    label?: string
    variant?: "primary" | "secondary" | "ghost"
    size?: "sm" | "md" | "lg"
    disabled?: boolean
    loading?: boolean
    fullWidth?: boolean
    type?: "button" | "submit" | "reset"
  }>(),
  {
    label: "",
    variant: "primary",
    size: "md",
    disabled: false,
    loading: false,
    fullWidth: false,
    type: "button",
  }
)
</script>

<template>
  <button
    :class="[
      'btn',
      `btn--${props.variant}`,
      `btn--${props.size}`,
      props.fullWidth && 'btn--full-width',
    ]"
    :type="props.type"
    :disabled="props.disabled || props.loading"
    :aria-busy="props.loading ? 'true' : 'false'"
  >
    <span v-if="props.loading" class="btn__spinner" aria-hidden="true" />
    <slot>
      {{ props.label }}
    </slot>
  </button>
</template>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-xs);
  font-family: var(--font-family);
  font-weight: 600;
  border-radius: var(--radius-sm);
  border: 1px solid transparent;
  cursor: pointer;
  transition:
    color var(--transition-fast),
    border-color var(--transition-fast),
    box-shadow var(--transition-fast);
}

.btn__spinner {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 2px solid currentColor;
  border-right-color: transparent;
  animation: btn-spin 700ms linear infinite;
}

.btn:focus-visible {
  outline: none;
  box-shadow: var(--shadow-focus);
}

.btn:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.btn--sm {
  font-size: var(--font-size-sm);
  padding: var(--space-xs) var(--space-sm);
}

.btn--md {
  font-size: var(--font-size-md);
  padding: var(--space-sm) var(--space-md);
}

.btn--lg {
  font-size: var(--font-size-lg);
  padding: var(--space-md) var(--space-lg);
}

.btn--full-width {
  width: 100%;
}

.btn--primary {
  background: var(--color-primary);
  color: var(--color-text-inverse);
  border-color: color-mix(in srgb, var(--color-primary) 78%, black 22%);
  box-shadow: var(--shadow-sm);
}

.btn--primary:not(:disabled):hover {
  border-color: color-mix(in srgb, var(--color-primary-hover) 75%, black 25%);
  box-shadow: 0 8px 18px color-mix(in srgb, var(--color-primary) 20%, transparent);
}

.btn--secondary {
  background: linear-gradient(
    120deg,
    color-mix(in srgb, var(--color-secondary) 88%, #ffffff 12%) 0%,
    var(--color-secondary) 100%
  );
  color: var(--color-text-inverse);
  box-shadow: var(--shadow-sm);
}

.btn--secondary:not(:disabled):hover {
  background: color-mix(in srgb, var(--color-secondary-hover) 90%, var(--color-secondary) 10%);
  box-shadow: 0 10px 22px color-mix(in srgb, var(--color-secondary) 24%, transparent);
}

.btn--ghost {
  background: transparent;
  color: var(--color-text);
  border-color: var(--color-border);
}

.btn--ghost:not(:disabled):hover {
  background: color-mix(in srgb, var(--color-surface-muted) 68%, transparent);
  border-color: var(--color-border-strong);
}

@keyframes btn-spin {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
