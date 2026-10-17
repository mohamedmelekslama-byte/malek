import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

export default function Toast({ visible, message, type = 'success', onClose }) {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        if (onClose) onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          className={`fixed top-5 right-5 z-[100] flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl border text-sm font-medium ${
            type === 'success'
              ? 'bg-dark-bg/90 text-gym-green border-gym-green/40 backdrop-blur-md'
              : 'bg-dark-bg/90 text-red-400 border-red-500/40 backdrop-blur-md'
          }`}
        >
          {type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-gym-green flex-shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
          )}
          <span>{message}</span>
          {onClose && (
            <button
              onClick={onClose}
              className="ml-2 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
