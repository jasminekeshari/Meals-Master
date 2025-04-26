
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { 
  Menu, 
  User, 
  ChefHat, 
  Calendar, 
  List, 
  ShoppingCart, 
  LogOut 
} from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { dummyUser } from "@/utils/dummyData";

const navItems = [
  { name: "Dashboard", path: "/dashboard", icon: <ChefHat className="h-5 w-5" /> },
  { name: "Meal Planner", path: "/meal-planner", icon: <Calendar className="h-5 w-5" /> },
  { name: "Recipes", path: "/recipes", icon: <List className="h-5 w-5" /> },
  { name: "Grocery List", path: "/grocery-list", icon: <ShoppingCart className="h-5 w-5" /> },
];

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLogout = () => {
    setIsLoggedIn(false);
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    });
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] sm:w-[300px]">
              <nav className="flex flex-col gap-4 mt-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent ${
                      location.pathname === item.path ? "bg-accent text-accent-foreground" : ""
                    }`}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                ))}
                {isLoggedIn && (
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent text-red-500"
                  >
                    <LogOut className="h-5 w-5" />
                    Logout
                  </button>
                )}
              </nav>
            </SheetContent>
          </Sheet>

          <Link to={isLoggedIn ? "/dashboard" : "/"} className="flex items-center gap-2">
            <ChefHat className="h-6 w-6 text-primary" />
            <span className="font-semibold text-lg hidden sm:inline-block">MealMaster</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`text-sm font-medium flex items-center gap-1 hover:text-primary transition-colors ${
                location.pathname === item.path ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-9 w-9 cursor-pointer">
                  <AvatarImage src={dummyUser.avatar} alt={dummyUser.name} />
                  <AvatarFallback>{dummyUser.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="cursor-pointer w-full">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="text-red-500 cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild>
              <Link to="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
