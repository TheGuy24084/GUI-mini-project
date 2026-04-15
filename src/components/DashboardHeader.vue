<script setup lang="ts">
import { ref, watch } from 'vue';
import { Search, Bell, Menu } from 'lucide-vue-next';
import { useBookStore } from '../store/bookStore';
import { useAuthStore } from '../store/authStore';
import { useUiStore } from '../store/uiStore';
import { useMagicKeys } from '@vueuse/core';

const store = useBookStore();
const authStore = useAuthStore();
const uiStore = useUiStore();
const isNotificationsOpen = ref(false);

const searchInputRef = ref<HTMLInputElement | null>(null);
const { Meta_K, Ctrl_K } = useMagicKeys({
  passive: false,
  onEventFired(e) {
    if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
    }
  }
});

watch([Meta_K, Ctrl_K], ([meta, ctrl]) => {
  if (meta || ctrl) {
    searchInputRef.value?.focus();
  }
});
</script>

<template>
  <header class="hidden lg:flex h-20 flex-shrink-0 items-center justify-between px-8 bg-white/40 dark:bg-[#1e1e1e]/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-[#2a2a2a] sticky top-0 z-20">
    
    <!-- Left Section: Mobile Menu & Breadcrumb -->
    <div class="flex items-center gap-4">
      <button 
        @click="uiStore.isSidebarOpen = true"
        class="p-2 -ml-2 rounded-xl text-slate-500 dark:text-[#aaaaaa] hover:bg-slate-100 dark:hover:bg-[#2a2a2a] md:hidden transition-colors"
      >
        <Menu class="h-6 w-6" />
      </button>
      <h1 class="text-xl md:text-2xl font-bold text-slate-900 dark:text-white truncate max-w-[120px] xs:max-w-none">Dashboard</h1>
    </div>

    <!-- Center Section: Search Bar -->
    <div class="flex-1 max-w-xl mx-2 md:mx-8 relative group">
      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search class="h-4 w-4 md:h-5 md:w-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
      </div>
      <input
        ref="searchInputRef"
        v-model="store.searchQuery"
        type="text"
        placeholder="Search books..."
        class="block w-full pl-9 md:pl-10 pr-3 py-2 md:py-2.5 border border-slate-200 dark:border-[#2a2a2a] rounded-xl text-sm leading-5 bg-white/60 dark:bg-[#0f0f0f] dark:text-[#aaaaaa] placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:bg-white dark:focus:bg-[#0f0f0f] focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-300 shadow-sm"
      />
      <!-- Keyboard Shortcut Hint (Desktop Only) -->
      <div class="absolute inset-y-0 right-0 pr-3 hidden lg:flex items-center pointer-events-none">
        <span class="text-[10px] font-bold text-slate-400 border border-slate-200 dark:border-slate-800 rounded px-1.5 py-0.5 bg-slate-50 dark:bg-slate-900">⌘K</span>
      </div>
    </div>

    <!-- Right Section: Actions -->
    <div class="flex items-center gap-1 md:gap-4">
      <div class="relative">
        <button 
          @click="isNotificationsOpen = !isNotificationsOpen"
          class="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-xl bg-white dark:bg-[#1e1e1e] border border-slate-200 dark:border-[#2a2a2a] text-slate-500 dark:text-[#aaaaaa] hover:text-slate-900 hover:border-slate-300 dark:hover:bg-[#2a2a2a] transition-all shadow-sm relative focus:outline-none"
        >
          <Bell class="h-4 w-4 md:h-5 md:w-5" />
          <span v-if="uiStore.notifications.length > 0" class="absolute top-2 right-2.5 w-2 h-2 bg-rose-500 dark:bg-rose-400 rounded-full border border-rose-100 dark:border-[#1e1e1e]"></span>
        </button>
        <!-- Notification Dropdown -->
        <div v-if="isNotificationsOpen" class="absolute right-0 mt-2 w-64 bg-white dark:bg-[#1e1e1e] rounded-xl shadow-lg border border-slate-100 dark:border-[#2a2a2a] p-2 z-50">
          <div class="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-50 dark:border-[#2a2a2a] mb-1">Alerts</div>
          <div class="max-h-48 overflow-y-auto">
            <div v-if="uiStore.notifications.length === 0" class="px-3 py-4 text-sm text-slate-500 dark:text-slate-400 text-center italic">
              No new alerts
            </div>
            <div v-for="note in uiStore.notifications" :key="note" class="px-3 py-2 hover:bg-slate-50 dark:hover:bg-[#2a2a2a] rounded-lg text-sm text-slate-700 dark:text-[#aaaaaa] transition-colors">
              {{ note }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
