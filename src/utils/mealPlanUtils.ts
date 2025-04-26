import { Recipe, MealPlanDay } from "./dummyData";

export type MealType = "breakfast" | "lunch" | "dinner" | "snack";

export function calculateDailyNutrition(day: MealPlanDay) {
  const allMeals = [
    ...day.meals.breakfast,
    ...day.meals.lunch,
    ...day.meals.dinner,
    ...day.meals.snack
  ];
  
  return allMeals.reduce(
    (total, meal) => {
      return {
        calories: total.calories + meal.nutrients.calories,
        protein: total.protein + meal.nutrients.protein,
        fat: total.fat + meal.nutrients.fat,
        carbs: total.carbs + meal.nutrients.carbs,
      };
    },
    { calories: 0, protein: 0, fat: 0, carbs: 0 }
  );
}

export function calculateWeeklyNutrition(mealPlan: MealPlanDay[]) {
  return mealPlan.reduce(
    (total, day) => {
      const dailyNutrition = calculateDailyNutrition(day);
      return {
        calories: total.calories + dailyNutrition.calories,
        protein: total.protein + dailyNutrition.protein,
        fat: total.fat + dailyNutrition.fat,
        carbs: total.carbs + dailyNutrition.carbs,
      };
    },
    { calories: 0, protein: 0, fat: 0, carbs: 0 }
  );
}

export function filterRecipesByDiet(recipes: Recipe[], dietaryRestrictions: string[]) {
  if (!dietaryRestrictions.length) return recipes;
  
  return recipes.filter(recipe => 
    dietaryRestrictions.every(diet => recipe.diets.includes(diet))
  );
}

export function filterRecipesByMealType(recipes: Recipe[], mealType: string) {
  if (!mealType) return recipes;
  
  return recipes.filter(recipe => 
    recipe.dishTypes.includes(mealType.toLowerCase())
  );
}

export function filterRecipesByCuisine(recipes: Recipe[], cuisines: string[]) {
  if (!cuisines.length) return recipes;
  
  return recipes.filter(recipe => 
    recipe.cuisines.some(cuisine => cuisines.includes(cuisine))
  );
}

export function generateGroceryList(mealPlan: MealPlanDay[]) {
  const ingredientsMap = new Map();
  
  mealPlan.forEach(day => {
    const allMeals = [
      ...day.meals.breakfast,
      ...day.meals.lunch,
      ...day.meals.dinner,
      ...day.meals.snack
    ];
    
    allMeals.forEach(meal => {
      meal.ingredients.forEach(ingredient => {
        if (ingredientsMap.has(ingredient.name)) {
          const existing = ingredientsMap.get(ingredient.name);
          if (existing.unit === ingredient.unit) {
            existing.amount += ingredient.amount;
          } else {
            // If units don't match, keep them separate
            ingredientsMap.set(
              `${ingredient.name} (${ingredient.unit})`,
              { ...ingredient }
            );
          }
        } else {
          ingredientsMap.set(ingredient.name, { ...ingredient, checked: false });
        }
      });
    });
  });
  
  return Array.from(ingredientsMap.values());
}

export function getMealTypeColor(mealType: MealType): string {
  switch(mealType) {
    case "breakfast":
      return "meal-breakfast";
    case "lunch":
      return "meal-lunch";
    case "dinner":
      return "meal-dinner";
    case "snack":
      return "meal-snack";
    default:
      return "";
  }
}
