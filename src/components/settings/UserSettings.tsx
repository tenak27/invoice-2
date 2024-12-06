import React from 'react';
import { useSettingsStore } from '../../store/useSettingsStore';

export function UserSettings() {
  const { settings, updateSettings } = useSettingsStore();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium leading-6 text-gray-900">Paramètres utilisateurs</h3>
        <p className="mt-1 text-sm text-gray-500">
          Gérez les paramètres de sécurité et les préférences utilisateur.
        </p>
      </div>

      <form className="space-y-6">
        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div className="sm:col-span-6">
            <div className="flex items-start">
              <div className="flex h-5 items-center">
                <input
                  id="twoFactorAuth"
                  name="twoFactorAuth"
                  type="checkbox"
                  defaultChecked={settings.twoFactorAuth}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="twoFactorAuth" className="font-medium text-gray-700">
                  Authentification à deux facteurs
                </label>
                <p className="text-gray-500">
                  Activer l'authentification à deux facteurs pour plus de sécurité
                </p>
              </div>
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="sessionTimeout" className="block text-sm font-medium text-gray-700">
              Délai d'expiration de session (minutes)
            </label>
            <input
              type="number"
              name="sessionTimeout"
              id="sessionTimeout"
              defaultValue={settings.sessionTimeout}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="language" className="block text-sm font-medium text-gray-700">
              Langue
            </label>
            <select
              id="language"
              name="language"
              defaultValue={settings.language}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="fr">Français</option>
            </select>
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