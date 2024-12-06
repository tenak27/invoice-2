import React from 'react';
import { Logo } from './Logo';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <Logo size="md" className="mb-4" />
            <p className="mt-4 text-base text-gray-500 dark:text-gray-400">
              Solutions innovantes de gestion d'entreprise
            </p>
            <div className="mt-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Développé avec passion par IAM TECHNOLOGY
              </p>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-base text-gray-400 dark:text-gray-500">
                &copy; {currentYear} IAM TECHNOLOGY. Tous droits réservés.
              </p>
              <div className="mt-4 md:mt-0 flex items-center space-x-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">Propulsé par</span>
                <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">IAM Invoicer</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}