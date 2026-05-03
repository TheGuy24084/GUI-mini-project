<script setup lang="ts">
import { computed } from 'vue';
import { useRecipeStore } from '../store/recipeStore';
import { Pie } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

const store = useRecipeStore();

const chartData = computed(() => {
  const recipes = store.recipes;
  const cuisineCounts: Record<string, number> = {};
  
  recipes.forEach(recipe => {
    if (cuisineCounts[recipe.cuisine]) {
      cuisineCounts[recipe.cuisine]++;
    } else {
      cuisineCounts[recipe.cuisine] = 1;
    }
  });

  return {
    labels: Object.keys(cuisineCounts),
    datasets: [
      {
        backgroundColor: ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316', '#06b6d4'],
        data: Object.values(cuisineCounts)
      }
    ]
  };
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: {
        usePointStyle: true,
        padding: 20,
        font: {
          size: 11
        }
      }
    }
  }
};
</script>

<template>
  <div class="h-64 w-full">
    <Pie :data="chartData" :options="chartOptions" />
  </div>
</template>
