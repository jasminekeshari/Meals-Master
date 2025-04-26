
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import MealPlanner from "./pages/MealPlanner";
import Recipes from "./pages/Recipes";
import Profile from "./pages/Profile";
import GroceryList from "./pages/GroceryList";
import NotFound from "./pages/NotFound";

// Auth Pages
import LoginForm from "./components/Auth/LoginForm";
import RegisterForm from "./components/Auth/RegisterForm";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/meal-planner" element={<MealPlanner />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/grocery-list" element={<GroceryList />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
