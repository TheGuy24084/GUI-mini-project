<script setup lang="ts">
import { ref } from 'vue';
import DashboardHeader from '../components/DashboardHeader.vue';
import RecipeGrid from '../components/RecipeGrid.vue';
import BaseModal from '../components/BaseModal.vue';
import AddRecipeForm from '../components/AddRecipeForm.vue';
import StatsGrid from '../components/StatsGrid.vue';
import { useRecipeStore } from '../store/recipeStore';
import { useAuthStore } from '../store/authStore';
import { Plus } from 'lucide-vue-next';

const store = useRecipeStore();
const authStore = useAuthStore();
const isAddModalOpen = ref(false);
</script>

<template>
  <div class="flex flex-col h-full w-full">
    <DashboardHeader />
    <div class="flex-1 overflow-y-auto p-4 md:p-8 relative">
      <!-- Page Header Row -->
      <div class="mb-6 max-w-7xl mx-auto flex items-start justify-between gap-4">
        <div>
          <h2 class="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">Recipe Collection</h2>
          <p class="text-slate-500 dark:text-[#aaaaaa]">Explore world cuisines and save your favorites.</p>
        </div>
        <button
          v-if="authStore.isAuthenticated"
          id="open-add-recipe-modal-btn"
          @click="isAddModalOpen = true"
          class="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-[0.97] transition-all shadow-sm shadow-emerald-600/30 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:ring-offset-1"
        >
          <Plus :size="18" stroke-width="2.5" />
          Add Recipe
        </button>
      </div>

      <div class="max-w-7xl mx-auto pb-12">
        <!-- Stats Section -->
        <StatsGrid />
        
        <!-- Recipe Grid with Transition -->
        <transition 
          enter-active-class="transform transition duration-500 ease-out" 
          enter-from-class="opacity-0 translate-y-4" 
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transform transition duration-300 ease-in"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 -translate-y-4"
          mode="out-in"
        >
          <div :key="store.selectedCuisine || 'all'">
            <RecipeGrid />
          </div>
        </transition>
      </div>
    </div>
  </div>

  <!-- Add Recipe Modal -->
  <BaseModal v-model="isAddModalOpen" title="Add New Recipe">
    <AddRecipeForm @close="isAddModalOpen = false" />
  </BaseModal>
</template>
