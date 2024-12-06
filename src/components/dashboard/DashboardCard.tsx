import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

interface DashboardCardProps {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  trend: 'up' | 'down';
}

export function DashboardCard({ title, value, change, icon: Icon, trend }: DashboardCardProps) {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <Icon className="h-5 w-5 text-muted-foreground" />
          <span
            className={cn(
              'text-sm font-medium',
              trend === 'up' ? 'text-green-600' : 'text-red-600'
            )}
          >
            {change}
          </span>
        </div>
        <div className="mt-4">
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <p className="mt-2 text-3xl font-semibold">{value}</p>
        </div>
      </div>
    </div>
  );
}