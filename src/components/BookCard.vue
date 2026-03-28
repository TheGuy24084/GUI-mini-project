<script setup lang="ts">
import { useBookStore } from '../store/bookStore';
import type { Book } from '../data/books';

const props = defineProps<{ book: Book }>();
const store = useBookStore();
</script>

<template>
  <div class="group relative flex flex-col bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl hover:shadow-emerald-500/10 hover:-translate-y-1 transition-all duration-300 cursor-pointer">
    <!-- Book Cover -->
    <div class="h-48 w-full relative flex items-center justify-center p-6 text-center overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900">
      <img
        v-if="book.coverImage"
        :src="book.coverImage"
        :alt="`Cover of ${book.title}`"
        class="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500"
        @error="($event.target as HTMLImageElement).style.display = 'none'"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10 z-10"></div>
      <h3 class="text-white font-serif text-lg font-medium leading-snug z-20 group-hover:scale-105 transition-transform duration-500 drop-shadow-sm">{{ book.title }}</h3>
    </div>

    <!-- Content -->
    <div class="p-5 flex flex-col flex-1 bg-white">
      <div class="flex justify-between items-start mb-1 gap-2">
        <h4 class="font-semibold text-slate-900 line-clamp-1 flex-1" :title="book.title">{{ book.title }}</h4>
      </div>
      <p class="text-sm text-slate-500 mb-1 line-clamp-1">{{ book.author }}</p>
      <span class="text-xs text-slate-400 mb-4">{{ book.category }}</span>

      <div class="mt-auto flex items-center justify-between gap-2">
        <!-- Status Badge -->
        <span
          class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border transition-colors duration-300"
          :class="book.isAvailable
            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
            : 'bg-amber-50 text-amber-700 border-amber-200'"
        >
          {{ book.isAvailable ? 'Available' : 'Borrowed' }}
        </span>

        <!-- Borrow / Return Button -->
        <button
          @click.stop="store.toggleBookStatus(book.id)"
          class="text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1"
          :class="book.isAvailable
            ? 'bg-emerald-500 text-white hover:bg-emerald-600 focus:ring-emerald-500'
            : 'bg-slate-100 text-slate-600 hover:bg-slate-200 focus:ring-slate-400'"
          :id="`borrow-btn-${book.id}`"
        >
          {{ book.isAvailable ? 'Borrow' : 'Return' }}
        </button>
      </div>
    </div>
  </div>
</template>
