<script setup lang="ts">
import { ref, watch } from 'vue';
import { Search, Bell } from 'lucide-vue-next';
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
  <header class="h-20 flex-shrink-0 flex items-center justify-between px-4 md:px-8 bg-white/40 dark:bg-[#1e1e1e]/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-[#2a2a2a] sticky top-0 z-20">
    <h1 class="text-2xl font-bold text-slate-900 dark:text-white hidden lg:block">Dashboard</h1>

    <!-- Search Bar -->
    <div class="flex-1 max-w-xl mx-4 lg:mx-8 relative group">
      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search class="h-5 w-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
      </div>
      <input
        ref="searchInputRef"
        v-model="store.searchQuery"
        type="text"
        class="block w-full pl-10 pr-3 py-2.5 border border-slate-200 dark:border-[#2a2a2a] rounded-xl leading-5 bg-white/60 dark:bg-[#0f0f0f] dark:text-[#aaaaaa] placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:bg-white dark:focus:bg-[#0f0f0f] focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-300 shadow-sm"
      />
    </div>

    <!-- User Profile & Notifications -->
    <div class="flex items-center gap-2 md:gap-4 relative">
      <div class="relative">
        <button 
          @click="isNotificationsOpen = !isNotificationsOpen"
          class="flex items-center justify-center w-10 h-10 rounded-xl bg-white dark:bg-[#1e1e1e] border border-slate-200 dark:border-[#2a2a2a] text-slate-500 dark:text-[#aaaaaa] hover:text-slate-900 hover:border-slate-300 dark:hover:bg-[#2a2a2a] transition-all shadow-sm relative focus:outline-none"
        >
          <Bell class="h-5 w-5" />
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
      <div class="hidden md:flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-[#2a2a2a]">
        <div class="flex flex-col items-end">
          <span class="text-sm font-semibold text-slate-900 dark:text-white">{{ authStore.isAuthenticated ? authStore.user?.name : 'Guest' }}</span>
          <span class="text-xs text-slate-500 dark:text-[#aaaaaa]">{{ authStore.isAuthenticated ? 'Member' : 'Public Access' }}</span>
        </div>
        <img :src="`https://ui-avatars.com/api/?name=${authStore.isAuthenticated ? authStore.user?.name : 'Guest'}&background=10b981&color=fff`" alt="User avatar" class="w-10 h-10 rounded-xl border-2 border-white dark:border-[#2a2a2a] shadow-md object-cover" />
      </div>
      <!-- Mobile Profile Avatar -->
      <img :src="`https://ui-avatars.com/api/?name=${authStore.isAuthenticated ? authStore.user?.name : 'Guest'}&background=10b981&color=fff`" alt="User avatar" class="w-10 h-10 rounded-xl border-2 border-white dark:border-[#2a2a2a] shadow-md object-cover md:hidden" />
    </div>
  </header>
</template>
