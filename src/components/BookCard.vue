<script setup lang="ts">
import type { Book } from '../data/books';

defineProps<{ book: Book }>();
</script>

<template>
  <div class="group relative flex flex-col bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl hover:shadow-emerald-500/10 hover:-translate-y-1 transition-all duration-300 cursor-pointer">
    <!-- Book Cover Placeholder -->
    <div class="h-48 w-full bg-gradient-to-br from-slate-800 to-slate-900 relative flex items-center justify-center p-6 text-center overflow-hidden">
      <!-- Decorative background blur -->
      <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
      
      <h3 class="text-white font-serif text-lg font-medium leading-snug z-20 group-hover:scale-105 transition-transform duration-500">{{ book.title }}</h3>
    </div>

    <!-- Content -->
    <div class="p-5 flex flex-col flex-1 bg-white">
      <div class="flex justify-between items-start mb-1 gap-2">
        <h4 class="font-semibold text-slate-900 line-clamp-1 flex-1" :title="book.title">{{ book.title }}</h4>
      </div>
      <p class="text-sm text-slate-500 mb-4 line-clamp-1">{{ book.author }}</p>

      <div class="mt-auto flex items-center justify-between">
        <!-- Status Badge -->
        <span 
          class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border"
          :class="book.isAvailable ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'"
        >
          {{ book.isAvailable ? 'Available' : 'Borrowed' }}
        </span>
        
        <!-- Action Button -->
        <button class="text-sm font-semibold text-emerald-600 hover:text-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          View Details &rarr;
        </button>
      </div>
    </div>
  </div>
</template>
