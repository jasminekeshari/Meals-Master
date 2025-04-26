
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  preferences: {
    dietaryRestrictions: string[];
    allergies: string[];
    cuisinePreferences: string[];
    calorieGoal: number;
    macros: {
      protein: number;
      carbs: number;
      fat: number;
    };
  };
}

export interface Nutrient {
  name: string;
  amount: number;
  unit: string;
  percentOfDaily?: number;
}

export interface Recipe {
  id: string;
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
  sourceUrl?: string;
  summary: string;
  cuisines: string[];
  dishTypes: string[];
  diets: string[];
  ingredients: {
    name: string;
    amount: number;
    unit: string;
    image?: string;
  }[];
  instructions: string[];
  nutrients: {
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
    fiber?: number;
    sugar?: number;
    sodium?: number;
  };
}

export interface MealPlanDay {
  id: string;
  day: string;
  date: string;
  meals: {
    breakfast: Recipe[];
    lunch: Recipe[];
    dinner: Recipe[];
    snack: Recipe[];
  };
}

export interface GroceryItem {
  id: string;
  name: string;
  amount: number;
  unit: string;
  checked: boolean;
  category: string;
}

export const dummyUser: User = {
  id: "user1",
  name: "Jane Doe",
  email: "jane@example.com",
  avatar: "/placeholder.svg",
  preferences: {
    dietaryRestrictions: ["vegetarian"],
    allergies: ["peanuts"],
    cuisinePreferences: ["italian", "mexican", "asian"],
    calorieGoal: 2000,
    macros: {
      protein: 120,
      carbs: 200,
      fat: 65,
    },
  },
};

export const dummyRecipes: Recipe[] = [
  {
    id: "recipe1",
    title: "Avocado Toast with Egg",
    image: "/placeholder.svg",
    readyInMinutes: 15,
    servings: 1,
    summary: "A simple, nutritious breakfast with creamy avocado and protein-rich eggs.",
    cuisines: ["american"],
    dishTypes: ["breakfast"],
    diets: ["vegetarian"],
    ingredients: [
      { name: "bread", amount: 2, unit: "slices" },
      { name: "avocado", amount: 1, unit: "" },
      { name: "eggs", amount: 2, unit: "" },
      { name: "salt", amount: 1, unit: "pinch" },
      { name: "pepper", amount: 1, unit: "pinch" },
    ],
    instructions: [
      "Toast the bread until golden and crisp.",
      "In a small bowl, mash the avocado with salt and pepper.",
      "Spread the avocado on the toast.",
      "In a non-stick pan, fry the eggs until the whites are set but the yolk is still runny.",
      "Place the eggs on top of the avocado toast.",
      "Season with salt and pepper to taste."
    ],
    nutrients: {
      calories: 350,
      protein: 15,
      fat: 22,
      carbs: 30,
      fiber: 8,
    },
  },
  {
    id: "recipe2",
    title: "Quinoa Salad with Roasted Vegetables",
    image: "/placeholder.svg",
    readyInMinutes: 40,
    servings: 2,
    summary: "A hearty quinoa salad filled with roasted vegetables and a tangy dressing.",
    cuisines: ["mediterranean"],
    dishTypes: ["lunch", "salad"],
    diets: ["vegetarian", "gluten-free"],
    ingredients: [
      { name: "quinoa", amount: 1, unit: "cup" },
      { name: "bell peppers", amount: 2, unit: "" },
      { name: "zucchini", amount: 1, unit: "" },
      { name: "red onion", amount: 1, unit: "" },
      { name: "olive oil", amount: 2, unit: "tbsp" },
      { name: "lemon juice", amount: 2, unit: "tbsp" },
      { name: "feta cheese", amount: 1/2, unit: "cup" },
    ],
    instructions: [
      "Preheat the oven to 425°F (220°C).",
      "Rinse quinoa under cold water and cook according to package instructions.",
      "Chop the vegetables into bite-sized pieces and toss with olive oil, salt, and pepper.",
      "Roast vegetables for 20-25 minutes until tender and slightly charred.",
      "In a large bowl, combine cooked quinoa and roasted vegetables.",
      "Dress with lemon juice, olive oil, salt, and pepper.",
      "Gently fold in crumbled feta cheese before serving."
    ],
    nutrients: {
      calories: 380,
      protein: 12,
      fat: 18,
      carbs: 45,
      fiber: 7,
    },
  },
  {
    id: "recipe3",
    title: "Grilled Salmon with Asparagus",
    image: "/placeholder.svg",
    readyInMinutes: 25,
    servings: 2,
    summary: "Perfectly grilled salmon served with fresh asparagus for a protein-rich dinner.",
    cuisines: ["american"],
    dishTypes: ["dinner"],
    diets: ["pescatarian", "gluten-free", "keto"],
    ingredients: [
      { name: "salmon fillet", amount: 12, unit: "oz" },
      { name: "asparagus", amount: 1, unit: "bunch" },
      { name: "olive oil", amount: 2, unit: "tbsp" },
      { name: "lemon", amount: 1, unit: "" },
      { name: "garlic", amount: 2, unit: "cloves" },
      { name: "dill", amount: 1, unit: "tbsp" },
    ],
    instructions: [
      "Preheat grill to medium-high heat.",
      "Brush salmon with olive oil and season with salt, pepper, and dill.",
      "Trim the woody ends from asparagus and toss with olive oil, salt, and pepper.",
      "Grill salmon skin-side down for 4-5 minutes, then flip and cook for another 3-4 minutes.",
      "Grill asparagus for 3-4 minutes, turning occasionally.",
      "Squeeze fresh lemon over the salmon and asparagus before serving."
    ],
    nutrients: {
      calories: 420,
      protein: 40,
      fat: 25,
      carbs: 8,
      fiber: 4,
    },
  },
  {
    id: "recipe4",
    title: "Greek Yogurt Parfait",
    image: "/placeholder.svg",
    readyInMinutes: 10,
    servings: 1,
    summary: "A quick and protein-packed snack with layers of yogurt, fruit, and granola.",
    cuisines: ["greek"],
    dishTypes: ["snack", "breakfast"],
    diets: ["vegetarian"],
    ingredients: [
      { name: "greek yogurt", amount: 1, unit: "cup" },
      { name: "mixed berries", amount: 1/2, unit: "cup" },
      { name: "granola", amount: 1/4, unit: "cup" },
      { name: "honey", amount: 1, unit: "tbsp" },
    ],
    instructions: [
      "In a glass or bowl, add a layer of Greek yogurt.",
      "Add a layer of mixed berries.",
      "Sprinkle with granola.",
      "Repeat the layers.",
      "Drizzle with honey before serving."
    ],
    nutrients: {
      calories: 280,
      protein: 20,
      fat: 8,
      carbs: 35,
      sugar: 20,
    },
  },
  {
    id: "recipe5",
    title: "Vegetable Stir Fry",
    image: "/placeholder.svg",
    readyInMinutes: 30,
    servings: 2,
    summary: "A colorful and nutritious stir fry packed with vegetables and tofu.",
    cuisines: ["asian", "chinese"],
    dishTypes: ["dinner", "lunch"],
    diets: ["vegetarian", "vegan"],
    ingredients: [
      { name: "tofu", amount: 14, unit: "oz" },
      { name: "broccoli", amount: 1, unit: "head" },
      { name: "carrots", amount: 2, unit: "" },
      { name: "bell peppers", amount: 2, unit: "" },
      { name: "soy sauce", amount: 3, unit: "tbsp" },
      { name: "sesame oil", amount: 1, unit: "tbsp" },
      { name: "garlic", amount: 3, unit: "cloves" },
      { name: "ginger", amount: 1, unit: "tbsp" },
    ],
    instructions: [
      "Press tofu to remove excess water, then cube it.",
      "Chop all vegetables into bite-sized pieces.",
      "Heat sesame oil in a wok or large pan over medium-high heat.",
      "Add garlic and ginger, stir for 30 seconds until fragrant.",
      "Add tofu and cook until golden on all sides.",
      "Add vegetables and stir fry for 5-7 minutes until tender-crisp.",
      "Add soy sauce and stir to coat everything evenly.",
      "Serve hot, optionally over rice."
    ],
    nutrients: {
      calories: 320,
      protein: 25,
      fat: 15,
      carbs: 25,
      fiber: 8,
    },
  },
];

