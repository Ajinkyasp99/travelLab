import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      navigate("/");
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="container mx-auto py-12 px-4 flex justify-center">
      <div className="w-full max-w-md p-6 bg-card rounded-xl border shadow-sm">
        <h2 className="text-2xl font-bold text-center mb-2">Create an Account</h2>
        <p className="text-sm text-center text-muted-foreground mb-6">Join TravelTestLab today</p>
        
        {error && (
          <div className="mb-4 p-3 bg-destructive/15 text-destructive rounded-md text-sm border border-destructive/20">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input 
              type="text" 
              data-testid="signup-name-input" 
              className="w-full p-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50" 
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input 
              type="email" 
              data-testid="signup-email-input" 
              className="w-full p-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50" 
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input 
              type="password" 
              data-testid="signup-password-input" 
              className="w-full p-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <button 
            type="submit" 
            data-testid="signup-submit-button" 
            className="w-full bg-primary text-primary-foreground font-medium p-2.5 rounded-md hover:bg-primary/90 transition-colors"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account? <Link to="/login" className="text-primary font-medium hover:underline">Login</Link>
        </div>
      </div>
    </div>
  );
}
