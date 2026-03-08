<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue?: boolean
    label?: string
  }>(),
  {
    modelValue: false,
    label: "",
  }
);

const emit = defineEmits<{
  "update:modelValue": [value: boolean]
}>();

const onToggle = () => {
  emit("update:modelValue", !props.modelValue);
};
</script>

<template>
  <button
    class="toggle"
    type="button"
    role="switch"
    :aria-label="label || 'Toggle option'"
    :aria-checked="modelValue"
    @click="onToggle"
  >
    <span v-if="label" class="toggle__label">{{ label }}</span>
    <span :class="['toggle__track', modelValue && 'toggle__track--active']">
      <span :class="['toggle__thumb', modelValue && 'toggle__thumb--active']" />
    </span>
  </button>
</template>

<style scoped>
.toggle {
  border: 0;
  background: transparent;
  display: inline-flex;
  align-items: center;
  gap: var(--space-sm);
  cursor: pointer;
  color: var(--color-text);
  font-family: var(--font-family);
  padding: 0;
}

.toggle:focus-visible {
  outline: none;
  border-radius: var(--radius-pill);
  box-shadow: var(--shadow-focus);
}

.toggle__label {
  font-size: var(--font-size-sm);
  font-weight: 700;
}

.toggle__track {
  width: 48px;
  height: 28px;
  border-radius: var(--radius-pill);
  background: var(--color-border-strong);
  padding: 3px;
  transition: background var(--transition-fast);
}

.toggle__track--active {
  background: var(--color-primary);
}

.toggle__thumb {
  display: block;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: white;
  box-shadow: var(--shadow-sm);
  transition: transform var(--transition-fast);
}

.toggle__thumb--active {
  transform: translateX(20px);
}
</style>
