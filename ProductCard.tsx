import Link from 'next/link';
import { toBengaliNumeral } from '@/lib/utils';
import { Product } from '@/lib/data';

export default function ProductCard({ product }: { product: Product }) {
  const isUp = product.change > 0;
  const isDown = product.change < 0;

  return (
    <Link href={`/product/${product.slug || product.id}`}>
      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between h-full group">
        <div>
          <div className="text-5xl text-center py-4 bg-emerald-50/50 rounded-xl mb-4 group-hover:scale-105 transition-transform">
            {product.emoji}
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-xs font-medium text-gray-500 mb-4">{product.unit}</p>
        </div>

        <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-400 block font-medium">আজকের দাম</span>
            <span className="text-lg font-black text-gray-900">
              {toBengaliNumeral(product.price)} টাকা
            </span>
          </div>
          <span
            className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 ${
              isUp
                ? 'bg-green-100 text-green-700'
                : isDown
                ? 'bg-red-100 text-red-700'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            {isUp
              ? `▲ ${toBengaliNumeral(product.change)}%`
              : isDown
              ? `▼ ${toBengaliNumeral(Math.abs(product.change))}%`
              : `— ০.০%`}
          </span>
        </div>
      </div>
    </Link>
  );
}
