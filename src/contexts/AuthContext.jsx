import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const USERS_KEY = "travel_test_lab_users";
export const CURRENT_USER_KEY = "travel_test_lab_current_user";

const defaultUsers = [
  { id: 1, name: "Tester", email: "tester@example.com", password: "Test@123", role: "User" },
  { id: 2, name: "Admin", email: "admin@example.com", password: "Admin@123", role: "Admin" },
];

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Initialize users if not present
    const existingUsers = localStorage.getItem(USERS_KEY);
    if (!existingUsers) {
      localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers));
    }

    // Check for logged in user
    const savedUser = localStorage.getItem(CURRENT_USER_KEY);
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    
    setIsLoaded(true);
  }, []);

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      const userSession = { id: user.id, name: user.name, email: user.email, role: user.role };
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userSession));
      setCurrentUser(userSession);
      return { success: true };
    }
    return { success: false, message: "Invalid email or password" };
  };

  const signup = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
    
    if (users.some(u => u.email === email)) {
      return { success: false, message: "Email already exists" };
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      role: "User"
    };

    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    
    // Auto login
    const userSession = { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role };
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userSession));
    setCurrentUser(userSession);
    
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem(CURRENT_USER_KEY);
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, signup, logout, isLoaded }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
