import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Hotels from "./pages/Hotels";
import HotelDetail from "./pages/HotelDetail";
import Flights from "./pages/Flights";
import Trains from "./pages/Trains";
import Buses from "./pages/Buses";
import Cabs from "./pages/Cabs";
import Packages from "./pages/Packages";
import HolidayPackagesPage from "./pages/HolidayPackagesPage";
import HolidayPackageDetailPage from "./pages/HolidayPackageDetailPage";
import HolidayPackageBookingPage from "./pages/HolidayPackageBookingPage";
import HolidayPackageEnquiryPage from "./pages/HolidayPackageEnquiryPage";
import Payment from "./pages/Payment";
import BookingConfirmation from "./pages/BookingConfirmation";
import MyTrips from "./pages/MyTrips";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import TestingPlayground from "./pages/TestingPlayground";
import DestinationDetail from "./pages/DestinationDetail";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";

function IndexRoute() {
  const { currentUser } = useAuth();
  return currentUser ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />;
}

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<IndexRoute />} />
          <Route path="home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="destinations/:name" element={<ProtectedRoute><DestinationDetail /></ProtectedRoute>} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="hotels" element={<ProtectedRoute><Hotels /></ProtectedRoute>} />
          <Route path="hotels/:id" element={<ProtectedRoute><HotelDetail /></ProtectedRoute>} />
          <Route path="flights" element={<ProtectedRoute><Flights /></ProtectedRoute>} />
          <Route path="trains" element={<ProtectedRoute><Trains /></ProtectedRoute>} />
          <Route path="buses" element={<ProtectedRoute><Buses /></ProtectedRoute>} />
          <Route path="cabs" element={<ProtectedRoute><Cabs /></ProtectedRoute>} />
          <Route path="packages" element={<ProtectedRoute><Packages /></ProtectedRoute>} />
          
          <Route path="holiday-packages" element={<ProtectedRoute><HolidayPackagesPage /></ProtectedRoute>} />
          <Route path="holiday-packages/:packageId" element={<ProtectedRoute><HolidayPackageDetailPage /></ProtectedRoute>} />
          <Route path="holiday-packages/booking/:packageId" element={<ProtectedRoute><HolidayPackageBookingPage /></ProtectedRoute>} />
          <Route path="holiday-packages/enquiry/:packageId" element={<ProtectedRoute><HolidayPackageEnquiryPage /></ProtectedRoute>} />
          
          
          <Route path="payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
          <Route path="booking-confirmation" element={<ProtectedRoute><BookingConfirmation /></ProtectedRoute>} />
          <Route path="my-trips" element={<ProtectedRoute><MyTrips /></ProtectedRoute>} />
          <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="admin" element={<ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>} />
          
          <Route path="testing-playground" element={<TestingPlayground />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
