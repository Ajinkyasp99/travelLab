import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Eye, EyeOff } from "lucide-react";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    
    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    const result = signup(name, email, password);
    if (result.success) {
      navigate("/home");
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/80 to-black/60 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop" 
          alt="Travel Background" 
          className="w-full h-full object-cover" 
        />
      </div>

      {/* Glassmorphism Card */}
      <div className="w-full max-w-md relative z-10 glass rounded-3xl p-8 sm:p-10 shadow-2xl animate-fade-in-up">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black mb-2 text-foreground">Create Account</h2>
          <p className="text-sm text-foreground/70 font-medium">Join TravelTestLab and start your journey</p>
        </div>
        
        {error && (
          <div className="mb-6 p-4 bg-destructive/20 backdrop-blur-md text-destructive-foreground font-semibold rounded-xl text-sm border border-destructive/30 shadow-sm animate-pulse">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-bold mb-1.5 text-foreground/80 uppercase tracking-wider">Full Name</label>
            <input 
              type="text" 
              data-testid="signup-name-input" 
              className="w-full p-3.5 bg-background/50 backdrop-blur-sm border-2 border-transparent focus:border-secondary rounded-xl focus:outline-none focus:ring-4 focus:ring-secondary/20 transition-all font-medium text-foreground" 
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1.5 text-foreground/80 uppercase tracking-wider">Email</label>
            <input 
              type="email" 
              data-testid="signup-email-input" 
              className="w-full p-3.5 bg-background/50 backdrop-blur-sm border-2 border-transparent focus:border-secondary rounded-xl focus:outline-none focus:ring-4 focus:ring-secondary/20 transition-all font-medium text-foreground" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="name@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1.5 text-foreground/80 uppercase tracking-wider">Password</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                data-testid="signup-password-input" 
                className="w-full p-3.5 pr-12 bg-background/50 backdrop-blur-sm border-2 border-transparent focus:border-secondary rounded-xl focus:outline-none focus:ring-4 focus:ring-secondary/20 transition-all font-medium text-foreground"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/50 hover:text-secondary transition-colors focus:outline-none"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          <button 
            type="submit" 
            data-testid="signup-submit-button" 
            className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold p-4 rounded-xl shadow-soft hover-lift transition-all mt-4 text-lg"
          >
            Create My Account
          </button>
        </form>
        <div className="mt-8 text-center text-sm font-medium text-foreground/70">
          Already have an account? <Link to="/login" className="text-secondary font-bold hover:underline transition-all">Sign in</Link>
        </div>
      </div>
    </div>
  );
}
