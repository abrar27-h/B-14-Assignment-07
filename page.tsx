'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { 
  ShoppingBag, Search, ArrowUp, ArrowDown, Minus, User, LogOut, 
  LogIn, UserPlus, ChevronRight, TrendingUp, TrendingDown, RefreshCw, 
  ShieldCheck, MapPin, Calendar, Clock, ArrowLeft, Filter, CheckCircle2, 
  AlertCircle, Sparkles, BarChart2, Store, Check, Info, Award
} from 'lucide-react';

// --- BENGALI NUMBER & UTILITY HELPER FUNCTIONS ---
const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
const enDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

const toBn = (num: any) => {
  if (num === null || num === undefined) return '';
  const str = num.toString();
  return str.replace(/\d/g, (digit: string) => bnDigits[parseInt(digit, 10)]);
};

const toEn = (str: any) => {
  if (!str) return 0;
  let s = str.toString();
  for (let i = 0; i < 10; i++) {
    s = s.replace(new RegExp(bnDigits[i], 'g'), enDigits[i]);
  }
  return parseFloat(s) || 0;
};

const formatPrice = (price: any) => {
  const p = typeof price === 'number' ? price : toEn(price);
  return `৳ ${toBn(Math.round(p))}`;
};

const getBengaliDate = () => {
  const now = new Date();
  const days = ['রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার'];
  const months = ['জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'];
  
  const dayName = days[now.getDay()];
  const dayNum = toBn(now.getDate());
  const monthName = months[now.getMonth()];
  const year = toBn(now.getFullYear());
  
  return `${dayName}, ${dayNum} ${monthName} ${year}`;
};

