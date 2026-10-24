'use client';

import { Product } from '@/lib/data';

export default function Ticker({ products }: { products: Product[] }) {
  return (
    <div className="w-full bg-emerald-900 text-white py-2.5 overflow-hidden shadow-inner border-y border-emerald-800">
      <div className="flex whitespace-nowrap animate-marquee space-x-8">
        {products.concat(products).map((item, idx) => {
          const isUp = item.change > 0;
          const isDown = item.change < 0;
          return (
            <div key={`${item.id}-${idx}`} className="inline-flex items-center space-x-2 text-sm font-medium">
              <span className="text-lg">{item.emoji}</span>
              <span className="font-semibold text-emerald-100">{item.name}</span>
              <span className="font-bold text-yellow-300">{item.price} টাকা/{item.unit.replace('প্রতি ', '')}</span>
              <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                isUp ? 'bg-green-600/90 text-white' : isDown ? 'bg-red-600/90 text-white' : 'bg-gray-600 text-white'
              }`}>
                {isUp ? `▲ ${item.change}%` : isDown ? `▼ ${Math.abs(item.change)}%` : `— 0.0%`}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
