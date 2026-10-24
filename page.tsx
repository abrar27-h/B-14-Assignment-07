'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { ShoppingCart } from 'lucide-react';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('সবগুলো ঘর পূরণ করুন');
      return;
    }

    const name = email.split('@')[0];
    localStorage.setItem('bazardor_user', JSON.stringify({ email, name }));
    toast.success('সফলভাবে সাইন ইন করেছেন!');
    router.push('/');
    setTimeout(() => window.location.reload(), 300);
  };

  return (
    <div className="max-w-md mx-auto my-16 px-4">
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-block p-3 bg-emerald-100 text-emerald-600 rounded-2xl mb-2">
            <ShoppingCart className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-black text-gray-900">সাইন ইন করুন</h1>
          <p className="text-sm text-gray-500">আপনার অ্যাকাউন্টে প্রবেশ করুন</p>
        </div>

        <form onSubmit={handleSignIn} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">ইমেইল</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
              placeholder="example@gmail.com"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">পাসওয়ার্ড</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-emerald-600 text-white font-bold rounded-xl shadow-lg hover:bg-emerald-700 transition-all text-sm"
          >
            সাইন ইন
          </button>
        </form>

        <p className="text-center text-sm text-gray-600">
          অ্যাকাউন্ট নেই?{' '}
          <Link href="/signup" className="font-bold text-emerald-600 hover:underline">
            সাইন আপ করুন
          </Link>
        </p>
      </div>
    </div>
  );
}
