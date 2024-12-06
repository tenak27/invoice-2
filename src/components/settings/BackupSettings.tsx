import React from 'react';
import { useSettingsStore } from '../../store/useSettingsStore';

export function BackupSettings() {
  const { settings, updateSettings } = useSettingsStore();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium leading-6 text-gray-900">Paramètres de sauvegarde</h3>
        <p className="mt-1 text-sm text-gray-500">
          Configurez les sauvegardes automatiques de vos données.
        </p>
      </div>

      <form className="space-y-6">
        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div className="sm:col-span-6">
            <div className="flex items-start">
              <div className="flex h-5 items-center">
                <input
                  id="enableAutoBackup"
                  name="enableAutoBackup"
                  type="checkbox"
                  defaultChecked={settings.enableAutoBackup}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="enableAutoBackup" className="font-medium text-gray-700">
                  Sauvegardes automatiques
                </label>
                <p className="text-gray-500">
                  Activer les sauvegardes automatiques périodiques
                </p>
              </div>
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="backupFrequency" className="block text-sm font-medium text-gray-700">
              Fréquence des sauvegardes
            </label>
            <select
              id="backupFrequency"
              name="backupFrequency"
              defaultValue={settings.backupFrequency}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="daily">Quotidienne</option>
              <option value="weekly">Hebdomadaire</option>
              <option value="monthly">Mensuelle</option>
            </select>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="retentionPeriod" className="block text-sm font-medium text-gray-700">
              Période de rétention (jours)
            </label>
            <input
              type="number"
              name="retentionPeriod"
              id="retentionPeriod"
              defaultValue={settings.retentionPeriod}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            className="inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Sauvegarder maintenant
          </button>
          
          <button
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Enregistrer
          </button>
        </div>
      </form>
    </div>
  );
}