import { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Menu, X, LogOut, ChevronDown, User, Plane, Hotel, Train, Bus, Car, Briefcase, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MainLayout() {
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check initial theme preference
    if (localStorage.getItem('travel_theme') === 'dark' || 
        (!localStorage.getItem('travel_theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('travel_theme', 'light');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('travel_theme', 'dark');
      setIsDarkMode(true);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
    setIsProfileDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  const closeMenu = () => setIsMobileMenuOpen(false);

  const navLinks = [
    { name: "Home", path: "/home", icon: Plane }
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-primary/30 selection:text-primary">
      
      {/* Modern Floating Navbar */}
      <div className="sticky top-4 z-50 px-4 transition-all duration-300">
        <nav className="glass mx-auto max-w-7xl rounded-full border border-white/20 shadow-lg px-6 py-3 flex items-center justify-between bg-white/70 dark:bg-black/50 backdrop-blur-xl">
          
          <Link to="/home" className="flex items-center gap-2 group">
            <div className="bg-gradient-to-br from-primary to-secondary p-2 rounded-xl text-white shadow-md group-hover:shadow-primary/50 transition-all duration-300 group-hover:scale-105">
              <Plane size={24} className="group-hover:animate-bounce" />
            </div>
            <span className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-tight">
              TravelTestLab
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1 bg-muted/50 p-1 rounded-full border border-border/50">
            {navLinks.map(link => {
              const isActive = location.pathname.startsWith(link.path);
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full font-bold text-sm transition-all duration-300 ${
                    isActive 
                      ? 'bg-white dark:bg-black text-primary shadow-sm scale-105 border border-black/5 dark:border-white/10' 
                      : 'text-foreground/70 hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                >
                  <Icon size={16} className={isActive ? 'text-primary' : ''} />
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full bg-muted/50 text-foreground hover:bg-muted transition-all mr-1"
              title="Toggle Theme"
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {currentUser ? (
              <div className="flex items-center gap-3 border-l border-border/50 pl-3">
                <Link 
                  to="/my-trips" 
                  className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${location.pathname.startsWith('/my-trips') ? 'bg-primary/10 text-primary' : 'text-foreground/70 hover:bg-muted hover:text-foreground'}`}
                >
                  My Bookings
                </Link>
                
                {currentUser.role === 'Admin' && (
                  <Link 
                    to="/admin" 
                    className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${location.pathname.startsWith('/admin') ? 'bg-primary/10 text-primary' : 'text-foreground/70 hover:bg-muted hover:text-foreground'}`}
                  >
                    Admin
                  </Link>
                )}
                
                <div className="relative">
                  <button 
                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                    className="flex items-center gap-2 pl-2 pr-4 py-1.5 bg-muted/50 rounded-full border hover:bg-muted transition-all"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                      {currentUser.name?.charAt(0) || "U"}
                    </div>
                    <span className="text-sm font-bold max-w-[100px] truncate">{currentUser.name?.split(' ')[0]}</span>
                    <ChevronDown size={14} className="text-muted-foreground" />
                  </button>
                  
                  {isProfileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-background rounded-2xl shadow-xl border overflow-hidden animate-fade-in-up">
                      <div className="p-3 border-b bg-muted/30">
                        <p className="font-bold text-sm">{currentUser.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{currentUser.email}</p>
                      </div>
                      <div className="p-2">
                        <Link 
                          to="/profile" 
                          className="flex items-center gap-2 px-3 py-2 text-sm rounded-xl hover:bg-muted transition-all text-foreground/80 font-medium"
                          onClick={() => setIsProfileDropdownOpen(false)}
                        >
                          <User size={16} /> Profile
                        </Link>
                        <button 
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-xl hover:bg-destructive/10 text-destructive transition-all font-medium mt-1"
                        >
                          <LogOut size={16} /> Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 pl-3 border-l border-border/50">
                <Link to="/login">
                  <Button variant="ghost" className="rounded-full font-bold">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button className="rounded-full font-bold bg-gradient-to-r from-primary to-secondary border-0 shadow-lg hover:shadow-primary/50 hover:scale-105 transition-all">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-2 text-foreground focus:outline-none bg-muted/50 rounded-full" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-background/95 backdrop-blur-xl pt-24 pb-6 px-6 flex flex-col overflow-y-auto">
          <nav className="flex flex-col gap-2 flex-1">
            {navLinks.map(link => {
              const active = location.pathname.startsWith(link.path);
              const Icon = link.icon;
              return (
                <Link 
                  key={link.name}
                  to={link.path} 
                  onClick={closeMenu}
                  className={`flex items-center gap-3 p-4 rounded-2xl font-bold text-lg transition-all ${active ? 'bg-primary/10 text-primary' : 'hover:bg-muted'}`}
                >
                  <Icon size={20} className={active ? 'text-primary' : 'text-muted-foreground'} />
                  {link.name}
                </Link>
              );
            })}
            
            <div className="mt-4 pt-4 border-t">
              {currentUser ? (
                <div className="flex flex-col gap-2">
                  <Link 
                    to="/my-trips" 
                    onClick={closeMenu}
                    className={`flex items-center gap-3 p-4 rounded-2xl font-bold text-lg transition-all ${location.pathname.startsWith('/my-trips') ? 'bg-primary/10 text-primary' : 'hover:bg-muted'}`}
                  >
                    <Briefcase size={20} className={location.pathname.startsWith('/my-trips') ? 'text-primary' : 'text-muted-foreground'} />
                    My Bookings
                  </Link>
                  
                  {currentUser.role === 'Admin' && (
                    <Link 
                      to="/admin" 
                      onClick={closeMenu}
                      className={`p-4 rounded-2xl font-bold text-lg transition-all ${location.pathname.startsWith('/admin') ? 'bg-primary/10 text-primary' : 'hover:bg-muted'}`}
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  
                  <Link 
                    to="/profile" 
                    onClick={closeMenu}
                    className={`p-4 rounded-2xl font-bold text-lg transition-all ${location.pathname.startsWith('/profile') ? 'bg-primary/10 text-primary' : 'hover:bg-muted'}`}
                  >
                    Profile
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center gap-3 p-4 rounded-2xl font-bold text-lg text-destructive hover:bg-destructive/10 text-left w-full mt-2"
                  >
                    <LogOut size={20} />
                    Logout
                  </button>
                  
                  {/* Mobile Theme Toggle */}
                  <button 
                    onClick={toggleTheme}
                    className="flex items-center gap-3 p-4 rounded-2xl font-bold text-lg text-foreground hover:bg-muted text-left w-full mt-2 border border-border"
                  >
                    {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                    {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-3 mt-2">
                  <Link to="/login" onClick={closeMenu}>
                    <Button variant="outline" className="w-full h-12 rounded-xl text-lg font-bold">Login</Button>
                  </Link>
                  <Link to="/signup" onClick={closeMenu}>
                    <Button className="w-full h-12 rounded-xl text-lg font-bold bg-gradient-to-r from-primary to-secondary border-0">Sign Up</Button>
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 w-full relative z-10 pt-4">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-muted py-12 mt-auto border-t">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Plane size={24} className="text-primary" />
            <span className="text-2xl font-black tracking-tight">TravelTestLab</span>
          </div>
          <p className="text-muted-foreground font-medium mb-8 max-w-md mx-auto">
            Your premium platform for testing automated UI and booking flows.
          </p>
          <div className="flex justify-center gap-6 text-sm font-medium text-foreground/60">
            <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
            <Link to="/contact" className="hover:text-primary transition-colors">Contact Support</Link>
          </div>
          <div className="mt-12 text-sm text-muted-foreground/60">
            © {new Date().getFullYear()} TravelTestLab. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
