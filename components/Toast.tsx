import React, { useEffect } from 'react';

export type ToastType = 'info' | 'success' | 'error';

export interface ToastItem {
  id: string;
  message: string;
  type?: ToastType;
}

const Toast: React.FC<{ toasts: ToastItem[]; onDismiss: (id: string) => void }> = ({ toasts, onDismiss }) => {
  useEffect(() => {
    const timers = toasts.map(t => {
      const id = setTimeout(() => onDismiss(t.id), 3500);
      return () => clearTimeout(id);
    });
    return () => timers.forEach(fn => fn());
  }, [toasts, onDismiss]);

  return (
    <div className="fixed z-50 left-1/2 -translate-x-1/2 top-6 flex flex-col gap-2 items-center pointer-events-none">
      {toasts.map(t => (
        <div
          key={t.id}
          className={`pointer-events-auto px-4 py-2 rounded-lg shadow-md max-w-xs w-fit text-sm font-medium ${t.type === 'success' ? 'bg-green-600' : t.type === 'error' ? 'bg-red-600' : 'bg-slate-700'} text-white`}
        >
          {t.message}
        </div>
      ))}
    </div>
  );
};

export default Toast;
