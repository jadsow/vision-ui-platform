<script setup lang="ts">
import { nextTick, onBeforeUnmount, ref, watch } from "vue";

const props = withDefaults(
  defineProps<{
    open?: boolean;
    title?: string;
    description?: string;
    closeOnOverlay?: boolean;
  }>(),
  {
    open: false,
    title: "",
    description: "",
    closeOnOverlay: true,
  }
);

const emit = defineEmits<{
  close: [];
}>();

const dialogRef = ref<HTMLElement | null>(null);
const titleId = `dialog-title-${Math.random().toString(36).slice(2, 9)}`;
const descriptionId = `dialog-description-${Math.random().toString(36).slice(2, 9)}`;

const onEscape = (event: KeyboardEvent) => {
  if (event.key === "Escape" && props.open) emit("close");
};

const onOverlayClick = () => {
  if (props.closeOnOverlay) emit("close");
};

watch(
  () => props.open,
  async (isOpen) => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", onEscape);
      await nextTick();
      dialogRef.value?.focus();
    } else {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onEscape);
    }
  }
);

onBeforeUnmount(() => {
  document.body.style.overflow = "";
  document.removeEventListener("keydown", onEscape);
});
</script>

<template>
  <Teleport to="body">
    <div v-if="open" class="dialog-backdrop" @click="onOverlayClick">
      <section
        ref="dialogRef"
        class="dialog"
        role="dialog"
        aria-modal="true"
        :aria-label="title ? undefined : 'Dialog'"
        :aria-labelledby="title ? titleId : undefined"
        :aria-describedby="description ? descriptionId : undefined"
        tabindex="-1"
        @click.stop
      >
        <header class="dialog__header">
          <div>
            <h3 v-if="title" :id="titleId">{{ title }}</h3>
            <p v-if="description" :id="descriptionId">{{ description }}</p>
          </div>
          <button type="button" class="dialog__close" aria-label="Close dialog" @click="$emit('close')">
            Close
          </button>
        </header>
        <div class="dialog__content">
          <slot />
        </div>
      </section>
    </div>
  </Teleport>
</template>

<style scoped>
.dialog-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(8, 12, 22, 0.36);
  backdrop-filter: blur(2px);
  display: grid;
  place-items: center;
  padding: var(--space-md);
  z-index: 80;
  animation: dialog-fade-in 180ms ease-out;
}

.dialog {
  width: min(620px, 100%);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  color: var(--color-text);
  box-shadow: var(--shadow-md);
  overflow: hidden;
  transform: translateY(4px) scale(0.985);
  animation: dialog-pop-in 220ms ease-out forwards;
}

.dialog__header {
  display: flex;
  justify-content: space-between;
  gap: var(--space-md);
  padding: var(--space-md);
  border-bottom: 1px solid var(--color-border);
}

.dialog__header h3 {
  margin: 0;
  font-size: var(--font-size-lg);
}

.dialog__header p {
  margin: var(--space-xs) 0 0;
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
}

.dialog__close {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-pill);
  background: transparent;
  color: var(--color-text);
  padding: 6px 12px;
  cursor: pointer;
  transition:
    background-color var(--transition-fast),
    border-color var(--transition-fast);
}

.dialog__close:hover {
  background: color-mix(in srgb, var(--color-surface-muted) 70%, transparent);
  border-color: var(--color-border-strong);
}

.dialog__content {
  padding: var(--space-md);
}

@keyframes dialog-fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes dialog-pop-in {
  from {
    opacity: 0;
    transform: translateY(10px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>
