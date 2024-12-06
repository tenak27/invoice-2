import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { useInvoiceStore } from '../../../store/useInvoiceStore';

ChartJS.register(ArcElement, Tooltip, Legend);

export function InvoiceStatus() {
  const { invoices } = useInvoiceStore();

  const statusCounts = {
    draft: invoices.filter(inv => inv.status === 'draft').length,
    sent: invoices.filter(inv => inv.status === 'sent').length,
    paid: invoices.filter(inv => inv.status === 'paid').length,
    overdue: invoices.filter(inv => inv.status === 'overdue').length,
  };

  const data = {
    labels: ['Brouillon', 'Envoyée', 'Payée', 'En retard'],
    datasets: [
      {
        data: [
          statusCounts.draft,
          statusCounts.sent,
          statusCounts.paid,
          statusCounts.overdue,
        ],
        backgroundColor: [
          'rgba(156, 163, 175, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
        borderColor: [
          'rgb(156, 163, 175)',
          'rgb(59, 130, 246)',
          'rgb(16, 185, 129)',
          'rgb(239, 68, 68)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  };

  return <Pie data={data} options={options} />;
}