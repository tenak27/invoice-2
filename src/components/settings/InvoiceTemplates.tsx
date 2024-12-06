import React from 'react';
import { Check, Plus } from 'lucide-react';
import { cn } from '../../lib/utils';

const templates = [
  {
    id: 'modern',
    name: 'Moderne',
    preview: 'https://images.unsplash.com/photo-1635372722656-389f87a941b7?w=200&h=280&q=80&fit=crop',
    description: 'Design épuré avec une mise en page moderne',
    features: ['En-tête minimaliste', 'Tableau détaillé', 'Pied de page professionnel'],
  },
  {
    id: 'classic',
    name: 'Classique',
    preview: 'https://images.unsplash.com/photo-1638914962352-77591c4e3526?w=200&h=280&q=80&fit=crop',
    description: 'Style traditionnel et professionnel',
    features: ['En-tête détaillé', 'Tableau structuré', 'Mentions légales complètes'],
  },
  {
    id: 'elegant',
    name: 'Élégant',
    preview: 'https://images.unsplash.com/photo-1636633762833-5d1658f1e29b?w=200&h=280&q=80&fit=crop',
    description: 'Design sophistiqué avec accents dorés',
    features: ['En-tête luxueux', 'Mise en page raffinée', 'Détails élégants'],
  },
  {
    id: 'bold',
    name: 'Audacieux',
    preview: 'https://images.unsplash.com/photo-1634733988138-bf2c3a2a13fa?w=200&h=280&q=80&fit=crop',
    description: 'Design moderne avec des couleurs vives',
    features: ['En-tête accrocheur', 'Mise en page dynamique', 'Accents colorés'],
  },
  {
    id: 'minimal',
    name: 'Minimaliste',
    preview: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=200&h=280&q=80&fit=crop',
    description: 'Design simple et efficace',
    features: ['En-tête simplifié', 'Mise en page aérée', 'Style épuré'],
  },
];

interface InvoiceTemplatesProps {
  selectedTemplate: string;
  onTemplateSelect: (templateId: string) => void;
}

export function InvoiceTemplates({ selectedTemplate, onTemplateSelect }: InvoiceTemplatesProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Modèles de facture</h3>
        <p className="mt-1 text-sm text-gray-500">
          Choisissez un modèle professionnel pour vos factures et devis.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {templates.map((template) => (
          <div
            key={template.id}
            onClick={() => onTemplateSelect(template.id)}
            className={cn(
              'relative flex flex-col rounded-lg border bg-white p-4 shadow-sm hover:border-indigo-500 cursor-pointer transition-all duration-200',
              selectedTemplate === template.id ? 'border-indigo-500 ring-2 ring-indigo-500' : 'border-gray-300'
            )}
          >
            {selectedTemplate === template.id && (
              <div className="absolute top-4 right-4 h-6 w-6 flex items-center justify-center rounded-full bg-indigo-600 text-white">
                <Check className="h-4 w-4" />
              </div>
            )}

            <div className="relative mx-auto w-full h-48 mb-4 overflow-hidden rounded-lg">
              <img
                src={template.preview}
                alt={template.name}
                className="h-full w-full object-cover transform hover:scale-105 transition-transform duration-200"
              />
            </div>

            <div className="flex-1">
              <h4 className="text-lg font-medium text-gray-900">{template.name}</h4>
              <p className="mt-1 text-sm text-gray-500">{template.description}</p>
              
              <ul className="mt-4 space-y-2">
                {template.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-600">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}

        <div className="relative flex flex-col rounded-lg border-2 border-dashed border-gray-300 p-4 hover:border-gray-400 cursor-pointer transition-all duration-200">
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <div className="h-12 w-12 rounded-full bg-gray-50 flex items-center justify-center">
              <Plus className="h-6 w-6 text-gray-400" />
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">Modèle personnalisé</h3>
            <p className="mt-1 text-sm text-gray-500">
              Créez votre propre modèle de facture unique
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h4 className="text-sm font-medium text-gray-900 mb-4">Options de personnalisation</h4>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Couleur principale</label>
            <div className="mt-2 flex items-center space-x-3">
              <input
                type="color"
                className="h-8 w-8 rounded-full border border-gray-300"
                defaultValue="#4F46E5"
              />
              <input
                type="text"
                className="block w-24 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                defaultValue="#4F46E5"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Police de caractères</label>
            <select className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
              <option>Inter</option>
              <option>Poppins</option>
              <option>Roboto</option>
              <option>Open Sans</option>
              <option>Lato</option>
            </select>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="showLogo"
              defaultChecked
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label htmlFor="showLogo" className="ml-3 text-sm text-gray-700">
              Afficher le logo de l'entreprise
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="showSignature"
              defaultChecked
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label htmlFor="showSignature" className="ml-3 text-sm text-gray-700">
              Inclure la signature numérique
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="showQRCode"
              defaultChecked
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label htmlFor="showQRCode" className="ml-3 text-sm text-gray-700">
              Ajouter un QR code pour le paiement
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}