import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Dumbbell, Sun, Moon } from 'lucide-react';

export default function Navbar({ onOpenLogin, theme, onToggleTheme, currentUser, onLogout, onGetCustomPlan }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Scroll detection for glass effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Active section tracking via IntersectionObserver
  useEffect(() => {
    const sectionIds = ['home', 'features', 'stats', 'plans', 'dashboard', 'meal-planner', 'testimonials'];
    const observers = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.4 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Close mobile menu on ESC
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') setIsOpen(false); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const navLinks = [
    { name: 'Home',         href: '#home',         id: 'home' },
    { name: 'Features',     href: '#features',     id: 'features' },
    { name: 'Diet Plans',   href: '#plans',         id: 'plans' },
    { name: 'Dashboard',    href: '#dashboard',     id: 'dashboard' },
    { name: 'Meal Planner', href: '#meal-planner',  id: 'meal-planner' },
    { name: 'Testimonials', href: '#testimonials',  id: 'testimonials' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-3 glass-panel-heavy shadow-lg shadow-black/20'
          : 'py-6 bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-lg bg-secondary border border-border-green flex items-center justify-center group-hover:border-gym-green transition-colors">
            <Dumbbell className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
          </div>
          <span className="font-display text-xl tracking-wider text-primary font-bold">
            VITA<span className="text-gym-green">FUEL</span>
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.name}
                href={link.href}
                className={`font-medium tracking-wide text-sm transition-colors relative py-2 ${
                  isActive ? 'text-primary' : 'text-gray-400 hover:text-primary'
                }`}
              >
                {link.name}
                <motion.span
                  layoutId="nav-underline"
                  className={`absolute bottom-0 left-0 h-[2px] bg-gym-green rounded-full transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0'
                  }`}
                />
              </a>
            );
          })}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleTheme}
            className="p-2.5 rounded-lg border border-border-green hover:border-gym-green text-gray-400 hover:text-primary transition-all duration-300 bg-card-bg hover:shadow-[0_0_15px_rgba(16,185,129,0.15)] flex items-center justify-center cursor-pointer"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon className="w-4.5 h-4.5 text-gym-green animate-[spin_0.5s_ease-out]" /> : <Sun className="w-4.5 h-4.5 text-gym-green animate-[spin_0.5s_ease-out]" />}
          </button>
          
          {currentUser ? (
            <>
              <div className="px-4 py-2.5 rounded-lg border border-border-green bg-secondary/15 text-xs font-semibold text-gym-green flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-gym-green animate-pulse" />
                Hi, {currentUser.name.split(' ')[0]}
              </div>
              <button
                type="button"
                onClick={onLogout}
                className="px-4 py-2.5 rounded-lg border border-red-500/20 hover:border-red-500/40 text-sm font-semibold tracking-wide text-red-400 hover:text-red-500 transition-all duration-300 bg-red-500/5 cursor-pointer"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={onOpenLogin}
                className="px-5 py-2.5 rounded-lg border border-border-green hover:border-gym-green text-sm font-semibold tracking-wide text-primary transition-all duration-300 hover:shadow-[0_0_15px_rgba(16,185,129,0.15)] bg-card-bg cursor-pointer"
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={onGetCustomPlan}
                className="px-5 py-2.5 rounded-lg bg-primary text-secondary hover:bg-gym-green hover:text-primary text-sm font-bold tracking-wide transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.08)] hover:shadow-[0_0_25px_rgba(16,185,129,0.3)] cursor-pointer"
              >
                Get Custom Plan
              </button>
            </>
          )}
        </div>

        {/* Mobile Controls */}
        <div className="flex md:hidden items-center gap-2">
          <button
            type="button"
            onClick={onToggleTheme}
            className="p-2 rounded-lg border border-border-green text-gray-300 hover:text-primary hover:border-gym-green transition-colors bg-card-bg cursor-pointer"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon className="w-4 h-4 text-gym-green" /> : <Sun className="w-4 h-4 text-gym-green" />}
          </button>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg border border-border-green text-gray-300 hover:text-primary hover:border-gym-green transition-colors bg-card-bg cursor-pointer"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-full left-0 right-0 glass-panel-heavy border-t border-border-green py-6 px-6 shadow-2xl flex flex-col gap-6"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`font-medium tracking-wide text-base py-2.5 px-3 rounded-lg transition-all border-b border-border-green/10 ${
                      isActive
                        ? 'text-primary bg-gym-green/5 border-border-green/30'
                        : 'text-gray-400 hover:text-primary'
                    }`}
                  >
                    {link.name}
                    {isActive && <span className="ml-2 text-gym-green text-xs">●</span>}
                  </a>
                );
              })}
            </div>
            <div className="flex flex-col gap-3 pt-2 border-t border-border-green/30">
              {currentUser ? (
                <>
                  <div className="w-full text-center py-2.5 rounded-xl border border-border-green bg-secondary/15 text-xs font-semibold text-gym-green flex items-center justify-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-gym-green animate-pulse" />
                    Signed in as {currentUser.name}
                  </div>
                  <button
                    type="button"
                    onClick={() => { setIsOpen(false); onLogout(); }}
                    className="w-full text-center py-3 rounded-xl border border-red-500/20 hover:border-red-500/40 text-sm font-semibold tracking-wide text-red-400 transition-colors bg-red-500/5 cursor-pointer"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => { setIsOpen(false); onOpenLogin(); }}
                    className="w-full text-center py-3 rounded-xl border border-border-green hover:border-gym-green text-sm font-semibold tracking-wide text-primary transition-colors bg-card-bg cursor-pointer"
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    onClick={() => { setIsOpen(false); onGetCustomPlan(); }}
                    className="w-full text-center py-3 rounded-xl bg-primary text-secondary hover:bg-gym-green hover:text-primary text-sm font-bold tracking-wide transition-all cursor-pointer"
                  >
                    Get Custom Plan
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
