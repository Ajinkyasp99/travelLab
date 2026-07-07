import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { buses } from "../data/buses";
import { BusFront, Clock, IndianRupee, MapPin, ArrowRightLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Buses() {
  const location = useLocation();
  const navigate = useNavigate();
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("search")) setDestination(params.get("search"));
    if (params.get("origin")) setOrigin(params.get("origin"));
  }, [location.search]);

  const filteredBuses = buses.filter(b => {
    const matchOrigin = !origin || b.origin.toLowerCase().includes(origin.toLowerCase());
    const matchDest = !destination || b.destination.toLowerCase().includes(destination.toLowerCase());
    return matchOrigin && matchDest;
  });

  const resetFilters = () => {
    setOrigin("");
    setDestination("");
    navigate("/buses");
  };

  return (
    <div className="container mx-auto py-12 px-4 min-h-[80vh]">
      <div className="mb-8 p-6 bg-primary/5 rounded-xl border">
        <h1 className="text-3xl font-bold mb-6">Search Buses</h1>
        
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1 w-full relative">
            <MapPin className="absolute left-3 top-3 text-muted-foreground" size={20} />
            <Input 
              placeholder="Origin City" 
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="pl-10 h-12 text-lg bg-background"
            />
          </div>
          
          <div className="hidden md:flex p-3 bg-background rounded-full shadow-sm border text-primary">
            <ArrowRightLeft size={20} />
          </div>
          
          <div className="flex-1 w-full relative">
            <MapPin className="absolute left-3 top-3 text-muted-foreground" size={20} />
            <Input 
              placeholder="Destination City" 
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="pl-10 h-12 text-lg bg-background"
            />
          </div>
          
          <Button onClick={resetFilters} variant="outline" className="h-12 px-6 w-full md:w-auto">
            Clear
          </Button>
        </div>
      </div>

      {filteredBuses.length === 0 ? (
        <div className="text-center p-12 glass rounded-2xl text-muted-foreground">
          <BusFront size={48} className="mx-auto mb-4 opacity-50" />
          <h2 className="text-2xl font-bold mb-2">No buses found</h2>
          <p>Try adjusting your search locations.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBuses.map(bus => (
            <div key={bus.id} className="glass p-6 rounded-2xl border border-white/20 shadow-soft hover-lift flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center text-secondary">
                  <BusFront size={32} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{bus.operator}</h3>
                  <div className="flex gap-4 text-sm text-muted-foreground mt-1 font-medium">
                    <span className="flex items-center gap-1"><Clock size={14}/> {bus.duration}</span>
                    <span>Type: {bus.busType}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                <div>
                  <div className="text-2xl font-black">{new Date(bus.departureTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                  <div className="text-sm text-muted-foreground font-semibold">{bus.origin}</div>
                </div>
                <div className="hidden md:block w-24 h-[2px] bg-border relative">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground">To</div>
                </div>
                <div>
                  <div className="text-2xl font-black">{new Date(bus.arrivalTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                  <div className="text-sm text-muted-foreground font-semibold">{bus.destination}</div>
                </div>
              </div>
              
              <div className="text-center md:text-right border-t md:border-t-0 md:border-l border-border pt-4 md:pt-0 md:pl-6">
                <div className="text-3xl font-black text-secondary flex items-center justify-center md:justify-end">
                  <IndianRupee size={24} />{bus.price}
                </div>
                <div className="text-sm text-green-600 font-bold mb-3">{bus.availableSeats} Seats Left</div>
                <button 
                  onClick={() => {
                    const currentUser = JSON.parse(localStorage.getItem("travel_test_lab_current_user"));
                    if (!currentUser) return alert("Please login first!");
                    
                    const existingBookings = JSON.parse(localStorage.getItem("travel_test_lab_bookings") || "[]");
                    const newBooking = {
                      id: `b_${Date.now()}`,
                      userId: currentUser.id,
                      bookingType: 'bus',
                      details: { type: 'bus', name: bus.operator, origin: bus.origin, destination: bus.destination },
                      packageTitle: `Bus: ${bus.operator}`,
                      date: bus.departureTime,
                      amount: bus.price,
                      status: 'upcoming'
                    };
                    localStorage.setItem("travel_test_lab_bookings", JSON.stringify([...existingBookings, newBooking]));
                    window.location.hash = "#/my-trips";
                  }}
                  className="bg-secondary text-secondary-foreground font-bold px-8 py-2.5 rounded-full hover:bg-secondary/90 transition-all shadow-md hover-lift"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
