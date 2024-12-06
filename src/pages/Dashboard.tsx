import React from 'react';
import { DashboardGrid } from '../components/dashboard/DashboardGrid';
import { QuickActions } from '../components/dashboard/QuickActions';

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Tableau de bord
        </h1>
      </div>

      <QuickActions />
      <DashboardGrid />
    </div>
  );
}