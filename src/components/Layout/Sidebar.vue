<script setup lang="ts">
import { computed } from 'vue';
import { 
  LayoutDashboard, 
  Library, 
  Settings, 
  LogOut, 
  Layers,
  FilterX,
  PieChart
} from 'lucide-vue-next';
import { useBookStore } from '../../store/bookStore';
import { useRoute } from 'vue-router';

const store = useBookStore();
const route = useRoute();

const categories = computed(() => store.categories);
const activeCategory = computed(() => store.selectedCategory);

function selectCategory(category: string | null) {
  store.setCategory(category);
}
</script>

<template>
  <aside class="w-72 flex-shrink-0 flex flex-col justify-between p-6 bg-white/60 backdrop-blur-xl border-r border-slate-200/50 relative z-10 hidden md:flex">
    
    <div>
      <!-- Brand -->
      <div class="flex items-center gap-3 px-2 mb-10">
        <div class="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-500 text-white shadow-lg shadow-emerald-500/30">
          <Library :size="20" stroke-width="2.5" />
        </div>
        <span class="text-xl font-bold tracking-tight text-slate-900">SmartLib<span class="text-emerald-500">.</span></span>
      </div>

      <!-- Main Navigation -->
      <div class="mb-8">
        <p class="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Menu</p>
        <nav class="space-y-1">
          <router-link 
            to="/"
            @click="selectCategory(null)"
            class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium group"
            :class="route.path === '/' && !activeCategory ? 'bg-slate-900 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'"
          >
            <LayoutDashboard :size="20" :class="route.path === '/' && !activeCategory ? 'text-emerald-400' : 'text-slate-400 group-hover:text-slate-600'" />
            Dashboard
          </router-link>
          
          <router-link 
            to="/analytics"
            @click="selectCategory(null)"
            class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium group mt-1"
            :class="route.path === '/analytics' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'"
          >
            <PieChart :size="20" :class="route.path === '/analytics' ? 'text-emerald-400' : 'text-slate-400 group-hover:text-slate-600'" />
            Analytics
          </router-link>
        </nav>
      </div>

      <!-- Dynamic Categories -->
      <div class="mb-4">
        <div class="flex items-center justify-between px-4 mb-4">
          <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Categories</p>
          <button 
            v-if="activeCategory"
            @click="selectCategory(null)"
            class="text-[10px] flex items-center gap-1 text-emerald-600 hover:text-emerald-700 font-bold transition-colors"
          >
            <FilterX :size="12" />
            CLEAR
          </button>
        </div>
        
        <nav class="space-y-1">
          <button 
            v-for="category in categories" 
            :key="category"
            @click="selectCategory(category)"
            class="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium text-left group border-l-4 border-transparent"
            :class="activeCategory === category 
              ? 'bg-slate-800 text-white border-emerald-500 shadow-sm' 
              : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'"
          >
            <Layers :size="18" :class="activeCategory === category ? 'text-emerald-400' : 'text-slate-400 group-hover:text-slate-600'" />
            {{ category }}
          </button>
        </nav>
      </div>
    </div>

    <!-- Bottom Actions -->
    <div class="space-y-2 pt-6 border-t border-slate-200/50">
      <a href="#" class="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-100/80 hover:text-slate-900 transition-all font-medium group">
        <Settings :size="20" class="text-slate-400 group-hover:text-slate-600" />
        Settings
      </a>
      <a href="#" class="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-red-50 hover:text-red-600 transition-all font-medium group">
        <LogOut :size="20" class="text-slate-400 group-hover:text-red-500 transition-colors" />
        Logout
      </a>
    </div>
  </aside>
</template>
