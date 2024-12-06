import React from 'react';
import { Logo } from './Logo';

export function SplashScreen() {
  return (
    <div className="fixed inset-0 bg-white dark:bg-gray-900 flex items-center justify-center z-50">
      <div className="text-center">
        <Logo size="lg" className="mb-8 animate-pulse" />
        <div className="w-48 h-2 mx-auto bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full bg-indigo-600 dark:bg-indigo-500 rounded-full animate-progress"></div>
        </div>
      </div>
    </div>
  );
}