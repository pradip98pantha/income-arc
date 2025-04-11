
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon, LogInIcon, UserPlusIcon } from "lucide-react";

interface MainLayoutProps {
  children: React.ReactNode;
  showAuth?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({ 
  children,
  showAuth = true 
}) => {
  const [theme, setTheme] = React.useState<"light" | "dark">("light");
  
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">
            ExpenseTracker
          </Link>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <MoonIcon className="h-5 w-5" />
              ) : (
                <SunIcon className="h-5 w-5" />
              )}
            </Button>
            
            {showAuth && (
              <>
                <Link to="/login">
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <LogInIcon className="h-4 w-4" />
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm" className="flex items-center gap-2">
                    <UserPlusIcon className="h-4 w-4" />
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">{children}</main>
      <footer className="border-t mt-auto py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} ExpenseTracker. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
