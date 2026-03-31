/**
 * A robust wrapper for LocalStorage with error handling.
 */
export function useStorage<T>(key: string, fallback: T) {
  const load = (): T => {
    try {
      const stored = localStorage.getItem(key);
      if (stored === null) return fallback;
      return JSON.parse(stored) as T;
    } catch (error) {
      console.error(`Error loading key "${key}" from LocalStorage:`, error);
      return fallback;
    }
  };

  const save = (value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error saving key "${key}" to LocalStorage:`, error);
    }
  };

  return { load, save };
}
