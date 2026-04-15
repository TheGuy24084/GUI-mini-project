<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useBookStore } from '../store/bookStore';
import CategoryPieChart from '../components/CategoryPieChart.vue';
import AvailabilityBarChart from '../components/AvailabilityBarChart.vue';
import { Sparkles, BarChart2, PieChart as PieChartIcon } from 'lucide-vue-next';

const store = useBookStore();

// Initial load for the AI summary
onMounted(() => {
  if (!store.analyticsSummary) {
    store.updateAnalyticsSummary();
  }
});

// Reactively update the summary when the stats realistically change
watch(
  () => store.stats,
  (newStats, oldStats) => {
    // Only fetch if stats actually changed to prevent redundant calls
    if (newStats.total !== oldStats?.total || newStats.available !== oldStats?.available) {
      store.updateAnalyticsSummary();
    }
  },
  { deep: true }
);

</script>

<template>
  <div class="flex flex-col h-full w-full">
    <!-- Header -->
    <header class="hidden lg:flex bg-white/80 backdrop-blur-md border-b border-slate-200/50 sticky top-0 z-30 px-8 py-5 items-center justify-between transition-all duration-300">
      <div class="flex items-center gap-3">
        <h1 class="text-xl font-bold text-slate-800">Library Analytics</h1>
      </div>
    </header>

    <div class="flex-1 overflow-y-auto p-4 md:p-8 relative">
      <div class="max-w-7xl mx-auto space-y-6">
        
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
                Gemini 3 Pro Data Summary
              </h3>
              <p class="text-emerald-900/80 leading-relaxed font-medium">
                {{ store.analyticsSummary || 'Analyzing library data...' }}
              </p>
            </div>
          </div>
        </div>

        <!-- Charts Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-12">
          
          <!-- Category Distribution Card -->
          <div class="bg-white rounded-2xl border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-300">
            <div class="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <div class="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <PieChartIcon :size="20" stroke-width="2.5" />
              </div>
              <h3 class="text-lg font-bold text-slate-800">Category Distribution</h3>
            </div>
            <CategoryPieChart />
          </div>

          <!-- Availability Status Card -->
          <div class="bg-white rounded-2xl border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-300">
            <div class="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <div class="p-2 bg-rose-50 text-rose-600 rounded-lg">
                <BarChart2 :size="20" stroke-width="2.5" />
              </div>
              <h3 class="text-lg font-bold text-slate-800">Availability Status</h3>
            </div>
            <AvailabilityBarChart />
          </div>

        </div>

      </div>
    </div>
  </div>
</template>
