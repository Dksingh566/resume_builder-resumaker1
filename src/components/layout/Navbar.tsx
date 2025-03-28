
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Menu, X, User, LogOut, FileCheck, Settings } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  useEffect(() => {
    // Close mobile menu when route changes
    setMobileMenuOpen(false);
  }, [location.pathname]);
  
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 px-4 transition-all duration-300 ${
        isScrolled 
          ? "py-2 glass shadow-sm" 
          : "py-4 bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex items-center">
            <div className="bg-primary text-white p-1.5 rounded-md mr-2 transform hover:rotate-12 transition-all duration-300">
              <FileCheck className="h-4 w-4" />
            </div>
            <span className="text-xl font-semibold font-display bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent hover:from-primary/70 hover:to-primary transition-all duration-500">
              Resumaker
            </span>
          </div>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex items-center gap-6">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors relative ${
                location.pathname === "/" 
                  ? "text-foreground" 
                  : "text-foreground/80 hover:text-foreground"
              }`}
            >
              <span>Home</span>
              {location.pathname === "/" && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full"></span>
              )}
            </Link>
            <Link 
              to="/templates" 
              className={`text-sm font-medium transition-colors relative ${
                location.pathname === "/templates" 
                  ? "text-foreground" 
                  : "text-foreground/80 hover:text-foreground"
              }`}
            >
              <span>Templates</span>
              {location.pathname === "/templates" && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full"></span>
              )}
            </Link>
            <Link 
              to="/pricing" 
              className={`text-sm font-medium transition-colors relative ${
                location.pathname === "/pricing" 
                  ? "text-foreground" 
                  : "text-foreground/80 hover:text-foreground"
              }`}
            >
              <span>Pricing</span>
              {location.pathname === "/pricing" && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full"></span>
              )}
            </Link>
          </nav>
          
          <div className="flex items-center gap-3">
            <ThemeToggle />
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="rounded-full">
                    <User className="h-4 w-4 mr-2" />
                    Account
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/builder" className="cursor-pointer w-full">
                      <FileCheck className="h-4 w-4 mr-2" />
                      My Resumes
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings" className="cursor-pointer w-full">
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut} className="text-destructive focus:text-destructive cursor-pointer">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/login">Log in</Link>
                </Button>
                <Button size="sm" asChild className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary transition-all duration-300">
                  <Link to="/signup">Sign up</Link>
                </Button>
              </>
            )}
          </div>
        </div>
        
        <div className="flex md:hidden items-center gap-3">
          <ThemeToggle />
          {user ? (
            <Button 
              variant="outline" 
              size="icon"
              className="rounded-full"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X /> : <User />}
            </Button>
          ) : (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </Button>
          )}
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-16 bg-background/95 backdrop-blur-sm z-40 flex flex-col md:hidden animate-fade-in">
          <div className="container mx-auto px-4 py-8 flex flex-col gap-6">
            <nav className="flex flex-col gap-4">
              <Link 
                to="/" 
                className={`text-lg font-medium py-2 ${
                  location.pathname === "/" 
                    ? "text-primary" 
                    : "hover:text-primary transition-colors"
                }`}
              >
                Home
              </Link>
              <Link 
                to="/templates" 
                className={`text-lg font-medium py-2 ${
                  location.pathname === "/templates" 
                    ? "text-primary" 
                    : "hover:text-primary transition-colors"
                }`}
              >
                Templates
              </Link>
              <Link 
                to="/pricing" 
                className={`text-lg font-medium py-2 ${
                  location.pathname === "/pricing" 
                    ? "text-primary" 
                    : "hover:text-primary transition-colors"
                }`}
              >
                Pricing
              </Link>
            </nav>
            
            <div className="flex flex-col gap-3 mt-4">
              {user ? (
                <>
                  <Link to="/builder" className="flex items-center gap-2 p-2 hover:bg-muted rounded-md">
                    <FileCheck className="h-5 w-5 text-primary" />
                    <span>My Resumes</span>
                  </Link>
                  <Link to="/settings" className="flex items-center gap-2 p-2 hover:bg-muted rounded-md">
                    <Settings className="h-5 w-5 text-primary" />
                    <span>Settings</span>
                  </Link>
                  <Button variant="outline" className="mt-2" onClick={signOut}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" asChild>
                    <Link to="/login">
                      Log in
                    </Link>
                  </Button>
                  <Button asChild>
                    <Link to="/signup">
                      Sign up
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
