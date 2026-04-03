<script setup lang="ts">
import { useBookStore } from '../store/bookStore';
import BookCard from './BookCard.vue';
import EmptyState from './EmptyState.vue';

const store = useBookStore();
</script>

<template>
  <div class="w-full">
    <TransitionGroup 
      v-if="store.filteredBooks.length > 0" 
      name="list" 
      tag="div" 
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 relative"
    >
      <BookCard
        v-for="book in store.filteredBooks"
        :key="book.id"
        :book="book"
      />
    </TransitionGroup>
    <div v-else>
      <EmptyState />
    </div>
  </div>
</template>

<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.list-leave-active {
  position: absolute;
  z-index: -1;
}
</style>
