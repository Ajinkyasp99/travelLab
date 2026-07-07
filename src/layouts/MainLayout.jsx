import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function MainLayout() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-background sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <Link to="/" className="text-xl font-bold text-primary">TravelTestLab</Link>
          <nav className="flex items-center space-x-6">
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
      </header>
      <main className="flex-1 bg-muted/20">
        <Outlet />
      </main>
      <footer className="border-t bg-background py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} TravelTestLab. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
