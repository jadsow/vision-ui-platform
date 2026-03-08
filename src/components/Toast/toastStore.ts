import { readonly, ref } from "vue";

export type ToastTone = "info" | "success" | "warning" | "danger";

export type ToastItem = {
  id: number;
  title: string;
  description?: string;
  tone: ToastTone;
  duration: number;
};

const toasts = ref<ToastItem[]>([]);
let nextId = 1;

const remove = (id: number) => {
  toasts.value = toasts.value.filter((toast) => toast.id !== id);
};

const show = (input: Omit<ToastItem, "id">) => {
  const id = nextId++;
  toasts.value = [...toasts.value, { id, ...input }];

  if (input.duration > 0) {
    window.setTimeout(() => remove(id), input.duration);
  }

  return id;
};

export const useToast = () => {
  return {
    toasts: readonly(toasts),
    show,
    remove,
  };
};
