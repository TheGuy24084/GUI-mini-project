<script setup lang="ts">
import { ref, computed } from 'vue';
import MainLayout from './components/Layout/MainLayout.vue';
import DashboardHeader from './components/DashboardHeader.vue';
import BookGrid from './components/BookGrid.vue';
import { mockBooks } from './data/books';

const searchQuery = ref('');

const filteredBooks = computed(() => {
  if (!searchQuery.value) return mockBooks;
  const lowerQuery = searchQuery.value.toLowerCase();
  return mockBooks.filter(book => 
    book.title.toLowerCase().includes(lowerQuery) || 
    book.author.toLowerCase().includes(lowerQuery) ||
    book.category.toLowerCase().includes(lowerQuery)
  );
});
</script>

<template>
  <MainLayout>
    <div class="flex flex-col h-full w-full">
      <DashboardHeader v-model="searchQuery" />
      <div class="flex-1 overflow-y-auto p-4 md:p-8 relative">
        <div class="mb-6 max-w-7xl mx-auto">
          <h2 class="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Library Overview</h2>
          <p class="text-slate-500">Discover and manage your book collection.</p>
        </div>
        <div class="max-w-7xl mx-auto pb-12">
          <BookGrid :books="filteredBooks" />
        </div>
      </div>
    </div>
  </MainLayout>
</template>
