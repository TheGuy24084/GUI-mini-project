<script setup lang="ts">
import { ref, watch } from 'vue';
import { Search, Bell } from 'lucide-vue-next';
import { useBookStore } from '../store/bookStore';
import { useMagicKeys } from '@vueuse/core';

const store = useBookStore();

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
  <header class="h-20 flex-shrink-0 flex items-center justify-between px-4 md:px-8 bg-white/40 backdrop-blur-xl border-b border-slate-200/50 sticky top-0 z-20">
    <h1 class="text-2xl font-bold text-slate-900 hidden lg:block">Dashboard</h1>

    <!-- Search Bar -->
    <div class="flex-1 max-w-xl mx-4 lg:mx-8 relative group">
      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search class="h-5 w-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
      </div>
      <input
        ref="searchInputRef"
        v-model="store.searchQuery"
        type="text"
        placeholder="Search books by title, author, or category... (⌘K / Ctrl+K)"
        class="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl leading-5 bg-white/60 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-300 shadow-sm"
      />
    </div>

    <!-- User Profile & Notifications -->
    <div class="flex items-center gap-2 md:gap-4">
      <button class="flex items-center justify-center w-10 h-10 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-slate-900 hover:border-slate-300 transition-all shadow-sm relative">
        <Bell class="h-5 w-5" />
        <span class="absolute top-2 right-2.5 w-2 h-2 bg-rose-500 rounded-full border border-rose-100"></span>
      </button>
      <div class="hidden md:flex items-center gap-3 pl-4 border-l border-slate-200">
        <div class="flex flex-col items-end">
          <span class="text-sm font-semibold text-slate-900">Alex Frontend</span>
          <span class="text-xs text-slate-500">Pro Member</span>
        </div>
        <img src="https://i.pravatar.cc/150?img=11" alt="User avatar" class="w-10 h-10 rounded-xl border-2 border-white shadow-md object-cover" />
      </div>
      <!-- Mobile Profile Avatar -->
      <img src="https://i.pravatar.cc/150?img=11" alt="User avatar" class="w-10 h-10 rounded-xl border-2 border-white shadow-md object-cover md:hidden" />
    </div>
  </header>
</template>
