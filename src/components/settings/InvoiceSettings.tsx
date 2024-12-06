import React, { useState } from 'react';
import { useSettingsStore } from '../../store/useSettingsStore';
import { InvoiceTemplates } from './InvoiceTemplates';

export function InvoiceSettings() {
  const { settings, updateSettings } = useSettingsStore();
  const [selectedTemplate, setSelectedTemplate] = useState(settings.selectedTemplate);

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    updateSettings({ selectedTemplate: templateId });
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium leading-6 text-gray-900">Paramètres de facturation</h3>
        <p className="mt-1 text-sm text-gray-500">
          Configurez les paramètres par défaut pour vos factures et devis.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <label htmlFor="currency" className="block text-sm font-medium text-gray-700">
            Devise
          </label>
          <select
            id="currency"
            name="currency"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            defaultValue="XOF"
            disabled
          >
            <option value="XOF">XOF (FCFA)</option>
          </select>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="taxRate" className="block text-sm font-medium text-gray-700">
            Taux de TVA (%)
          </label>
          <input
            type="number"
            name="taxRate"
            id="taxRate"
            defaultValue={settings.taxRate}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="quotePrefix" className="block text-sm font-medium text-gray-700">
            Préfixe des devis
          </label>
          <input
            type="text"
            name="quotePrefix"
            id="quotePrefix"
            defaultValue={settings.quotePrefix}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="invoicePrefix" className="block text-sm font-medium text-gray-700">
            Préfixe des factures
          </label>
          <input
            type="text"
            name="invoicePrefix"
            id="invoicePrefix"
            defaultValue={settings.invoicePrefix}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="quoteValidity" className="block text-sm font-medium text-gray-700">
            Validité des devis (jours)
          </label>
          <input
            type="number"
            name="quoteValidity"
            id="quoteValidity"
            defaultValue={settings.quoteValidity}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="paymentTerms" className="block text-sm font-medium text-gray-700">
            Délai de paiement (jours)
          </label>
          <input
            type="number"
            name="paymentTerms"
            id="paymentTerms"
            defaultValue={settings.paymentTerms}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      <div>
        <label htmlFor="invoiceNotes" className="block text-sm font-medium text-gray-700">
          Notes par défaut sur les factures
        </label>
        <textarea
          id="invoiceNotes"
          name="invoiceNotes"
          rows={3}
          defaultValue={settings.invoiceNotes}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Ex: Merci de votre confiance. Conditions de paiement : paiement à 30 jours."
        />
      </div>

      <div className="border-t border-gray-200 pt-8">
        <InvoiceTemplates
          selectedTemplate={selectedTemplate}
          onTemplateSelect={handleTemplateSelect}
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Enregistrer
        </button>
      </div>
    </div>
  );
}