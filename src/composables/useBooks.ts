import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useBookStore } from '../store/bookStore';

export function useBooks() {
  const bookStore = useBookStore();
  const { books, filteredBooks } = storeToRefs(bookStore);

  const availableBooks = computed(() => books.value.filter((b) => b.isAvailable));
  const borrowedBooks = computed(() => books.value.filter((b) => !b.isAvailable));

  const borrowBook = (id: string) => {
    bookStore.toggleBookStatus(id);
  };

  const returnBook = (id: string) => {
    bookStore.toggleBookStatus(id);
  };

  return {
    books,
    filteredBooks,
    availableBooks,
    borrowedBooks,
    borrowBook,
    returnBook,
  };
}
