<script setup lang="ts">
import { ref, watch } from 'vue';
import { useAuthStore } from '../store/authStore';
import { useUiStore } from '../store/uiStore';
import { Sun, Moon, User, Settings, X, AlignJustify, Sparkles } from 'lucide-vue-next';

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const props = defineProps<{
  isOpen: boolean;
}>();

const authStore = useAuthStore();
const uiStore = useUiStore();

const profileName = ref(authStore.user?.name || '');

// Sync local ref when authStore changes just in case
watch(() => authStore.user?.name, (newVal) => {
  if (newVal) profileName.value = newVal;
});

function handleSaveProfile() {
  if (profileName.value.trim() !== '') {
    authStore.updateProfileName(profileName.value.trim());
  }
}

function clearData() {
  localStorage.clear();
  window.location.reload();
}
</script>

<template>
  <Teleport to="body">
    <div class="fixed inset-0 z-[100] overflow-hidden pointer-events-none" :class="isOpen ? 'pointer-events-auto' : ''">
      <!-- Backdrop fade -->
      <Transition
        enter-active-class="transition-opacity ease-linear duration-300"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity ease-linear duration-300"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div v-if="isOpen" class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm pointer-events-auto" @click="emit('close')"></div>
      </Transition>

      <!-- Slide-over panel -->
      <div class="absolute inset-y-0 right-0 flex max-w-full pl-10 pointer-events-none">
        <Transition
          enter-active-class="transform transition ease-in-out duration-500 sm:duration-700"
          enter-from-class="translate-x-full"
          enter-to-class="translate-x-0"
          leave-active-class="transform transition ease-in-out duration-500 sm:duration-700"
          leave-from-class="translate-x-0"
          leave-to-class="translate-x-full"
        >
          <div v-if="isOpen" class="w-screen max-w-md pointer-events-auto">
            <div class="flex h-full flex-col bg-white/90 dark:bg-[#1e1e1e]/90 backdrop-blur-xl shadow-2xl py-6 border-l border-slate-200/50 dark:border-[#2a2a2a]">
              
              <!-- Header -->
              <div class="px-6 flex items-center justify-between pb-6 border-b border-slate-100 dark:border-[#2a2a2a]">
                <div class="flex items-center gap-3">
                  <div class="bg-emerald-100 dark:bg-emerald-900/40 p-2 rounded-xl text-emerald-600 dark:text-emerald-400">
                    <Settings class="h-5 w-5" />
                  </div>
                  <h2 class="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Settings</h2>
                </div>
                <button @click="emit('close')" class="rounded-full p-2 text-slate-400 hover:text-slate-500 hover:bg-slate-100 dark:hover:bg-[#2a2a2a] transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500">
                  <span class="sr-only">Close panel</span>
                  <X class="h-6 w-6" />
                </button>
              </div>

              <!-- Content -->
              <div class="flex-1 overflow-y-auto px-6 py-6 space-y-8">
                
                <!-- Display Profile -->
                <div v-if="authStore.isAuthenticated">
                  <h3 class="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2"><User class="w-4 h-4" /> Personalization</h3>
                  <div class="space-y-4 bg-slate-50 dark:bg-[#0f0f0f]/50 p-4 rounded-2xl border border-slate-100 dark:border-[#2a2a2a]">
                    <div>
                      <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Display Name</label>
                      <div class="flex gap-2">
                        <input
                          v-model="profileName"
                          type="text"
                          class="block w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 outline-none transition-all dark:text-slate-100"
                        />
                        <button @click="handleSaveProfile" class="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded-xl shadow-sm transition-colors cursor-pointer disabled:opacity-50" :disabled="profileName === authStore.user?.name">Save</button>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Appearance options -->
                <div>
                  <h3 class="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2"><Sun class="w-4 h-4" /> Appearance</h3>
                  
                  <div class="space-y-4">
                    <div class="flex items-center justify-between bg-slate-50 dark:bg-[#0f0f0f]/50 p-4 rounded-2xl border border-slate-100 dark:border-[#2a2a2a]">
                      <div>
                        <h4 class="font-medium text-slate-900 dark:text-slate-100">Dark Mode</h4>
                        <p class="text-slate-500 dark:text-slate-400 text-sm mt-0.5">Switch to a darker theme</p>
                      </div>
                      <button 
                        @click="uiStore.toggleDark()" 
                        class="w-12 h-6 rounded-full transition-colors relative focus:outline-none"
                        :class="uiStore.isDark ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-600'"
                      >
                        <span 
                          class="absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform flex items-center justify-center shadow-sm"
                          :class="uiStore.isDark ? 'translate-x-6' : 'translate-x-0'"
                        >
                          <Moon v-if="uiStore.isDark" class="w-2.5 h-2.5 text-emerald-500" />
                          <Sun v-else class="w-2.5 h-2.5 text-slate-400" />
                        </span>
                      </button>
                    </div>

                    <div class="flex items-center justify-between bg-slate-50 dark:bg-[#0f0f0f]/50 p-4 rounded-2xl border border-slate-100 dark:border-[#2a2a2a]">
                      <div>
                        <h4 class="font-medium text-slate-900 dark:text-slate-100">Compact Book Cards</h4>
                        <p class="text-slate-500 dark:text-slate-400 text-sm mt-0.5">Decrease grid spacing and padding</p>
                      </div>
                      <button 
                        @click="uiStore.compactMode = !uiStore.compactMode" 
                        class="w-12 h-6 rounded-full transition-colors relative focus:outline-none"
                        :class="uiStore.compactMode ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-600'"
                      >
                        <span 
                          class="absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform flex items-center justify-center shadow-sm"
                          :class="uiStore.compactMode ? 'translate-x-6' : 'translate-x-0'"
                        >
                          <AlignJustify v-if="uiStore.compactMode" class="w-2.5 h-2.5 text-emerald-500" />
                        </span>
                      </button>
                    </div>

                    <div class="flex items-center justify-between bg-slate-50 dark:bg-[#0f0f0f]/50 p-4 rounded-2xl border border-slate-100 dark:border-[#2a2a2a]">
                      <div>
                        <h4 class="font-medium text-slate-900 dark:text-slate-100">Show AI Insights</h4>
                        <p class="text-slate-500 dark:text-slate-400 text-sm mt-0.5">Display Gemini summaries on cards</p>
                      </div>
                      <button 
                        @click="uiStore.enableAiInsights = !uiStore.enableAiInsights" 
                        class="w-12 h-6 rounded-full transition-colors relative focus:outline-none"
                        :class="uiStore.enableAiInsights ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-600'"
                      >
                        <span 
                          class="absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform flex items-center justify-center shadow-sm"
                          :class="uiStore.enableAiInsights ? 'translate-x-6' : 'translate-x-0'"
                        >
                          <Sparkles v-if="uiStore.enableAiInsights" class="w-2.5 h-2.5 text-emerald-500" />
                        </span>
                      </button>
                    </div>
                  </div>
                </div>

                <!-- System options -->
                <div>
                  <h3 class="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2"><Settings class="w-4 h-4" /> System</h3>
                  <div class="space-y-4">
                    <div class="flex items-center justify-between bg-slate-50 dark:bg-[#0f0f0f]/50 p-4 rounded-2xl border border-slate-100 dark:border-[#2a2a2a]">
                      <div>
                        <h4 class="font-medium text-slate-900 dark:text-slate-100">Clear Local Data</h4>
                        <p class="text-slate-500 dark:text-slate-400 text-sm mt-0.5">Reset all application preferences and data</p>
                      </div>
                      <button 
                        @click="clearData" 
                        class="px-4 py-2 bg-rose-100 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 rounded-xl font-medium transition-colors hover:bg-rose-200 dark:hover:bg-rose-500/20 focus:outline-none"
                      >
                        Reset Data
                      </button>
                    </div>
                  </div>
                </div>

              </div>
              
            </div>
          </div>
        </Transition>
      </div>

    </div>
  </Teleport>
</template>
