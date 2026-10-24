# 🛒 বাজার দর (BazarDor) - Daily Commodity Price Tracker

**Bazar Dor (বাজার দর)** is a modern, responsive web application built with **Next.js 14 (App Router)** and **Tailwind CSS**. It provides real-time tracking, sorting, and analysis of daily commodity and grocery prices across major local markets in Bangladesh.

---

## 🛠️ Technologies Used

| Technology | Purpose |
| :--- | :--- |
| **Next.js 14 (App Router)** | Full-stack React Framework & Page Navigation |
| **TypeScript / JavaScript** | Type Safety & Logic Implementation |
| **Tailwind CSS** | Responsive Styling & UI Layouts |
| **BetterAuth / Custom Session** | Authentication (Email, Password, Social Login Simulation) |
| **React Hot Toast** | Dynamic Success & Error Toast Notifications |
| **Lucide React** | Lightweight Vector Icons |

---

## ✨ 5 Key Features

1. **🔴 Live Market Price Ticker (Marquee)**
   - Infinite horizontal scrolling ticker showing real-time commodity updates with unit prices and percentage changes (`▲` / `▼`).
   - Automatically pauses on hover for comfortable reading.

2. **📈 Top Risers & Fallers Sections**
   - Instant visual identification of top 6 price risers ("আজ দাম বেড়েছে ▲") and top 6 price fallers ("আজ দাম কমেছে ▼").

3. **🇧🇩 Category Filtering & Bengali Numeral Sorting (Requirement C1)**
   - Dynamic product filtering across major categories (চাল, তেল, সবজি, মাছ, মাংস).
   - Custom sorting logic ("সাজান: ডিফল্ট | দাম: কম থেকে বেশি | দাম: বেশি থেকে কম") that correctly parses and orders numeric values alongside standard Bengali numerals (`১, ২, ৩...`).

4. **🔒 Protected Product Details & Market Breakdown**
   - Protected routes (`/product/[slug]`) requiring user authentication.
   - Summarizes minimum, average, and maximum prices along with market-wise breakdowns (e.g., Karwan Bazar, New Market, Kaptan Bazar).

5. **👤 Profile Management & Information Update (Requirement C3)**
   - Dedicated user profile dashboard with an interactive information update route (`/profile/update`).
   - Form submission to update profile name with immediate persistence and toast feedback.

---
