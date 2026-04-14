<script setup lang="ts">
import BaseModal from './BaseModal.vue';
import { useAuthStore } from '../store/authStore';
import { useUiStore } from '../store/uiStore';

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const props = defineProps<{
  isOpen: boolean;
}>();

const authStore = useAuthStore();
const uiStore = useUiStore();

</script>

<template>
  <BaseModal :model-value="isOpen" title="Settings" @update:model-value="(v) => !v && emit('close')">
    <div class="space-y-6 pt-2">
      
      <!-- Dark Mode Toggle -->
      <div class="flex items-center justify-between">
        <div>
          <h4 class="text-slate-800 dark:text-slate-100 font-medium">Dark Mode</h4>
          <p class="text-slate-500 text-sm">Switch between light and dark themes</p>
        </div>
        <button 
          @click="uiStore.toggleDark()" 
          class="w-12 h-6 rounded-full transition-colors relative"
          :class="uiStore.isDark ? 'bg-emerald-500' : 'bg-slate-300'"
        >
          <span 
            class="absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform"
            :class="uiStore.isDark ? 'translate-x-6' : 'translate-x-0'"
          ></span>
        </button>
      </div>

      <div class="h-px bg-slate-200 dark:bg-slate-700/50"></div>

      <!-- Email Notifications Toggle -->
      <div class="flex items-center justify-between">
        <div>
          <h4 class="text-slate-800 dark:text-slate-100 font-medium">Email Notifications</h4>
          <p class="text-slate-500 text-sm">Receive library update emails</p>
        </div>
        <button 
          @click="authStore.emailNotifications = !authStore.emailNotifications" 
          class="w-12 h-6 rounded-full transition-colors relative"
          :class="authStore.emailNotifications ? 'bg-emerald-500' : 'bg-slate-300'"
        >
          <span 
            class="absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform"
            :class="authStore.emailNotifications ? 'translate-x-6' : 'translate-x-0'"
          ></span>
        </button>
      </div>

      <div class="h-px bg-slate-200 dark:bg-slate-700/50"></div>

      <!-- AI Auto Generation Toggle -->
      <div class="flex items-center justify-between">
        <div>
          <h4 class="text-slate-800 dark:text-slate-100 font-medium">AI Auto-Generation</h4>
          <p class="text-slate-500 text-sm">Automatically run Gemini on new books</p>
        </div>
        <button 
          @click="authStore.aiAutoGenerate = !authStore.aiAutoGenerate" 
          class="w-12 h-6 rounded-full transition-colors relative"
          :class="authStore.aiAutoGenerate ? 'bg-emerald-500' : 'bg-slate-300'"
        >
          <span 
            class="absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform"
            :class="authStore.aiAutoGenerate ? 'translate-x-6' : 'translate-x-0'"
          ></span>
        </button>
      </div>

    </div>

    <template #footer>
      <div class="flex justify-end w-full">
        <button 
          @click="emit('close')"
          class="px-5 py-2.5 bg-slate-900 dark:bg-emerald-600 hover:bg-slate-800 dark:hover:bg-emerald-500 text-white rounded-xl transition-all font-medium"
        >
          Done
        </button>
      </div>
    </template>
  </BaseModal>
</template>
