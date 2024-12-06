import React from 'react';
import { AlertTriangle } from 'lucide-react';

const alerts = [
  {
    id: 1,
    product: 'Produit A',
    currentStock: 5,
    minStock: 10,
    location: 'Entrepôt Principal',
  },
  {
    id: 2,
    product: 'Produit B',
    currentStock: 2,
    minStock: 15,
    location: 'Entrepôt Sud',
  },
];

export function StockAlerts() {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="p-6">
        <div className="flex items-center">
          <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
          <h2 className="text-lg font-semibold">Alertes de stock</h2>
        </div>
        <div className="mt-6">
          <div className="flow-root">
            <ul className="-my-5 divide-y divide-gray-200">
              {alerts.map((alert) => (
                <li key={alert.id} className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900">
                        {alert.product}
                      </p>
                      <p className="text-sm text-gray-500">
                        Stock: {alert.currentStock} / Min: {alert.minStock}
                      </p>
                      <p className="text-sm text-gray-500">{alert.location}</p>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                      >
                        Commander
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}