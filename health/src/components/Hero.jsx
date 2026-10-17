import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Flame, Heart, Sparkles } from 'lucide-react';

export default function Hero({ onOpenLogin, onGetCustomPlan }) {
  return (
    <section id="home" className="relative min-h-screen pt-28 pb-16 flex items-center overflow-hidden">
      {/* Background Decorative Glows */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[#002602]/30 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[400px] h-[400px] bg-gym-green/5 rounded-full blur-[100px] -z-10 pointer-events-none" />

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0e2413_1px,transparent_1px),linear-gradient(to_bottom,#0e2413_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        {/* Left Column: Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="flex flex-col text-left space-y-8"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full border border-border-green glass-panel text-xs text-primary font-semibold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-gym-green animate-pulse" />
            Voted #1 Nutrition Guide for 2026
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-6xl xl:text-7xl font-display font-extrabold text-primary leading-[1.05] tracking-tight">
            OPTIMIZE YOUR DIET.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-gym-green to-[#22c55e]">
              FUEL YOUR GOALS.
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-gray-400 text-lg md:text-xl font-sans font-light max-w-xl leading-relaxed">
            Tailored meal plans and macros built for elite athletic performance, 
            bulking, cutting, and optimized therapeutic options for diabetes 
            and blood pressure management.
          </p>

          {/* Features Badges */}
          <div className="grid grid-cols-2 gap-4 max-w-md pt-2">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-secondary/50 border border-border-green flex items-center justify-center">
                <Flame className="w-5 h-5 text-gym-green" />
              </div>
              <span className="text-sm font-semibold text-primary">Bulking & Cutting</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-secondary/50 border border-border-green flex items-center justify-center">
                <Heart className="w-5 h-5 text-gym-green" />
              </div>
              <span className="text-sm font-semibold text-primary">Glycemic & BP Control</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 pt-4">
            <button
              type="button"
              onClick={onGetCustomPlan}
              className="px-8 py-4 rounded-xl bg-primary text-secondary hover:bg-gym-green hover:text-primary font-bold tracking-wide transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_35px_rgba(16,185,129,0.4)] flex items-center gap-2 group cursor-pointer"
            >
              Explore Diet Plans
              <motion.span
                className="inline-block"
                animate={{ x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              >
                →
              </motion.span>
            </button>
            <button
              type="button"
              onClick={onOpenLogin}
              className="px-8 py-4 rounded-xl border border-border-green hover:border-gym-green font-semibold tracking-wide text-primary transition-all duration-300 bg-[#09120b] hover:shadow-[0_0_20px_rgba(16,185,129,0.1)] cursor-pointer"
            >
              Customize Tracker
            </button>
          </div>
        </motion.div>

        {/* Right Column: Visual Elements */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
          className="relative flex justify-center items-center"
        >
          {/* Decorative rotating border ring */}
          <div className="absolute inset-0 max-w-[480px] max-h-[480px] aspect-square rounded-full border border-dashed border-gym-green/20 animate-[spin_60s_linear_infinite] pointer-events-none self-center" />
          
          {/* Outer bezel glow */}
          <div className="absolute -inset-1.5 max-w-[430px] max-h-[430px] aspect-square rounded-2xl bg-gradient-to-tr from-secondary to-gym-green/30 opacity-70 blur-xl pointer-events-none self-center" />

          {/* Image Wrapper */}
          <div className="relative z-10 w-full max-w-[420px] aspect-square rounded-2xl border border-border-green overflow-hidden glow-glow">
            <img
              src="/hero_healthy_food.png"
              alt="Premium Healthy Food Preparation"
              loading="lazy"
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/80 via-transparent to-transparent pointer-events-none" />

            {/* Float Card Info */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="absolute bottom-6 left-6 right-6 p-4 rounded-xl glass-panel-heavy border-border-green flex items-center justify-between"
            >
              <div className="text-left">
                <span className="text-[10px] text-gym-green font-bold tracking-widest uppercase">Target Meal</span>
                <h4 className="text-sm font-display font-semibold text-primary">High-Protein Salmon Bowl</h4>
              </div>
              <div className="px-2.5 py-1 rounded bg-[#10b981]/10 border border-[#10b981]/20 text-[10px] text-gym-green font-bold uppercase">
                42g Protein
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
