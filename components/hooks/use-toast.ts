import { useState } from 'react';

interface ToastOptions {
  message: string;
  duration?: number;
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastOptions[]>([]);

  function addToast(options: ToastOptions) {
    setToasts((prevToasts) => [...prevToasts, options]);
  }

  function removeToast(index: number) {
    setToasts((prevToasts) => prevToasts.filter((_, i) => i !== index));
  }

  return { toasts, addToast, removeToast };
}

// Example toast function
export function toast(message: string, duration: number = 3000) {
  // Implementation for displaying a toast
} 