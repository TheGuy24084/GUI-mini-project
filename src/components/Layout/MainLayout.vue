<script setup lang="ts">
import Sidebar from './Sidebar.vue';
import MobileHeader from './MobileHeader.vue';
import { useUiStore } from '../../store/uiStore';

const uiStore = useUiStore();

const emit = defineEmits<{
  (e: 'open-settings'): void
}>();
</script>

<template>
  <div class="flex h-screen w-full bg-slate-50 dark:bg-[#0f0f0f] overflow-hidden font-sans text-slate-900 dark:text-white relative">
    
    <!-- Background Decoration -->
    <div class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>
    <div class="absolute bottom-[-10%] right-[-5%] w-[30%] h-[30%] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"></div>

    <!-- Mobile Sidebar Backdrop -->
    <Transition
      enter-active-class="transition-opacity duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div 
        v-if="uiStore.isSidebarOpen" 
        @click="uiStore.isSidebarOpen = false"
        class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[45] md:hidden"
      ></div>
    </Transition>

    <!-- Sidebar Component -->
    <Sidebar @open-settings="emit('open-settings')" />

    <!-- Main Content Area -->
    <main class="flex-1 flex flex-col h-full overflow-hidden relative z-10 w-full">
      <!-- Global Mobile-Only Sticky Header -->
      <MobileHeader />
      
      <div class="flex-1 overflow-y-auto w-full">
        <slot></slot>
      </div>
    </main>

  </div>
</template>
