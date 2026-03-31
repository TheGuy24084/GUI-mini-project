import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';
import { mockBooks, type Book } from '../data/books';
import { useStorage } from '../composables/useStorage';

const STORAGE_KEY = 'library_books';

export const useBookStore = defineStore('book', () => {
  const { load, save } = useStorage<Book[]>(STORAGE_KEY, [...mockBooks]);
  
  // Hydrate from LocalStorage or fallback to mock data
  const books = ref<Book[]>(load());

  const searchQuery = ref('');

  // Watch for changes and save to LocalStorage
  watch(
    books,
    (newBooks) => {
      save(newBooks);
    },
    { deep: true }
  );

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

  function toggleBookStatus(id: string): { action: 'borrowed' | 'returned'; book: Book } | undefined {
    const bookIndex = books.value.findIndex((b) => b.id === id);
    if (bookIndex === -1) return undefined;

    const book = books.value[bookIndex];
    const action = book.isAvailable ? 'borrowed' : 'returned';

    if (action === 'borrowed') {
      const now = new Date();
      const returnDate = new Date();
      returnDate.setDate(now.getDate() + 14);

      book.isAvailable = false;
      book.borrowedAt = now.toISOString();
      book.returnBy = returnDate.toISOString();
    } else {
      book.isAvailable = true;
      book.borrowedAt = undefined;
      book.returnBy = undefined;
    }

    return { action, book };
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

