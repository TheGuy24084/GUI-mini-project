<script setup lang="ts">
import { useToast } from '../composables/useToast';

const { visible, message, type, hideToast } = useToast();
</script>

<template>
  <Teleport to="body">
    <Transition name="toast">
      <div
        v-if="visible"
        id="toast-notification"
        class="fixed bottom-6 right-6 z-[60] flex items-start gap-3 min-w-[280px] max-w-sm rounded-xl px-4 py-3.5 shadow-xl ring-1 cursor-pointer select-none"
        :class="type === 'success'
          ? 'bg-emerald-600 ring-emerald-500 text-white'
          : 'bg-rose-600 ring-rose-500 text-white'"
        @click="hideToast"
      >
        <!-- Icon -->
        <div class="flex-shrink-0 mt-0.5">
          <svg v-if="type === 'success'" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6M9 9l6 6"/></svg>
        </div>

        <div class="flex-1">
          <p class="text-sm font-semibold leading-snug">{{ type === 'success' ? 'Success' : 'Error' }}</p>
          <p class="text-sm opacity-90 mt-0.5">{{ message }}</p>
        </div>

        <!-- Dismiss -->
        <button class="flex-shrink-0 opacity-70 hover:opacity-100 ml-1 transition-opacity">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
        </button>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.toast-enter-active {
  transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.toast-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.toast-enter-from {
  opacity: 0;
  transform: translateY(16px) scale(0.95);
}
.toast-leave-to {
  opacity: 0;
  transform: translateY(8px) scale(0.97);
}
</style>
