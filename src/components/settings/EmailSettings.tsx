import React, { useState } from 'react';
import { useSettingsStore } from '../../store/useSettingsStore';
import { Mail, AlertCircle, CheckCircle2, Google, Mail as MailIcon } from 'lucide-react';

const emailProviders = [
  {
    id: 'google',
    name: 'Gmail',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg',
    smtpHost: 'smtp.gmail.com',
    smtpPort: 587,
    instructions: 'Pour Gmail, vous devez activer l\'authentification à deux facteurs et créer un mot de passe d\'application.',
    learnMoreUrl: 'https://support.google.com/accounts/answer/185833',
  },
  {
    id: 'outlook',
    name: 'Outlook',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/d/df/Microsoft_Office_Outlook_%282018%E2%80%93present%29.svg',
    smtpHost: 'smtp.office365.com',
    smtpPort: 587,
    instructions: 'Pour Outlook, utilisez votre adresse email complète et votre mot de passe Outlook.',
    learnMoreUrl: 'https://support.microsoft.com/fr-fr/office/param%C3%A8tres-pop-imap-et-smtp-pour-outlook-com-d088b986-291d-42b8-9564-9c414e2aa040',
  },
  {
    id: 'yahoo',
    name: 'Yahoo',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Yahoo%21_2023_logo.svg',
    smtpHost: 'smtp.mail.yahoo.com',
    smtpPort: 587,
    instructions: 'Pour Yahoo, vous devez générer un mot de passe d\'application dans les paramètres de sécurité.',
    learnMoreUrl: 'https://help.yahoo.com/kb/generate-manage-third-party-passwords-sln15241.html',
  },
  {
    id: 'custom',
    name: 'Email Professionnel',
    icon: null,
    smtpHost: '',
    smtpPort: 587,
    instructions: 'Pour un email professionnel, contactez votre administrateur système pour obtenir les paramètres SMTP.',
  },
];

export function EmailSettings() {
  const { settings, updateSettings } = useSettingsStore();
  const [selectedTemplate, setSelectedTemplate] = useState('invoice');
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [testError, setTestError] = useState<string | null>(null);
  const [selectedProvider, setSelectedProvider] = useState(settings.emailProvider || 'custom');

  const handleProviderSelect = (providerId: string) => {
    const provider = emailProviders.find(p => p.id === providerId);
    if (provider) {
      setSelectedProvider(providerId);
      if (providerId !== 'custom') {
        updateSettings({
          emailProvider: providerId,
          smtpHost: provider.smtpHost,
          smtpPort: provider.smtpPort,
        });
      }
    }
  };

  const handleTestEmail = async () => {
    setTestStatus('testing');
    setTestError(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (!settings.smtpHost || !settings.smtpPort || !settings.smtpUser || !settings.smtpPassword) {
        throw new Error('Veuillez remplir tous les champs SMTP');
      }

      if (!settings.senderEmail) {
        throw new Error("L'email d'expédition est requis");
      }

      setTestStatus('success');
    } catch (error) {
      setTestStatus('error');
      setTestError(error instanceof Error ? error.message : 'Une erreur est survenue');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    updateSettings({
      emailProvider: selectedProvider,
      smtpHost: formData.get('smtpHost') as string,
      smtpPort: parseInt(formData.get('smtpPort') as string),
      smtpUser: formData.get('smtpUser') as string,
      smtpPassword: formData.get('smtpPassword') as string,
      senderEmail: formData.get('senderEmail') as string,
      emailTemplates: {
        ...settings.emailTemplates,
        [selectedTemplate]: {
          subject: formData.get('emailSubject') as string,
          body: formData.get('emailBody') as string,
        },
      },
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium leading-6 text-gray-900">Configuration des emails</h3>
        <p className="mt-1 text-sm text-gray-500">
          Configurez les paramètres SMTP et les modèles d'emails
        </p>
      </div>

      <div className="bg-white shadow-sm rounded-lg p-6">
        <h4 className="text-sm font-medium text-gray-900 mb-4">Choisissez votre fournisseur d'email</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {emailProviders.map((provider) => (
            <button
              key={provider.id}
              onClick={() => handleProviderSelect(provider.id)}
              className={`relative flex flex-col items-center p-4 border rounded-lg transition-all ${
                selectedProvider === provider.id
                  ? 'border-indigo-500 bg-indigo-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {provider.icon ? (
                <img src={provider.icon} alt={provider.name} className="h-8 w-8 mb-2" />
              ) : (
                <MailIcon className="h-8 w-8 mb-2 text-gray-400" />
              )}
              <span className="text-sm font-medium">{provider.name}</span>
            </button>
          ))}
        </div>

        {selectedProvider !== 'custom' && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700">
              {emailProviders.find(p => p.id === selectedProvider)?.instructions}
            </p>
            {emailProviders.find(p => p.id === selectedProvider)?.learnMoreUrl && (
              <a
                href={emailProviders.find(p => p.id === selectedProvider)?.learnMoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center mt-2 text-sm text-blue-600 hover:text-blue-500"
              >
                En savoir plus
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white shadow-sm rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="smtpHost" className="block text-sm font-medium text-gray-700">
                  Serveur SMTP
                </label>
                <input
                  type="text"
                  name="smtpHost"
                  id="smtpHost"
                  defaultValue={settings.smtpHost}
                  readOnly={selectedProvider !== 'custom'}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                    selectedProvider !== 'custom' ? 'bg-gray-50' : ''
                  }`}
                  placeholder="smtp.example.com"
                />
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="smtpPort" className="block text-sm font-medium text-gray-700">
                  Port SMTP
                </label>
                <input
                  type="number"
                  name="smtpPort"
                  id="smtpPort"
                  defaultValue={settings.smtpPort}
                  readOnly={selectedProvider !== 'custom'}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                    selectedProvider !== 'custom' ? 'bg-gray-50' : ''
                  }`}
                  placeholder="587"
                />
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="smtpUser" className="block text-sm font-medium text-gray-700">
                  Utilisateur SMTP
                </label>
                <input
                  type="text"
                  name="smtpUser"
                  id="smtpUser"
                  defaultValue={settings.smtpUser}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="smtpPassword" className="block text-sm font-medium text-gray-700">
                  {selectedProvider !== 'custom' ? 'Mot de passe d\'application' : 'Mot de passe SMTP'}
                </label>
                <input
                  type="password"
                  name="smtpPassword"
                  id="smtpPassword"
                  defaultValue={settings.smtpPassword}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="senderEmail" className="block text-sm font-medium text-gray-700">
                  Email d'expédition
                </label>
                <input
                  type="email"
                  name="senderEmail"
                  id="senderEmail"
                  defaultValue={settings.senderEmail}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="noreply@example.com"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Rest of the component remains the same */}
        {/* ... Email templates section ... */}
        {/* ... Test email section ... */}
        {/* ... Submit buttons ... */}
      </form>
    </div>
  );
}