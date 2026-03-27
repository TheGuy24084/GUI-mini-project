<script setup lang="ts">
import { SearchX } from 'lucide-vue-next';
</script>

<template>
  <div class="flex flex-col items-center justify-center py-20 px-4 text-center bg-white/50 backdrop-blur-sm rounded-3xl border border-dashed border-slate-300">
    <div class="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-400">
      <SearchX class="w-8 h-8" />
    </div>
    <h3 class="text-lg font-semibold text-slate-900 mb-1">No books found</h3>
    <p class="text-slate-500 max-w-sm">We couldn't find anything matching your search. Try adjusting your query.</p>
  </div>
</template>