export const dummyMealPlan: MealPlanDay[] = [
  {
    id: "day1",
    day: "Monday",
    date: "2025-04-24",
    meals: {
      breakfast: [dummyRecipes[0]],
      lunch: [dummyRecipes[1]],
      dinner: [dummyRecipes[2]],
      snack: [dummyRecipes[3]],
    },
  },
  {
    id: "day2",
    day: "Tuesday",
    date: "2025-04-25",
    meals: {
      breakfast: [dummyRecipes[0]],
      lunch: [dummyRecipes[4]],
      dinner: [dummyRecipes[2]],
      snack: [],
    },
  },
  {
    id: "day3",
    day: "Wednesday",
    date: "2025-04-26",
    meals: {
      breakfast: [dummyRecipes[3]],
      lunch: [dummyRecipes[1]],
      dinner: [dummyRecipes[4]],
      snack: [],
    },
  },
  {
    id: "day4",
    day: "Thursday",
    date: "2025-04-27",
    meals: {
      breakfast: [dummyRecipes[0]],
      lunch: [dummyRecipes[1]],
      dinner: [dummyRecipes[2]],
      snack: [dummyRecipes[3]],
    },
  },
  {
    id: "day5",
    day: "Friday",
    date: "2025-04-28",
    meals: {
      breakfast: [],
      lunch: [],
      dinner: [],
      snack: [],
    },
  },
  {
    id: "day6",
    day: "Saturday",
    date: "2025-04-29",
    meals: {
      breakfast: [],
      lunch: [],
      dinner: [],
      snack: [],
    },
  },
  {
    id: "day7",
    day: "Sunday",
    date: "2025-04-30",
    meals: {
      breakfast: [],
      lunch: [],
      dinner: [],
      snack: [],
    },
  },
];

export const dummyGroceryList: GroceryItem[] = [
  { id: "item1", name: "bread", amount: 2, unit: "loaves", checked: false, category: "bakery" },
  { id: "item2", name: "avocado", amount: 3, unit: "", checked: false, category: "produce" },
  { id: "item3", name: "eggs", amount: 12, unit: "", checked: false, category: "dairy" },
  { id: "item4", name: "quinoa", amount: 1, unit: "cup", checked: false, category: "grains" },
  { id: "item5", name: "bell peppers", amount: 4, unit: "", checked: false, category: "produce" },
  { id: "item6", name: "zucchini", amount: 2, unit: "", checked: false, category: "produce" },
  { id: "item7", name: "salmon fillet", amount: 24, unit: "oz", checked: false, category: "seafood" },
  { id: "item8", name: "asparagus", amount: 2, unit: "bunches", checked: false, category: "produce" },
  { id: "item9", name: "greek yogurt", amount: 32, unit: "oz", checked: false, category: "dairy" },
  { id: "item10", name: "mixed berries", amount: 2, unit: "cups", checked: false, category: "produce" },
];
