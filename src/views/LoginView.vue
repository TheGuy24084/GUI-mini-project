<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/authStore';
import { Library } from 'lucide-vue-next';

const router = useRouter();
const authStore = useAuthStore();

const username = ref('');
const password = ref('');

function handleLogin() {
  authStore.login(username.value, password.value);
  router.push('/');
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-900 p-6 relative overflow-hidden">
    <!-- Decorative background elements -->
    <div class="absolute top-1/4 -left-32 w-96 h-96 bg-emerald-500/20 rounded-full mix-blend-screen filter blur-3xl opacity-50 animate-blob"></div>
    <div class="absolute bottom-1/4 -right-32 w-96 h-96 bg-teal-500/20 rounded-full mix-blend-screen filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>

    <div class="w-full max-w-md bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 shadow-2xl relative z-10 text-slate-100">
      
      <div class="flex flex-col items-center mb-8">
        <div class="flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 mb-4">
          <Library :size="24" stroke-width="2.5" />
        </div>
        <h1 class="text-2xl font-bold tracking-tight">Welcome to SmartLib<span class="text-emerald-500">.</span></h1>
        <p class="text-slate-400 text-sm mt-1">Please sign in to your dashboard</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-5">
        <div>
          <label class="block text-sm font-medium text-slate-300 mb-1.5" for="username">Username</label>
          <input 
            id="username"
            v-model="username" 
            type="text" 
            placeholder="admin"
            class="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-300 mb-1.5" for="password">Password</label>
          <input 
            id="password"
            v-model="password" 
            type="password" 
            placeholder="••••••••"
            class="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
            required
          />
        </div>

        <button 
          type="submit"
          class="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-xl shadow-lg shadow-emerald-600/20 mt-6 transition-all transform hover:-translate-y-0.5"
        >
          Sign In
        </button>
      </form>

      <p class="text-center text-xs text-slate-500 mt-6">
        Testing? Just click Sign In.
      </p>
    </div>
  </div>
</template>
