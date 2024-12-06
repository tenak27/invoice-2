import React from 'react';
import { Settings, X } from 'lucide-react';
import { useDashboardStore } from '../../store/useDashboardStore';
import { Widget } from '../../types/dashboard';
import { RevenueChart } from './widgets/RevenueChart';
import { StockLevels } from './widgets/StockLevels';
import { TopProducts } from './widgets/TopProducts';
import { CustomerStats } from './widgets/CustomerStats';
import { InvoiceStatus } from './widgets/InvoiceStatus';
import { RecentTransactions } from './widgets/RecentTransactions';

const widgetComponents = {
  revenue_chart: RevenueChart,
  stock_levels: StockLevels,
  top_products: TopProducts,
  customer_stats: CustomerStats,
  invoice_status: InvoiceStatus,
  recent_transactions: RecentTransactions,
};

interface DashboardWidgetProps {
  widget: Widget;
}

export function DashboardWidget({ widget }: DashboardWidgetProps) {
  const { removeWidget, updateWidget } = useDashboardStore();
  const WidgetComponent = widgetComponents[widget.type as keyof typeof widgetComponents];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">{widget.title}</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => {/* Open widget settings */}}
            className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
          >
            <Settings className="h-4 w-4" />
          </button>
          <button
            onClick={() => removeWidget(widget.id)}
            className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="p-4">
        {WidgetComponent && <WidgetComponent config={widget.config} />}
      </div>
    </div>
  );
}