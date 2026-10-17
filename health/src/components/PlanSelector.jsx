import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Flame, Dumbbell, Heart, Activity, 
  ChevronRight, Apple, Clock, Award, CheckCircle2,
  X, Sparkles, HelpCircle, ArrowLeft, Check
} from 'lucide-react';

const DIET_DATA = {
  fitness: {
    label: 'Fitness & Gym',
    icon: Dumbbell,
    plans: [
      {
        id: 'bulking',
        name: 'Mass Bulking Plan',
        image: '/food_bulking.png',
        tagline: 'Optimize muscle hypertrophy and strength gains with caloric surplus.',
        badge: 'Surplus Plan',
        stats: { Calories: '3,200 kcal', Protein: '185g', Carbs: '420g', Fats: '85g' },
        guidelines: [
          'High carbohydrate intake to fuel intense workouts and restore glycogen.',
          'Quality lean protein sources at every meal to maximize protein synthesis.',
          'Healthy fats for optimal hormone regulation and clean calorie density.'
        ],
        meals: [
          { name: 'Teriyaki Steak & Rice', desc: 'Lean beef sirloin, jasmine rice, steamed broccoli, sesame seeds.', macros: '820 kcal | 52g P | 110g C' },
          { name: 'Powerhouse Oatmeal Bowl', desc: 'Rolled oats, organic whey protein, banana, almond butter, honey.', macros: '640 kcal | 40g P | 75g C' },
          { name: 'Loaded Salmon & Sweet Potato', desc: 'Wild-caught salmon, sweet potato mash, roasted asparagus, olive oil.', macros: '780 kcal | 45g P | 65g C' }
        ]
      },
      {
        id: 'cutting',
        name: 'Shredded Cutting Plan',
        image: '/food_cutting.png',
        tagline: 'Maximize fat loss while preserving lean muscle mass via strategic deficit.',
        badge: 'Deficit Plan',
        stats: { Calories: '1,800 kcal', Protein: '160g', Carbs: '140g', Fats: '45g' },
        guidelines: [
          'High protein ratio to prevent muscle catabolism in caloric deficit.',
          'High dietary fiber to increase satiety and control appetite.',
          'Low glycemic carbs timed post-workout for optimal recovery.'
        ],
        meals: [
          { name: 'Lemon Herb Chicken Salad', desc: 'Grilled chicken breast, mixed greens, cucumber, avocado, lemon vinaigrette.', macros: '450 kcal | 48g P | 12g C' },
          { name: 'Cod Filet & Zucchini Noodles', desc: 'Baked white cod, fresh zoodles, cherry tomatoes, pesto sauce.', macros: '380 kcal | 38g P | 15g C' },
          { name: 'Egg White & Spinach Scramble', desc: '6 egg whites, baby spinach, mushrooms, 1 slice whole-wheat toast.', macros: '320 kcal | 32g P | 22g C' }
        ]
      },
      {
        id: 'leangain',
        name: 'Clean Lean Gain',
        image: '/food_bulking.png',
        tagline: 'Maintain body composition while building lean muscle incrementally.',
        badge: 'Maintenance+',
        stats: { Calories: '2,500 kcal', Protein: '170g', Carbs: '260g', Fats: '65g' },
        guidelines: [
          'Caloric intake set at or slightly above maintenance levels.',
          'Balanced ratio of complex carbohydrates, lean protein, and unsaturated fats.',
          'Emphasis on clean, whole foods to prevent body fat accumulation.'
        ],
        meals: [
          { name: 'Turkey & Quinoa Bowl', desc: 'Ground turkey breast, tricolor quinoa, roasted bell peppers, spinach.', macros: '610 kcal | 44g P | 58g C' },
          { name: 'Almond Whey Shake & Berries', desc: 'Whey isolate, unsweetened almond milk, mixed berries, chia seeds.', macros: '410 kcal | 35g P | 30g C' },
          { name: 'Tuna Salad Wrap', desc: 'Flaked albacore tuna, light Greek yogurt dressing, spinach, whole-wheat tortilla.', macros: '490 kcal | 42g P | 35g C' }
        ]
      }
    ]
  },
  health: {
    label: 'Health & Medical',
    icon: Heart,
    plans: [
      {
        id: 'diabetes',
        name: 'Diabetes Friendly (Low GI)',
        image: '/food_diabetes.png',
        tagline: 'Maintain glycemic control, avoid glucose spikes, and optimize insulin sensitivity.',
        badge: 'Low Glycemic',
        stats: { Calories: '1,900 kcal', Protein: '120g', NetCarbs: '110g', Fats: '75g' },
        guidelines: [
          'Strict inclusion of only low glycemic index (GI < 55) carbohydrates.',
          'High soluble fiber to slow digestion and glucose absorption.',
          'Inclusion of healthy monounsaturated fats to support metabolic health.'
        ],
        meals: [
          { name: 'Sesame Ginger Tofu & Cauliflower Rice', desc: 'Pan-seared firm tofu, riced cauliflower, snap peas, edamame, sesame oil.', macros: '420 kcal | 24g P | 18g Net C' },
          { name: 'Mediterranean Salmon Salad', desc: 'Baked salmon, kalamata olives, cucumber, feta cheese, olive oil dressing.', macros: '580 kcal | 38g P | 8g Net C' },
          { name: 'Chia Almond Pudding', desc: 'Chia seeds, unsweetened almond milk, walnuts, raspberries, erythritol sweetener.', macros: '290 kcal | 10g P | 6g Net C' }
        ]
      },
      {
        id: 'bp',
        name: 'Hypertension (DASH Plan)',
        image: '/food_hypertension.png',
        tagline: 'Low-sodium, high-potassium meals designed to regulate blood pressure naturally.',
        badge: 'Low Sodium',
        stats: { Sodium: '< 1,500mg', Potassium: '4,700mg', Calories: '2,000 kcal', Protein: '110g' },
        guidelines: [
          'Ultra-low sodium content (zero added table salt; herb-infused seasoning).',
          'Rich in potassium, calcium, and magnesium to support arterial health.',
          'Emphasis on leafy greens, root vegetables, fruits, and lean white fish.'
        ],
        meals: [
          { name: 'Salt-Free Garlic Seared Salmon', desc: 'Atlantic salmon, lemon zest, minced garlic, roasted sweet potatoes, broccoli.', macros: '540 kcal | 36g P | 95mg Sodium' },
          { name: 'Potassium-Rich Lentil Soup', desc: 'Brown lentils, spinach, carrots, tomatoes, celery, garlic, bay leaves.', macros: '410 kcal | 22g P | 120mg Sodium' },
          { name: 'Greek Yogurt & Berry Medley', desc: 'Unsweetened Greek yogurt, banana slices, blueberries, ground flax seeds.', macros: '310 kcal | 24g P | 80mg Sodium' }
        ]
      }
    ]
  },
  custom: {
    label: 'Custom Plans',
    icon: Sparkles,
    plans: [
      {
        id: 'custom_cleanse',
        name: 'VitaCleanse Bio-System',
        image: '/food_bulking.png',
        tagline: 'Designed for cellular rejuvenation, gut restoration, and natural micronutrient reload.',
        badge: 'Detox & Glow',
        stats: { Calories: '1,650 kcal', Protein: '90g', Micronutrients: '100% RDA', Hydration: '3.5L Target' },
        guidelines: [
          'High concentration of organic phytonutrients, antioxidants, and trace minerals.',
          'Zero processed ingredients, refined sugars, or common systemic allergens.',
          'Cold-pressed green extractions paired with healthy medium-chain triglycerides (MCTs).'
        ],
        meals: [
          { name: 'Detox Green Power Bowl', desc: 'Organic kale, baby spinach, avocado, cucumber, pumpkin seeds, hemp hearts, lemon-tahini dressing.', macros: '410 kcal | 15g P | 22g Fats' },
          { name: 'Steamed Wild Cod & Herb Medley', desc: 'Wild cod steamed with ginger, garlic, cilantro, asparagus spears, and microgreens.', macros: '320 kcal | 35g P | 6g Fats' },
          { name: 'Matcha Chia Regenerator', desc: 'Ceremonial matcha, organic chia seeds, coconut milk, raw pumpkin seed sprinkle.', macros: '260 kcal | 8g P | 18g Fats' }
        ]
      },
      {
        id: 'custom_keto',
        name: 'Ketogenic Energy Protocol',
        image: '/food_cutting.png',
        tagline: 'Achieve metabolic flexibility and sustained cognitive output through deep ketosis.',
        badge: 'Keto Burn',
        stats: { Calories: '2,200 kcal', Protein: '130g', NetCarbs: '< 20g', HealthyFats: '165g' },
        guidelines: [
          'Strict carb limit under 20g net per day to maintain stable ketone levels.',
          'Focus on healthy monounsaturated and saturated fats for cellular energy.',
          'Adequate protein to protect muscle mass while optimizing fat adaptation.'
        ],
        meals: [
          { name: 'Keto Avocado & Bacon Scramble', desc: 'Three organic eggs scrambled in grass-fed butter, thick-cut nitrate-free bacon, fresh avocado.', macros: '680 kcal | 38g P | 3g Net C' },
          { name: 'Grass-Fed Ribeye & Garlic Butter', desc: 'Seared ribeye steak topped with homemade garlic-herb butter and roasted brussels sprouts.', macros: '890 kcal | 55g P | 5g Net C' },
          { name: 'Macadamia Keto Crunch', desc: 'Raw macadamia nuts, unsweetened coconut flakes, organic dark cacao butter chips.', macros: '320 kcal | 6g P | 2g Net C' }
        ]
      }
    ]
  }
};

