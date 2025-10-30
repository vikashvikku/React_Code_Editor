// useAutosave.js - Custom hook for auto-saving functionality

import { useEffect, useRef, useCallback } from 'react';

export const useAutosave = (value, onSave, delay = 1000) => {
  const timeoutRef = useRef(null);
  const previousValueRef = useRef(value);

  const save = useCallback(() => {
    if (value !== previousValueRef.current) {
      onSave(value);
      previousValueRef.current = value;
    }
  }, [value, onSave]);

  useEffect(() => {
    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout
    timeoutRef.current = setTimeout(save, delay);

    // Cleanup on unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [value, delay, save]);

  // Manual save function
  const manualSave = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    save();
  }, [save]);

  return { manualSave };
};
