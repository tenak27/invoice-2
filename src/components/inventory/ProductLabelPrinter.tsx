import React, { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Printer, X } from 'lucide-react';
import { ProductBarcodeLabel } from './ProductBarcodeLabel';

interface ProductLabelPrinterProps {
  product: any;
  quantity?: number;
  onClose: () => void;
}

export function ProductLabelPrinter({ product, quantity: initialQuantity = 1, onClose }: ProductLabelPrinterProps) {
  const [size, setSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [quantity, setQuantity] = useState(initialQuantity);
  const componentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    removeAfterPrint: true,
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Imprimer les étiquettes</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Aperçu de l'étiquette
        </label>
        <div className="flex justify-center bg-gray-50 p-4 rounded-lg">
          <ProductBarcodeLabel product={product} size={size} />
        </div>
      </div>

      <div className="mb-6">
        <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-2">
          Taille de l'étiquette
        </label>
        <select
          id="size"
          value={size}
          onChange={(e) => setSize(e.target.value as 'small' | 'medium' | 'large')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="small">Petite (32mm x 20mm)</option>
          <option value="medium">Moyenne (48mm x 28mm)</option>
          <option value="large">Grande (64mm x 36mm)</option>
        </select>
      </div>

      <div className="mb-6">
        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
          Nombre d'étiquettes
        </label>
        <input
          type="number"
          id="quantity"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      {/* Composant d'impression */}
      <div style={{ display: 'none' }}>
        <div ref={componentRef} className="p-4">
          <div className="grid grid-cols-3 gap-4">
            {Array.from({ length: quantity }).map((_, index) => (
              <ProductBarcodeLabel key={index} product={product} size={size} />
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handlePrint}
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Printer className="h-4 w-4 mr-2" />
          Imprimer les étiquettes
        </button>
      </div>
    </div>
  );
}