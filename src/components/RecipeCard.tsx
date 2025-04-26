
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Recipe } from "@/utils/dummyData";
import { Clock, Heart, Plus, Utensils } from "lucide-react";
import { useState } from "react";

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

// Function to determine image based on recipe title or type
const getImageForRecipe = (recipe: Recipe): string => {
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

interface RecipeCardProps {
  recipe: Recipe;
  onAddToMealPlan?: () => void;
  onViewDetails?: () => void;
}

const RecipeCard = ({ recipe, onAddToMealPlan, onViewDetails }: RecipeCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <Card className="meal-card overflow-hidden transition-transform duration-300 hover:-translate-y-1">
      <div className="relative aspect-video">
        <img
          src={getImageForRecipe(recipe)}
          alt={recipe.title}
          className="object-cover w-full h-full"
        />
        <div className="absolute top-2 right-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className={`rounded-full ${isFavorite ? 'bg-white text-red-500' : 'bg-white/70 hover:bg-white text-primary'}`}
            onClick={handleFavoriteClick}
          >
            <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
          </Button>
        </div>
        {recipe.diets.length > 0 && (
          <div className="absolute bottom-2 left-2">
            <Badge variant="secondary" className="capitalize">
              {recipe.diets[0]}
            </Badge>
          </div>
        )}
      </div>

      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-lg font-semibold truncate">{recipe.title}</CardTitle>
      </CardHeader>

      <CardContent className="p-4 pt-0">
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{recipe.readyInMinutes} min</span>
          </div>
          <div className="flex items-center gap-1">
            <Utensils className="h-4 w-4" />
            <span>{recipe.servings} servings</span>
          </div>
        </div>

        <div className="flex justify-between text-xs text-muted-foreground mt-3">
          <div className="text-center">
            <div className="font-medium text-foreground">{recipe.nutrients.calories}</div>
            <div>calories</div>
          </div>
          <div className="text-center">
            <div className="font-medium text-foreground">{recipe.nutrients.protein}g</div>
            <div>protein</div>
          </div>
          <div className="text-center">
            <div className="font-medium text-foreground">{recipe.nutrients.carbs}g</div>
            <div>carbs</div>
          </div>
          <div className="text-center">
            <div className="font-medium text-foreground">{recipe.nutrients.fat}g</div>
            <div>fat</div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-2 flex gap-2">
        <Button variant="ghost" className="w-1/2 h-9" onClick={onViewDetails}>
          View Details
        </Button>
        <Button 
          variant="default" 
          className="w-1/2 h-9" 
          onClick={onAddToMealPlan}
        >
          <Plus className="h-4 w-4 mr-1" /> Add
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RecipeCard;
