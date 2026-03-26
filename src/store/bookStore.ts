import { defineStore } from 'pinia';
import { ref } from 'vue';
import { mockBooks, type Book } from '../data/books';

export const useBookStore = defineStore('book', () => {
  const books = ref<Book[]>([...mockBooks]);

  const toggleAvailability = (id: string) => {
    const book = books.value.find(b => b.id === id);
    if (book) {
      book.isAvailable = !book.isAvailable;
    }
  };

  return {
    books,
    toggleAvailability
  };
});
