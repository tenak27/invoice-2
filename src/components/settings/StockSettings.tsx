import React from 'react';
import { useSettingsStore } from '../../store/useSettingsStore';

export function StockSettings() {
  const { settings, updateSettings } = useSettingsStore();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium leading-6 text-gray-900">Paramètres de stock</h3>
        <p className="mt-1 text-sm text-gray-500">
          Configurez les paramètres de gestion des stocks et des alertes.
        </p>
      </div>

      <form className="space-y-6">
        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label htmlFor="lowStockThreshold" className="block text-sm font-medium text-gray-700">
              Seuil d'alerte stock bas (%)
            </label>
            <input
              type="number"
              name="lowStockThreshold"
              id="lowStockThreshold"
              defaultValue={settings.lowStockThreshold}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="stockMethod" className="block text-sm font-medium text-gray-700">
              Méthode de valorisation des stocks
            </label>
            <select
              id="stockMethod"
              name="stockMethod"
              defaultValue={settings.stockMethod}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="FIFO">FIFO (Premier entré, premier sorti)</option>
              <option value="LIFO">LIFO (Dernier entré, premier sorti)</option>
              <option value="AVERAGE">Prix moyen pondéré</option>
            </select>
          </div>

          <div className="sm:col-span-6">
            <div className="flex items-start">
              <div className="flex h-5 items-center">
                <input
                  id="autoUpdateStock"
                  name="autoUpdateStock"
                  type="checkbox"
                  defaultChecked={settings.autoUpdateStock}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="autoUpdateStock" className="font-medium text-gray-700">
                  Mise à jour automatique des stocks
                </label>
                <p className="text-gray-500">
                  Mettre à jour automatiquement les niveaux de stock lors de la création de factures
                </p>
              </div>
            </div>
          </div>

          <div className="sm:col-span-6">
            <div className="flex items-start">
              <div className="flex h-5 items-center">
                <input
                  id="enableStockAlerts"
                  name="enableStockAlerts"
                  type="checkbox"
                  defaultChecked={settings.enableStockAlerts}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="enableStockAlerts" className="font-medium text-gray-700">
                  Activer les alertes de stock
                </label>
                <p className="text-gray-500">
                  Recevoir des notifications lorsque les niveaux de stock sont bas
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Enregistrer
          </button>
        </div>
      </form>
    </div>
  );
}