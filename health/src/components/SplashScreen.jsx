import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dumbbell } from 'lucide-react';

export default function SplashScreen({ onComplete }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onComplete, 600);
    }, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-dark-bg"
        >
          {/* Ambient glow */}
          <div className="absolute w-[500px] h-[500px] bg-[#002602]/40 rounded-full blur-[130px] pointer-events-none" />

          {/* Logo pulse animation */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="relative z-10 flex flex-col items-center gap-5"
          >
            {/* Icon ring */}
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
                className="w-20 h-20 rounded-full border border-dashed border-gym-green/40 absolute -inset-3"
              />
              <div className="w-16 h-16 rounded-2xl bg-secondary border border-border-green flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                <Dumbbell className="w-8 h-8 text-primary" />
              </div>
            </div>

            {/* Brand name */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-center"
            >
              <h1 className="text-3xl font-display font-extrabold text-primary tracking-widest">
                VITA<span className="text-gym-green">FUEL</span>
              </h1>
              <p className="text-xs text-gray-500 mt-1.5 tracking-wider font-light">
                Precision Nutrition · Clinical Performance
              </p>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              className="w-40 h-[2px] bg-border-green rounded-full overflow-hidden mt-2"
            >
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.8, ease: 'easeInOut' }}
                className="h-full bg-gym-green rounded-full"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
