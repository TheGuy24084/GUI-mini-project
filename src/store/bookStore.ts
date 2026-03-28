import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { mockBooks, type Book } from '../data/books';

export const useBookStore = defineStore('book', () => {
  const books = ref<Book[]>([...mockBooks]);
  const searchQuery = ref('');

  const filteredBooks = computed(() => {
    if (!searchQuery.value.trim()) return books.value;

    const lowerQuery = searchQuery.value.toLowerCase();

    return books.value.filter(
      (book) =>
        book.title.toLowerCase().includes(lowerQuery) ||
        book.author.toLowerCase().includes(lowerQuery) ||
        book.category.toLowerCase().includes(lowerQuery),
    );
  });

  function toggleBookStatus(id: string): void {
    const book = books.value.find((b) => b.id === id);
    if (book) {
      book.isAvailable = !book.isAvailable;
    }
  }

  function addBook(newBook: Book): void {
    books.value.push(newBook);
  }

  return {
    books,
    searchQuery,
    filteredBooks,
    toggleBookStatus,
    addBook,
  };
});
