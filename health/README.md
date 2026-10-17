# 🌿 VitaFuel - High-Performance SaaS Health & Nutrition Platform

VitaFuel is a modern, high-performance web application designed for personalized dietary planning, real-time biometrics tracking, smart wearable telemetry integration, and seamless subscription checkout.

---

## ✨ Features Overview

### 1. 📊 User Health Dashboard & Vitals Tracking
- **Hydration Tracker:** Log daily water intake with visual progress.
- **Calorie Intake Logger:** Monitor daily logged calories against personalized targets.
- **7-Day Weight Progress Log:** Interactive bar chart visualizing 7-day weight trends with entry logging.
- **Interactive BMI Calculator:** Real-time BMI score recalculation with interactive weight and height sliders.
- **⌚ Smart Wearable & IoT Connectivity:** Simulated live telemetry sync with Apple Watch / smart devices for real-time Heart Rate (BPM) and Sleep Index monitoring.

### 2. 🥗 Interactive Meal Planner & Recipe Explorer
- **Weekly Meal Calendar:** Schedule Breakfast, Lunch, Dinner, and Snacks for all 7 days of the week.
- **Daily Macro Totals:** Automatic real-time calculation of daily Calories, Protein, Carbs, and Fats.
- **Recipe Explorer:** Filterable recipe library (Bulking, Cutting, Keto, Cleanse, Vegan) with detailed preparation instructions.
- **🛒 Automated Grocery List Generator:** Aggregates ingredients across scheduled meals into an interactive shopping checklist.

### 3. 💳 SaaS Checkout Cart & Subscription Management
- **Cart Context & LocalStorage Persistence:** Preserves selected plan, billing frequency (Monthly vs. Annual -20%), user seat licenses, and add-ons across sessions.
- **Promotional Coupon System:** Validate discount codes (e.g., `SAVE10`, `SAVE20`) with instant total recalculation.
- **Custom Payment Integration:** Integrated checkout form with feedback notifications (Toast) and event analytics tracking.

### 4. 🤖 AI Chatbot Assistant & Design System
- **Nutritional AI Assistant:** Floating chatbot for instant dietary Q&A and advice.
- **Aesthetic Design:** Dark mode theme with sleek glassmorphism panels, ambient glows, responsive typography, and micro-animations.

---

## 🛠️ Technology Stack

- **Frontend Core:** React, JavaScript (ES6+)
- **Styling & Icons:** Tailwind CSS, Lucide React Icons
- **Animations:** Framer Motion
- **Build Tool:** Vite

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16+ recommended)
- `npm` or `yarn`

### Installation

1. **Clone the repository** (or navigate to project directory):
   ```bash
   cd health
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the Development Server:**
   ```bash
   npm run dev
   ```

4. **Open in Browser:**
   Open `http://localhost:5173` (or the port specified in your terminal) to view the application.

---

## 📁 Project Structure

```
health/
├── public/
├── src/
│   ├── analytics/
│   │   └── track.js               # Event analytics helper module
│   ├── components/
│   │   ├── AIChatbot.jsx          # AI Assistant widget
│   │   ├── CheckoutCart.jsx       # Subscription & cart modal
│   │   ├── CouponInput.jsx        # Discount coupon form
│   │   ├── Features.jsx           # Feature showcase grid
│   │   ├── Footer.jsx             # App footer
│   │   ├── Hero.jsx               # Hero landing section
│   │   ├── LoginModal.jsx         # Authentication modal
│   │   ├── MealPlanner.jsx        # Weekly schedule & recipe explorer
│   │   ├── Navbar.jsx             # Fixed navigation bar with active section indicator
│   │   ├── PaymentForm.jsx        # Checkout payment inputs
│   │   ├── PlanSelector.jsx       # Interactive diet plan tier selector
│   │   ├── ScrollToTop.jsx        # Floating back-to-top button with ring progress
│   │   ├── SplashScreen.jsx       # App loader splash animation
│   │   ├── StatsCounter.jsx       # Animated impact metrics
│   │   ├── Testimonials.jsx       # Customer reviews carousel
│   │   ├── Toast.jsx              # Status toast notifications
│   │   └── UserDashboard.jsx      # Biometrics, BMI calculator & Smartwear sync
│   ├── context/
│   │   └── CartContext.jsx        # Global cart state provider
│   ├── data/
│   │   └── recipesData.js         # Mock recipe database and weekly plans
│   ├── hooks/
│   │   └── useLocalStorage.js    # Persistence hook
│   ├── App.jsx                    # Main App container
│   ├── main.jsx                   # React DOM root entry
│   └── index.css                  # Global Tailwind CSS definitions
├── package.json
└── README.md
```

---

## 📝 License
This project is open-source and available under the [MIT License](LICENSE).
