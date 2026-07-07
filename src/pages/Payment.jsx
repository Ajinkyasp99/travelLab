import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  const [cardNumber, setCardNumber] = useState("4111 1111 1111 1111");
  const [expiry, setExpiry] = useState("12/30");
  const [cvv, setCvv] = useState("123");
  const [name, setName] = useState("Test User");
  
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    setTimeout(() => {
      let finalBookingId = `BKG-${Math.floor(Math.random() * 1000000)}`;
      const bookings = JSON.parse(localStorage.getItem("travel_test_lab_bookings") || "[]");

      if (location.state?.type === 'holiday_package') {
        const draftStr = localStorage.getItem("travel_lab_selected_package_booking");
        if (draftStr) {
          const draft = JSON.parse(draftStr);
          draft.status = "Confirmed";
          draft.userId = currentUser?.id;
          finalBookingId = draft.bookingId;
          bookings.push(draft);
          localStorage.removeItem("travel_lab_selected_package_booking");
        }
      } else {
        const newBooking = {
          id: finalBookingId,
          userId: currentUser?.id,
          date: new Date().toISOString(),
          status: "Confirmed",
          amount: location.state?.totalAmount || 5000,
          details: location.state || {}
        };
        bookings.push(newBooking);
      }
      
      localStorage.setItem("travel_test_lab_bookings", JSON.stringify(bookings));
      
      setIsProcessing(false);
      navigate("/booking-confirmation", { state: { bookingId: finalBookingId } });
    }, 1500);
  };

  return (
    <div className="container mx-auto py-12 px-4 flex justify-center">
      <div className="w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-8 text-center">Complete Payment</h1>
        
        <Card>
          <CardContent className="p-6">
            <form onSubmit={handlePayment}>
              <div className="mb-6">
                <h3 className="font-bold text-lg mb-4">Card Details</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Card Number</label>
                    <Input 
                      data-testid="payment-card-number-input"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Expiry Date</label>
                      <Input 
                        placeholder="MM/YY"
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">CVV</label>
                      <Input 
                        type="password"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Name on Card</label>
                    <Input 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-6 mb-6">
                <div className="flex justify-between font-bold text-lg mb-2">
                  <span>Total Amount</span>
                  <span>₹5,000</span>
                </div>
                <p className="text-xs text-muted-foreground text-center">Mock payment for testing purposes</p>
              </div>
              
              <Button 
                type="submit" 
                className="w-full h-12 text-lg font-bold" 
                disabled={isProcessing}
                data-testid="payment-submit-button"
              >
                {isProcessing ? "Processing..." : "Pay Now"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
