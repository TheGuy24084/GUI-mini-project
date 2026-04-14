import { defineStore } from 'pinia';
import { ref, watch, computed } from 'vue';
import { useStorage } from '../composables/useStorage';
import { useToast } from '../composables/useToast';
import { useUiStore } from './uiStore';

export interface User {
  email: string;
  password?: string;
  name: string;
}

export const useAuthStore = defineStore('auth', () => {
  const { load, save } = useStorage<{
    user: User | null;
    users: User[];
    isAuthenticated?: boolean;
    emailNotifications: boolean;
    aiAutoGenerate: boolean;
  }>('library_auth', {
    user: null,
    users: [{ email: 'admin@library.com', password: 'password', name: 'Admin User' }],
    emailNotifications: true,
    aiAutoGenerate: true
  });
  
  const initialState = load();

  const user = ref<User | null>(initialState.user || (initialState.isAuthenticated ? { email: 'admin@library.com', name: 'Admin User' } : null));
  const users = ref<User[]>(initialState.users || [{ email: 'admin@library.com', password: 'password', name: 'Admin User' }]);
  const isAuthenticated = computed(() => user.value !== null);
  const emailNotifications = ref(initialState.emailNotifications ?? true);
  const aiAutoGenerate = ref(initialState.aiAutoGenerate ?? true);
  
  const isAuthModalOpen = ref(false);

  watch([user, users, emailNotifications, aiAutoGenerate], () => {
    save({
      user: user.value,
      users: users.value,
      isAuthenticated: isAuthenticated.value,
      emailNotifications: emailNotifications.value,
      aiAutoGenerate: aiAutoGenerate.value,
    });
  }, { deep: true });

  const { showToast } = useToast();

  function signUp(email: string, password?: string, name?: string) {
    const uiStore = useUiStore();
    const existingUser = users.value.find((u) => u.email === email);
    if (existingUser) {
      showToast('Account with this email already exists', 'error');
      return false;
    }
    const newUser = { email, password, name: name || 'New User' };
    users.value.push(newUser);
    user.value = newUser;
    showToast(`Welcome, ${newUser.name}!`, 'success');
    uiStore.addNotification(`Welcome, ${newUser.name}!`);
    isAuthModalOpen.value = false;
    return true;
  }

  function login(email?: string, password?: string) {
    const uiStore = useUiStore();
    if (!email) {
      user.value = { email: 'guest@guest.com', name: 'Guest' };
      showToast('Successfully Logged In', 'success');
      uiStore.addNotification('Welcome back, Guest!');
      isAuthModalOpen.value = false;
      return true;
    }
    
    const validUser = users.value.find((u) => u.email === email && u.password === password);
    if (validUser) {
      user.value = validUser;
      showToast(`Welcome back, ${validUser.name}!`, 'success');
      uiStore.addNotification(`Welcome back, ${validUser.name}!`);
      isAuthModalOpen.value = false;
      return true;
    }

    showToast('Invalid credentials', 'error');
    return false;
  }

  function logout() {
    user.value = null;
    showToast('Successfully Logged Out', 'success');
    // Using setTimeout to allow the toast to render before reloading
    setTimeout(() => {
      window.location.href = '/';
    }, 500);
  }

  function updateProfileName(newName: string) {
    if (user.value) {
      user.value.name = newName;
      
      const storedUser = users.value.find((u) => u.email === user.value?.email);
      if (storedUser) {
        storedUser.name = newName;
      }
      
      showToast('Profile updated', 'success');
    }
  }

  return {
    user,
    users,
    isAuthenticated,
    isAuthModalOpen,
    emailNotifications,
    aiAutoGenerate,
    signUp,
    login,
    logout,
    updateProfileName,
  };
});
