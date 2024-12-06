import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { getTheme, setTheme } from '../lib/utils';

export function ThemeToggle() {
  const [theme, setCurrentTheme] = React.useState<'dark' | 'light'>(getTheme);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setCurrentTheme(newTheme);
    setTheme(newTheme);
  };

  React.useEffect(() => {
    setTheme(theme);
  }, []);

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label={theme === 'dark' ? 'Activer le mode clair' : 'Activer le mode sombre'}
    >
      {theme === 'dark' ? (
        <Sun className="h-5 w-5 text-gray-100" />
      ) : (
        <Moon className="h-5 w-5 text-gray-600" />
      )}
    </button>
  );
}