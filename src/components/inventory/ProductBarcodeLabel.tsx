import React, { useEffect, useRef } from 'react';
import JsBarcode from 'jsbarcode';
import { formatCurrency } from '../../lib/utils';

interface ProductBarcodeLabelProps {
  product: {
    sku: string;
    name: string;
    price: number;
    description?: string;
    location?: string;
  };
  size?: 'small' | 'medium' | 'large';
}

export function ProductBarcodeLabel({ product, size = 'medium' }: ProductBarcodeLabelProps) {
  const barcodeRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (barcodeRef.current) {
      JsBarcode(barcodeRef.current, product.sku, {
        format: 'CODE128',
        width: size === 'small' ? 1 : size === 'medium' ? 1.5 : 2,
        height: size === 'small' ? 30 : size === 'medium' ? 40 : 50,
        displayValue: true,
        fontSize: size === 'small' ? 8 : size === 'medium' ? 10 : 12,
        margin: 5,
      });
    }
  }, [product.sku, size]);

  const labelClasses = {
    small: 'w-32 h-20 text-xs',
    medium: 'w-48 h-28 text-sm',
    large: 'w-64 h-36 text-base',
  }[size];

  return (
    <div className={`${labelClasses} p-2 border border-gray-200 rounded bg-white flex flex-col items-center justify-between`}>
      <div className="text-center w-full truncate font-semibold">
        {product.name}
      </div>
      
      <svg ref={barcodeRef} className="w-full"></svg>
      
      <div className="flex justify-between w-full text-gray-600">
        <span>{product.location}</span>
        <span className="font-bold">{formatCurrency(product.price)}</span>
      </div>
    </div>
  );
}