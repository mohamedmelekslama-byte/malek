import { useState, useEffect } from 'react';

/**
 * useLocalStorage - sync a state value with localStorage.
 * @param {string} key Storage key
 * @param {*} initialValue Default value if nothing in storage
 * @returns {[any, Function]} state and setter
 */
export default function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : typeof initialValue === 'function' ? initialValue() : initialValue;
    } catch (error) {
      console.warn('useLocalStorage get error', error);
      return typeof initialValue === 'function' ? initialValue() : initialValue;
    }
  });

  useEffect(() => {
    try {
      const valueToStore = storedValue instanceof Function ? storedValue(storedValue) : storedValue;
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.warn('useLocalStorage set error', error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
