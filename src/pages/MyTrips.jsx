import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, CreditCard, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function MyTrips() {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const allBookings = JSON.parse(localStorage.getItem("travel_test_lab_bookings") || "[]");
    const userBookings = allBookings.filter(b => b.userId === currentUser?.id);
    setBookings(userBookings.reverse()); // Show newest first
  }, [currentUser]);

  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">My Trips</h1>
      
      {bookings.length === 0 ? (
        <div className="text-center py-20 bg-card rounded-xl border border-dashed">
          <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <MapPin size={32} className="text-muted-foreground" />
          </div>
          <p className="text-xl font-bold mb-2">No trips booked yet</p>
          <p className="text-muted-foreground mb-6">Looks like you haven't planned your next adventure.</p>
          <Button asChild>
            <Link to="/">Start Exploring</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {bookings.map(booking => {
            const isPackage = booking.bookingType === 'holiday_package';
            const bId = isPackage ? booking.bookingId : booking.id;
            const bTitle = isPackage ? booking.packageTitle : (booking.details?.type === 'hotel' ? 'Hotel Stay' : 'Flight Booking');
            const bDate = isPackage ? booking.travelDate : booking.date;
            const bAmount = isPackage ? booking.totalAmount : booking.amount;
            
            return (
            <Card key={bId} className="overflow-hidden" data-testid={isPackage ? "my-trips-holiday-package-card" : "my-trips-standard-card"}>
              <CardContent className="p-0 flex flex-col md:flex-row">
                <div className="w-full md:w-48 bg-muted flex flex-col items-center justify-center p-6 border-r text-center">
                  <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Booking ID</div>
                  <div className="font-bold text-sm" data-testid="my-trips-package-booking-id">{bId}</div>
                  <div className="mt-4 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                    {booking.status}
                  </div>
                </div>
                
                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      {isPackage && <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-[10px] font-bold uppercase mb-2 inline-block">Holiday Package</span>}
                      <h3 className="text-xl font-bold mb-2">{bTitle}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(bDate).toLocaleDateString()}</span>
                        <span className="flex items-center gap-1"><CreditCard size={14} /> ₹{bAmount?.toLocaleString()}</span>
                        {isPackage && <span className="flex items-center gap-1"><MapPin size={14} /> {booking.destination}</span>}
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4 mt-4 flex justify-between items-center gap-2">
                    <p className="text-sm text-muted-foreground">Mock booking details generated during test.</p>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="hidden md:flex text-destructive border-destructive hover:bg-destructive/10" 
                        data-testid="my-trips-package-cancel-button"
                        onClick={() => toast({ title: "Booking Cancelled", description: `Booking ${bId} has been cancelled successfully.`, variant: "destructive" })}
                      >
                        Cancel Booking
                      </Button>
                      <Button 
                        variant="default" 
                        size="sm" 
                        className="hidden md:flex" 
                        data-testid="my-trips-package-view-button"
                        onClick={() => {
                          if (isPackage) {
                            navigate(`/holiday-packages/${booking.packageId}`);
                          } else {
                            toast({ title: "View Details", description: `Details for booking ${bId}` });
                          }
                        }}
                      >
                        View Details
                      </Button>
                      <Button variant="ghost" size="sm" className="md:hidden">
                        Details <ChevronRight size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )})}
        </div>
      )}
    </div>
  );
}
