
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import MealPlanDay from "@/components/MealPlanDay";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import RecipeCard from "@/components/RecipeCard";
import { useToast } from "@/hooks/use-toast";
import { CalendarPlus, CheckCircle, Download, Search, Save } from "lucide-react";
import { dummyMealPlan, dummyRecipes, Recipe } from "@/utils/dummyData";
import { MealType } from "@/utils/mealPlanUtils";

// Add some Indian recipes to the mix
const indianRecipes = [
  {
    id: "indian1",
    title: "Butter Chicken",
    readyInMinutes: 45,
    servings: 4,
    sourceUrl: "",
    image: "",
    summary: "Creamy, savory butter chicken - a classic Indian dish.",
    dishTypes: ["lunch", "dinner", "indian"],
    diets: ["high-protein"],
    nutrients: {
      calories: 450,
      protein: 30,
      carbs: 12,
      fat: 28
    }
  },
  {
    id: "indian2",
    title: "Vegetable Biryani",
    readyInMinutes: 60,
    servings: 6,
    sourceUrl: "",
    image: "",
    summary: "Fragrant rice with mixed vegetables and aromatic spices.",
    dishTypes: ["lunch", "dinner", "indian"],
    diets: ["vegetarian"],
    nutrients: {
      calories: 320,
      protein: 7,
      carbs: 58,
      fat: 9
    }
  },
  {
    id: "indian3",
    title: "Palak Paneer",
    readyInMinutes: 35,
    servings: 4,
    sourceUrl: "",
    image: "",
    summary: "Spinach curry with paneer cheese cubes.",
    dishTypes: ["lunch", "dinner", "indian"],
    diets: ["vegetarian"],
    nutrients: {
      calories: 280,
      protein: 14,
      carbs: 11,
      fat: 20
    }
  },
  {
    id: "indian4",
    title: "Masala Dosa",
    readyInMinutes: 50,
    servings: 2,
    sourceUrl: "",
    image: "",
    summary: "Crispy fermented crepe filled with spiced potatoes.",
    dishTypes: ["breakfast", "indian"],
    diets: ["vegetarian"],
    nutrients: {
      calories: 240,
      protein: 5,
      carbs: 45,
      fat: 5
    }
  }
];

// Add Indian recipes to the dummy recipes
const allRecipes = [...dummyRecipes, ...indianRecipes];

