<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore, type User } from '../store/authStore';
import { Mail, Calendar } from 'lucide-vue-next';
import MemberDetailSheet from '../components/MemberDetailSheet.vue';
import UserAvatar from '../components/UserAvatar.vue';

const authStore = useAuthStore();
const selectedMember = ref<User | null>(null);
const isSheetOpen = ref(false);

function openMember(member: User) {
  selectedMember.value = member;
  isSheetOpen.value = true;
}

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString();
};
</script>

<template>
  <div class="h-full flex flex-col pt-8 px-8 sm:px-12 max-w-7xl mx-auto w-full pb-24">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">Library Members</h1>
      <p class="text-slate-500 dark:text-slate-400 mt-1">Manage active readers and their borrowing history</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div 
        v-for="member in authStore.users" 
        :key="member.id"
        @click="openMember(member)"
        class="bg-white dark:bg-[#1e1e1e] rounded-2xl p-6 border border-slate-200/60 dark:border-[#2a2a2a] shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-emerald-200 dark:hover:border-emerald-500/50 transition-all cursor-pointer group"
      >
        <div class="flex items-center gap-4 mb-4">
          <UserAvatar :user="member" size="w-12 h-12 border-2 border-emerald-100 dark:border-emerald-900/50" />
          <div>
            <h3 class="font-bold text-slate-800 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{{ member.name }}</h3>
            <p class="text-xs text-slate-400 dark:text-slate-500 font-medium font-mono">ID: {{ member.id }}</p>
          </div>
        </div>
        
        <div class="space-y-2 mt-4 text-sm text-slate-500 dark:text-slate-400">
          <div class="flex items-center gap-2">
            <Mail :size="14" class="text-slate-400 dark:text-slate-500" />
            <span class="truncate">{{ member.email }}</span>
          </div>
          <div class="flex items-center gap-2">
            <Calendar :size="14" class="text-slate-400 dark:text-slate-500" />
            <span>Joined {{ formatDate(member.joinDate || new Date().toISOString()) }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- We use conditional rendering so that member is not null -->
    <MemberDetailSheet 
      v-if="selectedMember" 
      :is-open="isSheetOpen" 
      :member="selectedMember" 
      @close="isSheetOpen = false" 
    />
  </div>
</template>
