<script setup lang="ts">
import { Menu, Utensils } from 'lucide-vue-next';
import { useUiStore } from '../../store/uiStore';
import { useRecipeStore } from '../../store/recipeStore';
import { useRouter } from 'vue-router';

const uiStore = useUiStore();
const recipeStore = useRecipeStore();
const router = useRouter();

function goHome() {
  recipeStore.setCuisine(null);
  router.push('/');
}
</script>

<template>
  <header class="lg:hidden h-16 flex-shrink-0 flex items-center justify-between px-4 bg-white/80 dark:bg-[#1e1e1e]/90 backdrop-blur-xl border-b border-slate-200/50 dark:border-[#2a2a2a] sticky top-0 z-40 transition-all duration-300">
    
    <!-- Left: Menu Trigger -->
    <button 
      @click="uiStore.isSidebarOpen = true"
      class="p-2 -ml-2 rounded-xl text-slate-500 dark:text-[#aaaaaa] hover:bg-slate-100 dark:hover:bg-[#2a2a2a] transition-colors"
    >
      <Menu class="h-6 w-6" />
    </button>

    <!-- Center: Brand/Logo (Home Link) -->
    <button 
      @click="goHome"
      class="flex items-center gap-2 group focus:outline-none"
    >
      <div class="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500 text-white shadow-md shadow-emerald-500/30 group-active:scale-95 transition-transform">
        <Utensils :size="16" stroke-width="2.5" />
      </div>
      <span class="text-lg font-bold tracking-tight text-slate-900 dark:text-white">Culinara<span class="text-emerald-500">.</span></span>
    </button>

    <!-- Right: Spacer (For Balance) -->
    <div class="w-10"></div>

  </header>
</template>
