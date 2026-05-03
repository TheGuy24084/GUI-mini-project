import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';
import { type Recipe } from '../data/recipes';
import { useStorage } from '../composables/useStorage';
import { aiService } from '../services/aiService';

const STORAGE_KEY = 'culinara_recipes';

export const useRecipeStore = defineStore('recipe', () => {
  const { load, save } = useStorage<Recipe[]>(STORAGE_KEY, []);
  
  // Hydrate from LocalStorage
  const recipes = ref<Recipe[]>(load());

  const searchQuery = ref('');
  const selectedCuisine = ref<string | null>(null);
  const selectedRecipe = ref<Recipe | null>(null);
  const analyticsSummary = ref<string>('');

  // Fetch recipes from DummyJSON API if the list is empty
  async function fetchRecipesFromAPI() {
    try {
      const response = await fetch('https://dummyjson.com/recipes?limit=50');
      const data = await response.json();
      
      const apiRecipes: Recipe[] = data.recipes.map((r: any) => ({
        ...r,
        id: String(r.id),
        isFavorited: false
      }));

      recipes.value = apiRecipes;
    } catch (error) {
      console.error('Failed to fetch recipes from DummyJSON:', error);
    }
  }

  // Initialize data
  if (recipes.value.length === 0) {
    fetchRecipesFromAPI();
  }

  // Watch for changes and save to LocalStorage
  watch(
    recipes,
    (mRecipes) => {
      save(mRecipes);
    },
    { deep: true }
  );

  const cuisines = computed(() => {
    return [...new Set(recipes.value.map((r) => r.cuisine))].sort();
  });

  const stats = computed(() => {
    return {
      total: recipes.value.length,
      favorited: recipes.value.filter((r) => r.isFavorited).length,
      cuisines: cuisines.value.length,
    };
  });

  const filteredRecipes = computed(() => {
    let result = recipes.value;

    if (selectedCuisine.value) {
      result = result.filter((r) => r.cuisine === selectedCuisine.value);
    }

    if (searchQuery.value.trim()) {
      const lowerQuery = searchQuery.value.toLowerCase();
      result = result.filter(
        (r) =>
          r.name.toLowerCase().includes(lowerQuery) ||
          r.cuisine.toLowerCase().includes(lowerQuery) ||
          r.tags.some(tag => tag.toLowerCase().includes(lowerQuery)),
      );
    }

    return result;
  });

  function setCuisine(cuisine: string | null) {
    selectedCuisine.value = cuisine;
  }

  function toggleFavorite(id: string) {
    const recipe = recipes.value.find((r) => r.id === id);
    if (recipe) {
      recipe.isFavorited = !recipe.isFavorited;
    }
  }

  function selectRecipe(recipe: Recipe | null) {
    selectedRecipe.value = recipe;
  }

  async function updateAnalyticsSummary() {
    try {
      analyticsSummary.value = await aiService.generateAnalyticsSummary(stats.value, cuisines.value);
    } catch (error) {
      analyticsSummary.value = "Your culinary collection features a diverse range of global cuisines, with a high engagement rate on your favorited recipes.";
    }
  }

  return {
    recipes,
    searchQuery,
    selectedCuisine,
    selectedRecipe,
    cuisines,
    stats,
    filteredRecipes,
    analyticsSummary,
    setCuisine,
    selectRecipe,
    toggleFavorite,
    updateAnalyticsSummary,
    fetchRecipesFromAPI
  };
});
