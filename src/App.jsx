import { HashRouter, Routes, Route } from "react-router-dom";
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
import { ProtectedRoute } from "./components/auth/ProtectedRoute";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="hotels" element={<Hotels />} />
          <Route path="hotels/:id" element={<HotelDetail />} />
          <Route path="flights" element={<Flights />} />
          <Route path="trains" element={<Trains />} />
          <Route path="buses" element={<Buses />} />
          <Route path="cabs" element={<Cabs />} />
          <Route path="packages" element={<Packages />} />
          
          <Route path="holiday-packages" element={<HolidayPackagesPage />} />
          <Route path="holiday-packages/:packageId" element={<HolidayPackageDetailPage />} />
          <Route path="holiday-packages/booking/:packageId" element={<ProtectedRoute><HolidayPackageBookingPage /></ProtectedRoute>} />
          <Route path="holiday-packages/enquiry/:packageId" element={<HolidayPackageEnquiryPage />} />
          
          
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
