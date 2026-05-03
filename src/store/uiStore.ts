import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { useDark, useToggle } from '@vueuse/core';
import { useStorage } from '../composables/useStorage';

export const useUiStore = defineStore('ui', () => {
  const isDark = useDark();
  const toggleDark = useToggle(isDark);
  
  const notifications = ref<string[]>([
    "Culinara OS v1.0: Kitchen management system is live!",
    "New Cuisine Added: Mediterranean recipes now available",
    "Chef Tip: Use fresh herbs for better aroma"
  ]);

  const { load, save } = useStorage<{
    compactMode: boolean;
    enableAiInsights: boolean;
  }>('culinara_ui_prefs', {
    compactMode: false,
    enableAiInsights: true
  });
  
  const uiPrefs = load();
  const compactMode = ref(uiPrefs.compactMode ?? false);
  const enableAiInsights = ref(uiPrefs.enableAiInsights ?? true);
  const isSidebarOpen = ref(false);

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
    isSidebarOpen,
  };
});
