import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "বাজার দর - দৈনিক পণ্য মূল্য ট্র্যাকার",
  description: "বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের সঠিক ও সঠিক সময়ের বাজার মূল্য ট্র্যাকিং প্ল্যাটফর্ম।",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <body className="bg-slate-50 text-slate-800 antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
