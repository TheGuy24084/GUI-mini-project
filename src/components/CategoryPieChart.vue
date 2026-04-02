<script setup lang="ts">
import { computed } from 'vue';
import { useBookStore } from '../store/bookStore';
import { Pie } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

const store = useBookStore();

const chartData = computed(() => {
  const books = store.books;
  const categoryCounts: Record<string, number> = {};
  
  books.forEach(book => {
    if (categoryCounts[book.category]) {
      categoryCounts[book.category]++;
    } else {
      categoryCounts[book.category] = 1;
    }
  });

  return {
    labels: Object.keys(categoryCounts),
    datasets: [
      {
        backgroundColor: ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6'],
        data: Object.values(categoryCounts)
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
    }
  }
};
</script>

<template>
  <div class="h-64 w-full">
    <Pie :data="chartData" :options="chartOptions" />
  </div>
</template>
