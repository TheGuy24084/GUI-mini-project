<script setup lang="ts">
import { computed } from 'vue';
import { useBookStore } from '../store/bookStore';
import { useToast } from '../composables/useToast';
import type { Book } from '../data/books';

const props = defineProps<{ book: Book }>();
const store = useBookStore();
const { showToast } = useToast();

function openBookDetail() {
  store.selectBook(props.book);
}

const daysRemaining = computed(() => {
  if (!props.book.returnBy) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const returnDate = new Date(props.book.returnBy);
  returnDate.setHours(0, 0, 0, 0);
  const diffTime = returnDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
});

const statusText = computed(() => {
  if (props.book.isAvailable) return 'Available';
  if (daysRemaining.value !== null) {
    if (daysRemaining.value < 0) return 'Overdue';
    if (daysRemaining.value === 0) return 'Due today';
    return `Due in ${daysRemaining.value}d`;
  }
  return 'Borrowed';
});

function handleToggle() {
  const result = store.toggleBookStatus(props.book.id);
  if (result) {
    const { action, book } = result;
    if (action === 'borrowed') {
      showToast(`Borrowed "${book.title}". Enjoy!`, 'success');
    } else {
      showToast(`Returned "${book.title}". Thank you!`, 'success');
    }
  }
}
</script>

<template>
  <div 
    @click="openBookDetail"
    class="group relative flex flex-col bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-2xl hover:shadow-emerald-500/20 hover:-translate-y-2 transition-all duration-300 cursor-pointer"
  >
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
      <span class="text-xs text-slate-400 mb-2">{{ book.category }}</span>

      <!-- Description Snippet -->
      <p v-if="book.description" class="text-[11px] text-slate-500 line-clamp-2 italic mb-3 leading-relaxed">
        {{ book.description }}
      </p>

      <!-- Tags -->
      <div v-if="book.tags && book.tags.length > 0" class="flex flex-wrap gap-1 mb-4">
        <span 
          v-for="tag in book.tags" 
          :key="tag"
          class="px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 text-[9px] font-bold tracking-tight uppercase"
        >
          {{ tag }}
        </span>
      </div>

      <div class="mt-auto flex items-center justify-between gap-2">
        <!-- Status Badge -->
        <span
          class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border transition-colors duration-300"
          :class="book.isAvailable
            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
            : (daysRemaining !== null && daysRemaining < 0) 
              ? 'bg-rose-50 text-rose-700 border-rose-200' 
              : 'bg-amber-100 text-amber-900 border-amber-200'"
        >
          {{ statusText }}
        </span>

        <!-- Borrow / Return Button -->
        <button
          @click.stop="handleToggle"
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

