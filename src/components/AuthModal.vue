<script setup lang="ts">
import { ref } from 'vue';
import BaseModal from './BaseModal.vue';
import { useAuthStore } from '../store/authStore';

const authStore = useAuthStore();
const isLoginMode = ref(true);

const name = ref('');
const email = ref('');
const password = ref('');

function handleSubmit() {
  if (isLoginMode.value) {
    authStore.login(email.value, password.value);
  } else {
    authStore.signUp(email.value, password.value, name.value);
  }
}

function toggleMode() {
  isLoginMode.value = !isLoginMode.value;
  name.value = '';
  email.value = '';
  password.value = '';
}
</script>

<template>
  <BaseModal :model-value="authStore.isAuthModalOpen" @update:model-value="authStore.isAuthModalOpen = $event" :title="isLoginMode ? 'Welcome Back' : 'Create an Account'">
    <form @submit.prevent="handleSubmit" class="space-y-4 pt-2">
      <div v-if="!isLoginMode">
        <label for="name" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
        <input 
          id="name" 
          v-model="name" 
          type="text" 
          required 
          class="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 outline-none transition-all dark:bg-slate-900 dark:border-slate-800 dark:text-white"
          placeholder="John Doe"
        />
      </div>

      <div>
        <label for="email" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
        <input 
          id="email" 
          v-model="email" 
          type="email" 
          required 
          class="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 outline-none transition-all dark:bg-slate-900 dark:border-slate-800 dark:text-white"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label for="password" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Password</label>
        <input 
          id="password" 
          v-model="password" 
          type="password" 
          required 
          class="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 outline-none transition-all dark:bg-slate-900 dark:border-slate-800 dark:text-white"
          placeholder="••••••••"
        />
      </div>

      <div class="pt-4 flex flex-col gap-3">
        <button 
          type="submit" 
          class="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold shadow-sm shadow-emerald-500/30 transition-all focus:ring-2 focus:ring-offset-1 focus:ring-emerald-500"
        >
          {{ isLoginMode ? 'Sign In' : 'Sign Up' }}
        </button>
        
        <p class="text-center text-sm text-slate-500 dark:text-slate-400">
          {{ isLoginMode ? "Don't have an account?" : "Already have an account?" }}
          <button 
            type="button" 
            @click="toggleMode" 
            class="text-emerald-600 hover:text-emerald-700 font-semibold focus:outline-none"
          >
            {{ isLoginMode ? 'Sign Up' : 'Log In' }}
          </button>
        </p>
      </div>

      <!-- Quick Mock Guest Access -->
      <div v-if="isLoginMode" class="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700/50 text-center">
        <button 
          type="button" 
          @click="authStore.login()" 
          class="text-xs font-semibold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
        >
          Continue as Guest Demo
        </button>
      </div>
    </form>
  </BaseModal>
</template>
