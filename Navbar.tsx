'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getBanglaDate } from '@/lib/utils';
import { CATEGORIES } from '@/lib/data';
import { ShoppingCart, User, LogOut, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [banglaDate, setBanglaDate] = useState('');
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setBanglaDate(getBanglaDate());
    const stored = localStorage.getItem('bazardor_user');
    if (stored) {
      try { setUser(JSON.parse(stored)); } catch (e) {}
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('bazardor_user');
    setUser(null);
    window.location.reload();
  };

  return (
    <header className="bg-white border-b border-emerald-100 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Left: Logo & Bangla Date */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="bg-emerald-600 text-white p-2.5 rounded-xl shadow-md group-hover:bg-emerald-700 transition-colors">
              <ShoppingCart className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-black text-gray-900 tracking-tight flex items-center gap-1">
                বাজার দর <span className="text-emerald-600 text-xs px-2 py-0.5 bg-emerald-50 rounded-full font-bold">লাইভ</span>
              </span>
              <span className="block text-xs font-medium text-emerald-700">{banglaDate}</span>
            </div>
          </Link>

          {/* Center: Desktop Nav Categories */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {CATEGORIES.slice(0, 5).map((cat) => (
              <Link
                key={cat.id}
                href={cat.id === 'all' ? '/' : `/categories/${cat.id}`}
                className="px-3 py-1.5 text-sm font-semibold text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
              >
                <span>{cat.emoji}</span> {cat.name}
              </Link>
            ))}
          </nav>

          {/* Right: Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/profile"
                  className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-800 rounded-lg font-bold text-sm hover:bg-emerald-100 transition-colors"
                >
                  <User className="w-4 h-4 text-emerald-600" />
                  <span>{user.name}</span>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="সাইন আউট"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/signin"
                  className="px-4 py-2 text-sm font-bold text-gray-700 hover:text-emerald-600 transition-colors"
                >
                  সাইন ইন
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 text-sm font-bold bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 shadow-sm transition-all"
                >
                  সাইন আপ
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-600 hover:text-emerald-600 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pt-2 pb-4 space-y-2">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={cat.id === 'all' ? '/' : `/categories/${cat.id}`}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-semibold text-gray-700 hover:bg-emerald-50 rounded-lg"
            >
              {cat.emoji} {cat.name}
            </Link>
          ))}
          <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
            {user ? (
              <div className="flex items-center justify-between w-full">
                <Link href="/profile" className="font-bold text-emerald-700">{user.name}</Link>
                <button onClick={handleSignOut} className="text-sm text-red-600 font-bold">সাইন আউট</button>
              </div>
            ) : (
              <div className="flex gap-2 w-full">
                <Link href="/signin" className="w-1/2 text-center py-2 font-bold text-gray-700 border rounded-lg">সাইন ইন</Link>
                <Link href="/signup" className="w-1/2 text-center py-2 font-bold bg-emerald-600 text-white rounded-lg">সাইন আপ</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
