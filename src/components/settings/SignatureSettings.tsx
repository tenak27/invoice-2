import React, { useState } from 'react';
import { SignaturePad } from '../ui/SignaturePad';
import { useSettingsStore } from '../../store/useSettingsStore';

export function SignatureSettings() {
  const { settings, updateSettings } = useSettingsStore();
  const [showPreview, setShowPreview] = useState(false);

  const handleSignatureChange = (signature: string) => {
    updateSettings({ signature });
  };

  const handlePositionChange = (position: 'bottom-left' | 'bottom-right' | 'custom') => {
    updateSettings({ signaturePosition: position });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium leading-6 text-gray-900">Signature numérique</h3>
        <p className="mt-1 text-sm text-gray-500">
          Configurez votre signature numérique pour les documents officiels
        </p>
      </div>

      <div className="grid grid-cols-1 gap-y-6">
        <div>
          <SignaturePad
            value={settings.signature}
            onChange={handleSignatureChange}
            label="Signature officielle"
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="useSignature"
              checked={settings.useSignature}
              onChange={(e) => updateSettings({ useSignature: e.target.checked })}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label htmlFor="useSignature" className="ml-3 text-sm text-gray-700">
              Inclure automatiquement la signature sur les documents
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="requireSignature"
              checked={settings.requireSignature}
              onChange={(e) => updateSettings({ requireSignature: e.target.checked })}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label htmlFor="requireSignature" className="ml-3 text-sm text-gray-700">
              Exiger une signature pour finaliser les documents
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Position de la signature
          </label>
          <div className="grid grid-cols-3 gap-4">
            <button
              type="button"
              onClick={() => handlePositionChange('bottom-left')}
              className={`p-4 border rounded-lg text-center ${
                settings.signaturePosition === 'bottom-left'
                  ? 'border-indigo-500 bg-indigo-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <div className="text-sm font-medium">En bas à gauche</div>
            </button>
            <button
              type="button"
              onClick={() => handlePositionChange('bottom-right')}
              className={`p-4 border rounded-lg text-center ${
                settings.signaturePosition === 'bottom-right'
                  ? 'border-indigo-500 bg-indigo-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <div className="text-sm font-medium">En bas à droite</div>
            </button>
            <button
              type="button"
              onClick={() => handlePositionChange('custom')}
              className={`p-4 border rounded-lg text-center ${
                settings.signaturePosition === 'custom'
                  ? 'border-indigo-500 bg-indigo-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <div className="text-sm font-medium">Position personnalisée</div>
            </button>
          </div>
        </div>

        {settings.signature && (
          <div className="border-t pt-6">
            <h4 className="text-sm font-medium text-gray-900 mb-4">Aperçu de la signature</h4>
            <div className="bg-white p-4 border rounded-lg">
              <img
                src={settings.signature}
                alt="Signature preview"
                className="max-h-24 object-contain"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}