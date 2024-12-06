import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/Tabs';
import { CompanySettings } from '../components/settings/CompanySettings';
import { InvoiceSettings } from '../components/settings/InvoiceSettings';
import { EmailSettings } from '../components/settings/EmailSettings';
import { StockSettings } from '../components/settings/StockSettings';
import { UserSettings } from '../components/settings/UserSettings';
import { BackupSettings } from '../components/settings/BackupSettings';
import { SignatureSettings } from '../components/settings/SignatureSettings';

export function Settings() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Paramètres</h1>
      </div>

      <div className="bg-white shadow-sm rounded-lg">
        <Tabs defaultValue="company" className="w-full">
          <TabsList className="border-b">
            <TabsTrigger value="company">Entreprise</TabsTrigger>
            <TabsTrigger value="invoice">Facturation</TabsTrigger>
            <TabsTrigger value="email">Emails</TabsTrigger>
            <TabsTrigger value="signature">Signature</TabsTrigger>
            <TabsTrigger value="stock">Stock</TabsTrigger>
            <TabsTrigger value="users">Utilisateurs</TabsTrigger>
            <TabsTrigger value="backup">Sauvegarde</TabsTrigger>
          </TabsList>
          
          <div className="p-6">
            <TabsContent value="company">
              <CompanySettings />
            </TabsContent>
            
            <TabsContent value="invoice">
              <InvoiceSettings />
            </TabsContent>
            
            <TabsContent value="email">
              <EmailSettings />
            </TabsContent>

            <TabsContent value="signature">
              <SignatureSettings />
            </TabsContent>
            
            <TabsContent value="stock">
              <StockSettings />
            </TabsContent>
            
            <TabsContent value="users">
              <UserSettings />
            </TabsContent>
            
            <TabsContent value="backup">
              <BackupSettings />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}