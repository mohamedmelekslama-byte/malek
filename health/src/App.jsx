import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PlanSelector from './components/PlanSelector';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';
import CheckoutCart from './components/CheckoutCart';
import SplashScreen from './components/SplashScreen';
import ScrollToTop from './components/ScrollToTop';
import StatsCounter from './components/StatsCounter';
import AIChatbot from './components/AIChatbot';
import { CartProvider } from './context/CartContext';

import MealPlanner from './components/MealPlanner';
import UserDashboard from './components/UserDashboard';

function App() {
  const [splashDone, setSplashDone] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('current_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Handle theme class application
  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    localStorage.setItem('current_user', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('current_user');
  };

  const [defaultCategory, setDefaultCategory] = useState(null);

  const handleActivatePlan = (plan) => {
    setSelectedPlan(plan);
    setIsCartOpen(true);
  };

  const handleGetCustomPlan = () => {
    setDefaultCategory('custom');
    setTimeout(() => {
      const el = document.getElementById('plans');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  // Lock body scroll when any modal is open
  useEffect(() => {
    const anyOpen = isLoginOpen || isCartOpen;
    document.body.classList.toggle('modal-open', anyOpen);
    return () => document.body.classList.remove('modal-open');
  }, [isLoginOpen, isCartOpen]);

  return (
    <CartProvider>
      {/* Splash Screen */}
      {!splashDone && <SplashScreen onComplete={() => setSplashDone(true)} />}

      <div className={`relative min-h-screen bg-dark-bg text-gray-300 font-sans antialiased overflow-x-hidden transition-opacity duration-700 ${splashDone ? 'opacity-100' : 'opacity-0'}`}>

        {/* Ambient background blobs */}
        <div className="fixed top-[-10%] left-[-10%] w-[700px] h-[700px] bg-[#002602]/15 rounded-full blur-[140px] pointer-events-none -z-10" />
        <div className="fixed top-[30%] right-[-10%] w-[600px] h-[600px] bg-[#002602]/10 rounded-full blur-[130px] pointer-events-none -z-10" />
        <div className="fixed bottom-[10%] left-[-5%] w-[500px] h-[500px] bg-[#002602]/12 rounded-full blur-[120px] pointer-events-none -z-10" />

        {/* Navigation */}
        <Navbar onOpenLogin={() => setIsLoginOpen(true)} theme={theme} onToggleTheme={toggleTheme} currentUser={currentUser} onLogout={handleLogout} onGetCustomPlan={handleGetCustomPlan} />

        {/* Main Content */}
        <main>
          {/* Hero */}
          <Hero onOpenLogin={() => setIsLoginOpen(true)} onGetCustomPlan={handleGetCustomPlan} />

          {/* Animated Statistics */}
          <StatsCounter />

          {/* Features Grid */}
          <Features />

          {/* Interactive Diet Planner */}
          <PlanSelector onActivatePlan={handleActivatePlan} defaultCategory={defaultCategory} setDefaultCategory={setDefaultCategory} />

          {/* User Biometrics & Health Dashboard */}
          <UserDashboard currentUser={currentUser} />

          {/* Interactive Meal Planner & Recipe Explorer */}
          <MealPlanner />

          {/* Testimonials Carousel */}
          <Testimonials />
        </main>

        {/* Footer */}
        <Footer />

        {/* Floating Scroll-to-Top with Progress Ring */}
        <ScrollToTop />

        {/* Auth Modal */}
        <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} onLoginSuccess={handleLoginSuccess} />

        {/* SaaS Checkout Cart */}
        <CheckoutCart
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          selectedPlan={selectedPlan}
        />

        {/* AI Chatbot Assistant */}
        <AIChatbot />
      </div>
    </CartProvider>
  );
}

export default App;
