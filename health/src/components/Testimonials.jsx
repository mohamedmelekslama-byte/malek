import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Award, HeartPulse, Sparkles, ShieldCheck } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: 'Sarah Jenkins',
    role: 'Competitive Powerlifter',
    badge: 'Bulking Track',
    metric: 'Gained 6.5kg Muscle',
    icon: Sparkles,
    quote: "Finding clean, calorie-dense foods that fit my 3,200kcal bulking plan was exhausting. With VitaFuel, my macros are perfectly dialed in. The Loaded Salmon and Sweet Potato meals are absolute staples.",
    avatarText: 'SJ'
  },
  {
    name: 'Dr. Marcus Vance',
    role: 'Clinical Pharmacist',
    badge: 'Diabetes Low-GI Track',
    metric: 'HbA1c down from 6.8% to 5.4%',
    icon: ShieldCheck,
    quote: "I was highly skeptical of pre-packaged diets for glycemic control. However, VitaFuel's recipes use high-viscosity fibers and zero refined starches. My post-prandial glucose stabilized almost immediately.",
    avatarText: 'MV'
  },
  {
    name: 'Elena Rostova',
    role: 'Yoga Instructor',
    badge: 'Hypertension Support',
    metric: 'BP Stable at 115/75',
    icon: HeartPulse,
    quote: "Managing high blood pressure on an active training schedule was challenging. The DASH-optimized low-sodium meals are seasoned so beautifully with natural spices and citrus that I don't even miss the salt.",
    avatarText: 'ER'
  },
  {
    name: 'David Chen',
    role: 'Software Engineer',
    badge: 'Cutting Track',
    metric: 'Dropped to 9% Body Fat',
    icon: Award,
    quote: "Preserving muscle while cutting down to single-digit body fat requires strict accuracy. The Shredded Cutting plan was a lifesaver—perfect protein-to-calorie ratio, and the food tastes incredible.",
    avatarText: 'DC'
  }
];

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 150 : -150,
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: 'easeOut' }
  },
  exit: (direction) => ({
    x: direction < 0 ? 150 : -150,
    opacity: 0,
    transition: { duration: 0.4, ease: 'easeIn' }
  })
};

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const handleNext = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const active = TESTIMONIALS[index];
  const IconComponent = active.icon;

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden bg-dark-bg">
      <div className="absolute bottom-0 left-10 w-[300px] h-[300px] bg-[#002602]/15 rounded-full blur-[100px] -z-10 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-display font-extrabold text-primary tracking-tight">
            SUCCESS STORIES
          </h2>
          <p className="text-gray-400 font-sans font-light text-base md:text-lg">
            Real outcomes from dedicated training programs and tailored clinical diets. 
            See how custom nutritional planning changes lives.
          </p>
        </div>

        {/* Carousel Box */}
        <div className="relative min-h-[380px] flex items-center justify-center">
          
          {/* Navigation Controls (Absolute Sides) */}
          <div className="absolute -left-2 md:-left-6 z-20">
            <button
              type="button"
              onClick={handlePrev}
              className="p-3 rounded-full border border-border-green/80 hover:border-gym-green text-gray-400 hover:text-primary transition-colors bg-card-bg shadow-lg cursor-pointer"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>

          <div className="absolute -right-2 md:-right-6 z-20">
            <button
              type="button"
              onClick={handleNext}
              className="p-3 rounded-full border border-border-green/80 hover:border-gym-green text-gray-400 hover:text-primary transition-colors bg-card-bg shadow-lg cursor-pointer"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Testimonial Card */}
          <div className="w-full max-w-4xl overflow-hidden px-4 md:px-12 py-6">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={index}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="glass-panel p-8 md:p-12 rounded-3xl border border-border-green/70 relative bg-card-bg flex flex-col md:flex-row gap-8 items-center md:items-start text-left shadow-2xl"
              >
                {/* Quote Icon Background */}
                <Quote className="absolute top-8 right-8 w-16 h-16 text-[#0e2413]/30 pointer-events-none -z-10" />

                {/* Left side: Profile */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left flex-shrink-0 w-44">
                  {/* Avatar */}
                  <div className="w-20 h-20 rounded-2xl bg-secondary border border-border-green flex items-center justify-center font-display font-extrabold text-2xl text-gym-green mb-4 shadow-inner">
                    {active.avatarText}
                  </div>
                  <h3 className="text-lg font-display font-bold text-primary">{active.name}</h3>
                  <p className="text-gray-500 text-xs mt-0.5">{active.role}</p>

                  <div className="mt-4 flex flex-col gap-2 w-full">
                    <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Assigned Track</span>
                    <span className="px-3 py-1 rounded bg-secondary border border-border-green text-[10px] text-primary font-semibold tracking-wide text-center">
                      {active.badge}
                    </span>
                  </div>
                </div>

                {/* Right side: Quote Content */}
                <div className="flex-grow flex flex-col justify-between h-full space-y-6 pt-2">
                  <p className="text-gray-300 font-sans font-light text-base md:text-lg italic leading-relaxed">
                    "{active.quote}"
                  </p>

                  {/* Metric Ribbon */}
                  <div className="inline-flex items-center gap-3 self-start px-4 py-2.5 rounded-xl bg-border-green/30 border border-border-green/60 text-xs md:text-sm font-semibold text-primary">
                    <IconComponent className="w-5 h-5 text-gym-green flex-shrink-0" />
                    <span>Verified Result: <strong className="text-gym-green">{active.metric}</strong></span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* Indicator dots */}
        <div className="flex justify-center gap-2.5 mt-8">
          {TESTIMONIALS.map((_, idx) => (
            <button
              type="button"
              key={idx}
              onClick={() => {
                setDirection(idx > index ? 1 : -1);
                setIndex(idx);
              }}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === index 
                  ? 'bg-gym-green w-6' 
                  : 'bg-border-green hover:bg-gray-600'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
