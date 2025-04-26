
import { Recipe } from "@/utils/dummyData";
import { MealType, getMealTypeColor } from "@/utils/mealPlanUtils";
import { X } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface MealItemProps {
  recipe: Recipe;
  mealType: MealType;
  onRemove: () => void;
}

// Function to determine short recipe name if too long
const getDisplayName = (title: string): string => {
  if (title.length > 25) {
    return `${title.substring(0, 22)}...`;
  }
  return title;
};

const MealItem = ({ recipe, mealType, onRemove }: MealItemProps) => {
  return (
    <div className={`meal-item ${getMealTypeColor(mealType)} rounded-md p-3 mb-2 group`}>
      <div className="flex justify-between items-start">
        <div className="flex-1 min-w-0"> {/* min-width helps avoid overflow */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <h5 className="font-medium text-sm truncate max-w-[200px]">
                  {getDisplayName(recipe.title)}
                </h5>
              </TooltipTrigger>
              <TooltipContent>
                <p>{recipe.title}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <div className="flex gap-2 text-xs text-muted-foreground mt-1">
            <span>{recipe.nutrients.calories} cal</span>
            <span>{recipe.readyInMinutes} min</span>
          </div>
        </div>
        <button 
          onClick={onRemove}
          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-muted rounded-full"
        >
          <X className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
};

export default MealItem;
