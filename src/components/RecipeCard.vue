<script setup lang="ts">
import { computed } from 'vue';
import { useRecipeStore } from '../store/recipeStore';
import { useAuthStore } from '../store/authStore';
import { useUiStore } from '../store/uiStore';
import { useToast } from '../composables/useToast';
import { Heart, Clock, ChefHat, Star } from 'lucide-vue-next';
import type { Recipe } from '../data/recipes';

const props = defineProps<{ recipe: Recipe }>();
const store = useRecipeStore();
const authStore = useAuthStore();
const uiStore = useUiStore();
const { showToast } = useToast();

function openRecipeDetail() {
  store.selectRecipe(props.recipe);
}

function handleToggleFavorite() {
  store.toggleFavorite(props.recipe.id);
  if (props.recipe.isFavorited) {
    showToast(`Added "${props.recipe.name}" to favorites!`, 'success');
  }
}
</script>

<template>
  <div 
    @click="openRecipeDetail"
    class="group relative flex flex-col bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-sm dark:shadow-black/50 border border-slate-100 dark:border-[#2a2a2a] overflow-hidden hover:shadow-2xl hover:shadow-emerald-500/20 dark:hover:shadow-emerald-500/10 hover:-translate-y-2 transition-all duration-300 cursor-pointer"
  >
    <!-- Recipe Image -->
    <div 
      class="w-full relative overflow-hidden bg-slate-800 transition-all duration-300"
      :class="uiStore.compactMode ? 'h-32' : 'h-48'"
    >
      <img
        v-if="recipe.image"
        :src="recipe.image"
        :alt="recipe.name"
        class="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10"></div>
      
      <!-- Rating Badge -->
      <div class="absolute top-3 left-3 z-20 flex items-center gap-1 px-2 py-1 rounded-lg bg-black/40 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold">
        <Star :size="10" class="text-yellow-400 fill-yellow-400" />
        {{ recipe.rating }}
      </div>

      <!-- Favorite Button -->
      <button 
        @click.stop="handleToggleFavorite"
        class="absolute top-3 right-3 z-20 p-2 rounded-full transition-all duration-300"
        :class="recipe.isFavorited ? 'bg-rose-500 text-white scale-110 shadow-lg' : 'bg-black/40 backdrop-blur-md text-white hover:bg-white hover:text-rose-500 border border-white/10'"
      >
        <Heart :size="16" :class="{ 'fill-current': recipe.isFavorited }" />
      </button>

      <div class="absolute bottom-3 left-3 right-3 z-20">
        <h3 class="text-white font-bold text-lg leading-tight line-clamp-2 drop-shadow-md">{{ recipe.name }}</h3>
      </div>
    </div>

    <!-- Content -->
    <div 
      class="flex flex-col flex-1 bg-white dark:bg-[#1e1e1e] transition-all duration-300"
      :class="uiStore.compactMode ? 'p-3' : 'p-5'"
    >
      <div class="flex items-center gap-2 mb-2">
        <span class="text-[10px] font-bold tracking-wider uppercase text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded-md">
          {{ recipe.cuisine }}
        </span>
        <span class="text-[10px] font-bold tracking-wider uppercase text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
          {{ recipe.difficulty }}
        </span>
      </div>

      <div class="flex items-center gap-4 text-slate-500 dark:text-slate-400 mb-4">
        <div class="flex items-center gap-1.5">
          <Clock :size="14" class="opacity-60" />
          <span class="text-xs font-medium">{{ recipe.prepTimeMinutes + recipe.cookTimeMinutes }}m</span>
        </div>
        <div class="flex items-center gap-1.5">
          <ChefHat :size="14" class="opacity-60" />
          <span class="text-xs font-medium">{{ recipe.ingredients.length }} ingredients</span>
        </div>
      </div>

      <!-- Tags -->
      <div v-if="recipe.tags && recipe.tags.length > 0" class="flex flex-wrap gap-1 mt-auto">
        <span 
          v-for="tag in recipe.tags.slice(0, 3)" 
          :key="tag"
          class="px-1.5 py-0.5 rounded-md bg-slate-50 dark:bg-[#2a2a2a] text-slate-400 dark:text-[#666] text-[9px] font-bold tracking-tight uppercase border border-slate-100 dark:border-white/5"
        >
          #{{ tag }}
        </span>
      </div>
    </div>
  </div>
</template>
