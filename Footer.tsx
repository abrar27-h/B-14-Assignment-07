export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-8 border-t border-gray-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div>
          <p className="text-white font-bold text-lg">বাজার দর</p>
          <p className="text-sm text-gray-400 mt-1">প্রয়োজনীয় পণ্যের দাম এক নজরে।</p>
        </div>
        <div className="text-xs text-gray-500 max-w-xs sm:text-right">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </div>
      </div>
    </footer>
  );
}
