
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Printer, Plus, X } from "lucide-react";
import { dummyGroceryList, GroceryItem } from "@/utils/dummyData";
import { generateGroceryList } from "@/utils/mealPlanUtils";

const categories = [
  "produce",
  "dairy",
  "meat",
  "seafood",
  "bakery",
  "grains",
  "canned goods",
  "frozen",
  "snacks",
  "beverages",
  "other",
];

const GroceryList = () => {
  const [groceryItems, setGroceryItems] = useState<GroceryItem[]>(dummyGroceryList);
  const [newItemName, setNewItemName] = useState("");
  const [newItemQuantity, setNewItemQuantity] = useState("1");
  const [newItemUnit, setNewItemUnit] = useState("");
  const [newItemCategory, setNewItemCategory] = useState("other");
  const { toast } = useToast();

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newItemName) return;
    
    const newItem: GroceryItem = {
      id: `item${Date.now()}`,
      name: newItemName,
      amount: Number(newItemQuantity) || 1,
      unit: newItemUnit,
      checked: false,
      category: newItemCategory,
    };
    
    setGroceryItems([...groceryItems, newItem]);
    setNewItemName("");
    setNewItemQuantity("1");
    setNewItemUnit("");
    
    toast({
      title: "Item added",
      description: `${newItem.name} has been added to your grocery list.`,
    });
  };

  const handleToggleItem = (id: string) => {
    setGroceryItems(
      groceryItems.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleRemoveItem = (id: string) => {
    setGroceryItems(groceryItems.filter((item) => item.id !== id));
    
    toast({
      title: "Item removed",
      description: "The item has been removed from your grocery list.",
    });
  };

  const handleClearChecked = () => {
    const checkedItems = groceryItems.filter((item) => item.checked);
    setGroceryItems(groceryItems.filter((item) => !item.checked));
    
    toast({
      title: "Items cleared",
      description: `${checkedItems.length} checked items have been removed.`,
    });
  };

  const handlePrint = () => {
    toast({
      title: "Printing grocery list",
      description: "Your grocery list is being prepared for printing.",
    });
    window.print();
  };

  // Group items by category
  const itemsByCategory: Record<string, GroceryItem[]> = {};
  
  groceryItems.forEach((item) => {
    if (!itemsByCategory[item.category]) {
      itemsByCategory[item.category] = [];
    }
    itemsByCategory[item.category].push(item);
  });

  // Sort categories alphabetically
  const sortedCategories = Object.keys(itemsByCategory).sort();
  
  return (
    <>
      <Navbar />
      <div className="container py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Grocery List</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handlePrint}>
              <Printer className="mr-2 h-4 w-4" /> Print List
            </Button>
            <Button variant="outline" onClick={handleClearChecked}>
              Clear Checked Items
            </Button>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Shopping List</CardTitle>
              </CardHeader>
              <CardContent>
                {sortedCategories.length > 0 ? (
                  <div className="space-y-6">
                    {sortedCategories.map((category) => (
                      <div key={category}>
                        <h3 className="font-medium capitalize mb-2">
                          {category}{" "}
                          <Badge variant="outline" className="ml-2">
                            {itemsByCategory[category].length}
                          </Badge>
                        </h3>
                        <div className="space-y-1.5">
                          {itemsByCategory[category].map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center p-2 rounded-md hover:bg-accent group"
                            >
                              <Checkbox
                                checked={item.checked}
                                onCheckedChange={() => handleToggleItem(item.id)}
                                className="mr-2"
                              />
                              <span
                                className={`flex-1 ${
                                  item.checked ? "line-through text-muted-foreground" : ""
                                }`}
                              >
                                <span>
                                  {item.amount} {item.unit} {item.name}
                                </span>
                              </span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => handleRemoveItem(item.id)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                        <Separator className="mt-3" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-12 text-center">
                    <p className="text-muted-foreground">Your grocery list is empty.</p>
                    <Button className="mt-4" asChild>
                      <a href="/meal-planner">Plan Meals</a>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Add Item</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddItem} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Item Name</label>
                    <Input
                      placeholder="e.g., Apples"
                      value={newItemName}
                      onChange={(e) => setNewItemName(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Quantity</label>
                      <Input
                        type="number"
                        min="0"
                        step="0.5"
                        placeholder="1"
                        value={newItemQuantity}
                        onChange={(e) => setNewItemQuantity(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Unit (optional)</label>
                      <Input
                        placeholder="e.g., lbs, pcs"
                        value={newItemUnit}
                        onChange={(e) => setNewItemUnit(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Category</label>
                    <select
                      className="w-full p-2 rounded-md border bg-transparent"
                      value={newItemCategory}
                      onChange={(e) => setNewItemCategory(e.target.value)}
                    >
                      {categories.map((category) => (
                        <option key={category} value={category} className="capitalize">
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <Button type="submit" className="w-full">
                    <Plus className="mr-2 h-4 w-4" /> Add to List
                  </Button>
                </form>
              </CardContent>
            </Card>
            
            <Card className="mt-6">
              <CardHeader className="pb-3">
                <CardTitle>Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Total Items:</span>
                    <span className="font-medium">{groceryItems.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Items Checked:</span>
                    <span className="font-medium">
                      {groceryItems.filter((item) => item.checked).length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Items Remaining:</span>
                    <span className="font-medium">
                      {groceryItems.filter((item) => !item.checked).length}
                    </span>
                  </div>
                  <Separator className="my-3" />
                  <div className="flex justify-between">
                    <span>Categories:</span>
                    <span className="font-medium">{sortedCategories.length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default GroceryList;
