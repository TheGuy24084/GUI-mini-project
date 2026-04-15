<script setup lang="ts">
import { computed } from 'vue';
import { 
  LayoutDashboard, 
  Library, 
  Settings, 
  LogOut,
  LogIn, 
  Layers,
  FilterX,
  PieChart,
  Users,
  X
} from 'lucide-vue-next';
import { useBookStore } from '../../store/bookStore';
import { useRoute } from 'vue-router';
import { useAuthStore } from '../../store/authStore';
import { useUiStore } from '../../store/uiStore';
import UserAvatar from '../UserAvatar.vue';

const store = useBookStore();
const authStore = useAuthStore();
const uiStore = useUiStore();
const route = useRoute();

const emit = defineEmits<{
  (e: 'open-settings'): void
}>();

const categories = computed(() => store.categories);
const activeCategory = computed(() => store.selectedCategory);

function selectCategory(category: string | null) {
  store.setCategory(category);
  // Close sidebar on mobile after selection
  if (window.innerWidth < 768) {
    uiStore.isSidebarOpen = false;
  }
}
</script>

<template>
  <!-- Sidebar Container -->
  <aside 
    class="fixed inset-y-0 left-0 z-[60] flex flex-col justify-between bg-white/60 dark:bg-[#1e1e1e]/80 backdrop-blur-xl border-r border-slate-200/50 dark:border-[#2a2a2a] transition-all duration-300 transform md:relative md:translate-x-0"
    :class="[
      uiStore.isSidebarOpen ? 'translate-x-0 w-72' : '-translate-x-full w-72 md:w-20 lg:w-72',
      'shadow-2xl md:shadow-none'
    ]"
  >
    <!-- Close button for mobile -->
    <button 
      @click="uiStore.isSidebarOpen = false"
      class="absolute top-4 right-4 p-2 bg-slate-100 dark:bg-[#2a2a2a] text-slate-500 dark:text-[#aaaaaa] rounded-xl shadow-sm md:hidden hover:bg-slate-200 dark:hover:bg-[#333333] transition-colors"
    >
      <X :size="20" />
    </button>
    
    <div class="flex-1 overflow-y-auto pr-2 no-scrollbar p-6">
      <!-- Brand -->
      <div class="flex items-center gap-3 px-2 mb-10 overflow-hidden">
        <div class="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-500 text-white shadow-lg shadow-emerald-500/30">
          <Library :size="20" stroke-width="2.5" />
        </div>
        <span class="text-xl font-bold tracking-tight text-slate-900 lg:block" :class="uiStore.isSidebarOpen ? 'block' : 'hidden'">SmartLib<span class="text-emerald-500">.</span></span>
      </div>

      <!-- Main Navigation -->
      <div class="mb-8">
        <p class="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 transition-opacity duration-300 lg:opacity-100" :class="uiStore.isSidebarOpen ? 'opacity-100' : 'opacity-0 h-0 md:h-auto overflow-hidden'">Menu</p>
        <nav class="space-y-1">
          <router-link 
            to="/"
            @click="selectCategory(null)"
            class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium group"
            :class="route.path === '/' && !activeCategory ? 'bg-slate-900 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900 dark:text-[#aaaaaa] dark:hover:bg-[#2a2a2a] dark:hover:text-white'"
          >
            <LayoutDashboard :size="20" :class="route.path === '/' && !activeCategory ? 'text-emerald-400' : 'text-slate-400 group-hover:text-slate-600'" />
            <span class="truncate lg:block" :class="uiStore.isSidebarOpen ? 'block' : 'hidden'">Dashboard</span>
          </router-link>
          
          <router-link 
            to="/analytics"
            @click="selectCategory(null)"
            class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium group mt-1"
            :class="route.path === '/analytics' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900 dark:text-[#aaaaaa] dark:hover:bg-[#2a2a2a] dark:hover:text-white'"
          >
            <PieChart :size="20" :class="route.path === '/analytics' ? 'text-emerald-400' : 'text-slate-400 group-hover:text-slate-600'" />
            <span class="truncate lg:block" :class="uiStore.isSidebarOpen ? 'block' : 'hidden'">Analytics</span>
          </router-link>

          <router-link 
            to="/members"
            @click="selectCategory(null)"
            class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium group mt-1"
            :class="route.path === '/members' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900 dark:text-[#aaaaaa] dark:hover:bg-[#2a2a2a] dark:hover:text-white'"
          >
            <Users :size="20" :class="route.path === '/members' ? 'text-emerald-400' : 'text-slate-400 group-hover:text-slate-600'" />
            <span class="truncate lg:block" :class="uiStore.isSidebarOpen ? 'block' : 'hidden'">Members</span>
          </router-link>
        </nav>
      </div>

      <!-- Dynamic Categories -->
      <div class="mb-4">
        <div class="flex items-center justify-between px-4 mb-4 transition-opacity duration-300 lg:opacity-100" :class="uiStore.isSidebarOpen ? 'opacity-100' : 'opacity-0 h-0 md:h-auto overflow-hidden'">
          <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Categories</p>
          <button 
            v-if="activeCategory"
            @click="selectCategory(null)"
            class="text-[10px] flex items-center gap-1 text-emerald-600 hover:text-emerald-700 font-bold transition-colors"
          >
            <FilterX :size="12" />
            <span class="lg:block" :class="uiStore.isSidebarOpen ? 'block' : 'hidden'">CLEAR</span>
          </button>
        </div>
        
        <nav class="space-y-1">
          <button 
            v-for="category in categories" 
            :key="category"
            @click="selectCategory(category)"
            class="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium text-left group border-l-4 border-transparent"
            :class="activeCategory === category 
              ? 'bg-slate-800 text-white border-emerald-500 shadow-sm' 
              : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900 dark:text-[#aaaaaa] dark:hover:bg-[#2a2a2a] dark:hover:text-white'"
          >
            <Layers :size="18" :class="activeCategory === category ? 'text-emerald-400' : 'text-slate-400 group-hover:text-slate-600'" />
            <span class="truncate lg:block" :class="uiStore.isSidebarOpen ? 'block' : 'hidden'">{{ category }}</span>
          </button>
        </nav>
      </div>
    </div>

    <!-- Bottom Actions -->
    <div class="space-y-4 p-6 border-t border-slate-200/50 flex-shrink-0">
      
      <!-- Mini Profile (Sidebar) -->
      <div v-if="authStore.isAuthenticated" class="flex items-center gap-3 px-2 mb-2">
        <UserAvatar 
          :user="authStore.user" 
          size="w-10 h-10 border-2 border-emerald-200 dark:border-emerald-900/50 shadow-sm ring-2 ring-emerald-500/20 transition-transform hover:scale-105" 
        />
        <div class="flex flex-col overflow-hidden transition-all duration-300 lg:opacity-100 lg:w-auto" :class="uiStore.isSidebarOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0 h-0 overflow-hidden md:h-auto md:w-0'">
          <span class="text-sm font-semibold text-slate-900 dark:text-white truncate" :title="authStore.user?.name">{{ authStore.user?.name }}</span>
          <span class="text-[10px] text-slate-500 dark:text-[#aaaaaa] truncate uppercase tracking-wider">Member</span>
        </div>
      </div>

      <div class="space-y-2">
        <button @click="emit('open-settings')" class="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-100/80 hover:text-slate-900 transition-all font-medium group dark:text-[#aaaaaa] dark:hover:bg-[#2a2a2a] dark:hover:text-white">
          <Settings :size="20" class="text-slate-400 group-hover:text-slate-600 dark:text-slate-500 dark:group-hover:text-slate-300" />
          <span class="lg:block" :class="uiStore.isSidebarOpen ? 'block' : 'hidden'">Settings</span>
        </button>
        <button v-if="authStore.isAuthenticated" @click="authStore.logout();" class="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-red-50 hover:text-red-600 transition-all font-medium group">
          <LogOut :size="20" class="text-slate-400 group-hover:text-red-500 transition-colors" />
          <span class="lg:block" :class="uiStore.isSidebarOpen ? 'block' : 'hidden'">Logout</span>
        </button>
        <button v-else @click="authStore.isAuthModalOpen = true;" class="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 transition-all font-medium group">
          <LogIn :size="20" class="text-slate-400 group-hover:text-emerald-500 transition-colors" />
          <span class="lg:block" :class="uiStore.isSidebarOpen ? 'block' : 'hidden'">Sign In</span>
        </button>
      </div>
    </div>
  </aside>
</template>
