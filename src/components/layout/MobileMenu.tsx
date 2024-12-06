import React from 'react';
import { Link } from 'react-router-dom';
import { Settings, LogOut, X } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { cn } from '../../lib/utils';
import { usePermissions } from '../../hooks/usePermissions';
import { UserPermissions } from '../../types/user';

interface MenuItem {
  to: string;
  icon: React.ElementType;
  label: string;
  permission?: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems: MenuItem[];
}

export function MobileMenu({ isOpen, onClose, menuItems }: MobileMenuProps) {
  const { logout } = useAuthStore();
  const { hasPermission } = usePermissions();

  return (
    <div className={cn(
      "fixed inset-0 z-50 lg:hidden",
      isOpen ? "pointer-events-auto" : "pointer-events-none"
    )}>
      <div 
        className={cn(
          "fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity duration-300 ease-in-out",
          isOpen ? "opacity-100" : "opacity-0"
        )}
        onClick={onClose}
      />
      <div 
        className={cn(
          "fixed inset-y-0 left-0 max-w-xs w-full bg-gradient-to-b from-indigo-600 to-indigo-800 shadow-xl transform transition duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-indigo-700">
          <span className="text-xl font-bold text-white">Menu</span>
          <button
            onClick={onClose}
            className="rounded-md text-indigo-100 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="flex items-center px-4 py-3 text-indigo-100 hover:text-white rounded-md hover:bg-indigo-700/50 transition-all duration-200 transform hover:translate-x-1"
              onClick={onClose}
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-indigo-700 px-4 py-4 space-y-2">
          {hasPermission(UserPermissions.VIEW_SETTINGS) && (
            <Link
              to="/settings"
              className="flex w-full items-center px-4 py-3 text-indigo-100 hover:text-white hover:bg-indigo-700/50 rounded-md transition-all duration-200 transform hover:translate-x-1"
              onClick={onClose}
            >
              <Settings className="h-5 w-5 mr-3" />
              Paramètres
            </Link>
          )}
          <button
            onClick={() => {
              logout();
              onClose();
            }}
            className="flex w-full items-center px-4 py-3 text-indigo-100 hover:text-white hover:bg-indigo-700/50 rounded-md transition-all duration-200 transform hover:translate-x-1"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Déconnexion
          </button>
        </div>
      </div>
    </div>
  );
}