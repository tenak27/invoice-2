import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useInventoryStore } from '../../../store/useInventoryStore';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function StockLevels() {
  const { products } = useInventoryStore();
  
  const lowStockProducts = products
    .filter(product => product.quantity <= product.minQuantity)
    .slice(0, 5);

  const data = {
    labels: lowStockProducts.map(product => product.name),
    datasets: [
      {
        label: 'Stock actuel',
        data: lowStockProducts.map(product => product.quantity),
        backgroundColor: 'rgba(239, 68, 68, 0.5)',
        borderColor: 'rgb(239, 68, 68)',
        borderWidth: 1,
      },
      {
        label: 'Stock minimum',
        data: lowStockProducts.map(product => product.minQuantity),
        backgroundColor: 'rgba(99, 102, 241, 0.5)',
        borderColor: 'rgb(99, 102, 241)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={data} options={options} />;
}