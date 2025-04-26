
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface NutritionSummary {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface NutritionChartProps {
  data: NutritionSummary;
  goals?: NutritionSummary;
  title?: string;
  description?: string;
}

const NutritionChart = ({
  data,
  goals,
  title = "Nutritional Summary",
  description = "Daily macronutrients and calories",
}: NutritionChartProps) => {
  
  const chartData = [
    {
      name: "Calories",
      current: data.calories,
      goal: goals?.calories || 0,
      unit: "kcal",
    },
    {
      name: "Protein",
      current: data.protein,
      goal: goals?.protein || 0,
      unit: "g",
    },
    {
      name: "Carbs",
      current: data.carbs,
      goal: goals?.carbs || 0,
      unit: "g",
    },
    {
      name: "Fat",
      current: data.fat,
      goal: goals?.fat || 0,
      unit: "g",
    },
  ];

  const tooltipFormatter = (value: number, name: string, props: any) => {
    const unit = props.payload.unit;
    return [`${value} ${unit}`, name === "current" ? "Current" : "Goal"];
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={tooltipFormatter} />
              <Legend />
              <Bar dataKey="current" name="Current" fill="#10b981" />
              {goals && <Bar dataKey="goal" name="Goal" fill="#6366f1" />}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default NutritionChart;
