import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(progress);
      setVisible(scrollTop > 350);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // SVG circle progress ring
  const size = 48;
  const strokeWidth = 2.5;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (scrollProgress / 100) * circumference;

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          transition={{ duration: 0.25 }}
          onClick={scrollToTop}
          className="fixed bottom-24 right-8 z-40 cursor-pointer group"
          aria-label="Scroll to top"
        >
          {/* Progress ring + button */}
          <div className="relative w-12 h-12 flex items-center justify-center">
            {/* SVG progress ring */}
            <svg
              className="absolute inset-0 -rotate-90"
              width={size}
              height={size}
            >
              {/* Background track */}
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke="rgba(14,36,19,0.8)"
                strokeWidth={strokeWidth}
              />
              {/* Progress arc */}
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke="#10b981"
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                style={{ transition: 'stroke-dashoffset 0.15s ease' }}
              />
            </svg>

            {/* Inner button */}
            <div className="relative z-10 w-9 h-9 rounded-full bg-[#09120b] border border-border-green group-hover:border-gym-green group-hover:bg-secondary transition-all duration-300 flex items-center justify-center shadow-lg">
              <ArrowUp className="w-4 h-4 text-gray-300 group-hover:text-primary group-hover:-translate-y-0.5 transition-all duration-300" />
            </div>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
