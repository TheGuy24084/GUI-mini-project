import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useDark, useToggle } from '@vueuse/core';

export const useUiStore = defineStore('ui', () => {
  const isDark = useDark();
  const toggleDark = useToggle(isDark);
  
  const notifications = ref<string[]>([]);

  function addNotification(message: string) {
    if (!notifications.value.includes(message)) {
      notifications.value.unshift(message);
    }
  }

  return {
    isDark,
    toggleDark,
    notifications,
    addNotification,
  };
});
