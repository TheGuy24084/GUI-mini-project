import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { useStorage } from '../composables/useStorage';

export const useAuthStore = defineStore('auth', () => {
  const { load, save } = useStorage<{
    isAuthenticated: boolean;
    emailNotifications: boolean;
    aiAutoGenerate: boolean;
  }>('library_auth', {
    isAuthenticated: false,
    emailNotifications: true,
    aiAutoGenerate: true
  });
  
  const initialState = load();

  const isAuthenticated = ref(initialState.isAuthenticated);
  const emailNotifications = ref(initialState.emailNotifications);
  const aiAutoGenerate = ref(initialState.aiAutoGenerate);

  watch([isAuthenticated, emailNotifications, aiAutoGenerate], () => {
    save({
      isAuthenticated: isAuthenticated.value,
      emailNotifications: emailNotifications.value,
      aiAutoGenerate: aiAutoGenerate.value,
    });
  });

  function login(username?: string, password?: string) {
    if (username === 'admin' && password === 'admin') {
      isAuthenticated.value = true;
      return true;
    }
    // Mock general login for simplicity if no credentials provided
    isAuthenticated.value = true;
    return true;
  }

  function logout() {
    isAuthenticated.value = false;
  }

  return {
    isAuthenticated,
    emailNotifications,
    aiAutoGenerate,
    login,
    logout,
  };
});
