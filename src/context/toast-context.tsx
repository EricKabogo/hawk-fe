'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { X } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  toasts: Toast[];
  showToast: (message: string, type: ToastType) => void;
  hideToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const hideToast = useCallback((id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback((message: string, type: ToastType) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prevToasts) => [...prevToasts, { id, message, type }]);

    // Auto-remove after 5 seconds
    setTimeout(() => {
      hideToast(id);
    }, 5000);
  }, [hideToast]);

  return (
    <ToastContext.Provider value={{ toasts, showToast, hideToast }}>
      {children}
      
      {/* Toast Container */}
      {toasts.length > 0 && (
        <div className="fixed bottom-0 right-0 p-6 z-50 flex flex-col space-y-4">
          {toasts.map((toast) => (
            <div 
              key={toast.id}
              className={`px-4 py-3 rounded-md shadow-lg flex items-center justify-between ${
                toast.type === 'success' ? 'bg-green-500 text-white' : 
                toast.type === 'error' ? 'bg-red-500 text-white' : 
                'bg-blue-500 text-white'
              }`}
            >
              <p>{toast.message}</p>
              <button 
                onClick={() => hideToast(toast.id)} 
                className="ml-4 text-white hover:text-gray-200"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}