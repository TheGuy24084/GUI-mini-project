<script setup lang="ts">
import Sidebar from './Sidebar.vue';
</script>

<template>
  <div class="flex h-screen w-full bg-slate-50 overflow-hidden font-sans text-slate-900 relative">
    
    <!-- Background Decoration for Glassmorphism effect -->
    <div class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>
    <div class="absolute bottom-[-10%] right-[-5%] w-[30%] h-[30%] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"></div>

    <!-- Sidebar Component -->
    <Sidebar />

    <!-- Main Content Area -->
    <main class="flex-1 flex flex-col h-full overflow-hidden relative z-10">
      <slot></slot>
    </main>

  </div>
</template>
