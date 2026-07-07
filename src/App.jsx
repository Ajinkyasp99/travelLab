import React, { Suspense } from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import MainLayout from "./layouts/MainLayout";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { Loader2 } from "lucide-react";

// Lazy Loaded Pages
const Home = React.lazy(() => import("./pages/Home"));
const Login = React.lazy(() => import("./pages/Login"));
const Signup = React.lazy(() => import("./pages/Signup"));
const Hotels = React.lazy(() => import("./pages/Hotels"));
const HotelDetail = React.lazy(() => import("./pages/HotelDetail"));
const Flights = React.lazy(() => import("./pages/Flights"));
const Trains = React.lazy(() => import("./pages/Trains"));
const Buses = React.lazy(() => import("./pages/Buses"));
const Cabs = React.lazy(() => import("./pages/Cabs"));
const Packages = React.lazy(() => import("./pages/Packages"));
const HolidayPackagesPage = React.lazy(() => import("./pages/HolidayPackagesPage"));
const HolidayPackageDetailPage = React.lazy(() => import("./pages/HolidayPackageDetailPage"));
const HolidayPackageBookingPage = React.lazy(() => import("./pages/HolidayPackageBookingPage"));
const HolidayPackageEnquiryPage = React.lazy(() => import("./pages/HolidayPackageEnquiryPage"));
const Payment = React.lazy(() => import("./pages/Payment"));
const BookingConfirmation = React.lazy(() => import("./pages/BookingConfirmation"));
const MyTrips = React.lazy(() => import("./pages/MyTrips"));
const Profile = React.lazy(() => import("./pages/Profile"));
const AdminDashboard = React.lazy(() => import("./pages/AdminDashboard"));
const TestingPlayground = React.lazy(() => import("./pages/TestingPlayground"));
const DestinationDetail = React.lazy(() => import("./pages/DestinationDetail"));
const PrivacyPolicy = React.lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = React.lazy(() => import("./pages/TermsOfService"));
const ContactSupport = React.lazy(() => import("./pages/ContactSupport"));

// Sleek Loading Fallback
const PageLoader = () => (
  <div className="w-full h-[60vh] flex flex-col items-center justify-center">
    <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
    <p className="text-muted-foreground font-medium animate-pulse">Loading experience...</p>
  </div>
);

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
          <Route path="home" element={<Suspense fallback={<PageLoader />}><ProtectedRoute><Home /></ProtectedRoute></Suspense>} />
          <Route path="destinations/:name" element={<Suspense fallback={<PageLoader />}><ProtectedRoute><DestinationDetail /></ProtectedRoute></Suspense>} />
          <Route path="login" element={<Suspense fallback={<PageLoader />}><Login /></Suspense>} />
          <Route path="signup" element={<Suspense fallback={<PageLoader />}><Signup /></Suspense>} />
          
          <Route path="privacy" element={<Suspense fallback={<PageLoader />}><PrivacyPolicy /></Suspense>} />
          <Route path="terms" element={<Suspense fallback={<PageLoader />}><TermsOfService /></Suspense>} />
          <Route path="contact" element={<Suspense fallback={<PageLoader />}><ContactSupport /></Suspense>} />
          
          <Route path="hotels" element={<Suspense fallback={<PageLoader />}><ProtectedRoute><Hotels /></ProtectedRoute></Suspense>} />
          <Route path="hotels/:id" element={<Suspense fallback={<PageLoader />}><ProtectedRoute><HotelDetail /></ProtectedRoute></Suspense>} />
          <Route path="flights" element={<Suspense fallback={<PageLoader />}><ProtectedRoute><Flights /></ProtectedRoute></Suspense>} />
          <Route path="trains" element={<Suspense fallback={<PageLoader />}><ProtectedRoute><Trains /></ProtectedRoute></Suspense>} />
          <Route path="buses" element={<Suspense fallback={<PageLoader />}><ProtectedRoute><Buses /></ProtectedRoute></Suspense>} />
          <Route path="cabs" element={<Suspense fallback={<PageLoader />}><ProtectedRoute><Cabs /></ProtectedRoute></Suspense>} />
          <Route path="packages" element={<Suspense fallback={<PageLoader />}><ProtectedRoute><Packages /></ProtectedRoute></Suspense>} />
          
          <Route path="holiday-packages" element={<Suspense fallback={<PageLoader />}><ProtectedRoute><HolidayPackagesPage /></ProtectedRoute></Suspense>} />
          <Route path="holiday-packages/:packageId" element={<Suspense fallback={<PageLoader />}><ProtectedRoute><HolidayPackageDetailPage /></ProtectedRoute></Suspense>} />
          <Route path="holiday-packages/booking/:packageId" element={<Suspense fallback={<PageLoader />}><ProtectedRoute><HolidayPackageBookingPage /></ProtectedRoute></Suspense>} />
          <Route path="holiday-packages/enquiry/:packageId" element={<Suspense fallback={<PageLoader />}><ProtectedRoute><HolidayPackageEnquiryPage /></ProtectedRoute></Suspense>} />
          
          <Route path="payment" element={<Suspense fallback={<PageLoader />}><ProtectedRoute><Payment /></ProtectedRoute></Suspense>} />
          <Route path="booking-confirmation" element={<Suspense fallback={<PageLoader />}><ProtectedRoute><BookingConfirmation /></ProtectedRoute></Suspense>} />
          <Route path="my-trips" element={<Suspense fallback={<PageLoader />}><ProtectedRoute><MyTrips /></ProtectedRoute></Suspense>} />
          <Route path="profile" element={<Suspense fallback={<PageLoader />}><ProtectedRoute><Profile /></ProtectedRoute></Suspense>} />
          <Route path="admin" element={<Suspense fallback={<PageLoader />}><ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute></Suspense>} />
          <Route path="play" element={<Suspense fallback={<PageLoader />}><ProtectedRoute adminOnly><TestingPlayground /></ProtectedRoute></Suspense>} />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
