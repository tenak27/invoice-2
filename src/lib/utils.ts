import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'XOF',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getTheme(): 'dark' | 'light' {
  if (typeof window === 'undefined') return 'light';
  
  if (window.localStorage.getItem('theme') === 'dark' || 
    (!window.localStorage.getItem('theme') && 
      window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    return 'dark';
  }
  
  return 'light';
}

export function setTheme(theme: 'dark' | 'light') {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  window.localStorage.setItem('theme', theme);
}