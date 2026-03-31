<script setup lang="ts">
import { computed } from 'vue';
import { Book, BookmarkCheck, LayoutGrid } from 'lucide-vue-next';
import { useBookStore } from '../store/bookStore';

const store = useBookStore();
const stats = computed(() => store.stats);

const statCards = computed(() => [
  {
    label: 'Total Books',
    value: stats.value.total,
    icon: LayoutGrid,
    color: 'text-blue-600',
    bg: 'bg-blue-50'
  },
  {
    label: 'Currently Borrowed',
    value: stats.value.borrowed,
    icon: BookmarkCheck,
    color: 'text-amber-600',
    bg: 'bg-amber-50'
  },
  {
    label: 'Available Now',
    value: stats.value.available,
    icon: Book,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50'
  }
]);
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
    <div 
      v-for="stat in statCards" 
      :key="stat.label"
      class="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-slate-200/50 shadow-sm hover:shadow-md transition-all duration-300 group"
    >
      <div class="flex items-center justify-between mb-4">
        <div :class="[stat.bg, stat.color, 'p-3 rounded-xl transition-colors group-hover:scale-110 duration-300']">
          <component :is="stat.icon" :size="24" />
        </div>
        <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">{{ stat.label }}</span>
      </div>
      <div class="flex items-baseline gap-2">
        <span class="text-3xl font-bold text-slate-900">{{ stat.value }}</span>
        <span class="text-slate-500 text-sm font-medium">items</span>
      </div>
    </div>
  </div>
</template>
