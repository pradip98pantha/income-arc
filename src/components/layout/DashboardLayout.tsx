
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  HomeIcon, 
  BarChart3Icon, 
  WalletIcon, 
  PiggyBankIcon,
  SettingsIcon,
  LogOutIcon,
  UserIcon,
  SearchIcon,
  MenuIcon,
  XIcon
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const location = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: <HomeIcon size={18} /> },
    { path: "/expenses", label: "Expenses", icon: <WalletIcon size={18} /> },
    { path: "/income", label: "Income", icon: <PiggyBankIcon size={18} /> },
    { path: "/reports", label: "Reports", icon: <BarChart3Icon size={18} /> },
    { path: "/profile", label: "Profile", icon: <UserIcon size={18} /> },
    { path: "/settings", label: "Settings", icon: <SettingsIcon size={18} /> },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="border-b shadow-sm sticky top-0 z-10 bg-background">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <Sheet>
              <SheetTrigger asChild className="md:hidden mr-2">
                <Button variant="ghost" size="icon">
                  <MenuIcon className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64">
                <div className="py-4">
                  <h2 className="text-xl font-bold mb-6 px-4">ExpenseTracker</h2>
                  <nav className="space-y-1">
                    {navItems.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm ${
                          location.pathname === item.path
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"
                        }`}
                      >
                        {item.icon}
                        {item.label}
                      </Link>
                    ))}
                    <Link
                      to="/logout"
                      className="flex items-center gap-2 px-4 py-2 rounded-md text-sm text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"
                    >
                      <LogOutIcon size={18} />
                      Logout
                    </Link>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
            
            <Link to="/dashboard" className="text-xl font-bold">
              ExpenseTracker
            </Link>
          </div>
          
          <div className="hidden md:block flex-1 max-w-md mx-4">
            <div className="relative">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search expenses..."
                className="pl-8 w-full"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Mobile search icon */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="md:hidden"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <SearchIcon className="h-4 w-4" />
            </Button>

            <Link to="/profile" className="hidden sm:flex">
              <Button variant="ghost" size="sm" className="items-center gap-2">
                <UserIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Profile</span>
              </Button>
            </Link>
            <Link to="/logout">
              <Button variant="outline" size="sm" className="items-center gap-2">
                <LogOutIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Mobile search bar that shows when toggled */}
        {isSearchOpen && (
          <div className="md:hidden px-4 py-2 border-t">
            <div className="relative">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search expenses..."
                className="pl-8 w-full"
              />
            </div>
          </div>
        )}
      </header>
      
      <div className="flex flex-1">
        <aside className="w-56 border-r p-4 hidden md:block">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm ${
                  location.pathname === item.path
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>
        
        <main className="flex-1 p-4 md:p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
