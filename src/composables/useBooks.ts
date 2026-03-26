import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useBookStore } from '../store/bookStore';

export function useBooks() {
  const bookStore = useBookStore();
  const { books } = storeToRefs(bookStore);

  const availableBooks = computed(() => books.value.filter(b => b.isAvailable));
  const borrowedBooks = computed(() => books.value.filter(b => !b.isAvailable));

  const borrowBook = (id: string) => {
    bookStore.toggleAvailability(id);
  };

  const returnBook = (id: string) => {
    bookStore.toggleAvailability(id);
  };

  return {
    books,
    availableBooks,
    borrowedBooks,
    borrowBook,
    returnBook
  };
}