const MealPlanner = () => {
  const [mealPlan, setMealPlan] = useState(dummyMealPlan);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeDay, setActiveDay] = useState<string | null>(null);
  const [activeMealType, setActiveMealType] = useState<MealType | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [savedPlans, setSavedPlans] = useState<{ name: string, plan: typeof mealPlan }[]>([]);
  const [showSavedPlans, setShowSavedPlans] = useState(false);
  const [savePlanName, setSavePlanName] = useState("");
  const [savingPlanDialog, setSavingPlanDialog] = useState(false);
  const [isLoggedIn] = useState(true); // For demo purposes, normally from auth context
  const { toast } = useToast();

  const handleAddMeal = (dayId: string, mealType: MealType) => {
    if (!isLoggedIn) {
      toast({
        title: "Login Required",
        description: "Please log in to add meals to your plan",
        variant: "destructive"
      });
      return;
    }
    
    setActiveDay(dayId);
    setActiveMealType(mealType);
    setIsDialogOpen(true);
  };

  const handleRemoveMeal = (dayId: string, mealType: MealType, recipeId: string) => {
    setMealPlan((prevPlan) =>
      prevPlan.map((day) => {
        if (day.id !== dayId) return day;

        return {
          ...day,
          meals: {
            ...day.meals,
            [mealType]: day.meals[mealType].filter((meal) => meal.id !== recipeId),
          },
        };
      })
    );

    toast({
      title: "Meal removed",
      description: "The meal has been removed from your plan.",
    });
  };

  const handleAddRecipeToMeal = (recipe: Recipe) => {
    if (!activeDay || !activeMealType) return;

    setMealPlan((prevPlan) =>
      prevPlan.map((day) => {
        if (day.id !== activeDay) return day;

        return {
          ...day,
          meals: {
            ...day.meals,
            [activeMealType]: [...day.meals[activeMealType], recipe],
          },
        };
      })
    );

    setIsDialogOpen(false);

    toast({
      title: "Meal added",
      description: `${recipe.title} has been added to ${activeMealType}.`,
    });
  };

  const handleSaveMealPlan = () => {
    if (!isLoggedIn) {
      toast({
        title: "Login Required",
        description: "Please log in to save your meal plan",
        variant: "destructive"
      });
      return;
    }
    
    setSavingPlanDialog(true);
  };
  
  const confirmSavePlan = () => {
    if (!savePlanName.trim()) {
      toast({
        title: "Name Required",
        description: "Please enter a name for your meal plan",
        variant: "destructive"
      });
      return;
    }
    
    const newSavedPlan = {
      name: savePlanName,
      plan: [...mealPlan] // Create a copy of current meal plan
    };
    
    setSavedPlans([...savedPlans, newSavedPlan]);
    setSavePlanName("");
    setSavingPlanDialog(false);
    
    toast({
      title: "Meal Plan Saved",
      description: `Your meal plan "${savePlanName}" has been saved.`,
    });
  };
  
  const loadSavedPlan = (plan: typeof mealPlan) => {
    setMealPlan(plan);
    setShowSavedPlans(false);
    
    toast({
      title: "Meal Plan Loaded",
      description: "Your saved meal plan has been loaded.",
    });
  };

  const filteredRecipes = searchTerm
    ? allRecipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : allRecipes;

  return (
    <>
      <Navbar />
      <div className="container py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Meal Planner</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setShowSavedPlans(true)}>
              <Download className="mr-2 h-4 w-4" /> Saved Plans
            </Button>
            <Button onClick={handleSaveMealPlan}>
              <Save className="mr-2 h-4 w-4" /> Save Meal Plan
            </Button>
          </div>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-6">
          {mealPlan.map((day) => (
            <MealPlanDay
              key={day.id}
              day={day}
              onAddMeal={handleAddMeal}
              onRemoveMeal={handleRemoveMeal}
            />
          ))}
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Recipe Library</h2>
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search recipes..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredRecipes.map((recipe) => (
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
                  
                  // If no day/meal type selected, use first day breakfast as default
                  const defaultDay = mealPlan[0].id;
                  const defaultMealType: MealType = "breakfast";
                  
                  setMealPlan((prevPlan) =>
                    prevPlan.map((day) => {
                      if (day.id !== defaultDay) return day;
                      
                      return {
                        ...day,
                        meals: {
                          ...day.meals,
                          [defaultMealType]: [...day.meals[defaultMealType], recipe],
                        },
                      };
                    })
                  );
                  
                  toast({
                    title: "Meal added",
                    description: `${recipe.title} has been added to Monday's breakfast.`,
                  });
                }}
                onViewDetails={() => {
                  toast({
                    title: "Recipe Details",
                    description: `Viewing details for ${recipe.title}.`,
                  });
                }}
              />
            ))}
          </div>
        </div>
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

          <div className="relative my-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search recipes..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="breakfast">Breakfast</TabsTrigger>
              <TabsTrigger value="lunch">Lunch</TabsTrigger>
              <TabsTrigger value="dinner">Dinner</TabsTrigger>
              <TabsTrigger value="snack">Snack</TabsTrigger>
              <TabsTrigger value="indian">Indian</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredRecipes.map((recipe) => (
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
            </TabsContent>

            {["breakfast", "lunch", "dinner", "snack", "indian"].map((tabType) => (
              <TabsContent key={tabType} value={tabType} className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredRecipes
                    .filter((recipe) => 
                      tabType === "indian" 
                        ? recipe.dishTypes.includes("indian") 
                        : recipe.dishTypes.includes(tabType)
                    )
                    .map((recipe) => (
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
              </TabsContent>
            ))}
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* Save Meal Plan Dialog */}
      <Dialog open={savingPlanDialog} onOpenChange={setSavingPlanDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Meal Plan</DialogTitle>
            <DialogDescription>
              Enter a name for your meal plan to save it for future use.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="plan-name" className="text-sm font-medium">
                Plan Name
              </label>
              <Input
                id="plan-name"
                placeholder="Weekly Meal Plan"
                value={savePlanName}
                onChange={(e) => setSavePlanName(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setSavingPlanDialog(false)}>
              Cancel
            </Button>
            <Button onClick={confirmSavePlan}>Save Plan</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Saved Plans Dialog */}
      <Dialog open={showSavedPlans} onOpenChange={setShowSavedPlans}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Saved Meal Plans</DialogTitle>
            <DialogDescription>
              Select a meal plan to load
            </DialogDescription>
          </DialogHeader>
          
          {savedPlans.length > 0 ? (
            <div className="space-y-2 py-2">
              {savedPlans.map((savedPlan, index) => (
                <div 
                  key={index} 
                  className="p-3 border rounded-md flex justify-between items-center hover:bg-accent cursor-pointer"
                  onClick={() => loadSavedPlan(savedPlan.plan)}
                >
                  <div>
                    <h3 className="font-medium">{savedPlan.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {savedPlan.plan.length} days
                    </p>
                  </div>
                  <Button variant="ghost" size="sm">Load</Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No saved meal plans yet</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

// Helper function to get an image for a recipe
const getImageForRecipe = (recipe: Recipe): string => {
  const foodImages = [
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=500&auto=format&fit=crop", // Salad
    "https://unsplash.com/photos/a-table-topped-with-eggs-and-toast-on-top-of-a-cutting-board-I8YwfHGfcrY", // Vegetables
    "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?q=80&w=500&auto=format&fit=crop", // Pasta
    "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=500&auto=format&fit=crop", // Pancakes
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=500&auto=format&fit=crop", // Pizza
    "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=500&auto=format&fit=crop", // Vegan bowl
    "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Kebab
    "https://images.unsplash.com/photo-1574484284002-952d92456975?q=80&w=500&auto=format&fit=crop", // Indian curry
    "https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=500&auto=format&fit=crop", // Biryani
    "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",// Paneer dish
   
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

export default MealPlanner;
