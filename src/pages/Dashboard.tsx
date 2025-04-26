
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CalendarPlus, ChefHat, Plus, ShoppingCart, CheckCircle } from "lucide-react";
import NutritionChart from "@/components/NutritionChart";
import RecipeCard from "@/components/RecipeCard";
import { dummyUser, dummyRecipes, dummyMealPlan, Recipe } from "@/utils/dummyData";
import { calculateDailyNutrition, MealType } from "@/utils/mealPlanUtils";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoggedIn] = useState(true); // For demo purposes, normally from auth context
  const [today, setToday] = useState(dummyMealPlan[0]);
  const [todayNutrition, setTodayNutrition] = useState(calculateDailyNutrition(today));
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeMealType, setActiveMealType] = useState<MealType | null>(null);
  
  const calculateProgress = (current: number, goal: number) => {
    return Math.min(Math.round((current / goal) * 100), 100);
  };
  
  const calorieProgress = calculateProgress(
    todayNutrition.calories,
    dummyUser.preferences.calorieGoal
  );
  
  const proteinProgress = calculateProgress(
    todayNutrition.protein,
    dummyUser.preferences.macros.protein
  );
  
  const recommendedRecipes = dummyRecipes.slice(0, 3);

  const handleAddMeal = (mealType: MealType) => {
    if (!isLoggedIn) {
      toast({
        title: "Login Required",
        description: "Please log in to add meals to your meal plan",
        variant: "destructive"
      });
      return;
    }

    setActiveMealType(mealType);
    setIsDialogOpen(true);
  };

  const handleAddRecipeToMeal = (recipe: Recipe) => {
    if (!activeMealType) return;

    setToday(prevToday => ({
      ...prevToday,
      meals: {
        ...prevToday.meals,
        [activeMealType]: [...prevToday.meals[activeMealType], recipe]
      }
    }));

    setIsDialogOpen(false);
    
    toast({
      title: "Meal added",
      description: `${recipe.title} has been added to ${activeMealType}.`,
    });
    
    // Recalculate nutrition
    setTimeout(() => {
      setTodayNutrition(calculateDailyNutrition(today));
    }, 100);
  };
  
  useEffect(() => {
    setTodayNutrition(calculateDailyNutrition(today));
  }, [today]);

  // Function to get image for recipes
  const getImageForRecipe = (recipe: Recipe): string => {
    const foodImages = [
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=500&auto=format&fit=crop", // Salad
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=500&auto=format&fit=crop", // Vegetables
      "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?q=80&w=500&auto=format&fit=crop", // Pasta
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=500&auto=format&fit=crop", // Pancakes
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=500&auto=format&fit=crop", // Pizza
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=500&auto=format&fit=crop", // Vegan bowl
      "https://images.unsplash.com/photo-1582801915458-9b3066aaccbb?q=80&w=500&auto=format&fit=crop", // Kebab
      "https://images.unsplash.com/photo-1574484284002-952d92456975?q=80&w=500&auto=format&fit=crop", // Indian curry
      "https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=500&auto=format&fit=crop", // Biryani
      "https://images.unsplash.com/photo-1613545325278-f24b0cae1224?q=80&w=500&auto=format&fit=crop"  // Paneer dish
    ];
  
    const title = recipe.title.toLowerCase();
    
    if (title.includes("salad") || title.includes("vegetable")) {
      return foodImages[0];
    } else if (title.includes("veg") || title.includes("greens")) {
      return foodImages[1];
    } else if (title.includes("pasta") || title.includes("noodle")) {
      return foodImages[2];
    } else if (title.includes("pancake") || title.includes("breakfast")) {
      return foodImages[3];
    } else if (title.includes("pizza") || title.includes("flat")) {
      return foodImages[4];
    } else if (title.includes("bowl") || title.includes("health")) {
      return foodImages[5];
    } else if (title.includes("chicken") || title.includes("kebab") || title.includes("meat")) {
      return foodImages[6];
    } else if (title.includes("curry") || title.includes("indian") || title.includes("spicy")) {
      return foodImages[7];
    } else if (title.includes("biryani") || title.includes("rice")) {
      return foodImages[8];
    } else if (title.includes("paneer") || title.includes("cheese")) {
      return foodImages[9];
    }
    
    // Fallback to a random image based on recipe id
    const randomIndex = recipe.id.charCodeAt(0) % foodImages.length;
    return foodImages[randomIndex];
  };

  const removeMeal = (mealType: MealType, recipeId: string) => {
    setToday(prevToday => ({
      ...prevToday,
      meals: {
        ...prevToday.meals,
        [mealType]: prevToday.meals[mealType].filter(meal => meal.id !== recipeId)
      }
    }));

    toast({
      title: "Meal removed",
      description: "The meal has been removed from your plan.",
    });
  };

  return (
    <>
      <Navbar />
      <div className="container py-6">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Today's Calories</CardTitle>
                  <CardDescription>Daily target: {dummyUser.preferences.calorieGoal} kcal</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-3xl font-bold">{todayNutrition.calories}</p>
                      <p className="text-sm text-muted-foreground">calories consumed</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Remaining</p>
                      <p className="text-xl font-medium">{Math.max(0, dummyUser.preferences.calorieGoal - todayNutrition.calories)}</p>
                    </div>
                  </div>
                  <Progress value={calorieProgress} className="mt-4" />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Today's Protein</CardTitle>
                  <CardDescription>Daily target: {dummyUser.preferences.macros.protein}g</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-3xl font-bold">{todayNutrition.protein}g</p>
                      <p className="text-sm text-muted-foreground">protein consumed</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Remaining</p>
                      <p className="text-xl font-medium">{Math.max(0, dummyUser.preferences.macros.protein - todayNutrition.protein)}g</p>
                    </div>
                  </div>
                  <Progress value={proteinProgress} className="mt-4" />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Meal Plan</CardTitle>
                  <CardDescription>This week's plan</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{today.day}</p>
                      <p className="text-xs text-muted-foreground">{today.date}</p>
                    </div>
                    <Button size="sm" variant="outline" asChild>
                      <Link to="/meal-planner">
                        <CalendarPlus className="h-4 w-4 mr-1" /> View
                      </Link>
                    </Button>
                  </div>
                  <div className="space-y-1.5">
                    {Object.entries(today.meals).map(([type, meals]) => (
                      <div key={type} className="flex items-center gap-2">
                        <Badge variant="outline" className="capitalize">
                          {type}
                        </Badge>
                        <span className="text-sm truncate max-w-[150px]">
                          {meals.length > 0 
                            ? meals.map(meal => meal.title).join(", ") 
                            : "No meals planned"}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                  <CardDescription>Common tasks</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                  <Button asChild variant="outline" className="justify-start">
                    <Link to="/meal-planner">
                      <CalendarPlus className="h-4 w-4 mr-2" /> Plan Meals
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="justify-start">
                    <Link to="/recipes">
                      <ChefHat className="h-4 w-4 mr-2" /> Find Recipes
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="justify-start">
                    <Link to="/grocery-list">
                      <ShoppingCart className="h-4 w-4 mr-2" /> Grocery List
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4">Today's Meals</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {Object.entries(today.meals).map(([type, meals]) => (
                <div key={type} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium capitalize">{type}</h3>
                    <Button size="sm" variant="ghost" onClick={() => handleAddMeal(type as MealType)}>
                      <Plus className="h-4 w-4 mr-1" /> Add
                    </Button>
                  </div>
                  {meals.length > 0 ? (
                    <div className="space-y-2">
                      {meals.map((meal) => (
                        <div key={meal.id} className={`p-3 border rounded-md group hover:border-primary relative`}>
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded overflow-hidden">
                              <img 
                                src={getImageForRecipe(meal)} 
                                alt={meal.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium truncate">{meal.title}</p>
                              <div className="flex gap-4 text-xs text-muted-foreground mt-1">
                                <span>{meal.nutrients.calories} calories</span>
                                <span>{meal.readyInMinutes} min</span>
                              </div>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="opacity-0 group-hover:opacity-100" 
                              onClick={(e) => {
                                e.stopPropagation();
                                removeMeal(type as MealType, meal.id);
                              }}
                            >
                              ✕
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 border border-dashed rounded-md flex flex-col items-center justify-center text-center">
                      <p className="text-muted-foreground mb-2">No meals planned</p>
                      <Button size="sm" variant="outline" onClick={() => handleAddMeal(type as MealType)}>
                        <Plus className="h-4 w-4 mr-1" /> Add Meal
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="nutrition" className="space-y-8">
            <NutritionChart 
              data={todayNutrition} 
              goals={{
                calories: dummyUser.preferences.calorieGoal,
                protein: dummyUser.preferences.macros.protein,
                carbs: dummyUser.preferences.macros.carbs,
                fat: dummyUser.preferences.macros.fat
              }}
              title="Today's Nutrition"
              description="Your daily nutritional intake vs goals"
            />

            <Card>
              <CardHeader>
                <CardTitle>Nutritional Breakdown</CardTitle>
                <CardDescription>Detailed information about your daily nutrition</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Macronutrients</h4>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Protein</span>
                          <span>{todayNutrition.protein}g / {dummyUser.preferences.macros.protein}g</span>
                        </div>
                        <Progress value={calculateProgress(todayNutrition.protein, dummyUser.preferences.macros.protein)} />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Carbs</span>
                          <span>{todayNutrition.carbs}g / {dummyUser.preferences.macros.carbs}g</span>
                        </div>
                        <Progress value={calculateProgress(todayNutrition.carbs, dummyUser.preferences.macros.carbs)} />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Fat</span>
                          <span>{todayNutrition.fat}g / {dummyUser.preferences.macros.fat}g</span>
                        </div>
                        <Progress value={calculateProgress(todayNutrition.fat, dummyUser.preferences.macros.fat)} />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-4">Tips</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
                        <span>Stay hydrated by drinking at least 8 glasses of water daily.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
                        <span>Include more protein in your breakfast to stay fuller for longer.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
                        <span>Try to incorporate more vegetables into your lunch and dinner.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="recommendations" className="space-y-6">
            <h2 className="text-2xl font-bold">Recommended Recipes</h2>
            <p className="text-muted-foreground">Based on your preferences and dietary goals</p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedRecipes.map((recipe) => (
                <RecipeCard 
                  key={recipe.id} 
                  recipe={recipe}
                  onAddToMealPlan={() => {
                    if (!isLoggedIn) {
                      toast({
                        title: "Login Required",
                        description: "Please log in to add meals to your plan",
                        variant: "destructive"
                      });
                      return;
                    }
                    
                    setActiveMealType("lunch");
                    handleAddRecipeToMeal(recipe);
                  }}
                  onViewDetails={() => {
                    toast({
                      title: "Recipe Details",
                      description: `Viewing details for ${recipe.title}.`,
                    });
                  }}
                />
              ))}
              <Card className="flex flex-col items-center justify-center p-8 border-dashed">
                <div className="text-center space-y-4">
                  <ChefHat className="h-10 w-10 text-muted-foreground mx-auto" />
                  <div>
                    <h3 className="font-medium">Discover More Recipes</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Explore our recipe collection based on your preferences
                    </p>
                    <Button asChild>
                      <Link to="/recipes">Browse All Recipes</Link>
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Add Meal Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Add a meal</DialogTitle>
            <DialogDescription>
              Select a recipe to add to your meal plan.
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 max-h-[400px] overflow-y-auto p-1">
            {dummyRecipes.map((recipe) => (
              <div
                key={recipe.id}
                className="border rounded-lg p-4 cursor-pointer hover:border-primary transition-colors"
                onClick={() => handleAddRecipeToMeal(recipe)}
              >
                <div className="aspect-video rounded-md overflow-hidden mb-2">
                  <img
                    src={getImageForRecipe(recipe)}
                    alt={recipe.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                <h3 className="font-medium text-sm">{recipe.title}</h3>
                <div className="flex flex-wrap gap-1 mt-2">
                  {recipe.dishTypes.slice(0, 2).map((type) => (
                    <Badge key={type} variant="outline" className="capitalize text-xs">
                      {type}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Dashboard;
