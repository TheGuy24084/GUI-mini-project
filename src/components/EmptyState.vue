<script setup lang="ts">
import { ChefHat } from 'lucide-vue-next';
</script>

<template>
  <div class="flex flex-col items-center justify-center py-20 px-4 text-center bg-white/50 dark:bg-slate-900/20 backdrop-blur-sm rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 transition-colors duration-300">
    <div class="w-16 h-16 bg-emerald-50 dark:bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-4 text-emerald-500 shadow-inner">
      <ChefHat class="w-8 h-8" />
    </div>
    <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-1">No recipes found</h3>
    <p class="text-slate-500 dark:text-slate-400 max-w-sm font-medium">We couldn't find any recipes matching your criteria. Try a different search or cuisine!</p>
  </div>
</template>
