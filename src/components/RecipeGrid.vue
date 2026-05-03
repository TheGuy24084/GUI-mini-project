<script setup lang="ts">
import { useRecipeStore } from '../store/recipeStore';
import RecipeCard from './RecipeCard.vue';
import EmptyState from './EmptyState.vue';

const store = useRecipeStore();
</script>

<template>
  <div class="w-full">
    <TransitionGroup 
      v-if="store.filteredRecipes.length > 0" 
      name="list" 
      tag="div" 
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 relative"
    >
      <RecipeCard
        v-for="recipe in store.filteredRecipes"
        :key="recipe.id"
        :recipe="recipe"
      />
    </TransitionGroup>
    <div v-else>
      <EmptyState />
    </div>
  </div>
</template>

<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.list-leave-active {
  position: absolute;
  z-index: -1;
}
</style>