export default function PlanSelector({ onActivatePlan, defaultCategory, setDefaultCategory }) {
  const [activeCategory, setActiveCategory] = useState('fitness');
  const [activePlanId, setActivePlanId] = useState('bulking');

  // Sync category if defaultCategory is set externally
  React.useEffect(() => {
    if (defaultCategory && DIET_DATA[defaultCategory]) {
      setActiveCategory(defaultCategory);
      setActivePlanId(DIET_DATA[defaultCategory].plans[0].id);
      setDefaultCategory(null); // reset to prevent infinite loop
    }
  }, [defaultCategory, setDefaultCategory]);

  // Onboarding Quiz State
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizStep, setQuizStep] = useState(1);
  const [quizAnswers, setQuizAnswers] = useState({ focus: '', goal: '' });

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setActivePlanId(DIET_DATA[category].plans[0].id);
  };

  const handleQuizAnswer = (field, value) => {
    setQuizAnswers(prev => ({ ...prev, [field]: value }));
    if (field === 'focus') {
      setQuizStep(2);
    } else if (field === 'goal') {
      setQuizStep(3);
    }
  };

  const handleResetQuiz = () => {
    setQuizStep(1);
    setQuizAnswers({ focus: '', goal: '' });
    setShowQuiz(false);
  };

  const handleApplyQuizRecommendation = () => {
    setActiveCategory(quizAnswers.focus);
    setActivePlanId(quizAnswers.goal);
    setShowQuiz(false);
    
    // Scroll to the main selector area
    const el = document.getElementById('plans-grid');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const selectedCategory = DIET_DATA[activeCategory];
  const selectedPlan = selectedCategory.plans.find(p => p.id === activePlanId) || selectedCategory.plans[0];

  return (
    <section id="plans" className="py-24 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#002602]/10 rounded-full blur-[150px] -z-10 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <h2 className="text-4xl md:text-5xl font-display font-extrabold text-primary tracking-tight">
            TAILORED NUTRITION SYSTEMS
          </h2>
          <p className="text-gray-400 font-sans font-light text-base md:text-lg">
            Choose your health or fitness track, select your specific metabolic goal, 
            and instantly unlock dietary breakdowns designed for your lifestyle.
          </p>
        </div>

        {/* Quiz Banner */}
        <div className="glass-panel p-6 rounded-2xl border border-border-green mb-10 flex flex-col md:flex-row items-center justify-between gap-6 bg-card-bg relative overflow-hidden">
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-48 h-48 bg-gym-green/5 rounded-full blur-2xl pointer-events-none" />
          <div className="relative z-10 flex items-start gap-4 text-left">
            <div className="w-12 h-12 rounded-xl bg-secondary/50 border border-border-green flex items-center justify-center flex-shrink-0 mt-0.5">
              <Award className="w-6 h-6 text-gym-green" />
            </div>
            <div>
              <h3 className="text-base md:text-lg font-display font-extrabold text-primary">Not Sure Which Diet Matches Your Goal?</h3>
              <p className="text-xs text-gray-400 mt-1 font-light max-w-xl leading-relaxed">
                Take our 30-second Metabolic Matcher quiz. Answer 2 simple metabolic and fitness questions to dynamically identify your optimal dietary plan.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowQuiz(true)}
            className="relative z-10 px-6 py-3 rounded-xl bg-gym-green text-secondary hover:bg-primary hover:text-secondary font-bold text-xs tracking-widest uppercase transition-all duration-300 shadow-md flex-shrink-0 cursor-pointer"
          >
            Start Quiz
          </button>
        </div>

        {/* Category Toggles (Fitness vs Health) */}
        <div id="plans-grid" className="flex justify-center gap-4 mb-12">
          {Object.entries(DIET_DATA).map(([key, value]) => {
            const Icon = value.icon;
            const isActive = activeCategory === key;
            return (
              <button
                type="button"
                key={key}
                onClick={() => handleCategoryChange(key)}
                className={`relative px-6 py-4 rounded-xl border flex items-center gap-3 transition-all duration-300 font-display font-bold text-sm tracking-wider uppercase cursor-pointer ${
                  isActive 
                    ? 'border-gym-green text-primary shadow-[0_0_20px_rgba(16,185,129,0.15)] bg-card-bg' 
                    : 'border-border-green text-gray-400 hover:text-primary hover:border-gray-700 bg-transparent'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-gym-green' : 'text-gray-400'}`} />
                {value.label}
              </button>
            );
          })}
        </div>

        {/* Main Selector Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Specific Plan Tabs (Col-span 4) */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            {selectedCategory.plans.map((plan) => {
              const isSelected = activePlanId === plan.id;
              return (
                <button
                  type="button"
                  key={plan.id}
                  onClick={() => setActivePlanId(plan.id)}
                  className={`text-left p-5 rounded-xl border transition-all duration-300 cursor-pointer relative overflow-hidden group ${
                    isSelected
                      ? 'border-gym-green bg-card-bg shadow-[0_0_20px_rgba(16,185,129,0.1)]'
                      : 'border-border-green hover:border-gym-green/50 bg-transparent'
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${isSelected ? 'text-gym-green' : 'text-gray-500'}`}>
                      {plan.badge}
                    </span>
                    {isSelected && (
                      <motion.div layoutId="activeArrow" className="w-2 h-2 rounded-full bg-gym-green" />
                    )}
                  </div>
                  <h3 className="text-lg font-display font-bold text-primary group-hover:text-gym-green transition-colors">
                    {plan.name}
                  </h3>
                  <p className="text-gray-400 text-xs mt-1.5 line-clamp-2 font-sans font-light">
                    {plan.tagline}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right: Plan Details (Col-span 8) */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedPlan.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="glass-panel rounded-2xl p-6 md:p-8 border border-border-green text-left shadow-2xl relative overflow-hidden"
              >
                {/* Wide Food Photo Banner */}
                {selectedPlan.image && (
                  <div className="relative h-48 md:h-60 w-full rounded-2xl overflow-hidden border border-border-green/30 mb-8 shadow-inner">
                    <img 
                      src={selectedPlan.image} 
                      alt={selectedPlan.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card-bg via-card-bg/50 to-transparent" />
                    <div className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-full bg-secondary/85 backdrop-blur-md border border-border-green text-[10px] text-gym-green font-bold tracking-wider uppercase flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-gym-green animate-pulse" />
                      Chef-Curated Biochemistry
                    </div>
                  </div>
                )}

                {/* Title & Badge */}
                <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                  <div>
                    <span className="px-2.5 py-1 rounded bg-secondary border border-border-green text-[10px] text-gym-green font-bold tracking-widest uppercase mb-2 inline-block">
                      {selectedPlan.badge}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-display font-extrabold text-primary">
                      {selectedPlan.name}
                    </h3>
                  </div>
                  <div className="px-4 py-2 rounded-xl bg-border-green/40 border border-border-green/80 flex flex-col items-center">
                    <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider">Macros Profile</span>
                    <span className="text-sm font-display font-extrabold text-primary mt-0.5">Calculated Target</span>
                  </div>
                </div>

                <p className="text-gray-300 text-sm md:text-base font-light mb-8 border-b border-border-green/30 pb-4">
                  {selectedPlan.tagline}
                </p>

                {/* Stats / Nutrition Breakdown */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {Object.entries(selectedPlan.stats).map(([label, val]) => (
                    <div key={label} className="p-4 rounded-xl bg-secondary/30 border border-border-green/50 flex flex-col">
                      <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">{label}</span>
                      <span className="text-lg font-display font-extrabold text-primary mt-1">{val}</span>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Guidelines */}
                  <div>
                    <h4 className="text-sm font-display font-bold text-primary tracking-wider uppercase mb-4 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-gym-green" />
                      Core Guidelines
                    </h4>
                    <ul className="space-y-3.5">
                      {selectedPlan.guidelines.map((item, idx) => (
                        <li key={idx} className="flex gap-3 items-start text-xs md:text-sm text-gray-400 font-light leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-gym-green mt-2 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Meals */}
                  <div>
                    <h4 className="text-sm font-display font-bold text-primary tracking-wider uppercase mb-4 flex items-center gap-2">
                      <Apple className="w-4 h-4 text-gym-green" />
                      Sample Daily Meals
                    </h4>
                    <div className="space-y-4">
                      {selectedPlan.meals.map((meal, idx) => (
                        <div key={idx} className="p-3.5 rounded-xl border border-border-green/40 hover:border-border-green bg-dark-bg/30 transition-all">
                          <div className="flex justify-between items-start gap-2">
                            <h5 className="text-xs md:text-sm font-semibold text-primary">{meal.name}</h5>
                            <span className="text-[9px] text-gym-green font-bold whitespace-nowrap bg-gym-green/10 px-2 py-0.5 rounded border border-gym-green/20">
                              {meal.macros}
                            </span>
                          </div>
                          <p className="text-[11px] text-gray-500 mt-1 font-light leading-relaxed">
                            {meal.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action CTA */}
                <div className="mt-8 pt-6 border-t border-border-green/30 flex flex-wrap justify-between items-center gap-4">
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Clock className="w-4 h-4 text-gym-green" />
                    Customized PDF copy emailed upon subscription
                  </div>
                  <button 
                    type="button"
                    onClick={() => onActivatePlan(selectedPlan)}
                    className="px-6 py-3 rounded-lg bg-gym-green text-secondary hover:bg-primary hover:text-secondary font-bold text-xs tracking-wider uppercase transition-all duration-300 flex items-center gap-1.5 cursor-pointer"
                  >
                    Activate Plan <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>

      {/* Quiz Modal Overlay */}
      <AnimatePresence>
        {showQuiz && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          >
            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="relative w-full max-w-2xl bg-card-bg border border-border-green/80 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            >
              {/* Close button */}
              <button
                type="button"
                onClick={handleResetQuiz}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-dark-bg/50 hover:bg-dark-bg border border-border-green/45 text-gray-400 hover:text-primary transition-colors cursor-pointer"
                aria-label="Close quiz"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="p-6 md:p-8 overflow-y-auto text-left flex-grow">
                {/* Stepper progress indicator */}
                <div className="flex items-center gap-2 mb-6">
                  {[1, 2, 3].map((stepNum) => (
                    <div
                      key={stepNum}
                      className={`h-1.5 flex-grow rounded-full transition-colors duration-300 ${
                        quizStep >= stepNum ? 'bg-gym-green' : 'bg-border-green/30'
                      }`}
                    />
                  ))}
                </div>

                {quizStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div>
                      <span className="text-[10px] text-gym-green font-bold uppercase tracking-widest bg-gym-green/10 px-2.5 py-1 rounded border border-gym-green/20">
                        Step 1 of 3 · Target Focus
                      </span>
                      <h3 className="text-xl md:text-2xl font-display font-extrabold text-primary mt-2">
                        What is your primary tracking requirement?
                      </h3>
                      <p className="text-xs text-gray-400 mt-1 font-light">
                        Select whether your goals are focused on athletic gym training or active medical monitoring.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      <button
                        type="button"
                        onClick={() => handleQuizAnswer('focus', 'fitness')}
                        className="p-6 rounded-2xl border border-border-green/60 hover:border-gym-green bg-dark-bg/40 text-left transition-all hover:scale-[1.01] cursor-pointer group"
                      >
                        <div className="w-10 h-10 rounded-xl bg-secondary/50 border border-border-green group-hover:border-gym-green flex items-center justify-center mb-4 transition-colors">
                          <Dumbbell className="w-5 h-5 text-gym-green" />
                        </div>
                        <h4 className="font-display font-bold text-primary group-hover:text-gym-green transition-colors">Fitness & Athletic Goals</h4>
                        <p className="text-[11px] text-gray-500 mt-1 font-light leading-relaxed">
                          Bulking, cutting, or lean mass gain plans with calculated protein & carbohydrate distributions.
                        </p>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleQuizAnswer('focus', 'health')}
                        className="p-6 rounded-2xl border border-border-green/60 hover:border-gym-green bg-dark-bg/40 text-left transition-all hover:scale-[1.01] cursor-pointer group"
                      >
                        <div className="w-10 h-10 rounded-xl bg-secondary/50 border border-border-green group-hover:border-gym-green flex items-center justify-center mb-4 transition-colors">
                          <Heart className="w-5 h-5 text-gym-green" />
                        </div>
                        <h4 className="font-display font-bold text-primary group-hover:text-gym-green transition-colors">Medical & Health Management</h4>
                        <p className="text-[11px] text-gray-500 mt-1 font-light leading-relaxed">
                          Glycemic safety control (Diabetes Low-GI) or sodium-restricted mineral support (Hypertension DASH).
                        </p>
                      </button>
                    </div>
                  </motion.div>
                )}

                {quizStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div>
                      <span className="text-[10px] text-gym-green font-bold uppercase tracking-widest bg-gym-green/10 px-2.5 py-1 rounded border border-gym-green/20">
                        Step 2 of 3 · Diet Type
                      </span>
                      <h3 className="text-xl md:text-2xl font-display font-extrabold text-primary mt-2">
                        Select your metabolic tracking alignment:
                      </h3>
                      <p className="text-xs text-gray-400 mt-1 font-light">
                        Select the goal that fits your lifestyle or health directive.
                      </p>
                    </div>

                    <div className="flex flex-col gap-3 pt-2">
                      {quizAnswers.focus === 'fitness' ? (
                        <>
                          <button
                            type="button"
                            onClick={() => handleQuizAnswer('goal', 'bulking')}
                            className="p-4 rounded-xl border border-border-green bg-dark-bg/40 hover:border-gym-green text-left flex items-start gap-4 transition-all cursor-pointer group"
                          >
                            <div className="w-8 h-8 rounded-lg bg-secondary/50 border border-border-green group-hover:border-gym-green flex items-center justify-center flex-shrink-0">
                              <Flame className="w-4 h-4 text-gym-green" />
                            </div>
                            <div className="text-left">
                              <h4 className="font-semibold text-primary text-sm group-hover:text-gym-green transition-colors">Mass Bulking Plan</h4>
                              <p className="text-[10px] text-gray-500 mt-0.5 font-light">Caloric surplus and protein distribution to optimize muscle hypertrophy.</p>
                            </div>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleQuizAnswer('goal', 'cutting')}
                            className="p-4 rounded-xl border border-border-green bg-dark-bg/40 hover:border-gym-green text-left flex items-start gap-4 transition-all cursor-pointer group"
                          >
                            <div className="w-8 h-8 rounded-lg bg-secondary/50 border border-border-green group-hover:border-gym-green flex items-center justify-center flex-shrink-0">
                              <Dumbbell className="w-4 h-4 text-gym-green" />
                            </div>
                            <div className="text-left">
                              <h4 className="font-semibold text-primary text-sm group-hover:text-gym-green transition-colors">Shredded Cutting Plan</h4>
                              <p className="text-[10px] text-gray-500 mt-0.5 font-light">Caloric deficit with high protein retention to preserve lean body mass.</p>
                            </div>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleQuizAnswer('goal', 'leangain')}
                            className="p-4 rounded-xl border border-border-green bg-dark-bg/40 hover:border-gym-green text-left flex items-start gap-4 transition-all cursor-pointer group"
                          >
                            <div className="w-8 h-8 rounded-lg bg-secondary/50 border border-border-green group-hover:border-gym-green flex items-center justify-center flex-shrink-0">
                              <Activity className="w-4 h-4 text-gym-green" />
                            </div>
                            <div className="text-left">
                              <h4 className="font-semibold text-primary text-sm group-hover:text-gym-green transition-colors">Clean Lean Gain</h4>
                              <p className="text-[10px] text-gray-500 mt-0.5 font-light">Caloric maintenance with macro alignments to build size incrementally.</p>
                            </div>
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            type="button"
                            onClick={() => handleQuizAnswer('goal', 'diabetes')}
                            className="p-4 rounded-xl border border-border-green bg-dark-bg/40 hover:border-gym-green text-left flex items-start gap-4 transition-all cursor-pointer group"
                          >
                            <div className="w-8 h-8 rounded-lg bg-secondary/50 border border-border-green group-hover:border-gym-green flex items-center justify-center flex-shrink-0">
                              <Activity className="w-4 h-4 text-gym-green" />
                            </div>
                            <div className="text-left">
                              <h4 className="font-semibold text-primary text-sm group-hover:text-gym-green transition-colors">Diabetes Friendly (Low GI)</h4>
                              <p className="text-[10px] text-gray-500 mt-0.5 font-light">High viscous fibers, low glycemic index foods to stabilize blood glucose.</p>
                            </div>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleQuizAnswer('goal', 'bp')}
                            className="p-4 rounded-xl border border-border-green bg-dark-bg/40 hover:border-gym-green text-left flex items-start gap-4 transition-all cursor-pointer group"
                          >
                            <div className="w-8 h-8 rounded-lg bg-secondary/50 border border-border-green group-hover:border-gym-green flex items-center justify-center flex-shrink-0">
                              <Heart className="w-4 h-4 text-gym-green" />
                            </div>
                            <div className="text-left">
                              <h4 className="font-semibold text-primary text-sm group-hover:text-gym-green transition-colors">Hypertension (DASH Plan)</h4>
                              <p className="text-[10px] text-gray-500 mt-0.5 font-light">Ultra-low sodium, high potassium and magnesium profiles to support blood pressure.</p>
                            </div>
                          </button>
                        </>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => setQuizStep(1)}
                      className="flex items-center gap-1.5 text-gray-400 hover:text-primary text-xs transition-colors cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" /> Back to Step 1
                    </button>
                  </motion.div>
                )}

                {quizStep === 3 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-6"
                  >
                    <div className="text-center">
                      <span className="text-[10px] text-gym-green font-bold uppercase tracking-widest bg-gym-green/10 px-2.5 py-1 rounded border border-gym-green/20">
                        Quiz Complete · Recommended Match
                      </span>
                      <h3 className="text-2xl font-display font-extrabold text-primary mt-2">
                        We Found Your Optimal Plan!
                      </h3>
                      <p className="text-xs text-gray-400 mt-1 font-light">
                        Based on your targets, we suggest the following dietary alignment:
                      </p>
                    </div>

                    {/* Matched Plan Card */}
                    <div className="border border-border-green rounded-2xl overflow-hidden bg-dark-bg/40 flex flex-col md:flex-row gap-6 p-5 relative">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-gym-green/5 rounded-full blur-xl pointer-events-none" />
                      
                      {/* Left: food photo */}
                      <div className="w-full md:w-40 h-28 rounded-xl overflow-hidden border border-border-green/50 flex-shrink-0">
                        <img
                          src={DIET_DATA[quizAnswers.focus]?.plans.find(p => p.id === quizAnswers.goal)?.image}
                          alt="Recommended Food"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Right: details */}
                      <div className="flex-grow flex flex-col justify-between text-left">
                        <div>
                          <span className="text-[9px] font-bold text-gym-green uppercase bg-gym-green/10 px-2 py-0.5 rounded border border-gym-green/20 inline-block mb-1.5">
                            {DIET_DATA[quizAnswers.focus]?.plans.find(p => p.id === quizAnswers.goal)?.badge}
                          </span>
                          <h4 className="text-lg font-display font-extrabold text-primary">
                            {DIET_DATA[quizAnswers.focus]?.plans.find(p => p.id === quizAnswers.goal)?.name}
                          </h4>
                          <p className="text-gray-400 text-xs mt-1 font-sans font-light leading-relaxed line-clamp-2">
                            {DIET_DATA[quizAnswers.focus]?.plans.find(p => p.id === quizAnswers.goal)?.tagline}
                          </p>
                        </div>
                        {/* Macro Summary */}
                        <div className="flex gap-4 mt-4 border-t border-border-green/20 pt-2.5">
                          {Object.entries(DIET_DATA[quizAnswers.focus]?.plans.find(p => p.id === quizAnswers.goal)?.stats || {}).slice(0, 3).map(([k, v]) => (
                            <div key={k} className="flex flex-col">
                              <span className="text-[8px] text-gray-500 font-bold uppercase tracking-wider">{k}</span>
                              <span className="text-xs font-bold text-primary">{v}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <button
                        type="button"
                        onClick={handleApplyQuizRecommendation}
                        className="flex-grow py-3 rounded-xl bg-gym-green text-secondary hover:bg-primary hover:text-secondary font-display font-extrabold text-xs tracking-widest uppercase transition-colors cursor-pointer shadow-md"
                      >
                        Apply Recommended Diet
                      </button>
                      <button
                        type="button"
                        onClick={handleResetQuiz}
                        className="py-3 px-6 rounded-xl border border-border-green hover:border-gray-500 text-xs font-semibold text-gray-400 hover:text-primary transition-colors cursor-pointer"
                      >
                        Start Over
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
