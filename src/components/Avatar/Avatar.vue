<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    name?: string
    src?: string
    size?: "sm" | "md" | "lg"
  }>(),
  {
    name: "",
    src: "",
    size: "md",
  }
);

const initials = computed(() => {
  if (!props.name) return "?";
  return props.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((item) => item[0]?.toUpperCase() ?? "")
    .join("");
});
</script>

<template>
  <span :class="['avatar', `avatar--${props.size}`]" :aria-label="props.name || 'Avatar'">
    <img v-if="props.src" :src="props.src" :alt="props.name || 'Avatar image'" />
    <span v-else>{{ initials }}</span>
  </span>
</template>

<style scoped>
.avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 50%;
  background: var(--color-surface-muted);
  border: 1px solid var(--color-border);
  color: var(--color-secondary);
  font-weight: 700;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar--sm {
  width: 32px;
  height: 32px;
  font-size: var(--font-size-sm);
}

.avatar--md {
  width: 44px;
  height: 44px;
  font-size: var(--font-size-md);
}

.avatar--lg {
  width: 56px;
  height: 56px;
  font-size: var(--font-size-lg);
}
</style>

