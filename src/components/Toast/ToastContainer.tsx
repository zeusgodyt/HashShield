import React from 'react';
import { AlertCircle, CheckCircle, Info, X, AlertTriangle } from 'lucide-react';
import { useToast, ToastType } from '../../context/ToastContext';

const toastIcons = {
  success: <CheckCircle className="w-5 h-5" />,
  error: <AlertCircle className="w-5 h-5" />,
  warning: <AlertTriangle className="w-5 h-5" />,
  info: <Info className="w-5 h-5" />
};

const toastColors = {
  success: 'bg-green-50 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800',
  error: 'bg-red-50 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800',
  warning: 'bg-yellow-50 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800',
  info: 'bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800'
};

const toastIconColors = {
  success: 'text-green-500 dark:text-green-400',
  error: 'text-red-500 dark:text-red-400',
  warning: 'text-yellow-500 dark:text-yellow-400',
  info: 'text-blue-500 dark:text-blue-400'
};

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-3 max-w-md">
      {toasts.map((toast) => (
        <div 
          key={toast.id}
          className={`flex items-center p-4 rounded-lg shadow-md border ${toastColors[toast.type]} transition-all duration-300 ease-in-out animate-slideIn`}
          role="alert"
        >
          <div className={`flex-shrink-0 ${toastIconColors[toast.type]}`}>
            {toastIcons[toast.type as ToastType]}
          </div>
          <div className="ml-3 mr-2 flex-1">
            <p className="text-sm font-medium">{toast.message}</p>
          </div>
          <button 
            onClick={() => removeToast(toast.id)}
            className="flex-shrink-0 ml-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};

export { toastIcons, toastColors, toastIconColors };