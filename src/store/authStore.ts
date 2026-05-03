import { defineStore } from 'pinia';
import { ref, watch, computed } from 'vue';
import { useStorage } from '../composables/useStorage';
import { useToast } from '../composables/useToast';
import { useUiStore } from './uiStore';

export interface User {
  email: string;
  password?: string;
  name: string;
  id?: string;
  joinDate?: string;
  profilePic?: string;
}

export const useAuthStore = defineStore('auth', () => {
  const { load, save } = useStorage<{
    user: User | null;
    users: User[];
    isAuthenticated?: boolean;
    emailNotifications: boolean;
    aiAutoGenerate: boolean;
  }>('culinara_auth', {
    user: null,
    users: [{ id: 'admin-1', email: 'admin@culinara.com', password: 'password', name: 'Master Chef', joinDate: new Date().toISOString(), profilePic: `https://ui-avatars.com/api/?name=Master+Chef&background=10b981&color=fff` }],
    emailNotifications: true,
    aiAutoGenerate: true
  });
  
  const initialState = load();

  const user = ref<User | null>(initialState.user || (initialState.isAuthenticated ? { id: 'admin-1', email: 'admin@culinara.com', name: 'Master Chef', joinDate: new Date().toISOString(), profilePic: `https://ui-avatars.com/api/?name=Master+Chef&background=10b981&color=fff` } : null));
  const users = ref<User[]>(initialState.users || [{ id: 'admin-1', email: 'admin@culinara.com', password: 'password', name: 'Master Chef', joinDate: new Date().toISOString(), profilePic: `https://ui-avatars.com/api/?name=Master+Chef&background=10b981&color=fff` }]);
  const isAuthenticated = computed(() => user.value !== null);
  const emailNotifications = ref(initialState.emailNotifications ?? true);
  const aiAutoGenerate = ref(initialState.aiAutoGenerate ?? true);
  
  const isAuthModalOpen = ref(false);

  // Fetch users from DummyJSON API to populate the chefs list
  async function fetchUsersFromAPI() {
    try {
      const response = await fetch('https://dummyjson.com/users?limit=20');
      const data = await response.json();
      
      const apiUsers: User[] = data.users.map((u: any) => ({
        id: String(u.id),
        name: `${u.firstName} ${u.lastName}`,
        email: u.email,
        profilePic: u.image,
        joinDate: u.birthDate,
      }));

      const admin = users.value.find(u => u.id === 'admin-1');
      users.value = admin ? [admin, ...apiUsers] : apiUsers;
    } catch (error) {
      console.error('Failed to fetch users from DummyJSON:', error);
    }
  }

  if (users.value.length <= 1) {
    fetchUsersFromAPI();
  }

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
      showToast('Chef with this email already exists', 'error');
      return false;
    }
    const newUser: User = { 
      id: `u-${Date.now()}`,
      email, 
      password, 
      name: name || 'New Chef',
      joinDate: new Date().toISOString(),
      profilePic: `https://ui-avatars.com/api/?name=${name || 'Chef'}&background=10b981&color=fff`
    };
    users.value.push(newUser);
    user.value = newUser;
    showToast(`Welcome to the kitchen, Chef ${newUser.name}!`, 'success');
    uiStore.addNotification(`Welcome, Chef ${newUser.name}!`);
    isAuthModalOpen.value = false;
    return true;
  }

  function login(email?: string, password?: string) {
    const uiStore = useUiStore();
    if (!email) {
      user.value = { email: 'guest@culinara.com', name: 'Guest Chef' };
      showToast('Successfully Logged In', 'success');
      uiStore.addNotification('Welcome back, Chef!');
      isAuthModalOpen.value = false;
      return true;
    }
    
    const validUser = users.value.find((u) => u.email === email && u.password === password);
    if (validUser) {
      user.value = validUser;
      showToast(`Welcome back, Chef ${validUser.name}!`, 'success');
      uiStore.addNotification(`Welcome back, Chef ${validUser.name}!`);
      isAuthModalOpen.value = false;
      return true;
    }

    showToast('Invalid credentials', 'error');
    return false;
  }

  function logout() {
    user.value = null;
    showToast('Successfully Logged Out', 'success');
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
      showToast('Chef profile updated', 'success');
    }
  }

  function updateProfilePicture(base64Image: string) {
    if (user.value) {
      user.value.profilePic = base64Image;
      const storedUser = users.value.find((u) => u.email === user.value?.email);
      if (storedUser) {
        storedUser.profilePic = base64Image;
      }
      showToast('Chef avatar updated', 'success');
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
    updateProfilePicture,
  };
});
