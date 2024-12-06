import React from 'react';
import { useDashboardStore } from '../../store/useDashboardStore';
import { BarChart3, Package, Users, FileText, Clock, TrendingUp } from 'lucide-react';

const availableWidgets = [
  {
    type: 'revenue_chart',
    title: 'Graphique des revenus',
    description: 'Visualisez l\'évolution de vos revenus',
    icon: TrendingUp,
  },
  {
    type: 'stock_levels',
    title: 'Niveaux de stock',
    description: 'Surveillez vos niveaux de stock',
    icon: Package,
  },
  {
    type: 'top_products',
    title: 'Meilleurs produits',
    description: 'Vos produits les plus vendus',
    icon: BarChart3,
  },
  {
    type: 'customer_stats',
    title: 'Statistiques clients',
    description: 'Aperçu de vos clients',
    icon: Users,
  },
  {
    type: 'invoice_status',
    title: 'État des factures',
    description: 'Suivi des factures',
    icon: FileText,
  },
  {
    type: 'recent_transactions',
    title: 'Transactions récentes',
    description: 'Dernières transactions',
    icon: Clock,
  },
];

interface WidgetPickerProps {
  onClose: () => void;
}

export function WidgetPicker({ onClose }: WidgetPickerProps) {
  const { addWidget } = useDashboardStore();

  const handleAddWidget = (type: string, title: string) => {
    addWidget({
      type,
      title,
      position: Date.now(),
      config: {},
    });
    onClose();
  };

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold mb-6">Ajouter un widget</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {availableWidgets.map((widget) => (
          <button
            key={widget.type}
            onClick={() => handleAddWidget(widget.type, widget.title)}
            className="flex items-start p-4 border rounded-lg hover:border-indigo-500 transition-colors"
          >
            <widget.icon className="h-6 w-6 text-indigo-500 mr-4 mt-1" />
            <div className="text-left">
              <h3 className="font-medium">{widget.title}</h3>
              <p className="text-sm text-gray-500">{widget.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}