import React from 'react';
import { Plus, FileText, ClipboardList, Package } from 'lucide-react';
import { Link } from 'react-router-dom';

export function QuickActions() {
  const actions = [
    {
      title: 'Nouvelle facture',
      icon: FileText,
      to: '/invoices',
      color: 'bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600',
      description: 'Créer une nouvelle facture',
    },
    {
      title: 'Nouveau devis',
      icon: ClipboardList,
      to: '/quotes',
      color: 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600',
      description: 'Créer un nouveau devis',
    },
    {
      title: 'Nouveau produit',
      icon: Package,
      to: '/inventory',
      color: 'bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600',
      description: 'Ajouter un nouveau produit',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {actions.map((action) => (
        <Link
          key={action.title}
          to={action.to}
          className={`${action.color} text-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 transform hover:scale-[1.02]`}
        >
          <div className="p-6">
            <div className="flex items-center">
              <action.icon className="h-8 w-8" />
              <div className="ml-4">
                <h3 className="text-lg font-semibold">{action.title}</h3>
                <p className="text-sm text-white/80">{action.description}</p>
              </div>
              <Plus className="h-6 w-6 ml-auto" />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}