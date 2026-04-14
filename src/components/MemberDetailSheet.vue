<script setup lang="ts">
import { computed } from 'vue';
import { X, BookOpen, Clock } from 'lucide-vue-next';
import { type User } from '../store/authStore';
import { useBookStore } from '../store/bookStore';

const props = defineProps<{
  isOpen: boolean;
  member: User;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const bookStore = useBookStore();

const borrowedBooks = computed(() => {
  return bookStore.books.filter(b => b.borrowerId === props.member.id);
});

const formatDate = (dateStr?: string) => {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString();
};

const getDaysUntilDue = (returnDateStr?: string) => {
  if (!returnDateStr) return 0;
  const returnDate = new Date(returnDateStr);
  const now = new Date();
  const diffTime = returnDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};
</script>

<template>
  <div v-show="isOpen">
    <!-- Backdrop overlay -->
    <div 
      class="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60] transition-opacity duration-300"
      @click="emit('close')"
    ></div>

    <!-- Slide-over panel -->
    <div 
      class="fixed inset-y-0 right-0 z-[70] w-full max-w-md max-h-screen bg-white dark:bg-[#1e1e1e] shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out border-l border-slate-200 dark:border-[#2a2a2a]"
      :class="isOpen ? 'translate-x-0' : 'translate-x-full'"
    >
      <div class="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-[#2a2a2a] bg-white/80 dark:bg-[#1e1e1e]/80 backdrop-blur-md">
        <h2 class="text-lg font-bold text-slate-800 dark:text-white">Member Detail</h2>
        <button 
          @click="emit('close')"
          class="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
        >
          <X :size="20" />
        </button>
      </div>

      <div class="flex-1 overflow-y-auto w-full no-scrollbar">
        <div class="p-6">
          <div class="flex flex-col items-center text-center border-b border-slate-100 dark:border-slate-800 pb-8 mb-8">
            <img :src="member.avatarUrl" class="w-24 h-24 rounded-full border-4 border-emerald-50 dark:border-emerald-900/30 mb-4 shadow-sm" />
            <h3 class="text-2xl font-bold text-slate-800 dark:text-slate-100">{{ member.name }}</h3>
            <p class="text-slate-500 dark:text-slate-400 mb-2">{{ member.email }}</p>
            <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 rounded-full text-xs font-semibold">
              <BookOpen :size="12" />
              {{ borrowedBooks.length }} Active Borrows
            </div>
          </div>

          <div>
            <h4 class="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Currently Borrowed</h4>
            
            <div v-if="borrowedBooks.length === 0" class="text-center py-6 bg-slate-50 dark:bg-[#0f0f0f] rounded-xl border border-dashed border-slate-200 dark:border-[#2a2a2a]">
              <p class="text-slate-500 dark:text-[#aaaaaa] text-sm">No books currently borrowed.</p>
            </div>

            <div v-else class="space-y-4">
              <div 
                v-for="book in borrowedBooks" 
                :key="book.id"
                class="flex gap-4 p-4 rounded-xl border border-slate-100 dark:border-[#2a2a2a] bg-white dark:bg-[#0f0f0f] shadow-sm"
              >
                <img :src="book.coverImage" :alt="book.title" class="w-12 h-16 object-cover rounded shadow-sm flex-shrink-0" />
                <div class="min-w-0 flex-1">
                  <h5 class="font-bold text-slate-800 dark:text-white truncate">{{ book.title }}</h5>
                  <p class="text-xs text-slate-500 dark:text-[#aaaaaa] mb-2 truncate">{{ book.author }}</p>
                  
                  <div class="flex items-center gap-1 text-[11px] font-medium" :class="getDaysUntilDue(book.returnBy) < 3 ? 'text-red-500 dark:text-red-400' : 'text-slate-500 dark:text-slate-400'">
                    <Clock :size="12" />
                    Due {{ formatDate(book.returnBy) }} ({{ getDaysUntilDue(book.returnBy) }} days)
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
