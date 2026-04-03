<script setup lang="ts">
import { computed, ref } from 'vue';
import { useBookStore } from '../store/bookStore';
import { onKeyStroke } from '@vueuse/core';
import { Calendar, Tag, User, Hash, Sparkles } from 'lucide-vue-next';

const store = useBookStore();
const isOpen = computed(() => store.selectedBook !== null);
const selectedBook = computed(() => store.selectedBook);

function close() {
  store.selectBook(null);
}

onKeyStroke('Escape', (e) => {
  if (isOpen.value) {
    e.preventDefault();
    close();
  }
});

const isGenerating = ref(false);

async function handleGenerateSummary() {
  if (!selectedBook.value || selectedBook.value.description) return;
  isGenerating.value = true;
  try {
    await store.generateBookSummary(selectedBook.value.id);
  } catch (err) {
    console.error(err);
  } finally {
    isGenerating.value = false;
  }
}
</script>

<template>
  <Teleport to="body">
    <!-- Backdrop -->
    <Transition name="fade">
      <div 
        v-if="isOpen" 
        class="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60]"
        @click="close"
      ></div>
    </Transition>

    <!-- Slide-over panel -->
    <Transition name="slide">
      <div 
        v-if="isOpen && selectedBook"
        class="fixed inset-y-0 right-0 z-[70] w-full max-w-md bg-white shadow-2xl shadow-slate-900/20 flex flex-col h-full border-l border-slate-200/60 transition-transform duration-500 will-change-transform"
      >
        <!-- Header -->
        <div class="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white z-10 sticky top-0">
          <h2 class="text-lg font-semibold text-slate-800">Book Details</h2>
          <button 
            @click="close"
            class="p-2 -mr-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-200"
            aria-label="Close panel"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
        </div>

        <!-- Scrollable Body -->
        <div class="flex-1 overflow-y-auto overflow-x-hidden">
          <!-- Large Cover Image -->
          <div class="relative w-full h-72 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center overflow-hidden">
            <img 
              v-if="selectedBook.coverImage" 
              :src="selectedBook.coverImage" 
              alt="Cover Image" 
              class="absolute inset-0 w-full h-full object-cover opacity-50 blur-[2px]"
              @error="($event.target as HTMLImageElement).style.display = 'none'"
            />
            <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-10"></div>
            <div class="z-20 p-6 flex flex-col items-center max-w-[80%] text-center">
              <h1 class="text-2xl font-serif font-bold text-white mb-2 leading-tight drop-shadow-md">{{ selectedBook.title }}</h1>
              <p class="text-slate-300 font-medium flex items-center gap-1.5 drop-shadow">
                <User class="w-4 h-4 opacity-80" />
                {{ selectedBook.author }}
              </p>
            </div>
            
            <!-- Floating Status Badge -->
            <div class="absolute bottom-4 right-4 z-20">
              <span
                class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold shadow-lg backdrop-blur-md border"
                :class="selectedBook.isAvailable
                  ? 'bg-emerald-500/90 text-white border-emerald-400'
                  : 'bg-amber-500/90 text-white border-amber-400'"
              >
                {{ selectedBook.isAvailable ? 'Available' : 'Borrowed' }}
              </span>
            </div>
          </div>

          <div class="p-6 space-y-8 pb-32">
            <!-- Metadata Grid -->
            <div class="grid grid-cols-2 gap-4">
              <!-- Category -->
              <div class="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col gap-1">
                <span class="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5"><Tag class="w-3.5 h-3.5" /> Category</span>
                <span class="font-medium text-slate-800">{{ selectedBook.category }}</span>
              </div>
              <!-- ISBN -->
              <div class="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col gap-1">
                <span class="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5"><Hash class="w-3.5 h-3.5" /> ISBN</span>
                <span class="font-medium text-slate-800">{{ selectedBook.isbn || 'Unknown' }}</span>
              </div>
              <!-- Date Added -->
              <div class="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col gap-1 col-span-2">
                <span class="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5"><Calendar class="w-3.5 h-3.5" /> Added To Library</span>
                <span class="font-medium text-slate-800">{{ new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) }}</span>
              </div>
            </div>

            <hr class="border-slate-100" />

            <!-- AI Summary Section -->
            <div class="flex flex-col gap-4">
              <div class="flex items-center justify-between">
                <h3 class="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <Sparkles class="w-4 h-4 text-emerald-500" />
                  AI Summary
                </h3>
                <button 
                  v-if="!selectedBook.description && !isGenerating"
                  @click="handleGenerateSummary"
                  class="text-xs font-semibold text-emerald-600 hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition-colors"
                >
                  Generate
                </button>
              </div>

              <!-- Loading Skeleton -->
              <div v-if="isGenerating" class="space-y-3 mt-2">
                <div class="h-4 bg-slate-200 rounded-full animate-pulse w-full"></div>
                <div class="h-4 bg-slate-200 rounded-full animate-pulse w-5/6"></div>
                <div class="h-4 bg-slate-200 rounded-full animate-pulse w-4/6"></div>
                <div class="h-4 bg-slate-200 rounded-full animate-pulse w-full"></div>
                <div class="h-4 bg-slate-200 rounded-full animate-pulse w-3/4"></div>
              </div>
              
              <!-- Summary Text -->
              <div v-else-if="selectedBook.description" class="prose prose-sm prose-slate leading-relaxed">
                <p>{{ selectedBook.description }}</p>
              </div>

              <!-- Empty State -->
              <div v-else class="text-center py-8 bg-slate-50 border border-slate-100 border-dashed rounded-2xl">
                <p class="text-sm text-slate-500 mb-3">No AI summary generated yet.</p>
                <button 
                  @click="handleGenerateSummary"
                  class="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700 bg-emerald-50/50 hover:bg-emerald-100 px-4 py-2 rounded-xl border border-emerald-200/50 transition-all"
                >
                  <Sparkles class="w-4 h-4" />
                  Generate Insight
                </button>
              </div>
            </div>

            <!-- Tags -->
            <div v-if="selectedBook.tags && selectedBook.tags.length > 0">
              <h3 class="text-sm font-bold text-slate-800 mb-3">Smart Tags</h3>
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="tag in selectedBook.tags" 
                  :key="tag"
                  class="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-100 text-[11px] font-bold tracking-tight uppercase"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* Backdrop */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Slide Panel */
.slide-enter-active {
  transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.slide-leave-active {
  transition: transform 0.3s cubic-bezier(0.4, 0, 1, 1);
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
</style>
