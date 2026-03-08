<script setup lang="ts">
import { computed } from "vue";
import FormField from "../FormField/FormField.vue";

const props = withDefaults(
  defineProps<{
    modelValue?: string;
    label?: string;
    placeholder?: string;
    disabled?: boolean;
    helperText?: string;
    state?: "default" | "success" | "error";
    message?: string;
    required?: boolean;
    inputId?: string;
  }>(),
  {
    modelValue: "",
    label: "",
    placeholder: "",
    disabled: false,
    helperText: "",
    state: "default",
    message: "",
    required: false,
    inputId: "",
  }
);

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
};

const isInvalid = computed(() => props.state === "error");
</script>

<template>
  <FormField
    :label="props.label"
    :helper-text="props.helperText"
    :message="props.message"
    :state="props.state"
    :required="props.required"
    :input-id="props.inputId"
  >
    <template #default="{ inputId, describedBy }">
      <input
        :id="inputId"
        :class="['text-input__field', `text-input__field--${props.state}`]"
        :value="props.modelValue"
        :placeholder="props.placeholder"
        :disabled="props.disabled"
        :required="props.required"
        :aria-invalid="isInvalid ? 'true' : 'false'"
        :aria-describedby="describedBy || undefined"
        @input="onInput"
      />
    </template>
  </FormField>
</template>

<style scoped>
.text-input__field {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  min-height: 44px;
  padding: 0 var(--space-md);
  font-size: var(--font-size-md);
  font-family: var(--font-family);
  color: var(--color-text);
  background: var(--color-surface);
  transition:
    border-color var(--transition-fast),
    box-shadow var(--transition-fast);
}

.text-input__field::placeholder {
  color: var(--color-text-muted);
}

.text-input__field:focus-visible {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: var(--shadow-focus);
}

.text-input__field--success {
  border-color: color-mix(in srgb, var(--color-success) 55%, transparent);
}

.text-input__field--error {
  border-color: color-mix(in srgb, var(--color-danger) 62%, transparent);
}

.text-input__field:disabled {
  background: var(--color-surface-muted);
  color: var(--color-text-muted);
  cursor: not-allowed;
}
</style>
