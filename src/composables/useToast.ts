import { ref } from 'vue';

type ToastType = 'success' | 'error';

const visible = ref(false);
const message = ref('');
const type = ref<ToastType>('success');

let dismissTimer: ReturnType<typeof setTimeout> | null = null;

export function useToast() {
  function showToast(msg: string, toastType: ToastType = 'success', duration = 3500) {
    if (dismissTimer) clearTimeout(dismissTimer);
    message.value = msg;
    type.value = toastType;
    visible.value = true;
    dismissTimer = setTimeout(() => {
      visible.value = false;
    }, duration);
  }

  function hideToast() {
    visible.value = false;
  }

  return { visible, message, type, showToast, hideToast };
}
