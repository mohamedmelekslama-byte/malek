import React from 'react';
import { motion } from 'framer-motion';
import { Dumbbell, Activity, Heart, ShieldCheck } from 'lucide-react';

const FEATURES = [
  {
    icon: Dumbbell,
    title: 'Dynamic Macro Alignment',
    desc: 'Precision caloric targets and protein distributions. Select bulking or cutting to scale complex carbs and branch-chain amino profiles instantly.',
    colorClass: 'text-gym-green',
    bgLightClass: 'bg-gym-green/5',
  },
  {
    icon: Activity,
    title: 'Glycemic Load Safeguards',
    desc: 'Engineered specifically for diabetics. We eliminate simple starches and load each dish with high-viscosity soluble fibers to prevent glucose spikes.',
    colorClass: 'text-gym-green',
    bgLightClass: 'bg-gym-green/5',
  },
  {
    icon: Heart,
    title: 'Sodium & Mineral Balance',
    desc: 'Dash-inspired profiles designed to support hypertension. Zero added salt, enriched with potassium and magnesium to support arterial flexibility.',
    colorClass: 'text-gym-green',
    bgLightClass: 'bg-gym-green/5',
  },
  {
    icon: ShieldCheck,
    title: 'Biochemist Certified Recipes',
    desc: 'Every recipe is curated and tested by sports nutritionists and metabolic researchers to guarantee absolute compatibility with your targets.',
    colorClass: 'text-gym-green',
    bgLightClass: 'bg-gym-green/5',
  }
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

export default function Features() {
  return (
    <section id="features" className="py-24 relative overflow-hidden bg-dark-bg/50 border-y border-border-green/35">
      {/* Background glow */}
      <div className="absolute top-0 right-1/4 w-[350px] h-[350px] bg-[#002602]/20 rounded-full blur-[90px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="text-xs text-gym-green font-bold tracking-widest uppercase bg-gym-green/10 px-3.5 py-1.5 rounded-full border border-gym-green/20">
            Engineered For Compliance
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-extrabold text-primary tracking-tight">
            NUTRITION SCIENCE ENTERS THE KITCHEN
          </h2>
          <p className="text-gray-400 font-sans font-light text-base md:text-lg">
            We bridge the gap between delicious gourmet food and strict clinical dietetics. 
            No more compromises on taste, macros, or medical targets.
          </p>
        </div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {FEATURES.map((feature, idx) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="glass-panel p-8 rounded-2xl flex flex-col text-left group transition-all duration-300 hover:border-gym-green hover:shadow-[0_10px_30px_rgba(16,185,129,0.08)] bg-card-bg"
              >
                {/* Icon Container */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 border border-border-green transition-colors group-hover:border-gym-green ${feature.bgLightClass}`}>
                  <IconComponent className={`w-6 h-6 ${feature.colorClass}`} />
                </div>

                {/* Title */}
                <h3 className="text-lg font-display font-bold text-primary mb-3 group-hover:text-gym-green transition-colors">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-xs md:text-sm font-sans font-light leading-relaxed mt-auto">
                  {feature.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