const INITIAL_PRODUCTS = [
  {
    id: 'prod-1',
    slug: 'nazirshail-rice',
    name: 'নাজিরশাইল চাল (প্রিমিয়াম)',
    category: 'চাল',
    category_bn: 'চাল',
    unit: 'প্রতি কেজি',
    price: 78,
    previousPrice: 75,
    changePercent: 4.0,
    isRising: true,
    image: '🌾',
    minPrice: 75,
    maxPrice: 82,
    avgPrice: 78.5,
    description: 'উচ্চমানের সরু নাজিরশাইল চাল, ঝরঝরে ও সুস্বাদু ভাতের জন্য আদর্শ। দেশীয় চাতাল থেকে সরাসরি সংগৃহীত।',
    markets: [
      { name: 'কারওয়ান বাজার', price: 76, change: -1.2 },
      { name: 'কাপ্তান বাজার', price: 78, change: 0.0 },
      { name: 'নিউ মার্কেট', price: 80, change: +2.5 },
      { name: 'মিরপুর ১০ বাজার', price: 78, change: 0.0 },
      { name: 'শান্তিনগর বাজার', price: 81, change: +3.8 }
    ],
    history: [72, 74, 75, 75, 76, 77, 78]
  },
  {
    id: 'prod-2',
    slug: 'miniket-rice',
    name: 'মিনিকোট চাল',
    category: 'চাল',
    category_bn: 'চাল',
    unit: 'প্রতি কেজি',
    price: 68,
    previousPrice: 70,
    changePercent: -2.86,
    isRising: false,
    image: '🍚',
    minPrice: 65,
    maxPrice: 72,
    avgPrice: 68.2,
    description: 'দৈনন্দিন খাবারের জন্য জনপ্রিয় পালিশ করা সরু চাল। বাজার সরবরাহ বৃদ্ধি পাওয়ায় দাম সামান্য কমেছে।',
    markets: [
      { name: 'কারওয়ান বাজার', price: 66, change: -2.9 },
      { name: 'কাপ্তান বাজার', price: 68, change: 0.0 },
      { name: 'নিউ মার্কেট', price: 70, change: +2.9 },
      { name: 'মিরপুর ১০ বাজার', price: 68, change: 0.0 },
      { name: 'শান্তিনগর বাজার', price: 69, change: +1.4 }
    ],
    history: [72, 71, 70, 70, 69, 69, 68]
  },
  {
    id: 'prod-3',
    slug: 'red-lentils-deshi',
    name: 'দেশি মসুর ডাল (সরু)',
    category: 'ডাল',
    category_bn: 'ডাল',
    unit: 'প্রতি কেজি',
    price: 140,
    previousPrice: 135,
    changePercent: 3.7,
    isRising: true,
    image: '🍲',
    minPrice: 135,
    maxPrice: 148,
    avgPrice: 141.0,
    description: 'খাটি দেশি ছোট দানার মসুর ডাল, যা খুব দ্রুত সিদ্ধ হয় এবং অত্যন্ত সুস্বাদু।',
    markets: [
      { name: 'কারওয়ান বাজার', price: 138, change: -1.4 },
      { name: 'কাপ্তান বাজার', price: 140, change: 0.0 },
      { name: 'নিউ মার্কেট', price: 145, change: +3.5 },
      { name: 'মিরপুর ১০ বাজার', price: 140, change: 0.0 },
      { name: 'শান্তিনগর বাজার', price: 142, change: +1.4 }
    ],
    history: [130, 132, 135, 135, 138, 139, 140]
  },
  {
    id: 'prod-4',
    slug: 'soybean-oil-1l',
    name: 'সোয়াবিন তেল (বোতলজাত)',
    category: 'তেল',
    category_bn: 'তেল',
    unit: 'প্রতি লিটার',
    price: 168,
    previousPrice: 172,
    changePercent: -2.32,
    isRising: false,
    image: '🍾',
    minPrice: 165,
    maxPrice: 175,
    avgPrice: 168.6,
    description: 'সরকারি নির্ধারিত সর্বোচ্চ খুচরা মূল্যে বিক্রিত রিফাইনড বোতলজাত সোয়াবিন তেল।',
    markets: [
      { name: 'কারওয়ান বাজার', price: 167, change: -0.6 },
      { name: 'কাপ্তান বাজার', price: 168, change: 0.0 },
      { name: 'নিউ মার্কেট', price: 170, change: +1.1 },
      { name: 'মিরপুর ১০ বাজার', price: 168, change: 0.0 },
      { name: 'শান্তিনগর বাজার', price: 169, change: +0.6 }
    ],
    history: [175, 174, 172, 170, 169, 168, 168]
  },
  {
    id: 'prod-5',
    slug: 'hilsha-fish-1kg',
    name: 'পদ্মার ইলিশ মাছ (১ কেজি সাইজ)',
    category: 'মাছ',
    category_bn: 'মাছ',
    unit: 'প্রতি কেজি',
    price: 1450,
    previousPrice: 1350,
    changePercent: 7.4,
    isRising: true,
    image: '🐟',
    minPrice: 1400,
    maxPrice: 1550,
    avgPrice: 1460,
    description: 'তাজা নদীর সুস্বাদু ইলিশ মাছ। বাজারে চাহিদা বেশি ও যোগান কম থাকায় দাম উর্ধ্বমুখী।',
    markets: [
      { name: 'কারওয়ান বাজার', price: 1420, change: -2.0 },
      { name: 'কাপ্তান বাজার', price: 1450, change: 0.0 },
      { name: 'নিউ মার্কেট', price: 1500, change: +3.4 },
      { name: 'মিরপুর ১০ বাজার', price: 1460, change: +0.6 },
      { name: 'শান্তিনগর বাজার', price: 1520, change: +4.8 }
    ],
    history: [1300, 1320, 1350, 1380, 1400, 1420, 1450]
  },
  {
    id: 'prod-6',
    slug: 'broiler-chicken',
    name: 'ব্রয়লার মুরগি',
    category: 'মাংস',
    category_bn: 'মাংস',
    unit: 'প্রতি কেজি',
    price: 175,
    previousPrice: 185,
    changePercent: -5.4,
    isRising: false,
    image: '🍗',
    minPrice: 170,
    maxPrice: 185,
    avgPrice: 176.5,
    description: 'খামারের তাজা ব্রয়লার মুরগি। সরবরাহ বৃদ্ধির ফলে আজকের বাজারে দাম বেশ কিছুটা কমেছে।',
    markets: [
      { name: 'কারওয়ান বাজার', price: 170, change: -2.8 },
      { name: 'কাপ্তান বাজার', price: 175, change: 0.0 },
      { name: 'নিউ মার্কেট', price: 180, change: +2.8 },
      { name: 'মিরপুর ১০ বাজার', price: 175, change: 0.0 },
      { name: 'শান্তিনগর বাজার', price: 178, change: +1.7 }
    ],
    history: [190, 188, 185, 182, 180, 178, 175]
  },
  {
    id: 'prod-7',
    slug: 'beef-meat',
    name: 'গরুর মাংস (হাড়সহ)',
    category: 'মাংস',
    category_bn: 'মাংস',
    unit: 'প্রতি কেজি',
    price: 750,
    previousPrice: 750,
    changePercent: 0,
    isRising: false,
    image: '🥩',
    minPrice: 740,
    maxPrice: 780,
    avgPrice: 755,
    description: 'তাজা হাড়সহ দেশি গরুর মাংস। সরকারি নির্দেশিত ও নিয়ন্ত্রিত দামে স্থিতিশীলভাবে বিক্রি হচ্ছে।',
    markets: [
      { name: 'কারওয়ান বাজার', price: 740, change: -1.3 },
      { name: 'কাপ্তান বাজার', price: 750, change: 0.0 },
      { name: 'নিউ মার্কেট', price: 760, change: +1.3 },
      { name: 'মিরপুর ১০ বাজার', price: 750, change: 0.0 },
      { name: 'শান্তিনগর বাজার', price: 770, change: +2.6 }
    ],
    history: [750, 750, 750, 750, 750, 750, 750]
  },
  {
    id: 'prod-8',
    slug: 'deshi-onion',
    name: 'দেশি পেঁয়াজ (নতুন)',
    category: 'সবজি',
    category_bn: 'সবজি',
    unit: 'প্রতি কেজি',
    price: 95,
    previousPrice: 110,
    changePercent: -13.6,
    isRising: false,
    image: '🧅',
    minPrice: 90,
    maxPrice: 105,
    avgPrice: 96,
    description: 'নতুন দেশি পেঁয়াজ হাটে আসায় দামে বড় ধরণের পতন দেখা গেছে, ক্রেতাদের মধ্যে স্বস্তি।',
    markets: [
      { name: 'কারওয়ান বাজার', price: 90, change: -5.2 },
      { name: 'কাপ্তান বাজার', price: 95, change: 0.0 },
      { name: 'নিউ মার্কেট', price: 100, change: +5.2 },
      { name: 'মিরপুর ১০ বাজার', price: 95, change: 0.0 },
      { name: 'শান্তিনগর বাজার', price: 98, change: +3.1 }
    ],
    history: [120, 115, 110, 105, 100, 98, 95]
  },
  {
    id: 'prod-9',
    slug: 'potato-granola',
    name: 'নতুন ডায়মন্ড আলু',
    category: 'সবজি',
    category_bn: 'সবজি',
    unit: 'প্রতি কেজি',
    price: 45,
    previousPrice: 42,
    changePercent: 7.14,
    isRising: true,
    image: '🥔',
    minPrice: 42,
    maxPrice: 50,
    avgPrice: 45.8,
    description: 'উচ্চমানের তাজা ডায়মন্ড আলু। হালকা চাহিদার কারণে সাময়িক বৃদ্ধি।',
    markets: [
      { name: 'কারওয়ান বাজার', price: 43, change: -4.4 },
      { name: 'কাপ্তান বাজার', price: 45, change: 0.0 },
      { name: 'নিউ মার্কেট', price: 48, change: +6.6 },
      { name: 'মিরপুর ১০ বাজার', price: 45, change: 0.0 },
      { name: 'শান্তিনগর বাজার', price: 46, change: +2.2 }
    ],
    history: [40, 40, 42, 42, 43, 44, 45]
  },
  {
    id: 'prod-10',
    slug: 'green-chili',
    name: 'কাঁচা মরিচ',
    category: 'সবজি',
    category_bn: 'সবজি',
    unit: 'প্রতি কেজি',
    price: 160,
    previousPrice: 140,
    changePercent: 14.28,
    isRising: true,
    image: '🌶️',
    minPrice: 150,
    maxPrice: 180,
    avgPrice: 162,
    description: 'বৃষ্টি ও আবহাওয়ার কারণে উৎপাদন ক্ষতিগ্রস্ত হওয়ায় ঝাল কাঁচা মরিচের দাম বেশ বেড়েছে।',
    markets: [
      { name: 'কারওয়ান বাজার', price: 150, change: -6.2 },
      { name: 'কাপ্তান বাজার', price: 160, change: 0.0 },
      { name: 'নিউ মার্কেট', price: 175, change: +9.3 },
      { name: 'মিরপুর ১০ বাজার', price: 160, change: 0.0 },
      { name: 'শান্তিনগর বাজার', price: 170, change: +6.2 }
    ],
    history: [130, 135, 140, 145, 150, 155, 160]
  },
  {
    id: 'prod-11',
    slug: 'farm-eggs-red',
    name: 'ফার্মের লাল ডিম',
    category: 'অন্যান্য',
    category_bn: 'অন্যান্য',
    unit: 'প্রতি ডজন',
    price: 150,
    previousPrice: 155,
    changePercent: -3.2,
    isRising: false,
    image: '🥚',
    minPrice: 145,
    maxPrice: 160,
    avgPrice: 151,
    description: 'পুষ্টিকর খামারের তাজা লাল ডিম। ১ ডজন (১২ টি) এর খুচরা দাম।',
    markets: [
      { name: 'কারওয়ান বাজার', price: 148, change: -1.3 },
      { name: 'কাপ্তান বাজার', price: 150, change: 0.0 },
      { name: 'নিউ মার্কেট', price: 155, change: +3.3 },
      { name: 'মিরপুর ১০ বাজার', price: 150, change: 0.0 },
      { name: 'শান্তিনগর বাজার', price: 152, change: +1.3 }
    ],
    history: [160, 158, 155, 154, 152, 150, 150]
  },
  {
    id: 'prod-12',
    slug: 'garlic-imported',
    name: 'আমদানিকৃত রসুন (চায়না)',
    category: 'মসলা',
    category_bn: 'মসলা',
    unit: 'প্রতি কেজি',
    price: 210,
    previousPrice: 200,
    changePercent: 5.0,
    isRising: true,
    image: '🧄',
    minPrice: 200,
    maxPrice: 230,
    avgPrice: 212,
    description: 'আমদানিকৃত বড় কোয়ার সাদা চায়না রসুন। মসলা বাজারে সামান্য বৃদ্ধি দেখা গেছে।',
    markets: [
      { name: 'কারওয়ান বাজার', price: 205, change: -2.3 },
      { name: 'কাপ্তান বাজার', price: 210, change: 0.0 },
      { name: 'নিউ মার্কেট', price: 220, change: +4.7 },
      { name: 'মিরপুর ১০ বাজার', price: 210, change: 0.0 },
      { name: 'শান্তিনগর বাজার', price: 215, change: +2.3 }
    ],
    history: [195, 198, 200, 200, 205, 208, 210]
  }
];

