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
  success: 'bg-green-700 text-white border-green-800 dark:bg-green-800 dark:text-white dark:border-green-900',
  error: 'bg-red-700 text-white border-red-800 dark:bg-red-800 dark:text-white dark:border-red-900',
  warning: 'bg-yellow-600 text-white border-yellow-700 dark:bg-yellow-700 dark:text-white dark:border-yellow-800',
  info: 'bg-blue-700 text-white border-blue-800 dark:bg-blue-800 dark:text-white dark:border-blue-900'
};


const toastIconColors = {
  success: 'text-white',
  error: 'text-white',
  warning: 'text-white',
  info: 'text-white'
};


export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 space-y-3 max-w-md">
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
