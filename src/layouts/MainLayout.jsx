import { useState } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Menu, X } from "lucide-react";

export default function MainLayout() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setIsMobileMenuOpen(false);
  };

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-background sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <Link to="/" onClick={closeMenu} className="text-xl font-bold text-primary">TravelTestLab</Link>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-muted-foreground focus:outline-none" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">Home</Link>
            <Link to="/hotels" className="text-sm font-medium hover:text-primary transition-colors">Hotels</Link>
            <Link to="/flights" className="text-sm font-medium hover:text-primary transition-colors">Flights</Link>
            
            {currentUser ? (
              <div className="flex items-center gap-4 border-l pl-6">
                <Link to="/my-trips" className="text-sm font-medium hover:text-primary transition-colors">My Trips</Link>
                <Link to="/profile" className="text-sm text-muted-foreground ml-2 hover:text-primary transition-colors">Hi, {currentUser.name}</Link>
                {currentUser.role === 'Admin' && (
                  <Link to="/admin" className="text-sm font-medium text-primary hover:underline">Admin</Link>
                )}
                <button 
                  onClick={handleLogout}
                  data-testid="logout-button" 
                  className="text-sm font-medium hover:text-destructive transition-colors ml-2"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4 border-l pl-6">
                <Link to="/login" className="text-sm font-medium hover:text-primary transition-colors">Login</Link>
                <Link to="/signup" className="text-sm font-medium bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">Sign up</Link>
              </div>
            )}
          </nav>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-background border-t">
            <nav className="flex flex-col px-4 pt-2 pb-4 space-y-3">
              <Link to="/" onClick={closeMenu} className="text-base font-medium py-2 hover:text-primary border-b border-muted">Home</Link>
              <Link to="/hotels" onClick={closeMenu} className="text-base font-medium py-2 hover:text-primary border-b border-muted">Hotels</Link>
              <Link to="/flights" onClick={closeMenu} className="text-base font-medium py-2 hover:text-primary border-b border-muted">Flights</Link>
              
              {currentUser ? (
                <div className="flex flex-col pt-2 space-y-3">
                  <Link to="/my-trips" onClick={closeMenu} className="text-base font-medium py-2 hover:text-primary">My Trips</Link>
                  <Link to="/profile" onClick={closeMenu} className="text-base font-medium py-2 text-muted-foreground hover:text-primary">Profile (Hi, {currentUser.name})</Link>
                  {currentUser.role === 'Admin' && (
                    <Link to="/admin" onClick={closeMenu} className="text-base font-medium py-2 text-primary">Admin Dashboard</Link>
                  )}
                  <button 
                    onClick={handleLogout}
                    className="text-base font-medium text-left text-destructive py-2"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col pt-2 space-y-3">
                  <Link to="/login" onClick={closeMenu} className="text-base font-medium py-2 hover:text-primary">Login</Link>
                  <Link to="/signup" onClick={closeMenu} className="text-base font-medium bg-primary text-primary-foreground px-4 py-3 rounded-md text-center">Sign up</Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </header>
      <main className="flex-1 bg-muted/20">
        <Outlet />
      </main>
      <footer className="border-t bg-background py-8 mt-auto">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} TravelTestLab. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
