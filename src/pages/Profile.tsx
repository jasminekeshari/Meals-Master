
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { dummyUser } from "@/utils/dummyData";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LogOut } from "lucide-react";

const dietaryOptions = [
  { id: "vegetarian", label: "Vegetarian" },
  { id: "vegan", label: "Vegan" },
  { id: "gluten-free", label: "Gluten Free" },
  { id: "dairy-free", label: "Dairy Free" },
  { id: "keto", label: "Keto" },
  { id: "paleo", label: "Paleo" },
  { id: "pescatarian", label: "Pescatarian" },
];

const cuisineOptions = [
  { id: "italian", label: "Italian" },
  { id: "mexican", label: "Mexican" },
  { id: "asian", label: "Asian" },
  { id: "mediterranean", label: "Mediterranean" },
  { id: "american", label: "American" },
  { id: "indian", label: "Indian" },
  { id: "greek", label: "Greek" },
  { id: "japanese", label: "Japanese" },
  { id: "chinese", label: "Chinese" },
];

const personalInfoSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
});

const dietaryPrefsSchema = z.object({
  calorieGoal: z.number().min(1000).max(5000),
  proteinGoal: z.number().min(30).max(250),
  carbsGoal: z.number().min(50).max(500),
  fatGoal: z.number().min(20).max(150),
  dietaryRestrictions: z.array(z.string()),
  cuisinePreferences: z.array(z.string()),
});

type PersonalInfoValues = z.infer<typeof personalInfoSchema>;
type DietaryPrefsValues = z.infer<typeof dietaryPrefsSchema>;

