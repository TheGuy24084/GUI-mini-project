<script setup lang="ts">
import { computed } from 'vue';
import { useRecipeStore } from '../store/recipeStore';
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const store = useRecipeStore();

const chartData = computed(() => {
  const recipes = store.recipes;
  const difficultyCounts: Record<string, number> = { 'Easy': 0, 'Medium': 0, 'Hard': 0 };
  
  recipes.forEach(r => {
    if (difficultyCounts[r.difficulty] !== undefined) {
      difficultyCounts[r.difficulty]++;
    }
  });

  return {
    labels: Object.keys(difficultyCounts),
    datasets: [
      {
        label: 'Recipes',
        backgroundColor: ['#10b981', '#f59e0b', '#ef4444'], // Emerald, Amber, Rose
        borderRadius: 8,
        data: Object.values(difficultyCounts)
      }
    ]
  };
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        display: false
      }
    },
    x: {
      grid: {
        display: false
      }
    }
  }
};
</script>

<template>
  <div class="h-64 w-full">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>
