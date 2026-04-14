<script setup lang="ts">
import Sidebar from './Sidebar.vue';

const emit = defineEmits<{
  (e: 'open-settings'): void
}>();
</script>

<template>
  <div class="flex h-screen w-full bg-slate-50 dark:bg-[#0f0f0f] overflow-hidden font-sans text-slate-900 dark:text-white relative">
    
    <!-- Background Decoration for Glassmorphism effect -->
    <div class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>
    <div class="absolute bottom-[-10%] right-[-5%] w-[30%] h-[30%] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"></div>

    <!-- Sidebar Component -->
    <Sidebar @open-settings="emit('open-settings')" />

    <!-- Main Content Area -->
    <main class="flex-1 flex flex-col h-full overflow-hidden relative z-10">
      <slot></slot>
    </main>

  </div>
</template>