const Profile = () => {
  const [dietaryRestrictions, setDietaryRestrictions] = useState(
    dummyUser.preferences.dietaryRestrictions
  );
  const [cuisinePreferences, setCuisinePreferences] = useState(
    dummyUser.preferences.cuisinePreferences
  );
  const navigate = useNavigate();
  const { toast } = useToast();

  const personalInfoForm = useForm<PersonalInfoValues>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      name: dummyUser.name,
      email: dummyUser.email,
    },
  });

  const dietaryPrefsForm = useForm<DietaryPrefsValues>({
    resolver: zodResolver(dietaryPrefsSchema),
    defaultValues: {
      calorieGoal: dummyUser.preferences.calorieGoal,
      proteinGoal: dummyUser.preferences.macros.protein,
      carbsGoal: dummyUser.preferences.macros.carbs,
      fatGoal: dummyUser.preferences.macros.fat,
      dietaryRestrictions: dummyUser.preferences.dietaryRestrictions,
      cuisinePreferences: dummyUser.preferences.cuisinePreferences,
    },
  });

  const onPersonalInfoSubmit = (data: PersonalInfoValues) => {
    toast({
      title: "Personal information updated",
      description: "Your personal information has been saved.",
    });
  };

  const onDietaryPrefsSubmit = (data: DietaryPrefsValues) => {
    toast({
      title: "Profile updated",
      description: "Your preferences have been saved.",
    });
  };

  const toggleDietaryRestriction = (value: string) => {
    setDietaryRestrictions((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
    
    const currentValues = dietaryPrefsForm.getValues().dietaryRestrictions;
    const newValues = currentValues.includes(value)
      ? currentValues.filter(item => item !== value)
      : [...currentValues, value];
    
    dietaryPrefsForm.setValue('dietaryRestrictions', newValues);
  };

  const toggleCuisinePreference = (value: string) => {
    setCuisinePreferences((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
    
    const currentValues = dietaryPrefsForm.getValues().cuisinePreferences;
    const newValues = currentValues.includes(value)
      ? currentValues.filter(item => item !== value)
      : [...currentValues, value];
    
    dietaryPrefsForm.setValue('cuisinePreferences', newValues);
  };
  
  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    });
    navigate("/");
  };

  return (
    <>
      <Navbar />
      <div className="container py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Profile Settings</h1>
          <Button variant="outline" className="gap-2 text-red-500" onClick={handleLogout}>
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your account settings</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={dummyUser.avatar} alt={dummyUser.name} />
                <AvatarFallback>{dummyUser.name.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <Button variant="outline" size="sm" className="mb-6">
                Change Photo
              </Button>
              
              <Form {...personalInfoForm}>
                <form onSubmit={personalInfoForm.handleSubmit(onPersonalInfoSubmit)} className="space-y-4 w-full">
                  <FormField
                    control={personalInfoForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={personalInfoForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full">
                    Save Changes
                  </Button>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex justify-center border-t pt-6">
              <Button variant="destructive" size="sm" onClick={handleLogout} className="w-full">
                <LogOut className="mr-2 h-4 w-4" /> Logout
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Dietary Preferences</CardTitle>
              <CardDescription>Set your dietary preferences and goals</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...dietaryPrefsForm}>
                <form onSubmit={dietaryPrefsForm.handleSubmit(onDietaryPrefsSubmit)} className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Nutrition Goals</h3>
                    <div className="space-y-6">
                      <FormField
                        control={dietaryPrefsForm.control}
                        name="calorieGoal"
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex justify-between items-center">
                              <FormLabel>Daily Calorie Goal</FormLabel>
                              <span className="text-sm">{field.value} kcal</span>
                            </div>
                            <FormControl>
                              <Slider
                                defaultValue={[field.value]}
                                max={5000}
                                min={1000}
                                step={50}
                                onValueChange={(values) => field.onChange(values[0])}
                              />
                            </FormControl>
                            <FormDescription>
                              Recommended range: 1500-3000 kcal
                            </FormDescription>
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <FormField
                          control={dietaryPrefsForm.control}
                          name="proteinGoal"
                          render={({ field }) => (
                            <FormItem>
                              <div className="flex justify-between items-center">
                                <FormLabel>Protein</FormLabel>
                                <span className="text-sm">{field.value}g</span>
                              </div>
                              <FormControl>
                                <Slider
                                  defaultValue={[field.value]}
                                  max={250}
                                  min={30}
                                  step={5}
                                  onValueChange={(values) => field.onChange(values[0])}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={dietaryPrefsForm.control}
                          name="carbsGoal"
                          render={({ field }) => (
                            <FormItem>
                              <div className="flex justify-between items-center">
                                <FormLabel>Carbs</FormLabel>
                                <span className="text-sm">{field.value}g</span>
                              </div>
                              <FormControl>
                                <Slider
                                  defaultValue={[field.value]}
                                  max={500}
                                  min={50}
                                  step={10}
                                  onValueChange={(values) => field.onChange(values[0])}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={dietaryPrefsForm.control}
                          name="fatGoal"
                          render={({ field }) => (
                            <FormItem>
                              <div className="flex justify-between items-center">
                                <FormLabel>Fat</FormLabel>
                                <span className="text-sm">{field.value}g</span>
                              </div>
                              <FormControl>
                                <Slider
                                  defaultValue={[field.value]}
                                  max={150}
                                  min={20}
                                  step={5}
                                  onValueChange={(values) => field.onChange(values[0])}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Dietary Restrictions</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-y-2 gap-x-4">
                      {dietaryOptions.map((option) => (
                        <div key={option.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={option.id}
                            checked={dietaryRestrictions.includes(option.id)}
                            onCheckedChange={() => toggleDietaryRestriction(option.id)}
                          />
                          <label
                            htmlFor={option.id}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Cuisine Preferences</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-y-2 gap-x-4">
                      {cuisineOptions.map((option) => (
                        <div key={option.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={`cuisine-${option.id}`}
                            checked={cuisinePreferences.includes(option.id)}
                            onCheckedChange={() => toggleCuisinePreference(option.id)}
                          />
                          <label
                            htmlFor={`cuisine-${option.id}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit">Save Preferences</Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Profile;
