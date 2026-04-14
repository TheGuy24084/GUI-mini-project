import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { useDark, useToggle } from '@vueuse/core';
import { useStorage } from '../composables/useStorage';

export const useUiStore = defineStore('ui', () => {
  const isDark = useDark();
  const toggleDark = useToggle(isDark);
  
  const notifications = ref<string[]>([]);

  const { load, save } = useStorage<{
    compactMode: boolean;
    enableAiInsights: boolean;
  }>('library_ui_prefs', {
    compactMode: false,
    enableAiInsights: true
  });
  
  const uiPrefs = load();
  const compactMode = ref(uiPrefs.compactMode ?? false);
  const enableAiInsights = ref(uiPrefs.enableAiInsights ?? true);

  watch([compactMode, enableAiInsights], () => {
    save({
      compactMode: compactMode.value,
      enableAiInsights: enableAiInsights.value,
    });
  }, { deep: true });

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
    compactMode,
    enableAiInsights,
  };
});
