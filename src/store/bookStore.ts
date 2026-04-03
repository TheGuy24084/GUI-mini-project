import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';
import { mockBooks, type Book } from '../data/books';
import { useStorage } from '../composables/useStorage';
import { aiService } from '../services/aiService';

const STORAGE_KEY = 'library_books';

export const useBookStore = defineStore('book', () => {
  const { load, save } = useStorage<Book[]>(STORAGE_KEY, [...mockBooks]);
  
  // Hydrate from LocalStorage or fallback to mock data
  const books = ref<Book[]>(load());

  const searchQuery = ref('');
  const selectedCategory = ref<string | null>(null);
  const selectedBook = ref<Book | null>(null);

  // Watch for changes and save to LocalStorage
  watch(
    books,
    (mBooks) => {
      save(mBooks);
    },
    { deep: true }
  );

  const categories = computed(() => {
    return [...new Set(books.value.map((b) => b.category))].sort();
  });

  const stats = computed(() => {
    return {
      total: books.value.length,
      borrowed: books.value.filter((b) => !b.isAvailable).length,
      available: books.value.filter((b) => b.isAvailable).length,
    };
  });

  const filteredBooks = computed(() => {
    let result = books.value;

    if (selectedCategory.value) {
      result = result.filter((book) => book.category === selectedCategory.value);
    }

    if (searchQuery.value.trim()) {
      const lowerQuery = searchQuery.value.toLowerCase();
      result = result.filter(
        (book) =>
          book.title.toLowerCase().includes(lowerQuery) ||
          book.author.toLowerCase().includes(lowerQuery) ||
          book.category.toLowerCase().includes(lowerQuery),
      );
    }

    return result;
  });

  function setCategory(category: string | null) {
    selectedCategory.value = category;
  }

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

  const analyticsSummary = ref<string>('');

  async function generateBookSummary(bookId: string) {
    const book = books.value.find((b) => b.id === bookId);
    if (!book) return;

    try {
      const summary = await aiService.generateSummary(book.title, book.author);
      book.description = summary;
    } catch (error) {
      throw error;
    }
  }

  async function suggestBookTags(bookId: string) {
    const book = books.value.find((b) => b.id === bookId);
    if (!book) return;

    try {
      const tags = await aiService.suggestTags(book.title, book.author, book.category);
      book.tags = tags;
    } catch (error) {
      throw error;
    }
  }

  async function updateAnalyticsSummary() {
    try {
      analyticsSummary.value = await aiService.generateAnalyticsSummary(stats.value, categories.value);
    } catch (error) {
      console.error('Failed to update analytics summary:', error);
    }
  }

  function selectBook(book: Book | null) {
    selectedBook.value = book;
  }

  return {
    books,
    searchQuery,
    selectedCategory,
    selectedBook,
    categories,
    stats,
    filteredBooks,
    analyticsSummary,
    setCategory,
    selectBook,
    toggleBookStatus,
    addBook,
    generateBookSummary,
    suggestBookTags,
    updateAnalyticsSummary,
  };
});

