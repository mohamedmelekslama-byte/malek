import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, Star, ShieldCheck, Salad } from 'lucide-react';

// Animated counter hook
function AnimatedCounter({ target, duration = 2 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [display, setDisplay] = React.useState(0);

  React.useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const steps = 60;
    const increment = target / steps;
    const interval = (duration * 1000) / steps;
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setDisplay(target);
        clearInterval(timer);
      } else {
        setDisplay(Math.floor(start));
      }
    }, interval);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return <span ref={ref}>{isInView ? display.toLocaleString() : 0}</span>;
}

const STATS = [
  {
    icon: Users,
    value: 48200,
    suffix: '+',
    label: 'Active Members',
    sublabel: 'Across 60+ countries worldwide'
  },
  {
    icon: Salad,
    value: 1200,
    suffix: '+',
    label: 'Curated Recipes',
    sublabel: 'Biochemist-validated meal plans'
  },
  {
    icon: Star,
    value: 98,
    suffix: '%',
    label: 'Satisfaction Rate',
    sublabel: 'Based on verified member reviews'
  },
  {
    icon: ShieldCheck,
    value: 12400,
    suffix: '+',
    label: 'Clinical Success Cases',
    sublabel: 'Managed diabetes & hypertension'
  }
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } }
};

export default function StatsCounter() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Top divider glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-gym-green/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {STATS.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="glass-panel p-6 rounded-2xl text-center flex flex-col items-center gap-3 hover:border-gym-green/40 transition-all duration-300 bg-[#09120b]"
              >
                <div className="w-11 h-11 rounded-xl bg-secondary/50 border border-border-green flex items-center justify-center">
                  <Icon className="w-5 h-5 text-gym-green" />
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-display font-extrabold text-primary">
                    <AnimatedCounter target={stat.value} />
                    <span className="text-gym-green">{stat.suffix}</span>
                  </div>
                  <div className="text-sm font-semibold text-primary mt-1">{stat.label}</div>
                  <div className="text-[10px] text-gray-500 mt-0.5 font-light">{stat.sublabel}</div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Bottom divider glow line */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-gym-green/30 to-transparent" />
    </section>
  );
}
