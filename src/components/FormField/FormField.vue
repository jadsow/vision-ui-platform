<script setup lang="ts">
import { computed } from "vue";
let formFieldCounter = 0;

const props = withDefaults(
  defineProps<{
    label?: string;
    helperText?: string;
    message?: string;
    state?: "default" | "success" | "error";
    required?: boolean;
    optional?: boolean;
    size?: "sm" | "md";
    layout?: "vertical" | "horizontal";
    caption?: string;
    showRequiredMark?: boolean;
    maxLength?: number;
    currentLength?: number;
    inputId?: string;
  }>(),
  {
    label: "",
    helperText: "",
    message: "",
    state: "default",
    required: false,
    optional: false,
    size: "md",
    layout: "vertical",
    caption: "",
    showRequiredMark: true,
    maxLength: 0,
    currentLength: 0,
    inputId: "",
  }
);

const localId = `field-${++formFieldCounter}`;

const resolvedId = computed(() => {
  return props.inputId || localId;
});

const resolvedMessage = computed(() => props.message || props.helperText);
const hasCounter = computed(() => props.maxLength > 0);
const resolvedLength = computed(() => Math.max(0, props.currentLength));
const counterId = computed(() => `${resolvedId.value}-counter`);
const messageId = computed(() => `${resolvedId.value}-message`);
const describedBy = computed(() => {
  const ids: string[] = [];
  if (resolvedMessage.value) ids.push(messageId.value);
  if (hasCounter.value) ids.push(counterId.value);
  return ids.join(" ");
});
const invalid = computed(() => props.state === "error");
</script>

<template>
  <div :class="['form-field', `form-field--${size}`, `form-field--${layout}`]">
    <div class="form-field__header">
      <label v-if="label" class="form-field__label" :for="resolvedId">
        {{ label }}
        <span v-if="required && showRequiredMark" class="form-field__required" aria-hidden="true">*</span>
        <span v-if="optional && !required" class="form-field__optional">(Optional)</span>
      </label>

      <div class="form-field__meta">
        <small v-if="caption" class="form-field__caption">{{ caption }}</small>
        <slot name="meta" />
      </div>
    </div>

    <div class="form-field__control">
      <slot
        :input-id="resolvedId"
        :described-by="describedBy"
        :invalid="invalid"
        :message-id="messageId"
        :counter-id="counterId"
      />
    </div>

    <div class="form-field__footer">
      <slot name="message">
        <p
          v-if="resolvedMessage"
          :id="messageId"
          :class="['form-field__message', `form-field__message--${state}`]"
        >
          {{ resolvedMessage }}
        </p>
      </slot>

      <p v-if="hasCounter" :id="counterId" class="form-field__counter" aria-live="polite">
        {{ resolvedLength }}/{{ maxLength }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.form-field {
  display: grid;
  gap: var(--space-xs);
}

.form-field--horizontal {
  grid-template-columns: minmax(160px, 220px) minmax(0, 1fr);
  align-items: start;
}

.form-field--horizontal .form-field__header,
.form-field--horizontal .form-field__footer {
  grid-column: 1 / 2;
}

.form-field--horizontal .form-field__control {
  grid-column: 2 / 3;
}

.form-field--sm {
  --field-label-size: var(--font-size-sm);
}

.form-field--md {
  --field-label-size: var(--font-size-md);
}

.form-field__header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--space-sm);
}

.form-field__label {
  font-size: var(--field-label-size);
  font-weight: 700;
  color: var(--color-secondary);
}

.form-field__required {
  color: var(--color-danger);
  margin-left: 2px;
}

.form-field__optional {
  margin-left: var(--space-xs);
  color: var(--color-text-muted);
  font-weight: 500;
  font-size: var(--font-size-sm);
}

.form-field__meta {
  display: inline-flex;
  gap: var(--space-xs);
  align-items: center;
}

.form-field__caption {
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
}

.form-field__footer {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--space-sm);
}

.form-field__message {
  margin: 0;
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}

.form-field__message--success {
  color: var(--color-success);
}

.form-field__message--error {
  color: var(--color-danger);
}

.form-field__counter {
  margin: 0;
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
  white-space: nowrap;
}

@media (max-width: 768px) {
  .form-field--horizontal {
    grid-template-columns: 1fr;
  }
}
</style>
