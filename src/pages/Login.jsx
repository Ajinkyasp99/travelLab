import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from && location.state.from.pathname !== "/" ? location.state.from : "/home";

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    const result = login(email, password);
    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-black/60 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop" 
          alt="Travel Background" 
          className="w-full h-full object-cover" 
        />
      </div>

      {/* Glassmorphism Card */}
      <div className="w-full max-w-md relative z-10 glass rounded-3xl p-8 sm:p-10 shadow-2xl animate-fade-in-up">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black mb-2 text-foreground">Welcome Back</h2>
          <p className="text-sm text-foreground/70 font-medium">Enter your credentials to access your account</p>
        </div>
        
        {error && (
          <div className="mb-6 p-4 bg-destructive/20 backdrop-blur-md text-destructive-foreground font-semibold rounded-xl text-sm border border-destructive/30 shadow-sm animate-pulse">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-bold mb-1.5 text-foreground/80 uppercase tracking-wider">Email</label>
            <input 
              type="email" 
              data-testid="login-email-input" 
              className="w-full p-3.5 bg-background/50 backdrop-blur-sm border-2 border-transparent focus:border-primary rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all font-medium text-foreground" 
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
                data-testid="login-password-input" 
                className="w-full p-3.5 pr-12 bg-background/50 backdrop-blur-sm border-2 border-transparent focus:border-primary rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all font-medium text-foreground"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/50 hover:text-primary transition-colors focus:outline-none"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          <button 
            type="submit" 
            data-testid="login-submit-button" 
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold p-4 rounded-xl shadow-glow hover-lift transition-all mt-4 text-lg"
          >
            Sign In To Your Account
          </button>
        </form>
        <div className="mt-8 text-center text-sm font-medium text-foreground/70">
          Don't have an account? <Link to="/signup" className="text-primary font-bold hover:underline transition-all">Create one now</Link>
        </div>
      </div>
    </div>
  );
}
