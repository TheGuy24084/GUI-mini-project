<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useRecipeStore } from '../store/recipeStore';
import CuisinePieChart from '../components/CuisinePieChart.vue';
import DifficultyBarChart from '../components/DifficultyBarChart.vue';
import DashboardHeader from '../components/DashboardHeader.vue';
import { Sparkles, BarChart2, PieChart as PieChartIcon } from 'lucide-vue-next';

const store = useRecipeStore();

// Initial load for the AI summary
onMounted(() => {
  if (!store.analyticsSummary) {
    store.updateAnalyticsSummary();
  }
});

// Reactively update the summary when the stats change
watch(
  () => store.stats,
  (newStats, oldStats) => {
    if (newStats.total !== oldStats?.total || newStats.favorited !== oldStats?.favorited) {
      store.updateAnalyticsSummary();
    }
  },
  { deep: true }
);

</script>

<template>
  <div class="flex flex-col h-full w-full">
    <DashboardHeader />
    <div class="flex-1 overflow-y-auto p-4 md:p-8 relative">
      <div class="max-w-7xl mx-auto space-y-6">
        
        <!-- Header Section -->
        <div class="mb-6">
          <h2 class="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">Kitchen Analytics</h2>
          <p class="text-slate-500 dark:text-[#aaaaaa]">Visual insights into your culinary collection.</p>
        </div>
        
        <!-- AI Summary Card -->
        <div class="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-2xl p-6 border border-emerald-100 shadow-sm relative overflow-hidden group">
          <div class="absolute right-0 top-0 opacity-10 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform duration-700">
            <Sparkles :size="120" />
          </div>
          <div class="relative z-10 flex flex-col md:flex-row gap-6 items-start md:items-center">
            <div class="flex-shrink-0 w-12 h-12 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/30">
              <Sparkles :size="24" />
            </div>
            <div class="flex-1">
              <h3 class="text-sm font-bold text-emerald-800 uppercase tracking-widest mb-1 flex items-center gap-2">
                Gemini 3 Pro Kitchen Insights
              </h3>
              <p class="text-emerald-900/80 leading-relaxed font-medium">
                {{ store.analyticsSummary || 'Analyzing culinary data...' }}
              </p>
            </div>
          </div>
        </div>

        <!-- Charts Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-12">
          
          <!-- Cuisine Distribution Card -->
          <div class="bg-white rounded-2xl border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-300">
            <div class="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <div class="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <PieChartIcon :size="20" stroke-width="2.5" />
              </div>
              <h3 class="text-lg font-bold text-slate-800">Cuisine Distribution</h3>
            </div>
            <CuisinePieChart />
          </div>

          <!-- Difficulty Levels Card -->
          <div class="bg-white rounded-2xl border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-300">
            <div class="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <div class="p-2 bg-rose-50 text-rose-600 rounded-lg">
                <BarChart2 :size="20" stroke-width="2.5" />
              </div>
              <h3 class="text-lg font-bold text-slate-800">Difficulty Levels</h3>
            </div>
            <DifficultyBarChart />
          </div>

        </div>

      </div>
    </div>
  </div>
</template>
