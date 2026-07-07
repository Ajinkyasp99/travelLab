import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const USERS_KEY = "travel_test_lab_users";
export const CURRENT_USER_KEY = "travel_test_lab_current_user";

const defaultUsers = [
  { id: 1, name: "Shweta", email: "shweta@tester.com", password: "Test@123", role: "User" },
  { id: 2, name: "Admin", email: "admin@tester.com", password: "Admin@123", role: "Admin" },
];

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Initialize users if not present or if they still have the old default users
    const existingUsers = localStorage.getItem(USERS_KEY);
    if (!existingUsers || existingUsers.includes("tester@example.com")) {
      localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers));
    }

    // Initialize mock bookings for tester
    const existingBookings = localStorage.getItem("travel_test_lab_bookings");
    if (!existingBookings) {
      const defaultBookings = [
        {
          id: "BKG-FL-492817",
          userId: 1,
          date: "2025-10-15T10:00:00Z",
          status: "Confirmed",
          amount: 15400,
          details: { type: "flight" }
        },
        {
          id: "BKG-HT-819234",
          userId: 1,
          date: "2025-11-05T14:30:00Z",
          status: "Confirmed",
          amount: 8500,
          details: { type: "hotel" }
        },
        {
          bookingId: "BKG-PKG-112233",
          userId: 1,
          bookingType: "holiday_package",
          packageTitle: "Enchanting Goa - 5 Days",
          destination: "Goa",
          travelDate: "2025-12-20T00:00:00Z",
          status: "Confirmed",
          totalAmount: 24000,
          travellers: [{ name: "Tester", age: 30, gender: "Male" }]
        }
      ];
      localStorage.setItem("travel_test_lab_bookings", JSON.stringify(defaultBookings));
    }

    // Initialize mock enquiries for admin dashboard
    const existingEnquiries = localStorage.getItem("travel_lab_package_enquiries");
    if (!existingEnquiries) {
      const defaultEnquiries = [
        {
          enquiryId: "ENQ-7391",
          packageId: "pkg4",
          packageTitle: "Dazzling Dubai - 5 Days",
          name: "John Doe",
          email: "john@example.com",
          phone: "9876543210",
          travelDate: "2026-01-15",
          travellers: 2,
          budget: 8000,
          status: "Pending"
        },
        {
          enquiryId: "ENQ-1928",
          packageId: "pkg1",
          packageTitle: "Enchanting Goa - 5 Days",
          name: "Jane Smith",
          email: "jane@example.com",
          phone: "9123456780",
          travelDate: "2026-02-10",
          travellers: 4,
          budget: 5000,
          status: "Responded"
        }
      ];
      localStorage.setItem("travel_lab_package_enquiries", JSON.stringify(defaultEnquiries));
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
