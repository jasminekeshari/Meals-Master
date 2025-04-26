
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChefHat, ArrowRight, CheckCircle, Calendar, ShoppingCart, Bell, Heart } from "lucide-react";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <ChefHat className="h-6 w-6 text-primary" />
            <span className="font-semibold text-lg">MealMaster</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Log in
            </Link>
            <Button asChild size="sm">
              <Link to="/register">Sign Up</Link>
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-28 container">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="space-y-6 md:w-1/2 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight animate-fade-in">
                Your Personal <span className="text-primary">Meal Planning</span> Assistant
              </h1>
              <p className="text-xl text-muted-foreground max-w-[600px] animate-fade-in">
                Plan your meals, track your nutrition, and achieve your health goals with our all-in-one platform.
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <Button asChild size="lg">
                  <Link to="/register">Get Started <ArrowRight className="ml-2 h-5 w-5" /></Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/recipes">Explore Recipes</Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1543352634-a1c51d9f1fa7?q=80&w=600&auto=format&fit=crop"
                alt="Meal planning illustration" 
                className="w-full max-w-[500px] mx-auto rounded-xl shadow-lg"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-accent">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Meal Planning Made Easy</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="bg-background p-6 rounded-lg shadow-md border"
                >
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Showcase Section */}
        <section className="py-16 container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Delicious Meals Await</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="aspect-square rounded-xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=500&auto=format&fit=crop"
                alt="Pizza dish" 
                className="w-full h-full object-cover transition-transform hover:scale-105"
              />
            </div>
            <div className="aspect-square rounded-xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1574484284002-952d92456975?q=80&w=500&auto=format&fit=crop"
                alt="Indian curry" 
                className="w-full h-full object-cover transition-transform hover:scale-105"
              />
            </div>
            <div className="aspect-square rounded-xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=500&auto=format&fit=crop"
                alt="Healthy salad" 
                className="w-full h-full object-cover transition-transform hover:scale-105"
              />
            </div>
            <div className="aspect-square rounded-xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=500&auto=format&fit=crop"
                alt="Breakfast pancakes" 
                className="w-full h-full object-cover transition-transform hover:scale-105"
              />
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Meal Planning?</h2>
          <p className="text-xl text-muted-foreground max-w-[600px] mx-auto mb-8">
            Join thousands of users who have simplified their meal planning and improved their nutrition.
          </p>
          <Button asChild size="lg">
            <Link to="/register">Create Your Free Account</Link>
          </Button>
        </section>
      </main>

      <footer className="border-t py-6">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© 2025 MealMaster. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

const features = [
  {
    title: "Meal Planner",
    description: "Easily plan your weekly meals with our intuitive interface.",
    icon: <Calendar className="h-6 w-6 text-primary" />,
  },
  {
    title: "Comprehensive Recipe Database",
    description: "Browse thousands of recipes filtered by your dietary preferences and goals.",
    icon: <ChefHat className="h-6 w-6 text-primary" />,
  },
  {
    title: "Nutritional Tracking",
    description: "Monitor your calorie intake and macronutrients to stay on track with your goals.",
    icon: <CheckCircle className="h-6 w-6 text-primary" />,
  },
  {
    title: "Grocery List Generation",
    description: "Automatically create shopping lists based on your meal plan for the week.",
    icon: <ShoppingCart className="h-6 w-6 text-primary" />,
  },
  {
    title: "Meal Prep Reminders",
    description: "Never forget to prepare your meals with timely notifications.",
    icon: <Bell className="h-6 w-6 text-primary" />,
  },
  {
    title: "Personalized Recommendations",
    description: "Receive meal suggestions based on your preferences and dietary goals.",
    icon: <Heart className="h-6 w-6 text-primary" />,
  },
];

export default Index;
