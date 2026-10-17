import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Clock, Flame, Dumbbell, Wheat, HeartHandshake, Check, ShoppingBag, Plus, Trash2, ChevronRight 
} from 'lucide-react';
import { RECIPES_DATA, INITIAL_MEAL_PLAN } from '../data/recipesData';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const MEAL_TYPES = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];

export default function MealPlanner() {
  const [activeTab, setActiveTab] = useState('planner'); // 'planner' | 'recipes' | 'grocery'
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [mealPlan, setMealPlan] = useState(INITIAL_MEAL_PLAN);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [groceryChecked, setGroceryChecked] = useState({});

  // Slot replacement state
  const [assigningSlot, setAssigningSlot] = useState(null); // { day, mealType }

  // Filtered recipes
  const filteredRecipes = RECIPES_DATA.filter((recipe) => {
    const matchesCat = filterCategory === 'all' || recipe.category === filterCategory || recipe.dietType === filterCategory;
    const matchesSearch = recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          recipe.ingredients.some(i => i.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  // Calculate daily macros for selectedDay
  const getDayMacros = (day) => {
    const dayMeals = mealPlan[day] || {};
    let totalCal = 0, totalProt = 0, totalCarbs = 0, totalFats = 0;
    
    Object.values(dayMeals).forEach((recipeId) => {
      const recipe = RECIPES_DATA.find((r) => r.id === recipeId);
      if (recipe) {
        totalCal += recipe.calories;
        totalProt += recipe.protein;
        totalCarbs += recipe.carbs;
        totalFats += recipe.fats;
      }
    });

    return { totalCal, totalProt, totalCarbs, totalFats };
  };

  // Compile grocery list across all planned days
  const getGroceryList = () => {
    const ingredientCounts = {};
    Object.values(mealPlan).forEach((dayMeals) => {
      Object.values(dayMeals).forEach((recipeId) => {
        const recipe = RECIPES_DATA.find((r) => r.id === recipeId);
        if (recipe) {
          recipe.ingredients.forEach((ing) => {
            ingredientCounts[ing] = (ingredientCounts[ing] || 0) + 1;
          });
        }
      });
    });
    return Object.entries(ingredientCounts).map(([item, count]) => ({ item, count }));
  };

  const handleAssignRecipe = (recipeId) => {
    if (!assigningSlot) return;
    const { day, mealType } = assigningSlot;
    setMealPlan((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [mealType]: recipeId,
      },
    }));
    setAssigningSlot(null);
  };

  const handleRemoveMeal = (day, mealType) => {
    setMealPlan((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [mealType]: null,
      },
    }));
  };

  const toggleGroceryItem = (item) => {
    setGroceryChecked((prev) => ({ ...prev, [item]: !prev[item] }));
  };

  const dailyMacros = getDayMacros(selectedDay);

  return (
    <section id="meal-planner" className="py-20 px-4 md:px-8 max-w-7xl mx-auto text-left">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs text-gym-green font-bold uppercase tracking-widest bg-gym-green/10 px-3 py-1 rounded-full border border-gym-green/20">
          Smart Nutrition Hub
        </span>
        <h2 className="text-3xl md:text-5xl font-display font-extrabold text-primary mt-3">
          Interactive Meal Planner & Recipe Explorer
        </h2>
        <p className="text-sm md:text-base text-gray-400 mt-3 font-light">
          Customize your weekly menu, track instant daily macro totals, discover biochemical recipes, and auto-generate your grocery list.
        </p>

        {/* Tab Navigation */}
        <div className="flex justify-center gap-2 mt-8 bg-card-bg/80 backdrop-blur-md p-1.5 rounded-2xl border border-border-green/40 w-fit mx-auto shadow-xl">
          <button
            onClick={() => setActiveTab('planner')}
            className={`px-5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'planner'
                ? 'bg-gym-green text-secondary shadow-md'
                : 'text-gray-400 hover:text-primary'
            }`}
          >
            🗓️ Weekly Schedule
          </button>
          <button
            onClick={() => setActiveTab('recipes')}
            className={`px-5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'recipes'
                ? 'bg-gym-green text-secondary shadow-md'
                : 'text-gray-400 hover:text-primary'
            }`}
          >
            📖 Recipe Library
          </button>
          <button
            onClick={() => setActiveTab('grocery')}
            className={`px-5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'grocery'
                ? 'bg-gym-green text-secondary shadow-md'
                : 'text-gray-400 hover:text-primary'
            }`}
          >
            🛒 Grocery List ({getGroceryList().length})
          </button>
        </div>
      </div>

      {/* TAB 1: WEEKLY MEAL PLANNER */}
      {activeTab === 'planner' && (
        <div className="space-y-8">
          {/* Day Selector */}
          <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-none justify-start md:justify-center">
            {DAYS.map((day) => {
              const isSelected = selectedDay === day;
              return (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`px-5 py-3 rounded-2xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer border ${
                    isSelected
                      ? 'bg-primary text-secondary border-primary shadow-lg shadow-primary/10'
                      : 'bg-card-bg/60 text-gray-400 border-border-green/30 hover:border-gym-green/60 hover:text-primary'
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>

          {/* Daily Macros Overview Banner */}
          <div className="bg-card-bg border border-border-green/50 rounded-3xl p-6 shadow-xl grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3 p-3 bg-dark-bg/50 rounded-2xl border border-border-green/20">
              <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-400">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Calories</p>
                <p className="text-xl font-display font-bold text-primary">{dailyMacros.totalCal} <span className="text-xs font-normal text-gray-500">kcal</span></p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-dark-bg/50 rounded-2xl border border-border-green/20">
              <div className="p-2.5 rounded-xl bg-gym-green/10 text-gym-green">
                <Dumbbell className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Protein</p>
                <p className="text-xl font-display font-bold text-primary">{dailyMacros.totalProt} <span className="text-xs font-normal text-gray-500">g</span></p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-dark-bg/50 rounded-2xl border border-border-green/20">
              <div className="p-2.5 rounded-xl bg-yellow-500/10 text-yellow-400">
                <Wheat className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Carbs</p>
                <p className="text-xl font-display font-bold text-primary">{dailyMacros.totalCarbs} <span className="text-xs font-normal text-gray-500">g</span></p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-dark-bg/50 rounded-2xl border border-border-green/20">
              <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Fats</p>
                <p className="text-xl font-display font-bold text-primary">{dailyMacros.totalFats} <span className="text-xs font-normal text-gray-500">g</span></p>
              </div>
            </div>
          </div>

          {/* Meal Slots for Selected Day */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {MEAL_TYPES.map((mealType) => {
              const recipeId = mealPlan[selectedDay]?.[mealType];
              const recipe = RECIPES_DATA.find((r) => r.id === recipeId);

              return (
                <div
                  key={mealType}
                  className="bg-card-bg border border-border-green/40 rounded-3xl p-5 flex flex-col justify-between space-y-4 hover:border-gym-green/50 transition-all shadow-lg"
                >
                  <div className="flex justify-between items-center border-b border-border-green/30 pb-3">
                    <h3 className="text-sm font-bold text-gym-green uppercase tracking-wider">
                      {mealType}
                    </h3>
                    {recipe && (
                      <button
                        onClick={() => handleRemoveMeal(selectedDay, mealType)}
                        className="text-gray-500 hover:text-red-400 transition-colors p-1"
                        title="Remove meal"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {recipe ? (
                    <div className="space-y-3">
                      <div className="relative rounded-2xl overflow-hidden h-36 border border-border-green/20">
                        <img
                          src={recipe.image}
                          alt={recipe.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2 bg-dark-bg/80 backdrop-blur-md px-2 py-1 rounded-lg text-[10px] font-bold text-primary flex items-center gap-1">
                          <Flame className="w-3 h-3 text-orange-400" />
                          {recipe.calories} kcal
                        </div>
                      </div>

                      <h4 className="text-sm font-bold text-primary line-clamp-1">
                        {recipe.name}
                      </h4>

                      <div className="flex items-center gap-2 text-[11px] text-gray-400">
                        <span className="bg-secondary/40 px-2 py-0.5 rounded text-gym-green font-semibold">
                          P: {recipe.protein}g
                        </span>
                        <span className="bg-secondary/40 px-2 py-0.5 rounded text-yellow-400 font-semibold">
                          C: {recipe.carbs}g
                        </span>
                        <span className="bg-secondary/40 px-2 py-0.5 rounded text-blue-400 font-semibold">
                          F: {recipe.fats}g
                        </span>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <button
                          onClick={() => setSelectedRecipe(recipe)}
                          className="flex-1 py-2 rounded-xl bg-secondary/40 hover:bg-secondary text-primary text-xs font-semibold transition-colors"
                        >
                          Details
                        </button>
                        <button
                          onClick={() => {
                            setAssigningSlot({ day: selectedDay, mealType });
                            setActiveTab('recipes');
                          }}
                          className="py-2 px-3 rounded-xl bg-dark-bg hover:bg-border-green/30 text-gym-green text-xs font-semibold transition-colors"
                          title="Change Recipe"
                        >
                          Swap
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="h-48 border-2 border-dashed border-border-green/30 rounded-2xl flex flex-col items-center justify-center text-center p-4 space-y-3">
                      <p className="text-xs text-gray-500">No meal assigned for {mealType}</p>
                      <button
                        onClick={() => {
                          setAssigningSlot({ day: selectedDay, mealType });
                          setActiveTab('recipes');
                        }}
                        className="px-4 py-2 rounded-xl bg-gym-green/10 hover:bg-gym-green text-gym-green hover:text-secondary text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                        Add Recipe
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: RECIPE EXPLORER */}
      {activeTab === 'recipes' && (
        <div className="space-y-8">
          {/* Slot assignment notification banner */}
          {assigningSlot && (
            <div className="bg-gym-green/10 border border-gym-green/40 p-4 rounded-2xl flex justify-between items-center">
              <p className="text-xs text-gym-green font-semibold">
                Selecting a recipe for <strong>{assigningSlot.day} ({assigningSlot.mealType})</strong>
              </p>
              <button
                onClick={() => setAssigningSlot(null)}
                className="text-xs text-gray-400 hover:text-primary underline"
              >
                Cancel Swap
              </button>
            </div>
          )}

          {/* Search & Category Filter */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <input
              type="text"
              placeholder="Search recipes or ingredients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-80 px-4 py-3 bg-card-bg border border-border-green/40 rounded-2xl text-xs text-primary placeholder-gray-500 focus:outline-none focus:border-gym-green"
            />

            {/* Filter Buttons */}
            <div className="flex overflow-x-auto gap-2 w-full md:w-auto pb-2 scrollbar-none">
              {['all', 'bulking', 'cutting', 'keto', 'cleanse', 'high-protein', 'vegan'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all whitespace-nowrap cursor-pointer border ${
                    filterCategory === cat
                      ? 'bg-gym-green text-secondary border-gym-green'
                      : 'bg-card-bg text-gray-400 border-border-green/30 hover:border-gym-green/50 hover:text-primary'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Recipes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.map((recipe) => (
              <div
                key={recipe.id}
                className="bg-card-bg border border-border-green/40 rounded-3xl overflow-hidden hover:border-gym-green transition-all shadow-xl group flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={recipe.image}
                      alt={recipe.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-dark-bg/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-gym-green uppercase border border-border-green/40">
                      {recipe.category}
                    </div>
                    <div className="absolute top-3 right-3 bg-dark-bg/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-gray-300 flex items-center gap-1 border border-border-green/40">
                      <Clock className="w-3 h-3 text-gym-green" />
                      {recipe.prepTime}
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <h3 className="text-lg font-bold text-primary line-clamp-1">{recipe.name}</h3>

                    {/* Macro Tags */}
                    <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-bold">
                      <div className="p-2 rounded-xl bg-dark-bg/50 border border-border-green/20">
                        <span className="text-gray-500 block">CAL</span>
                        <span className="text-primary">{recipe.calories}</span>
                      </div>
                      <div className="p-2 rounded-xl bg-dark-bg/50 border border-border-green/20">
                        <span className="text-gray-500 block">PROT</span>
                        <span className="text-gym-green">{recipe.protein}g</span>
                      </div>
                      <div className="p-2 rounded-xl bg-dark-bg/50 border border-border-green/20">
                        <span className="text-gray-500 block">CARB</span>
                        <span className="text-yellow-400">{recipe.carbs}g</span>
                      </div>
                      <div className="p-2 rounded-xl bg-dark-bg/50 border border-border-green/20">
                        <span className="text-gray-500 block">FAT</span>
                        <span className="text-blue-400">{recipe.fats}g</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 flex gap-2">
                  <button
                    onClick={() => setSelectedRecipe(recipe)}
                    className="flex-1 py-3 rounded-xl bg-secondary/40 hover:bg-secondary text-primary text-xs font-bold transition-colors cursor-pointer"
                  >
                    View Recipe
                  </button>

                  {assigningSlot && (
                    <button
                      onClick={() => handleAssignRecipe(recipe.id)}
                      className="py-3 px-4 rounded-xl bg-gym-green hover:bg-primary text-secondary text-xs font-bold transition-colors cursor-pointer"
                    >
                      Assign
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: GROCERY LIST */}
      {activeTab === 'grocery' && (
        <div className="max-w-2xl mx-auto bg-card-bg border border-border-green/40 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6">
          <div className="flex justify-between items-center border-b border-border-green/30 pb-4">
            <div>
              <h3 className="text-xl font-bold text-primary flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-gym-green" />
                Automated Grocery List
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                Aggregated ingredients from all meals scheduled for this week.
              </p>
            </div>
            <span className="text-xs text-gym-green font-bold bg-gym-green/10 px-3 py-1 rounded-full border border-gym-green/20">
              {getGroceryList().length} Items Needed
            </span>
          </div>

          <div className="space-y-3 max-h-[450px] overflow-y-auto pr-2">
            {getGroceryList().map(({ item, count }) => {
              const isChecked = groceryChecked[item];
              return (
                <div
                  key={item}
                  onClick={() => toggleGroceryItem(item)}
                  className={`p-4 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                    isChecked
                      ? 'bg-dark-bg/30 border-border-green/20 opacity-50 line-through'
                      : 'bg-dark-bg/60 border-border-green/40 hover:border-gym-green/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-colors ${
                        isChecked ? 'bg-gym-green border-gym-green text-secondary' : 'border-gray-500'
                      }`}
                    >
                      {isChecked && <Check className="w-3.5 h-3.5" />}
                    </div>
                    <span className="text-xs md:text-sm font-medium text-primary">{item}</span>
                  </div>

                  <span className="text-[11px] font-bold text-gym-green bg-gym-green/10 px-2.5 py-0.5 rounded-full border border-gym-green/20">
                    x{count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* RECIPE DETAILS MODAL */}
      <AnimatePresence>
        {selectedRecipe && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl bg-card-bg border border-border-green rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl my-8 text-left"
            >
              <button
                onClick={() => setSelectedRecipe(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-dark-bg/60 text-gray-400 hover:text-primary transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative h-60 rounded-2xl overflow-hidden">
                <img
                  src={selectedRecipe.image}
                  alt={selectedRecipe.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-bg to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gym-green bg-gym-green/20 px-3 py-1 rounded-full border border-gym-green/30">
                    {selectedRecipe.category}
                  </span>
                  <h3 className="text-2xl font-bold text-primary mt-2">{selectedRecipe.name}</h3>
                </div>
              </div>

              {/* Ingredients & Instructions Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xs font-bold text-gym-green uppercase tracking-wider mb-3">
                    Ingredients
                  </h4>
                  <ul className="space-y-2 text-xs text-gray-300">
                    {selectedRecipe.ingredients.map((ing, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-gym-green" />
                        {ing}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-gym-green uppercase tracking-wider mb-3">
                    Instructions
                  </h4>
                  <ol className="space-y-2 text-xs text-gray-300 list-decimal list-inside">
                    {selectedRecipe.instructions.map((step, idx) => (
                      <li key={idx} className="leading-relaxed">
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              <div className="pt-4 border-t border-border-green/30 flex justify-end">
                <button
                  onClick={() => setSelectedRecipe(null)}
                  className="px-6 py-2.5 rounded-xl bg-gym-green text-secondary font-bold text-xs hover:bg-primary transition-colors cursor-pointer"
                >
                  Close Recipe
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
