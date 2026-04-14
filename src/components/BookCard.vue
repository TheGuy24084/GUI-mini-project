<script setup lang="ts">
import { computed } from 'vue';
import { useBookStore } from '../store/bookStore';
import { useAuthStore } from '../store/authStore';
import { useUiStore } from '../store/uiStore';
import { useToast } from '../composables/useToast';
import type { Book } from '../data/books';

const props = defineProps<{ book: Book }>();
const store = useBookStore();
const authStore = useAuthStore();
const uiStore = useUiStore();
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
    class="group relative flex flex-col bg-white dark:bg-slate-800 rounded-2xl shadow-sm dark:shadow-slate-900/50 border border-slate-100 dark:border-slate-700/60 overflow-hidden hover:shadow-2xl hover:shadow-emerald-500/20 dark:hover:shadow-emerald-500/10 hover:-translate-y-2 transition-all duration-300 cursor-pointer"
  >
    <!-- Book Cover -->
    <div 
      class="w-full relative flex items-center justify-center text-center overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 transition-all duration-300"
      :class="uiStore.compactMode ? 'h-32 p-3' : 'h-48 p-6'"
    >
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
    <div 
      class="flex flex-col flex-1 bg-white dark:bg-slate-800 transition-all duration-300"
      :class="uiStore.compactMode ? 'p-3' : 'p-5'"
    >
      <div class="flex justify-between items-start mb-1 gap-2">
        <h4 class="font-semibold text-slate-900 dark:text-slate-100 line-clamp-1 flex-1" :title="book.title">{{ book.title }}</h4>
      </div>
      <p class="text-sm text-slate-500 mb-1 line-clamp-1">{{ book.author }}</p>
      <span class="text-xs text-slate-400 mb-2">{{ book.category }}</span>

      <!-- Description Snippet -->
      <Transition
        enter-active-class="transition-all duration-300 ease-out flex"
        enter-from-class="opacity-0 max-h-0 overflow-hidden"
        enter-to-class="opacity-100 max-h-20"
        leave-active-class="transition-all duration-300 ease-in flex"
        leave-from-class="opacity-100 max-h-20"
        leave-to-class="opacity-0 max-h-0 overflow-hidden"
      >
        <p v-if="uiStore.enableAiInsights && book.description" class="text-[11px] text-slate-500 line-clamp-2 italic mb-3 leading-relaxed">
          {{ book.description }}
        </p>
      </Transition>

      <!-- Tags -->
      <div v-if="book.tags && book.tags.length > 0" class="flex flex-wrap gap-1 mb-4">
        <span 
          v-for="tag in book.tags" 
          :key="tag"
          class="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-300 text-[9px] font-bold tracking-tight uppercase"
        >
          {{ tag }}
        </span>
      </div>

      <div class="mt-auto flex items-center justify-between gap-2">
        <!-- Status Badge -->
        <span
          class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border transition-colors duration-300"
          :class="book.isAvailable
            ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20'
            : (daysRemaining !== null && daysRemaining < 0) 
              ? 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20' 
              : 'bg-amber-100 text-amber-900 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20'"
        >
          {{ statusText }}
        </span>

        <!-- Borrow / Return Button -->
        <button
          @click.stop="authStore.isAuthenticated ? handleToggle() : (authStore.isAuthModalOpen = true)"
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

