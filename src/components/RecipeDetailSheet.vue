<script setup lang="ts">
import { computed } from 'vue';
import { useRecipeStore } from '../store/recipeStore';
import { onKeyStroke } from '@vueuse/core';
import { ChefHat, Tag, Globe, Clock, Utensils, Star, Heart } from 'lucide-vue-next';

const store = useRecipeStore();
const isOpen = computed(() => store.selectedRecipe !== null);
const recipe = computed(() => store.selectedRecipe);

function close() {
  store.selectRecipe(null);
}

function handleToggleFavorite() {
  if (recipe.value) {
    store.toggleFavorite(recipe.value.id);
  }
}

onKeyStroke('Escape', (e) => {
  if (isOpen.value) {
    e.preventDefault();
    close();
  }
});
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
        v-if="isOpen && recipe"
        class="fixed inset-y-0 right-0 z-[70] w-full max-w-xl bg-white shadow-2xl shadow-slate-900/20 flex flex-col h-full border-l border-slate-200/60 transition-transform duration-500 will-change-transform"
      >
        <!-- Header -->
        <div class="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white z-10 sticky top-0">
          <h2 class="text-lg font-semibold text-slate-800">Recipe Details</h2>
          <div class="flex items-center gap-2">
            <button 
              @click="handleToggleFavorite"
              class="p-2 rounded-xl transition-all duration-300"
              :class="recipe.isFavorited ? 'bg-rose-50 text-rose-500' : 'text-slate-400 hover:bg-slate-100'"
            >
              <Heart :size="20" :class="{ 'fill-current': recipe.isFavorited }" />
            </button>
            <button 
              @click="close"
              class="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-200"
              aria-label="Close panel"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
            </button>
          </div>
        </div>

        <!-- Scrollable Body -->
        <div class="flex-1 overflow-y-auto overflow-x-hidden">
          <!-- Large Cover Image -->
          <div class="relative w-full h-80 bg-slate-800 flex items-center justify-center overflow-hidden">
            <img 
              v-if="recipe.image" 
              :src="recipe.image" 
              :alt="recipe.name" 
              class="absolute inset-0 w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80 z-10"></div>
            <div class="absolute bottom-6 left-6 right-6 z-20">
              <div class="flex items-center gap-2 mb-2">
                <span class="px-2 py-0.5 rounded-md bg-emerald-500 text-white text-[10px] font-bold tracking-wider uppercase">
                  {{ recipe.cuisine }}
                </span>
                <div class="flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/20 backdrop-blur-md text-white text-[10px] font-bold">
                  <Star :size="10" class="text-yellow-400 fill-yellow-400" />
                  {{ recipe.rating }}
                </div>
              </div>
              <h1 class="text-3xl font-bold text-white leading-tight drop-shadow-lg">{{ recipe.name }}</h1>
            </div>
          </div>

          <div class="p-6 space-y-8 pb-32">
            <!-- Metadata Grid -->
            <div class="grid grid-cols-3 gap-4">
              <div class="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col items-center gap-1">
                <Clock :size="18" class="text-emerald-500 mb-1" />
                <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400 text-center">Total Time</span>
                <span class="font-bold text-slate-800">{{ recipe.prepTimeMinutes + recipe.cookTimeMinutes }}m</span>
              </div>
              <div class="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col items-center gap-1">
                <ChefHat :size="18" class="text-emerald-500 mb-1" />
                <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400 text-center">Difficulty</span>
                <span class="font-bold text-slate-800">{{ recipe.difficulty }}</span>
              </div>
              <div class="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col items-center gap-1">
                <Utensils :size="18" class="text-emerald-500 mb-1" />
                <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400 text-center">Servings</span>
                <span class="font-bold text-slate-800">{{ recipe.servings }}</span>
              </div>
            </div>

            <!-- Ingredients -->
            <div>
              <h3 class="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Tag class="w-5 h-5 text-emerald-500" />
                Ingredients
              </h3>
              <ul class="space-y-3">
                <li v-for="ingredient in recipe.ingredients" :key="ingredient" class="flex items-start gap-3 text-slate-600">
                  <div class="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0"></div>
                  <span class="text-sm font-medium">{{ ingredient }}</span>
                </li>
              </ul>
            </div>

            <!-- Instructions -->
            <div>
              <h3 class="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Globe class="w-5 h-5 text-emerald-500" />
                Instructions
              </h3>
              <div class="space-y-6">
                <div v-for="(step, index) in recipe.instructions" :key="index" class="flex gap-4">
                  <div class="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center font-bold text-sm">
                    {{ index + 1 }}
                  </div>
                  <p class="text-sm text-slate-600 leading-relaxed pt-1.5">{{ step }}</p>
                </div>
              </div>
            </div>

            <!-- Tags -->
            <div v-if="recipe.tags && recipe.tags.length > 0">
              <h3 class="text-sm font-bold text-slate-800 mb-3">Meal Types & Tags</h3>
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="tag in [...recipe.mealType, ...recipe.tags]" 
                  :key="tag"
                  class="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-[11px] font-bold tracking-tight uppercase"
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
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.slide-enter-active { transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1); }
.slide-leave-active { transition: transform 0.3s cubic-bezier(0.4, 0, 1, 1); }
.slide-enter-from, .slide-leave-to { transform: translateX(100%); }
</style>
