import React, { useState } from 'react';
import { useSettingsStore } from '../../store/useSettingsStore';
import { ImageIcon, Trash2 } from 'lucide-react';

export function CompanySettings() {
  const { settings, updateSettings } = useSettingsStore();
  const [previewLogo, setPreviewLogo] = useState<string>(settings.logo || '');

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Logo = reader.result as string;
        setPreviewLogo(base64Logo);
        updateSettings({ logo: base64Logo });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveLogo = () => {
    setPreviewLogo('');
    updateSettings({ logo: '' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    updateSettings({
      companyName: formData.get('companyName') as string,
      taxId: formData.get('taxId') as string,
      address: formData.get('address') as string,
      phone: formData.get('phone') as string,
      email: formData.get('email') as string,
      logo: previewLogo,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium leading-6 text-gray-900">Informations de l'entreprise</h3>
        <p className="mt-1 text-sm text-gray-500">
          Ces informations apparaîtront sur vos factures et autres documents.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Logo de l'entreprise</label>
          <div className="mt-2 flex items-center space-x-6">
            {previewLogo ? (
              <div className="relative inline-block">
                <img
                  src={previewLogo}
                  alt="Logo de l'entreprise"
                  className="h-32 w-32 object-contain rounded-lg border border-gray-200"
                />
                <button
                  type="button"
                  onClick={handleRemoveLogo}
                  className="absolute -top-2 -right-2 bg-red-100 rounded-full p-1 hover:bg-red-200"
                >
                  <Trash2 className="h-4 w-4 text-red-600" />
                </button>
              </div>
            ) : (
              <label className="flex justify-center items-center h-32 w-32 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer hover:border-gray-400">
                <div className="space-y-1 text-center">
                  <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="text-xs text-gray-600">
                    <span className="text-indigo-600 hover:text-indigo-500">
                      Télécharger un logo
                    </span>
                  </div>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleLogoChange}
                />
              </label>
            )}
            <div className="text-sm text-gray-500">
              <p>Format recommandé: PNG ou JPEG</p>
              <p>Taille maximale: 2 MB</p>
              <p>Dimensions idéales: 400x400 pixels</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div className="sm:col-span-4">
            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
              Nom de l'entreprise
            </label>
            <input
              type="text"
              name="companyName"
              id="companyName"
              defaultValue={settings.companyName}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div className="sm:col-span-4">
            <label htmlFor="taxId" className="block text-sm font-medium text-gray-700">
              Numéro d'identification fiscale
            </label>
            <input
              type="text"
              name="taxId"
              id="taxId"
              defaultValue={settings.taxId}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div className="sm:col-span-6">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Adresse
            </label>
            <textarea
              id="address"
              name="address"
              rows={3}
              defaultValue={settings.address}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Téléphone
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              defaultValue={settings.phone}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              defaultValue={settings.email}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
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