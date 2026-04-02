<script setup lang="ts">
import { computed } from 'vue';
import { useBookStore } from '../store/bookStore';
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const store = useBookStore();

const chartData = computed(() => {
  const stats = store.stats;
  return {
    labels: ['Available', 'Borrowed'],
    datasets: [
      {
        label: 'Books',
        backgroundColor: ['#10b981', '#ef4444'], // Emerald for available, Red for borrowed
        data: [stats.available, stats.borrowed]
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
      ticks: {
        stepSize: 1
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