function ToastContainer({ toasts }: { toasts: any[] }) {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full px-4 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-center gap-3 p-4 rounded-xl shadow-xl border text-sm font-medium transition-all transform duration-300 ${
            toast.type === 'error'
              ? 'bg-red-900/90 text-red-100 border-red-700'
              : toast.type === 'info'
              ? 'bg-blue-900/90 text-blue-100 border-blue-700'
              : 'bg-emerald-900/90 text-emerald-100 border-emerald-700'
          }`}
        >
          {toast.type === 'error' ? (
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
          ) : toast.type === 'info' ? (
            <Info className="w-5 h-5 text-blue-400 shrink-0" />
          ) : (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          )}
          <span className="flex-1">{toast.message}</span>
        </div>
      ))}
    </div>
  );
}

function useToast() {
  const [toasts, setToasts] = useState<any[]>([]);
  const addToast = (message: string, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };
  return { toasts, addToast };
}

export default function Home() {
  const [products, setProducts] = useState<any[]>(INITIAL_PRODUCTS);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('সব পণ্য');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('default');
  
  const [currentRoute, setCurrentRoute] = useState('home');
  const [selectedProductSlug, setSelectedProductSlug] = useState<string | null>(null);
  
  const [user, setUser] = useState<any>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('signin');

  const { toasts, addToast } = useToast();
  const [profileNameInput, setProfileNameInput] = useState('');

  useEffect(() => {
    async function fetchLiveProducts() {
      setLoading(true);
      try {
        const res = await fetch('https://openapi.programming-hero.com/api/bazardor/products');
        const data = await res.json();
        
        if (data && data.data && Array.isArray(data.data) && data.data.length > 0) {
          const mapped = data.data.map((item: any, index: number) => {
            const rawPrice = typeof item.price === 'number' ? item.price : toEn(item.price || 100);
            const prevP = item.previousPrice ? (typeof item.previousPrice === 'number' ? item.previousPrice : toEn(item.previousPrice)) : Math.round(rawPrice * (index % 2 === 0 ? 0.95 : 1.05));
            const diff = rawPrice - prevP;
            const pct = prevP !== 0 ? (diff / prevP) * 100 : 0;
            const isRising = diff > 0;

            return {
              id: item._id || item.id || `api-${index}`,
              slug: item.slug || item.id || `product-${index}`,
              name: item.name || item.product_name || 'বাজার পণ্য',
              category: item.category || 'অন্যান্য',
              category_bn: item.category || 'অন্যান্য',
              unit: item.unit || 'প্রতি কেজি',
              price: rawPrice,
              previousPrice: prevP,
              changePercent: Math.abs(parseFloat(pct.toFixed(2))),
              isRising: isRising,
              image: item.image_url || item.image || ['🌾', '🐟', '🥩', '🧅', '🥔', '🌶️', '🍳'][index % 7],
              minPrice: Math.round(rawPrice * 0.94),
              maxPrice: Math.round(rawPrice * 1.06),
              avgPrice: rawPrice,
              description: item.description || `${item.name || 'পণ্যটির'} বাজার দর প্রতিদিন সকাল ৮টায় হালনাগাদ করা হয়। মানভেদে দামের সামান্য পরিবর্তন হতে পারে।`,
              markets: [
                { name: 'কারওয়ান বাজার', price: Math.round(rawPrice * 0.97), change: -2.1 },
                { name: 'কাপ্তান বাজার', price: rawPrice, change: 0.0 },
                { name: 'নিউ মার্কেট', price: Math.round(rawPrice * 1.03), change: +2.8 },
                { name: 'মিরপুর ১০ বাজার', price: rawPrice, change: 0.0 },
                { name: 'শান্তিনগর বাজার', price: Math.round(rawPrice * 1.04), change: +3.5 }
              ],
              history: [
                Math.round(rawPrice * 0.90),
                Math.round(rawPrice * 0.92),
                Math.round(rawPrice * 0.95),
                Math.round(rawPrice * 0.96),
                Math.round(rawPrice * 0.98),
                prevP,
                rawPrice
              ]
            };
          });
          setProducts(mapped);
        }
      } catch (err) {
        console.warn('API Fetch fallback used:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchLiveProducts();
  }, []);

  useEffect(() => {
    if (user) {
      setProfileNameInput(user.name);
    }
  }, [user]);

  const categories = useMemo(() => {
    const cats = new Set(products.map((p) => p.category_bn || p.category));
    return ['সব পণ্য', ...Array.from(cats)];
  }, [products]);

  const topRisers = useMemo(() => {
    return [...products].filter((p) => p.isRising && p.changePercent > 0).sort((a, b) => b.changePercent - a.changePercent).slice(0, 6);
  }, [products]);

  const topFallers = useMemo(() => {
    return [...products].filter((p) => !p.isRising && p.changePercent > 0).sort((a, b) => b.changePercent - a.changePercent).slice(0, 6);
  }, [products]);

  const filteredProducts = useMemo(() => {
    let result = products.filter((p) => {
      const matchCategory = selectedCategory === 'সব পণ্য' || (p.category_bn || p.category) === selectedCategory;
      const matchSearch = p.name.toLowerCase().includes(searchQuery.trim().toLowerCase()) || (p.category && p.category.toLowerCase().includes(searchQuery.trim().toLowerCase()));
      return matchCategory && matchSearch;
    });

    if (sortOption === 'low-to-high') {
      result = [...result].sort((a, b) => {
        const valA = typeof a.price === 'number' ? a.price : toEn(a.price);
        const valB = typeof b.price === 'number' ? b.price : toEn(b.price);
        return valA - valB;
      });
    } else if (sortOption === 'high-to-low') {
      result = [...result].sort((a, b) => {
        const valA = typeof a.price === 'number' ? a.price : toEn(a.price);
        const valB = typeof b.price === 'number' ? b.price : toEn(b.price);
        return valB - valA;
      });
    }

    return result;
  }, [products, selectedCategory, searchQuery, sortOption]);

  const selectedProduct = useMemo(() => {
    return products.find((p) => p.slug === selectedProductSlug || p.id === selectedProductSlug);
  }, [products, selectedProductSlug]);

  const handleOpenProduct = (slug: string) => {
    if (!user) {
      addToast('পণ্যটির বিস্তারিত বাজার দর দেখতে অনুগ্রহ করে সাইন ইন করুন।', 'info');
      setAuthMode('signin');
      setAuthModalOpen(true);
      return;
    }
    setSelectedProductSlug(slug);
    setCurrentRoute('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSignInSim = (e: any) => {
    e.preventDefault();
    const email = e.target.email.value;
    const name = email.split('@')[0] || 'গ্রাহক';
    const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
    
    setUser({
      name: formattedName === 'User' ? 'মাসুদ রানা' : formattedName,
      email: email,
      role: 'যাচাইকৃত গ্রাহক',
      joinDate: 'অক্টোবর ২০২৬'
    });
    setAuthModalOpen(false);
    addToast('সফলভাবে সাইন ইন করেছেন! স্বাগতম।', 'success');
  };

  const handleSignUpSim = (e: any) => {
    e.preventDefault();
    const name = e.target.fullname.value;
    const email = e.target.email.value;
    setUser({
      name: name || 'নতুন গ্রাহক',
      email: email,
      role: 'নতুন সদস্য',
      joinDate: 'অক্টোবর ২০২৬'
    });
    setAuthModalOpen(false);
    addToast('আপনার একাউন্ট সফলভাবে তৈরি হয়েছে!', 'success');
  };

  const handleSocialAuth = (provider: string) => {
    setUser({
      name: provider === 'Google' ? 'রাফসান আহমেদ' : 'তানজিল হোসেন',
      email: provider === 'Google' ? 'rafsan@gmail.com' : 'tanjil@github.com',
      role: `${provider} ব্যবহারকারী`,
      joinDate: 'অক্টোবর ২০২৬'
    });
    setAuthModalOpen(false);
    addToast(`${provider}-এর মাধ্যমে সফলভাবে লগইন করেছেন!`, 'success');
  };

  const handleLogout = () => {
    setUser(null);
    addToast('সফলভাবে সাইন আউট করা হয়েছে।', 'info');
  };

  const handleProfileUpdate = (e: any) => {
    e.preventDefault();
    if (!profileNameInput.trim()) {
      addToast('অনুগ্রহ করে সঠিক নাম লিখুন।', 'error');
      return;
    }
    setUser((prev: any) => (prev ? { ...prev, name: profileNameInput } : null));
    addToast('প্রোফাইলের তথ্য সফলভাবে আপডেট করা হয়েছে!', 'success');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      <ToastContainer toasts={toasts} />

      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
            
            <div 
              onClick={() => setCurrentRoute('home')} 
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-emerald-600 flex items-center justify-center text-white text-xl sm:text-2xl shadow-md shadow-emerald-600/30 group-hover:scale-105 transition-transform">
                🛒
              </div>
              <div>
                <div className="text-lg sm:text-xl font-black text-slate-900 tracking-tight group-hover:text-emerald-700 transition-colors">
                  বাজার দর
                </div>
                <div className="text-[10px] sm:text-xs text-emerald-600 font-bold -mt-1">
                  দৈনিক পণ্য মূল্য ট্র্যাকার
                </div>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100/80 text-slate-600 text-xs font-semibold border border-slate-200/60">
              <Calendar className="w-3.5 h-3.5 text-emerald-600" />
              <span>{getBengaliDate()}</span>
            </div>

            <div className="flex items-center gap-3">
              {user ? (
                <div className="flex items-center gap-2 sm:gap-3">
                  <button
                    onClick={() => setCurrentRoute('profile')}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 hover:bg-emerald-100 transition-colors text-xs font-bold"
                  >
                    <User className="w-4 h-4 text-emerald-600" />
                    <span className="max-w-[100px] truncate">{user.name}</span>
                  </button>

                  <button
                    onClick={handleLogout}
                    title="সাইন আউট"
                    className="p-2 rounded-xl bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 border border-slate-200 transition-colors text-xs"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => { setAuthMode('signin'); setAuthModalOpen(true); }}
                    className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors flex items-center gap-1.5"
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    <span>সাইন ইন</span>
                  </button>
                  <button
                    onClick={() => { setAuthMode('signup'); setAuthModalOpen(true); }}
                    className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm shadow-emerald-600/20 transition-all flex items-center gap-1.5"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>রেজিস্ট্রেশন</span>
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>

        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee-smooth {
            display: flex;
            width: max-content;
            animation: marquee 25s linear infinite;
          }
          .animate-marquee-smooth:hover {
            animation-play-state: paused;
          }
        `}</style>
        <div className="bg-slate-900 text-white overflow-hidden py-2 border-y border-slate-800 flex items-center shadow-inner relative">
          <div className="shrink-0 px-4 bg-emerald-600 text-white text-xs font-extrabold uppercase py-1 z-20 flex items-center gap-1.5 shadow-md">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>বাজার আপডেট</span>
          </div>
          <div className="flex overflow-hidden w-full relative">
            <div className="animate-marquee-smooth flex items-center gap-4 pl-4">
              {products.concat(products).map((item, idx) => (
                <div key={`${item.id}-${idx}`} className="inline-flex items-center gap-2 bg-slate-800/80 px-3 py-1 rounded-lg border border-slate-700/50 shrink-0">
                  <span>{item.image}</span>
                  <span className="font-semibold text-slate-200">{item.name}</span>
                  <span className="font-bold text-emerald-400">{formatPrice(item.price)}</span>
                  <span className="text-slate-400 text-[11px]">({item.unit})</span>
                  {item.isRising ? (
                    <span className="inline-flex items-center gap-0.5 text-[11px] text-red-400 font-bold bg-red-950/60 px-1.5 py-0.5 rounded">
                      <ArrowUp className="w-3 h-3" /> {toBn(item.changePercent)}%
                    </span>
                  ) : item.changePercent > 0 ? (
                    <span className="inline-flex items-center gap-0.5 text-[11px] text-emerald-400 font-bold bg-emerald-950/60 px-1.5 py-0.5 rounded">
                      <ArrowDown className="w-3 h-3" /> {toBn(item.changePercent)}%
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-0.5 text-[11px] text-slate-400 font-bold bg-slate-700/60 px-1.5 py-0.5 rounded">
                      <Minus className="w-3 h-3" /> ০০%
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {currentRoute === 'home' && (
          <div>
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
              <div className="bg-[#f0f7f4] rounded-3xl p-6 sm:p-10 md:p-12 border border-emerald-100/60 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
                
                <div className="space-y-4 max-w-xl text-left z-10">
                  <div className="inline-block px-3.5 py-1.5 rounded-full bg-emerald-100/80 text-emerald-800 text-xs font-bold border border-emerald-200/50">
                    {getBengaliDate()}
                  </div>

                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
                    আজকের বাজারের দাম এক নজরে
                  </h1>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                    চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মশলার দর — ক্যাটাগরিভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং দামের পরিবর্তনের তথ্যসহ।
                  </p>

                  <div className="pt-2">
                    <button
                      onClick={() => {
                        const el = document.getElementById('all-products-section');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="px-6 py-2.5 sm:py-3 bg-[#009647] hover:bg-[#007e3b] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      <span>সব পণ্য দেখুন</span>
                    </button>
                  </div>
                </div>

                <div className="relative z-10 shrink-0 w-48 sm:w-64 md:w-72 flex justify-center items-center">
                  <div className="relative w-full">
                    <svg viewBox="0 0 300 240" className="w-full h-auto drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <ellipse cx="150" cy="220" rx="100" ry="12" fill="#000000" fillOpacity="0.08" />
                      <path d="M 60 130 C 60 130 75 210 150 210 C 225 210 240 130 240 130 Z" fill="#b85c14" />
                      <path d="M 60 130 Q 150 145 240 130" stroke="#8f430a" strokeWidth="4" />
                      <path d="M 70 155 Q 150 170 230 155" stroke="#8f430a" strokeWidth="3" />
                      <path d="M 85 180 Q 150 193 215 180" stroke="#8f430a" strokeWidth="3" />
                      <line x1="95" y1="135" x2="105" y2="200" stroke="#8f430a" strokeWidth="3" />
                      <line x1="130" y1="138" x2="133" y2="208" stroke="#8f430a" strokeWidth="3" />
                      <line x1="170" y1="138" x2="167" y2="208" stroke="#8f430a" strokeWidth="3" />
                      <line x1="205" y1="135" x2="195" y2="200" stroke="#8f430a" strokeWidth="3" />

                      <circle cx="150" cy="100" r="38" fill="#00c853" />
                      <path d="M 150 62 Q 155 45 168 38" stroke="#009647" strokeWidth="4" strokeLinecap="round" />
                      <path d="M 168 38 Q 175 48 160 52" stroke="#009647" strokeWidth="3" strokeLinecap="round" />
                      <path d="M 125 90 C 130 110 135 125 130 138" stroke="#009647" strokeWidth="4" fill="none" />
                      <path d="M 160 85 C 168 105 165 120 168 138" stroke="#009647" strokeWidth="4" fill="none" />

                      <circle cx="108" cy="112" r="24" fill="#ff3d00" />
                      <path d="M 108 88 Q 112 78 120 75" stroke="#00c853" strokeWidth="3" strokeLinecap="round" />
                      <path d="M 102 90 L 114 90 L 108 84 Z" fill="#00c853" />

                      <circle cx="196" cy="120" r="22" fill="#ff9100" />
                      <circle cx="192" cy="100" r="3" fill="#00c853" />

                      <circle cx="78" cy="125" r="16" fill="#7c4dff" />
                      <circle cx="168" cy="118" r="15" fill="#ffab00" />
                    </svg>
                  </div>
                </div>

              </div>
            </section>

            <div id="সব-পণ্য" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-14">
              
              {topRisers.length > 0 && (
                <section className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-8 bg-red-500 rounded-full"></div>
                      <div>
                        <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
                          <span>আজ দাম বেড়েছে</span>
                          <span className="text-red-500 text-lg">▲</span>
                        </h2>
                        <p className="text-xs text-slate-500">যেসব পণ্যের দাম আগের দিনের তুলনায় বৃদ্ধি পেয়েছে</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                    {topRisers.map((product) => (
                      <div
                        key={`riser-${product.id}`}
                        onClick={() => handleOpenProduct(product.slug)}
                        className="bg-white rounded-2xl p-4 border border-red-100 shadow-sm hover:shadow-md hover:border-red-300 transition-all cursor-pointer flex flex-col justify-between group"
                      >
                        <div className="flex items-start justify-between">
                          <span className="text-3xl p-2 bg-red-50 rounded-xl group-hover:scale-110 transition-transform">{product.image}</span>
                          <span className="inline-flex items-center gap-0.5 text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded-lg border border-red-200">
                            <ArrowUp className="w-3 h-3" /> {toBn(product.changePercent)}%
                          </span>
                        </div>
                        <div className="mt-3">
                          <h3 className="text-sm font-bold text-slate-800 line-clamp-1 group-hover:text-emerald-700 transition-colors">
                            {product.name}
                          </h3>
                          <div className="text-[11px] text-slate-400 mt-0.5">{product.unit}</div>
                          <div className="text-base font-black text-slate-900 mt-2">
                            {formatPrice(product.price)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {topFallers.length > 0 && (
                <section className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-8 bg-emerald-500 rounded-full"></div>
                      <div>
                        <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
                          <span>আজ দাম কমেছে</span>
                          <span className="text-emerald-500 text-lg">▼</span>
                        </h2>
                        <p className="text-xs text-slate-500">যেসব পণ্যের দাম আগের দিনের তুলনায় হ্রাস পেয়েছে</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                    {topFallers.map((product) => (
                      <div
                        key={`faller-${product.id}`}
                        onClick={() => handleOpenProduct(product.slug)}
                        className="bg-white rounded-2xl p-4 border border-emerald-100 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all cursor-pointer flex flex-col justify-between group"
                      >
                        <div className="flex items-start justify-between">
                          <span className="text-3xl p-2 bg-emerald-50 rounded-xl group-hover:scale-110 transition-transform">{product.image}</span>
                          <span className="inline-flex items-center gap-0.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-200">
                            <ArrowDown className="w-3 h-3" /> {toBn(product.changePercent)}%
                          </span>
                        </div>
                        <div className="mt-3">
                          <h3 className="text-sm font-bold text-slate-800 line-clamp-1 group-hover:text-emerald-700 transition-colors">
                            {product.name}
                          </h3>
                          <div className="text-[11px] text-slate-400 mt-0.5">{product.unit}</div>
                          <div className="text-base font-black text-slate-900 mt-2">
                            {formatPrice(product.price)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              <section id="all-products-section" className="space-y-6 pt-4">
                <div className="border-t border-slate-200/80 pt-8">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-black text-slate-900">সকল নিত্যপণ্য দরদাম</h2>
                      <p className="text-xs text-slate-500 mt-0.5">ক্যাটাগরি ভিত্তিক বাজার দর অনুসন্ধান করুন</p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                      <div className="relative min-w-[240px]">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="পণ্যের নাম খুঁজুন..."
                          className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                        />
                        {searchQuery && (
                          <button
                            onClick={() => setSearchQuery('')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                          >
                            ✕
                          </button>
                        )}
                      </div>

                      <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-1.5 shadow-sm">
                        <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="text-xs font-bold text-slate-600 shrink-0">সাজান:</span>
                        <select
                          value={sortOption}
                          onChange={(e) => setSortOption(e.target.value)}
                          className="bg-transparent text-xs font-semibold text-slate-800 focus:outline-none cursor-pointer pr-2"
                        >
                          <option value="default">ডিফল্ট</option>
                          <option value="low-to-high">দাম: কম থেকে বেশি</option>
                          <option value="high-to-low">দাম: বেশি থেকে কম</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-6 no-scrollbar">
                    {categories.map((cat) => (
                      <button
                        key={`tab-${cat}`}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                          selectedCategory === cat
                            ? 'bg-slate-900 text-white shadow-md'
                            : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {loading ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                      <div key={n} className="bg-white rounded-3xl p-5 border border-slate-100 animate-pulse space-y-4">
                        <div className="w-12 h-12 bg-slate-200 rounded-2xl"></div>
                        <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                        <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                        <div className="h-6 bg-slate-200 rounded w-1/3"></div>
                      </div>
                    ))}
                  </div>
                ) : filteredProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                      <div
                        key={product.id}
                        onClick={() => handleOpenProduct(product.slug)}
                        className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-emerald-400 transition-all duration-300 cursor-pointer flex flex-col justify-between group relative overflow-hidden"
                      >
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                              {product.image}
                            </div>
                            <div>
                              {product.isRising ? (
                                <span className="inline-flex items-center gap-1 text-xs font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-full border border-red-200">
                                  <ArrowUp className="w-3 h-3" /> {toBn(product.changePercent)}%
                                </span>
                              ) : product.changePercent > 0 ? (
                                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                                  <ArrowDown className="w-3 h-3" /> {toBn(product.changePercent)}%
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
                                  <Minus className="w-3 h-3" /> ০০%
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="mt-4 space-y-1">
                            <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                              {product.category_bn || product.category}
                            </span>
                            <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-1 pt-1">
                              {product.name}
                            </h3>
                            <p className="text-xs text-slate-500">{product.unit}</p>
                          </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                          <div>
                            <div className="text-[10px] text-slate-400 font-semibold">আজকের দাম</div>
                            <div className="text-xl font-black text-slate-900">
                              {formatPrice(product.price)}
                            </div>
                          </div>

                          <button className="w-9 h-9 rounded-xl bg-slate-100 group-hover:bg-emerald-600 group-hover:text-white text-slate-600 flex items-center justify-center transition-colors">
                            <ChevronRight className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-md mx-auto space-y-4">
                    <div className="text-5xl">🔍</div>
                    <h3 className="text-lg font-bold text-slate-800">কোনো পণ্য পাওয়া যায়নি</h3>
                    <p className="text-xs text-slate-500">
                      আপনার অনুসন্ধানের সাথে মেলে এমন কোনো পণ্য বর্তমানে তালিকায় নেই। অন্য নামে অনুসন্ধান করার চেষ্টা করুন।
                    </p>
                    <button
                      onClick={() => { setSearchQuery(''); setSelectedCategory('সব পণ্য'); }}
                      className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition-colors"
                    >
                      ফিল্টার রিসেট করুন
                    </button>
                  </div>
                )}
              </section>

            </div>
          </div>
        )}

        {currentRoute === 'product-detail' && (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in">
            <button
              onClick={() => setCurrentRoute('home')}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>হোম পেজে ফিরে যান</span>
            </button>

            {selectedProduct ? (
              <div className="space-y-8">
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md flex flex-col md:flex-row gap-8 items-start">
                  <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl bg-gradient-to-tr from-emerald-100 to-teal-50 border border-emerald-200 flex items-center justify-center text-6xl shadow-inner shrink-0">
                    {selectedProduct.image}
                  </div>

                  <div className="flex-1 space-y-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200">
                        {selectedProduct.category_bn || selectedProduct.category}
                      </span>
                      <span className="bg-slate-100 text-slate-600 text-xs font-semibold px-3 py-1 rounded-full">
                        {selectedProduct.unit}
                      </span>
                    </div>

                    <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                      {selectedProduct.name}
                    </h1>

                    <p className="text-sm text-slate-600 leading-relaxed">
                      {selectedProduct.description}
                    </p>

                    <div className="pt-2 flex items-baseline gap-3">
                      <span className="text-3xl font-black text-emerald-700">{formatPrice(selectedProduct.price)}</span>
                      <span className="text-xs text-slate-400 font-medium">/{selectedProduct.unit}</span>
                      {selectedProduct.isRising ? (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-lg border border-red-200">
                          <ArrowUp className="w-3.5 h-3.5" /> {toBn(selectedProduct.changePercent)}% দাম বৃদ্ধি
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                          <ArrowDown className="w-3.5 h-3.5" /> {toBn(selectedProduct.changePercent)}% দাম হ্রাস
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xl">
                      ⬇️
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-bold">সর্বনিম্ন দাম (Min Price)</div>
                      <div className="text-xl font-black text-slate-900 mt-0.5">{formatPrice(selectedProduct.minPrice)}</div>
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center font-bold text-xl">
                      ⬆️
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-bold">সর্বোচ্চ দাম (Max Price)</div>
                      <div className="text-xl font-black text-slate-900 mt-0.5">{formatPrice(selectedProduct.maxPrice)}</div>
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xl">
                      ⚖️
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-bold">গড় দাম (Avg Price)</div>
                      <div className="text-xl font-black text-slate-900 mt-0.5">{formatPrice(selectedProduct.avgPrice)}</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <BarChart2 className="w-5 h-5 text-emerald-600" />
                      <span>গত ৭ দিনের মূল্য পরিবর্তন ট্রেন্ড</span>
                    </h3>
                    <span className="text-xs text-slate-400 font-medium">প্রতিদিনের গড় মূল্য</span>
                  </div>

                  <div className="h-44 flex items-end justify-between gap-2 pt-8 pb-2 px-4 border-b border-slate-100">
                    {selectedProduct.history.map((val: number, idx: number) => {
                      const maxHistorical = Math.max(...selectedProduct.history);
                      const heightPct = Math.max(25, (val / maxHistorical) * 100);
                      return (
                        <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                          <span className="text-[10px] font-bold text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">
                            ৳{toBn(val)}
                          </span>
                          <div
                            style={{ height: `${heightPct}%` }}
                            className={`w-full max-w-[36px] rounded-t-lg transition-all duration-500 ${
                              idx === selectedProduct.history.length - 1
                                ? 'bg-emerald-600'
                                : 'bg-slate-200 group-hover:bg-emerald-300'
                            }`}
                          ></div>
                          <span className="text-[10px] font-semibold text-slate-400">
                            দিন {toBn(idx + 1)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                        <Store className="w-5 h-5 text-emerald-600" />
                        <span>ঢাকার প্রধান প্রধান বাজারে আজকের দরদাম</span>
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">স্থানভিত্তিক বাজার মূল্যের পরিবর্তন ও পার্থক্য</p>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider">
                          <th className="py-3 px-4">বাজারের নাম</th>
                          <th className="py-3 px-4">আজকের মূল্য</th>
                          <th className="py-3 px-4">গড় পার্থক্য</th>
                          <th className="py-3 px-4">স্ট্যাটাস</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                        {selectedProduct.markets.map((mkt: any, idx: number) => (
                          <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-3.5 px-4 font-bold text-slate-900 flex items-center gap-2">
                              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                              <span>{mkt.name}</span>
                            </td>
                            <td className="py-3.5 px-4 font-black text-slate-900">
                              {formatPrice(mkt.price)}
                            </td>
                            <td className="py-3.5 px-4">
                              {mkt.change > 0 ? (
                                <span className="text-red-600 font-bold">+{toBn(mkt.change)}%</span>
                              ) : mkt.change < 0 ? (
                                <span className="text-emerald-600 font-bold">{toBn(mkt.change)}%</span>
                              ) : (
                                <span className="text-slate-400">সমান</span>
                              )}
                            </td>
                            <td className="py-3.5 px-4">
                              <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-md border border-emerald-200">
                                <Check className="w-3 h-3 text-emerald-600" /> সচল
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4">
                <div className="text-6xl">⚠️</div>
                <h2 className="text-xl font-bold text-slate-900">পণ্যটি খুঁজে পাওয়া যায়নি</h2>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  আপনার অনুরোধকৃত পণ্যটির কোনো তথ্য ডিরেক্টরিতে পাওয়া যায়নি।
                </p>
                <button
                  onClick={() => setCurrentRoute('home')}
                  className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition-colors"
                >
                  হোম পেজে ফিরে যান
                </button>
              </div>
            )}
          </div>
        )}

        {currentRoute === 'profile' && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in">
            <button
              onClick={() => setCurrentRoute('home')}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>হোম পেজে ফিরে যান</span>
            </button>

            {user ? (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                <div className="md:col-span-5 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6 text-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 text-white font-black text-4xl flex items-center justify-center mx-auto shadow-lg shadow-emerald-200">
                    {user.name.charAt(0)}
                  </div>

                  <div>
                    <h2 className="text-xl font-black text-slate-900">{user.name}</h2>
                    <p className="text-xs text-slate-500">{user.email}</p>
                    <span className="inline-block mt-2 text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full border border-emerald-200">
                      {user.role}
                    </span>
                  </div>

                  <div className="border-t border-slate-100 pt-4 text-left space-y-3 text-xs">
                    <div className="flex justify-between text-slate-600">
                      <span>সদস্যপদ:</span>
                      <span className="font-bold text-slate-800">{user.joinDate}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>স্ট্যাটাস:</span>
                      <span className="font-bold text-emerald-600">সক্রিয় (Active)</span>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                  <div>
                    <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                      <User className="w-5 h-5 text-emerald-600" />
                      <span>তথ্য আপডেট করুন</span>
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      আপনার প্রোফাইলের নাম ও ব্যক্তিগত তথ্য পরিবর্তনের পর আপডেট বাটনে ক্লিক করুন।
                    </p>
                  </div>

                  <form onSubmit={handleProfileUpdate} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        পুরো নাম (Full Name)
                      </label>
                      <input
                        type="text"
                        value={profileNameInput}
                        onChange={(e) => setProfileNameInput(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                        placeholder="আপনার নাম লিখুন..."
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        ইমেইল ঠিকানা (পরিবর্তনযোগ্য নয়)
                      </label>
                      <input
                        type="email"
                        value={user.email}
                        disabled
                        className="w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-2xl text-xs font-semibold text-slate-400 cursor-not-allowed"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-2xl shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2"
                      >
                        <RefreshCw className="w-4 h-4" />
                        <span>আপডেট করুন</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4">
                <h2 className="text-lg font-bold text-slate-800">অনুগ্রহ করে সাইন ইন করুন</h2>
                <p className="text-xs text-slate-500">প্রোফাইল পৃষ্ঠা দেখতে আপনার একাউন্টে লগইন থাকা আবশ্যক।</p>
                <button
                  onClick={() => { setAuthMode('signin'); setAuthModalOpen(true); }}
                  className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition-colors"
                >
                  সাইন ইন করুন
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {authModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 border border-slate-100 shadow-2xl relative space-y-6">
            
            <button
              onClick={() => setAuthModalOpen(false)}
              className="absolute right-5 top-5 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100"
            >
              ✕
            </button>

            <div className="text-center space-y-1">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 text-2xl flex items-center justify-center mx-auto font-bold mb-3">
                🛒
              </div>
              <h3 className="text-xl font-black text-slate-900">
                {authMode === 'signin' ? 'একাউন্টে সাইন ইন করুন' : 'নতুন একাউন্ট তৈরি করুন'}
              </h3>
              <p className="text-xs text-slate-500">
                বাজার দর প্ল্যাটফর্মে আপনাকে স্বাগতম
              </p>
            </div>

            {authMode === 'signin' ? (
              <form onSubmit={handleSignInSim} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">ইমেইল ঠিকানা</label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="example@mail.com"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">পাসওয়ার্ড</label>
                  <input
                    type="password"
                    name="password"
                    required
                    placeholder="••••••••"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <LogIn className="w-4 h-4" />
                  <span>সাইন ইন করুন</span>
                </button>
              </form>
            ) : (
              <form onSubmit={handleSignUpSim} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">আপনার নাম</label>
                  <input
                    type="text"
                    name="fullname"
                    required
                    placeholder="যেমন: আব্দুর রহমান"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">ইমেইল ঠিকানা</label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="example@mail.com"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">পাসওয়ার্ড</label>
                  <input
                    type="password"
                    name="password"
                    required
                    placeholder="••••••••"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>একাউন্ট তৈরি করুন</span>
                </button>
              </form>
            )}

            <div className="space-y-3 pt-2">
              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-slate-200"></div>
                <span className="shrink mx-3 text-[10px] font-bold text-slate-400 uppercase">অথবা</span>
                <div className="flex-grow border-t border-slate-200"></div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleSocialAuth('Google')}
                  className="py-2.5 px-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 transition-colors flex items-center justify-center gap-2"
                >
                  <span>🌐 Google</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleSocialAuth('GitHub')}
                  className="py-2.5 px-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 transition-colors flex items-center justify-center gap-2"
                >
                  <span>💻 GitHub</span>
                </button>
              </div>
            </div>

            <div className="text-center pt-2 border-t border-slate-100 text-xs">
              {authMode === 'signin' ? (
                <p className="text-slate-500">
                  নতুন ব্যবহারকারী?{' '}
                  <button
                    onClick={() => setAuthMode('signup')}
                    className="font-bold text-emerald-600 hover:underline"
                  >
                    সাইন আপ করুন
                  </button>
                </p>
              ) : (
                <p className="text-slate-500">
                  ইতিমধ্যেই একাউন্ট আছে?{' '}
                  <button
                    onClick={() => setAuthMode('signin')}
                    className="font-bold text-emerald-600 hover:underline"
                  >
                    সাইন ইন করুন
                  </button>
                </p>
              )}
            </div>

          </div>
        </div>
      )}

      <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-b border-slate-800 pb-8">
            <div className="md:col-span-6 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🛒</span>
                <span className="text-xl font-black text-white">বাজার দর</span>
              </div>
              <p className="text-xs text-slate-400 max-w-sm">
                বাজার দর — বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের সঠিক ও সঠিক সময়ের বাজার মূল্য ট্র্যাকিং প্ল্যাটফর্ম।
              </p>
            </div>

            <div className="md:col-span-6 text-left md:text-right space-y-2">
              <p className="text-xs text-slate-400">
                সকল দরদাম প্রাপ্ত তথ্যের ভিত্তিতে সম্ভাব্য; স্থান ও বাজার অবস্থানের ওপর নির্ভর করে পরিবর্তিত হতে পারে।
              </p>
              <div className="flex items-center justify-start md:justify-end gap-4 text-xs font-semibold text-emerald-400">
                <a href="#সব-পণ্য" className="hover:underline">আজকের দরদাম</a>
                <span>•</span>
                <button onClick={() => { setAuthMode('signin'); setAuthModalOpen(true); }} className="hover:underline">লগইন</button>
                <span>•</span>
                <a href="#" className="hover:underline">শর্তাবলী</a>
              </div>
            </div>
          </div>

          <div className="pt-6 text-center text-xs text-slate-500">
            © {new Date().getFullYear()} বাজার দর (Bazar Dor). সর্বস্বত্ব সংরক্ষিত।
          </div>
        </div>
      </footer>

    </div>
  );
}
