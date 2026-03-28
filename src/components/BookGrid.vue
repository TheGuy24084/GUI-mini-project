<script setup lang="ts">
import { useBookStore } from '../store/bookStore';
import BookCard from './BookCard.vue';
import EmptyState from './EmptyState.vue';

const store = useBookStore();
</script>

<template>
  <div class="w-full">
    <div v-if="store.filteredBooks.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <BookCard
        v-for="book in store.filteredBooks"
        :key="book.id"
        :book="book"
      />
    </div>
    <div v-else>
      <EmptyState />
    </div>
  </div>
</template>
