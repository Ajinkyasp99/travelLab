import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, CreditCard, Activity, DollarSign, Package, MessageSquare } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ users: 0, bookings: 0, revenue: 0, pkgBookings: 0, enquiries: 0, pkgRevenue: 0 });
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [pkgBookings, setPkgBookings] = useState([]);

  useEffect(() => {
    const allUsers = JSON.parse(localStorage.getItem("travel_test_lab_users") || "[]");
    const allBookings = JSON.parse(localStorage.getItem("travel_test_lab_bookings") || "[]");
    const allEnquiries = JSON.parse(localStorage.getItem("travel_lab_package_enquiries") || "[]");
    
    const standardBookings = allBookings.filter(b => b.bookingType !== 'holiday_package');
    const packageBookingsList = allBookings.filter(b => b.bookingType === 'holiday_package');
    
    setUsers(allUsers);
    setBookings(standardBookings);
    setEnquiries(allEnquiries);
    setPkgBookings(packageBookingsList);
    
    setStats({
      users: allUsers.length,
      bookings: standardBookings.length,
      revenue: standardBookings.reduce((sum, b) => sum + (b.amount || 0), 0),
      pkgBookings: packageBookingsList.length,
      enquiries: allEnquiries.length,
      pkgRevenue: packageBookingsList.reduce((sum, b) => sum + (b.totalAmount || 0), 0)
    });
  }, []);

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Users</p>
              <h3 className="text-2xl font-bold">{stats.users}</h3>
            </div>
            <Users className="text-muted-foreground" size={24} />
          </CardContent>
        </Card>
        
        <Card data-testid="admin-package-bookings-count">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Package Bookings</p>
              <h3 className="text-2xl font-bold">{stats.pkgBookings}</h3>
            </div>
            <Package className="text-muted-foreground" size={24} />
          </CardContent>
        </Card>

        <Card data-testid="admin-package-enquiries-count">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Package Enquiries</p>
              <h3 className="text-2xl font-bold">{stats.enquiries}</h3>
            </div>
            <MessageSquare className="text-muted-foreground" size={24} />
          </CardContent>
        </Card>
        
        <Card data-testid="admin-package-revenue-card">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Package Revenue</p>
              <h3 className="text-2xl font-bold text-primary">₹{stats.pkgRevenue.toLocaleString()}</h3>
            </div>
            <DollarSign className="text-muted-foreground" size={24} />
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Recent Package Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <table className="w-full text-sm text-left" data-testid="admin-package-bookings-table">
              <thead>
                <tr className="border-b">
                  <th className="pb-3 font-medium text-muted-foreground">Booking ID</th>
                  <th className="pb-3 font-medium text-muted-foreground">Package</th>
                  <th className="pb-3 font-medium text-muted-foreground">Customer</th>
                  <th className="pb-3 font-medium text-muted-foreground">Amount</th>
                  <th className="pb-3 font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {pkgBookings.slice(0, 5).map(b => (
                  <tr key={b.bookingId} className="border-b">
                    <td className="py-3 font-mono text-xs">{b.bookingId}</td>
                    <td className="py-3 truncate max-w-[150px]">{b.packageTitle}</td>
                    <td className="py-3">{b.travellers[0]?.name}</td>
                    <td className="py-3">₹{b.totalAmount?.toLocaleString()}</td>
                    <td className="py-3">
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-[10px] font-bold uppercase">{b.status}</span>
                    </td>
                  </tr>
                ))}
                {pkgBookings.length === 0 && (
                  <tr>
                    <td colSpan="5" className="py-4 text-center text-muted-foreground">No package bookings found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Enquiries</CardTitle>
          </CardHeader>
          <CardContent>
            <table className="w-full text-sm text-left" data-testid="admin-package-enquiries-table">
              <thead>
                <tr className="border-b">
                  <th className="pb-3 font-medium text-muted-foreground">Enquiry ID</th>
                  <th className="pb-3 font-medium text-muted-foreground">Package</th>
                  <th className="pb-3 font-medium text-muted-foreground">Customer</th>
                  <th className="pb-3 font-medium text-muted-foreground">Budget</th>
                  <th className="pb-3 font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {enquiries.slice(0, 5).map(e => (
                  <tr key={e.enquiryId} className="border-b">
                    <td className="py-3 font-mono text-xs">{e.enquiryId}</td>
                    <td className="py-3 truncate max-w-[150px]">{e.packageTitle}</td>
                    <td className="py-3">{e.name}</td>
                    <td className="py-3">₹{Number(e.budget).toLocaleString()}</td>
                    <td className="py-3">
                      <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-[10px] font-bold uppercase">{e.status}</span>
                    </td>
                  </tr>
                ))}
                {enquiries.length === 0 && (
                  <tr>
                    <td colSpan="5" className="py-4 text-center text-muted-foreground">No enquiries found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
