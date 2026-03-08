<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue?: string
    placeholder?: string
    actionLabel?: string
    state?: "default" | "success" | "error"
    inputLabel?: string
  }>(),
  {
    modelValue: "",
    placeholder: "Search command...",
    actionLabel: "Run",
    state: "default",
    inputLabel: "Command input",
  }
);

const emit = defineEmits<{
  "update:modelValue": [value: string]
  submit: [value: string]
}>();

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
};

const onSubmit = () => {
  emit("submit", props.modelValue || "");
};
</script>

<template>
  <div :class="['command-bar', `command-bar--${state}`]" role="search">
    <span class="command-bar__icon" aria-hidden="true">CMD</span>
    <input
      class="command-bar__input"
      :value="modelValue"
      :placeholder="placeholder"
      :aria-label="inputLabel"
      @input="onInput"
      @keydown.enter="$emit('submit', modelValue || '')"
    />
    <button class="command-bar__button" type="button" @click="onSubmit">
      {{ actionLabel }}
    </button>
  </div>
</template>

<style scoped>
.command-bar {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: var(--space-sm);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-pill);
  background: color-mix(in srgb, var(--color-surface) 90%, transparent);
  padding: 6px;
  box-shadow: var(--shadow-sm);
}

.command-bar--success {
  border-color: color-mix(in srgb, var(--color-success) 55%, transparent);
}

.command-bar--error {
  border-color: color-mix(in srgb, var(--color-danger) 65%, transparent);
}

.command-bar__icon {
  width: 30px;
  height: 30px;
  display: grid;
  place-items: center;
  border-radius: 999px;
  color: var(--color-text-muted);
  background: var(--color-surface-muted);
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.08em;
}

.command-bar__input {
  border: 0;
  background: transparent;
  color: var(--color-text);
  font-family: var(--font-family);
  font-size: var(--font-size-md);
  min-width: 0;
}

.command-bar__input:focus {
  outline: none;
}

.command-bar__button {
  border: 0;
  border-radius: var(--radius-pill);
  padding: 8px 14px;
  color: var(--color-text-inverse);
  font-family: var(--font-family);
  font-size: var(--font-size-sm);
  font-weight: 700;
  background: var(--color-primary);
  cursor: pointer;
}

.command-bar__button:focus-visible,
.command-bar__input:focus-visible {
  outline: none;
  box-shadow: var(--shadow-focus);
  border-radius: var(--radius-pill);
}
</style>
