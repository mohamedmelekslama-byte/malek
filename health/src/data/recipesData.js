export const RECIPES_DATA = [
  {
    id: 'rec_1',
    name: 'Grilled Salmon with Quinoa & Asparagus',
    category: 'bulking',
    dietType: 'high-protein',
    prepTime: '25 mins',
    calories: 650,
    protein: 48,
    carbs: 45,
    fats: 22,
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=600&q=80',
    ingredients: [
      '200g Fresh Salmon Fillet',
      '1 cup Cooked Quinoa',
      '8 spears Fresh Asparagus',
      '1 tbsp Extra Virgin Olive Oil',
      '1/2 Lemon (juiced)',
      'Salt, Black Pepper, Garlic Powder to taste'
    ],
    instructions: [
      'Season salmon fillet with salt, black pepper, and garlic powder.',
      'Heat olive oil in a non-stick skillet over medium-high heat.',
      'Sear salmon for 4-5 minutes per side until golden brown and cooked through.',
      'Sauté asparagus spears in the same pan for 3-4 minutes.',
      'Serve salmon over a bed of fluffy quinoa with asparagus on the side, drizzled with fresh lemon juice.'
    ]
  },
  {
    id: 'rec_2',
    name: 'Avocado & Egg White Power Bowl',
    category: 'cutting',
    dietType: 'low-carb',
    prepTime: '15 mins',
    calories: 380,
    protein: 32,
    carbs: 14,
    fats: 20,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80',
    ingredients: [
      '4 Large Egg Whites + 1 Whole Egg',
      '1/2 Medium Ripe Avocado (sliced)',
      '1 cup Baby Spinach',
      '1/2 cup Cherry Tomatoes (halved)',
      '1 tbsp Pumpkin Seeds',
      'Pinch of Red Pepper Flakes & Sea Salt'
    ],
    instructions: [
      'Scramble egg whites and whole egg gently in a heated pan with cooking spray.',
      'Lightly wilt baby spinach in the warm pan.',
      'Assemble bowl with wilted spinach base, scrambled eggs, cherry tomatoes, and sliced avocado.',
      'Garnish with pumpkin seeds and red pepper flakes.'
    ]
  },
  {
    id: 'rec_3',
    name: 'Keto Garlic Butter Ribeye Steak',
    category: 'keto',
    dietType: 'keto',
    prepTime: '20 mins',
    calories: 720,
    protein: 52,
    carbs: 4,
    fats: 54,
    image: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=600&q=80',
    ingredients: [
      '250g Grass-Fed Ribeye Steak',
      '2 tbsp Unsalted Butter',
      '2 cloves Garlic (minced)',
      '1 sprig Fresh Rosemary',
      '1 cup Steamed Broccoli Florets'
    ],
    instructions: [
      'Pat steak dry and season generously with sea salt and coarse pepper.',
      'Heat cast-iron skillet to smoking hot.',
      'Sear steak 3 minutes on first side, flip and add butter, minced garlic, and rosemary.',
      'Baste steak continuously with melted garlic butter for 3 more minutes.',
      'Rest for 5 minutes before slicing. Serve with butter-drizzled broccoli.'
    ]
  },
  {
    id: 'rec_4',
    name: 'Green Goddess Detox Smoothie Bowl',
    category: 'cleanse',
    dietType: 'vegan',
    prepTime: '10 mins',
    calories: 310,
    protein: 12,
    carbs: 48,
    fats: 8,
    image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=600&q=80',
    ingredients: [
      '1 cup Frozen Mango & Pineapple Chunks',
      '1 cup Fresh Kale & Spinach mix',
      '1/2 Green Apple',
      '1 cup Unsweetened Coconut Water',
      '1 tbsp Chia Seeds',
      'Toppings: Sliced Kiwi, Coconut Flakes'
    ],
    instructions: [
      'Add frozen fruit, greens, green apple, and coconut water to high-speed blender.',
      'Blend on high until smooth and thick.',
      'Pour into a bowl and arrange chia seeds, kiwi slices, and coconut flakes on top.'
    ]
  },
  {
    id: 'rec_5',
    name: 'Lean Turkey & Sweet Potato Skillet',
    category: 'bulking',
    dietType: 'balanced',
    prepTime: '30 mins',
    calories: 540,
    protein: 42,
    carbs: 52,
    fats: 16,
    image: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=600&q=80',
    ingredients: [
      '200g Lean Ground Turkey (93/7)',
      '1 Large Sweet Potato (cubed)',
      '1/2 Bell Pepper (diced)',
      '1/4 Red Onion (chopped)',
      '1 tsp Smoked Paprika & Cumin'
    ],
    instructions: [
      'Parboil sweet potato cubes for 8 minutes until tender.',
      'Brown ground turkey in a skillet over medium heat with spices.',
      'Add diced onion, bell peppers, and sweet potatoes to skillet.',
      'Cook for an additional 8-10 minutes until edges are crisp and golden.'
    ]
  },
  {
    id: 'rec_6',
    name: 'Greek Yogurt Berry Parfait & Granola',
    category: 'cutting',
    dietType: 'high-protein',
    prepTime: '5 mins',
    calories: 290,
    protein: 26,
    carbs: 34,
    fats: 6,
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80',
    ingredients: [
      '200g Non-Fat Plain Greek Yogurt',
      '1/2 cup Mixed Fresh Berries (Blueberries & Raspberries)',
      '1/4 cup Low-Sugar Protein Granola',
      '1 tsp Pure Honey or Maple Syrup'
    ],
    instructions: [
      'Layer half of Greek yogurt in a glass or bowl.',
      'Add a layer of mixed berries and half the granola.',
      'Top with remaining yogurt, berries, granola, and a light drizzle of honey.'
    ]
  }
];

export const INITIAL_MEAL_PLAN = {
  Monday: { Breakfast: 'rec_6', Lunch: 'rec_2', Dinner: 'rec_1', Snack: 'rec_4' },
  Tuesday: { Breakfast: 'rec_2', Lunch: 'rec_5', Dinner: 'rec_3', Snack: 'rec_6' },
  Wednesday: { Breakfast: 'rec_6', Lunch: 'rec_1', Dinner: 'rec_5', Snack: 'rec_4' },
  Thursday: { Breakfast: 'rec_2', Lunch: 'rec_3', Dinner: 'rec_1', Snack: 'rec_6' },
  Friday: { Breakfast: 'rec_4', Lunch: 'rec_5', Dinner: 'rec_2', Snack: 'rec_1' },
  Saturday: { Breakfast: 'rec_6', Lunch: 'rec_1', Dinner: 'rec_3', Snack: 'rec_4' },
  Sunday: { Breakfast: 'rec_2', Lunch: 'rec_4', Dinner: 'rec_5', Snack: 'rec_6' }
};
