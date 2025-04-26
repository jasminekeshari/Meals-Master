
import { MealPlanDay as MealPlanDayType } from "@/utils/dummyData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import MealItem from "./MealItem";
import { MealType } from "@/utils/mealPlanUtils";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface MealPlanDayProps {
  day: MealPlanDayType;
  onAddMeal: (dayId: string, mealType: MealType) => void;
  onRemoveMeal: (dayId: string, mealType: MealType, recipeId: string) => void;
}

const MealPlanDay = ({ day, onAddMeal, onRemoveMeal }: MealPlanDayProps) => {
  const { toast } = useToast();
  const [isLoggedIn] = useState(true); // For demo purposes, normally from auth context

  const handleAddClick = (mealType: MealType) => {
    if (!isLoggedIn) {
      toast({
        title: "Login Required",
        description: "Please log in to add meals to your plan",
        variant: "destructive"
      });
      return;
    }

    onAddMeal(day.id, mealType);
  };

  const renderMealSection = (title: string, mealType: MealType) => {
    const meals = day.meals[mealType] || [];
    
    return (
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm font-medium">{title}</h4>
          <button 
            onClick={() => handleAddClick(mealType)}
            className="text-xs text-primary hover:underline"
          >
            Add
          </button>
        </div>
        
        <div className="meal-container">
          {meals.length === 0 ? (
            <div className="text-center py-2 text-sm text-muted-foreground">
              No meals added yet
            </div>
          ) : (
            <ScrollArea className="h-[150px] pr-3">
              <div className="space-y-1">
                {meals.map((meal) => (
                  <MealItem 
                    key={meal.id} 
                    recipe={meal} 
                    mealType={mealType}
                    onRemove={() => onRemoveMeal(day.id, mealType, meal.id)} 
                  />
                ))}
              </div>
            </ScrollArea>
          )}
        </div>
      </div>
    );
  };

  return (
    <Card className="w-[280px] flex-shrink-0">
      <CardHeader className="pb-2">
        <CardTitle className="text-md">{day.day}</CardTitle>
        <p className="text-xs text-muted-foreground">{day.date}</p>
      </CardHeader>
      <CardContent>
        {renderMealSection("Breakfast", "breakfast")}
        <Separator className="my-2" />
        
        {renderMealSection("Lunch", "lunch")}
        <Separator className="my-2" />
        
        {renderMealSection("Dinner", "dinner")}
        <Separator className="my-2" />
        
        {renderMealSection("Snack", "snack")}
      </CardContent>
    </Card>
  );
};

export default MealPlanDay;
