<script setup lang="ts">
import { Book, Library, Settings, Users, LayoutDashboard, LogOut } from 'lucide-vue-next';

const navItems = [
  { name: 'Dashboard', icon: LayoutDashboard, isActive: true },
  { name: 'My Books', icon: Book, isActive: false },
  { name: 'Browse', icon: Library, isActive: false },
  { name: 'Members', icon: Users, isActive: false },
];
</script>

<template>
  <div class="flex h-screen w-full bg-slate-50 overflow-hidden font-sans text-slate-900 relative">
    
    <!-- Background Decoration for Glassmorphism effect -->
    <div class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>
    <div class="absolute bottom-[-10%] right-[-5%] w-[30%] h-[30%] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"></div>

    <!-- Sidebar (Glassmorphism) -->
    <aside class="w-72 flex-shrink-0 flex flex-col justify-between p-6 bg-white/60 backdrop-blur-xl border-r border-slate-200/50 relative z-10 hidden md:flex">
      
      <!-- Brand -->
      <div class="flex items-center gap-3 px-2 mb-10">
        <div class="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-500 text-white shadow-lg shadow-emerald-500/30">
          <Library :size="20" stroke-width="2.5" />
        </div>
        <span class="text-xl font-bold tracking-tight text-slate-900">SmartLib<span class="text-emerald-500">.</span></span>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 space-y-2">
        <a 
          v-for="item in navItems" 
          :key="item.name"
          href="#"
          class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium"
          :class="item.isActive ? 'bg-slate-900 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'"
        >
          <component :is="item.icon" :size="20" :class="item.isActive ? 'text-emerald-400' : 'text-slate-400'" />
          {{ item.name }}
        </a>
      </nav>

      <!-- Bottom Actions -->
      <div class="space-y-2 pt-6 border-t border-slate-200/50 mt-auto">
        <a href="#" class="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-100/80 hover:text-slate-900 transition-all font-medium">
          <Settings :size="20" class="text-slate-400" />
          Settings
        </a>
        <a href="#" class="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-red-50 hover:text-red-600 transition-all font-medium group">
          <LogOut :size="20" class="text-slate-400 group-hover:text-red-500 transition-colors" />
          Logout
        </a>
      </div>
    </aside>

    <!-- Main Content Area -->
    <main class="flex-1 flex flex-col h-full overflow-hidden relative z-10">
      
      <!-- Header -->
      <header class="h-20 flex items-center justify-between px-8 bg-white/40 backdrop-blur-md border-b border-slate-200/50 hidden md:flex">
        <h1 class="text-2xl font-bold text-slate-900">Dashboard</h1>
        
        <!-- User Profile -->
        <div class="flex items-center gap-4">
          <button class="flex items-center justify-center w-10 h-10 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-slate-900 hover:border-slate-300 transition-all shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bell"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
          </button>
          <div class="flex items-center gap-3 pl-4 border-l border-slate-200">
            <div class="flex flex-col items-end">
              <span class="text-sm font-semibold text-slate-900">Alex Frontend</span>
              <span class="text-xs text-slate-500">Pro Member</span>
            </div>
            <img src="https://i.pravatar.cc/150?img=11" alt="User avatar" class="w-10 h-10 rounded-xl border-2 border-white shadow-md object-cover" />
          </div>
        </div>
      </header>

      <!-- Scrollable Dashboard Content -->
      <div class="flex-1 overflow-y-auto p-4 md:p-8">
        <slot></slot>
      </div>
    </main>

  </div>
</template>
