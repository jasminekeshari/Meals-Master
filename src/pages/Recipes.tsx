
import { useState } from "react";
import Navbar from "@/components/Navbar";
import RecipeCard from "@/components/RecipeCard";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, SlidersHorizontal } from "lucide-react";
import { dummyRecipes, Recipe } from "@/utils/dummyData";
import { useToast } from "@/hooks/use-toast";

const diets = [
  "vegetarian",
  "vegan",
  "gluten-free",
  "keto",
  "paleo",
  "pescatarian",
  "low-carb",
];

const cuisines = [
  "american",
  "italian",
  "mexican",
  "asian",
  "mediterranean",
  "greek",
  "indian",
  "chinese",
  "japanese",
];

const Recipes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [selectedDiets, setSelectedDiets] = useState<string[]>([]);
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [selectedMealType, setSelectedMealType] = useState<string>("");
  const [sortBy, setSortBy] = useState("relevance");
  const { toast } = useToast();

  const handleAddToMealPlan = (recipe: Recipe) => {
    // This would typically open a dialog to select day/meal type
    toast({
      title: "Recipe added",
      description: `${recipe.title} has been added to your meal plan.`,
    });
  };

  const handleViewDetails = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
  };

  const toggleDiet = (diet: string) => {
    setSelectedDiets((prev) =>
      prev.includes(diet)
        ? prev.filter((d) => d !== diet)
        : [...prev, diet]
    );
  };

  const toggleCuisine = (cuisine: string) => {
    setSelectedCuisines((prev) =>
      prev.includes(cuisine)
        ? prev.filter((c) => c !== cuisine)
        : [...prev, cuisine]
    );
  };

  const filteredRecipes = dummyRecipes
    .filter((recipe) => {
      // Search term filter
      if (searchTerm && !recipe.title.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      
      // Diet filter
      if (selectedDiets.length > 0 && !selectedDiets.some(diet => recipe.diets.includes(diet))) {
        return false;
      }
      
      // Cuisine filter
      if (selectedCuisines.length > 0 && !selectedCuisines.some(cuisine => recipe.cuisines.includes(cuisine))) {
        return false;
      }
      
      // Meal type filter
      if (selectedMealType && !recipe.dishTypes.includes(selectedMealType)) {
        return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "calories-asc") {
        return a.nutrients.calories - b.nutrients.calories;
      } else if (sortBy === "calories-desc") {
        return b.nutrients.calories - a.nutrients.calories;
      } else if (sortBy === "protein-desc") {
        return b.nutrients.protein - a.nutrients.protein;
      } else if (sortBy === "time-asc") {
        return a.readyInMinutes - b.readyInMinutes;
      }
      return 0;
    });

  return (
    <>
      <Navbar />
      <div className="container py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Recipes</h1>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">
                <SlidersHorizontal className="mr-2 h-4 w-4" /> Filter
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filter Recipes</SheetTitle>
                <SheetDescription>
                  Customize your recipe search with these filters.
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                <div>
                  <h3 className="text-sm font-medium mb-3">Dietary Preferences</h3>
                  <div className="space-y-2">
                    {diets.map((diet) => (
                      <div key={diet} className="flex items-center space-x-2">
                        <Checkbox
                          id={`diet-${diet}`}
                          checked={selectedDiets.includes(diet)}
                          onCheckedChange={() => toggleDiet(diet)}
                        />
                        <label
                          htmlFor={`diet-${diet}`}
                          className="text-sm capitalize cursor-pointer"
                        >
                          {diet}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-sm font-medium mb-3">Cuisines</h3>
                  <div className="space-y-2">
                    {cuisines.map((cuisine) => (
                      <div key={cuisine} className="flex items-center space-x-2">
                        <Checkbox
                          id={`cuisine-${cuisine}`}
                          checked={selectedCuisines.includes(cuisine)}
                          onCheckedChange={() => toggleCuisine(cuisine)}
                        />
                        <label
                          htmlFor={`cuisine-${cuisine}`}
                          className="text-sm capitalize cursor-pointer"
                        >
                          {cuisine}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-sm font-medium mb-3">Meal Type</h3>
                  <Select value={selectedMealType} onValueChange={setSelectedMealType}>
                    <SelectTrigger>
                      <SelectValue placeholder="All meals" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All meals</SelectItem>
                      <SelectItem value="breakfast">Breakfast</SelectItem>
                      <SelectItem value="lunch">Lunch</SelectItem>
                      <SelectItem value="dinner">Dinner</SelectItem>
                      <SelectItem value="snack">Snack</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="mt-6">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setSelectedDiets([]);
                    setSelectedCuisines([]);
                    setSelectedMealType("");
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search recipes..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="calories-asc">Calories (Low to High)</SelectItem>
              <SelectItem value="calories-desc">Calories (High to Low)</SelectItem>
              <SelectItem value="protein-desc">Highest Protein</SelectItem>
              <SelectItem value="time-asc">Quickest to Make</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {selectedDiets.map((diet) => (
            <Badge key={diet} variant="secondary" className="capitalize">
              {diet} <span className="ml-1 cursor-pointer" onClick={() => toggleDiet(diet)}>×</span>
            </Badge>
          ))}
          {selectedCuisines.map((cuisine) => (
            <Badge key={cuisine} variant="secondary" className="capitalize">
              {cuisine} <span className="ml-1 cursor-pointer" onClick={() => toggleCuisine(cuisine)}>×</span>
            </Badge>
          ))}
          {selectedMealType && (
            <Badge variant="secondary" className="capitalize">
              {selectedMealType} <span className="ml-1 cursor-pointer" onClick={() => setSelectedMealType("")}>×</span>
            </Badge>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onAddToMealPlan={() => handleAddToMealPlan(recipe)}
                onViewDetails={() => handleViewDetails(recipe)}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <h3 className="text-xl font-medium mb-2">No recipes found</h3>
              <p className="text-muted-foreground">
                Try adjusting your filters or search term.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Recipe Detail Dialog */}
      <Dialog open={!!selectedRecipe} onOpenChange={() => setSelectedRecipe(null)}>
        <DialogContent className="max-w-3xl">
          {selectedRecipe && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedRecipe.title}</DialogTitle>
              </DialogHeader>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="aspect-video rounded-md overflow-hidden mb-4">
                    <img
                      src={selectedRecipe.image}
                      alt={selectedRecipe.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedRecipe.diets.map((diet) => (
                      <Badge key={diet} variant="outline" className="capitalize">
                        {diet}
                      </Badge>
                    ))}
                    {selectedRecipe.cuisines.map((cuisine) => (
                      <Badge key={cuisine} className="capitalize">
                        {cuisine}
                      </Badge>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center mb-4">
                    <div>
                      <p className="text-lg font-medium">{selectedRecipe.nutrients.calories}</p>
                      <p className="text-xs text-muted-foreground">Calories</p>
                    </div>
                    <div>
                      <p className="text-lg font-medium">{selectedRecipe.nutrients.protein}g</p>
                      <p className="text-xs text-muted-foreground">Protein</p>
                    </div>
                    <div>
                      <p className="text-lg font-medium">{selectedRecipe.nutrients.carbs}g</p>
                      <p className="text-xs text-muted-foreground">Carbs</p>
                    </div>
                    <div>
                      <p className="text-lg font-medium">{selectedRecipe.nutrients.fat}g</p>
                      <p className="text-xs text-muted-foreground">Fat</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Ingredients</h3>
                  <ul className="list-disc pl-5 space-y-1 mb-4">
                    {selectedRecipe.ingredients.map((ingredient, index) => (
                      <li key={index}>
                        {ingredient.amount} {ingredient.unit} {ingredient.name}
                      </li>
                    ))}
                  </ul>
                  
                  <h3 className="font-medium mb-2">Instructions</h3>
                  <ol className="list-decimal pl-5 space-y-2">
                    {selectedRecipe.instructions.map((step, index) => (
                      <li key={index} className="text-sm">{step}</li>
                    ))}
                  </ol>
                </div>
              </div>
              
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={() => setSelectedRecipe(null)}>
                  Close
                </Button>
                <Button onClick={() => handleAddToMealPlan(selectedRecipe)}>
                  Add to Meal Plan
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Recipes;
