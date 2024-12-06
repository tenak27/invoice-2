import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  FileText, 
  Users, 
  Settings, 
  Tags, 
  Truck, 
  FileCheck,
  UserPlus,
  X,
  ClipboardList
} from 'lucide-react';
import { Logo } from './Logo';
import { usePermissions } from '../../hooks/usePermissions';
import { UserPermissions } from '../../types/user';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { hasPermission } = usePermissions();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const rippleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && sidebarRef.current) {
      // Reset animation by removing and adding the class
      sidebarRef.current.classList.remove('water-drop-enter');
      void sidebarRef.current.offsetWidth; // Force reflow
      sidebarRef.current.classList.add('water-drop-enter');

      // Create ripple effect
      if (rippleRef.current) {
        rippleRef.current.classList.remove('ripple-animate');
        void rippleRef.current.offsetWidth; // Force reflow
        rippleRef.current.classList.add('ripple-animate');
      }
    }
  }, [isOpen]);

  const menuItems = [
    {
      to: "/dashboard",
      icon: LayoutDashboard,
      label: "Tableau de bord"
    },
    {
      to: "/inventory",
      icon: Package,
      label: "Inventaire",
      permission: UserPermissions.VIEW_INVENTORY
    },
    {
      to: "/quotes",
      icon: FileCheck,
      label: "Devis",
      permission: UserPermissions.VIEW_QUOTES
    },
    {
      to: "/invoices",
      icon: FileText,
      label: "Factures",
      permission: UserPermissions.VIEW_INVOICES
    },
    {
      to: "/purchase-orders",
      icon: ClipboardList,
      label: "Bons de commande",
      permission: UserPermissions.VIEW_INVENTORY
    },
    {
      to: "/customers",
      icon: Users,
      label: "Clients",
      permission: UserPermissions.VIEW_CUSTOMERS
    },
    {
      to: "/suppliers",
      icon: Truck,
      label: "Fournisseurs",
      permission: UserPermissions.VIEW_SUPPLIERS
    },
    {
      to: "/categories",
      icon: Tags,
      label: "Catégories",
      permission: UserPermissions.VIEW_INVENTORY
    },
    {
      to: "/users",
      icon: UserPlus,
      label: "Utilisateurs",
      permission: UserPermissions.VIEW_USERS
    }
  ];

  const filteredMenuItems = menuItems.filter(item => 
    !item.permission || hasPermission(item.permission)
  );

  return (
    <div
      ref={sidebarRef}
      className={`fixed inset-y-0 left-0 w-64 bg-gradient-to-b from-indigo-600 to-indigo-800 transform transition-opacity duration-300 ease-in-out z-50 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Ripple effect container */}
      <div
        ref={rippleRef}
        className="ripple absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white/10"
      />

      <div className="flex items-center justify-between h-16 px-4 bg-indigo-700">
        <Logo size="sm" className="text-white" />
        <button
          onClick={onClose}
          className="text-white hover:text-gray-200 focus:outline-none"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      <nav className="mt-5 px-2">
        {filteredMenuItems.map((item, index) => (
          <Link
            key={item.to}
            to={item.to}
            className="group flex items-center px-4 py-3 text-white hover:bg-indigo-700 rounded-md transition-all duration-200 transform hover:translate-x-1"
            onClick={onClose}
            style={{
              animationDelay: `${index * 50}ms`,
              opacity: isOpen ? 1 : 0,
              transform: isOpen ? 'translateX(0)' : 'translateX(-20px)',
              transition: 'opacity 300ms, transform 300ms',
            }}
          >
            <item.icon className="h-5 w-5 mr-3" />
            <span>{item.label}</span>
          </Link>
        ))}

        {hasPermission(UserPermissions.VIEW_SETTINGS) && (
          <Link
            to="/settings"
            className="group flex items-center px-4 py-3 text-white hover:bg-indigo-700 rounded-md transition-all duration-200 transform hover:translate-x-1"
            onClick={onClose}
            style={{
              animationDelay: `${filteredMenuItems.length * 50}ms`,
              opacity: isOpen ? 1 : 0,
              transform: isOpen ? 'translateX(0)' : 'translateX(-20px)',
              transition: 'opacity 300ms, transform 300ms',
            }}
          >
            <Settings className="h-5 w-5 mr-3" />
            <span>Paramètres</span>
          </Link>
        )}
      </nav>
    </div>
  );
}