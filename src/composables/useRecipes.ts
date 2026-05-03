import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useRecipeStore } from '../store/recipeStore';

export function useRecipes() {
  const recipeStore = useRecipeStore();
  const { recipes, filteredRecipes } = storeToRefs(recipeStore);

  const favoritedRecipes = computed(() => recipes.value.filter((r) => r.isFavorited));

  const toggleFavorite = (id: string) => {
    recipeStore.toggleFavorite(id);
  };

  return {
    recipes,
    filteredRecipes,
    favoritedRecipes,
    toggleFavorite,
  };
}
