<script setup lang="ts">
import type { Book } from '../data/books';
import BookCard from './BookCard.vue';
import EmptyState from './EmptyState.vue';

defineProps<{ books: Book[] }>();
</script>

<template>
  <div class="w-full">
    <div v-if="books.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <BookCard 
        v-for="book in books" 
        :key="book.id" 
        :book="book" 
      />
    </div>
    <div v-else>
      <EmptyState />
    </div>
  </div>
</template>
