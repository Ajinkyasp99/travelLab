import { useLocation, Link } from "react-router-dom";
import { CheckCircle2, Download, Printer } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function BookingConfirmation() {
  const location = useLocation();
  const bookingId = location.state?.bookingId || "BKG-UNKNOWN";

  return (
    <div className="container mx-auto py-12 px-4 flex justify-center">
      <div className="w-full max-w-xl text-center">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle2 size={40} className="text-green-600" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
        <p className="text-muted-foreground mb-8">Thank you for booking with TravelTestLab.</p>
        
        <Card className="mb-8 text-left">
          <CardContent className="p-6">
            <h3 className="font-bold text-lg mb-4 border-b pb-2">Booking Details</h3>
            
            <div className="grid grid-cols-2 gap-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Booking ID</p>
                <p className="font-bold" data-testid="booking-confirmation-id">{bookingId}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <p className="font-bold text-green-600">Confirmed</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Payment Method</p>
                <p className="font-medium">Credit Card (**** 1111)</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Amount</p>
                <p className="font-bold">₹5,000</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline" className="flex items-center gap-2">
            <Download size={16} /> Download Invoice
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Printer size={16} /> Print Ticket
          </Button>
          <Button asChild>
            <Link to="/my-trips">View My Trips</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
