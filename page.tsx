'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { INITIAL_PRODUCTS, Product } from '@/lib/data';
import { toBengaliNumeral } from '@/lib/utils';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { ArrowLeft, Store, ShieldAlert } from 'lucide-react';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('bazardor_user');
    if (!storedUser) {
      toast.error('পণ্য বিস্তারিত দেখার জন্য সাইন ইন করুন');
      router.push('/signin');
      return;
    }
    setUser(JSON.parse(storedUser));

    const found = INITIAL_PRODUCTS.find(
      (p) => p.slug === slug || p.id.toString() === slug
    );
    if (found) {
      setProduct(found);
    } else {
      setProduct(INITIAL_PRODUCTS[0]);
    }
  }, [slug, router]);

  if (!user || !product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <ShieldAlert className="w-12 h-12 text-emerald-600 mx-auto mb-4 animate-bounce" />
        <p className="text-lg font-bold text-gray-700">লোড হচ্ছে...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-bold text-emerald-600 hover:text-emerald-700"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>হোম পেজে ফিরে যান</span>
      </Link>

      {/* Summary Header */}
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-center gap-8">
        <div className="text-7xl p-6 bg-emerald-50 rounded-2xl">{product.emoji}</div>
        <div className="space-y-3 text-center md:text-left flex-1">
          <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">
            {product.category}
          </span>
          <h1 className="text-3xl font-black text-gray-900">{product.name}</h1>
          <p className="text-sm text-gray-500 font-medium">{product.unit} এর পাইকারি ও খুচরা বাজার দর</p>
        </div>
      </div>

      {/* Price Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl text-center">
          <p className="text-xs font-bold text-emerald-700 uppercase">সর্বনিম্ন দাম</p>
          <p className="text-2xl font-black text-emerald-900 mt-1">
            {toBengaliNumeral(product.minPrice)} টাকা
          </p>
        </div>
        <div className="bg-blue-50 border border-blue-200 p-6 rounded-2xl text-center">
          <p className="text-xs font-bold text-blue-700 uppercase">গড় দাম</p>
          <p className="text-2xl font-black text-blue-900 mt-1">
            {toBengaliNumeral(product.avgPrice)} টাকা
          </p>
        </div>
        <div className="bg-rose-50 border border-rose-200 p-6 rounded-2xl text-center">
          <p className="text-xs font-bold text-rose-700 uppercase">সর্বোচ্চ দাম</p>
          <p className="text-2xl font-black text-rose-900 mt-1">
            {toBengaliNumeral(product.maxPrice)} টাকা
          </p>
        </div>
      </div>

      {/* Market Breakdown Table */}
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Store className="w-5 h-5 text-emerald-600" />
          <span>বাজারভিত্তিক আজকের দাম</span>
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-sm font-bold text-gray-500">
                <th className="py-3 px-4">বাজারের নাম</th>
                <th className="py-3 px-4">দাম</th>
                <th className="py-3 px-4 text-right">সর্বশেষ আপডেট</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm font-medium text-gray-800">
              {product.markets.map((m, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="py-4 px-4 font-bold">{m.name}</td>
                  <td className="py-4 px-4 text-emerald-600 font-extrabold">
                    {toBengaliNumeral(m.price)} টাকা
                  </td>
                  <td className="py-4 px-4 text-right text-gray-400">{m.update}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
