import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { trains } from "../data/trains";
import { Train, Clock, IndianRupee, MapPin, ArrowRightLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Trains() {
  const location = useLocation();
  const navigate = useNavigate();
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("search")) setDestination(params.get("search"));
    if (params.get("origin")) setOrigin(params.get("origin"));
  }, [location.search]);

  const filteredTrains = trains.filter(t => {
    const matchOrigin = !origin || t.origin.toLowerCase().includes(origin.toLowerCase());
    const matchDest = !destination || t.destination.toLowerCase().includes(destination.toLowerCase());
    return matchOrigin && matchDest;
  });

  const resetFilters = () => {
    setOrigin("");
    setDestination("");
    navigate("/trains");
  };

  return (
    <div className="container mx-auto py-12 px-4 min-h-[80vh]">
      <div className="mb-8 p-6 bg-primary/5 rounded-xl border">
        <h1 className="text-3xl font-bold mb-6">Search Trains</h1>
        
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1 w-full relative">
            <MapPin className="absolute left-3 top-3 text-muted-foreground" size={20} />
            <Input 
              placeholder="Origin Station" 
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
              placeholder="Destination Station" 
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

      {filteredTrains.length === 0 ? (
        <div className="text-center p-12 glass rounded-2xl text-muted-foreground">
          <Train size={48} className="mx-auto mb-4 opacity-50" />
          <h2 className="text-2xl font-bold mb-2">No trains found</h2>
          <p>Try adjusting your search locations.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredTrains.map(train => (
            <div key={train.id} className="glass p-6 rounded-2xl border border-white/20 shadow-soft hover-lift flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                  <Train size={32} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{train.trainName} ({train.trainNumber})</h3>
                  <div className="flex gap-4 text-sm text-muted-foreground mt-1 font-medium">
                    <span className="flex items-center gap-1"><Clock size={14}/> {train.duration}</span>
                    <span>Class: {train.class}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                <div>
                  <div className="text-2xl font-black">{new Date(train.departureTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                  <div className="text-sm text-muted-foreground font-semibold">{train.origin}</div>
                </div>
                <div className="hidden md:block w-24 h-[2px] bg-border relative">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground">To</div>
                </div>
                <div>
                  <div className="text-2xl font-black">{new Date(train.arrivalTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                  <div className="text-sm text-muted-foreground font-semibold">{train.destination}</div>
                </div>
              </div>
              
              <div className="text-center md:text-right border-t md:border-t-0 md:border-l border-border pt-4 md:pt-0 md:pl-6">
                <div className="text-3xl font-black text-primary flex items-center justify-center md:justify-end">
                  <IndianRupee size={24} />{train.price}
                </div>
                <div className="text-sm text-green-600 font-bold mb-3">{train.availableSeats} Seats Left</div>
                <button 
                  onClick={() => {
                    const currentUser = JSON.parse(localStorage.getItem("travel_test_lab_current_user"));
                    if (!currentUser) return alert("Please login first!");
                    
                    const existingBookings = JSON.parse(localStorage.getItem("travel_test_lab_bookings") || "[]");
                    const newBooking = {
                      id: `b_${Date.now()}`,
                      userId: currentUser.id,
                      bookingType: 'train',
                      details: { type: 'train', name: train.trainName, origin: train.origin, destination: train.destination },
                      packageTitle: `Train: ${train.trainName} (${train.trainNumber})`,
                      date: train.departureTime,
                      amount: train.price,
                      status: 'upcoming'
                    };
                    localStorage.setItem("travel_test_lab_bookings", JSON.stringify([...existingBookings, newBooking]));
                    window.location.hash = "#/my-trips";
                  }}
                  className="bg-primary text-primary-foreground font-bold px-8 py-2.5 rounded-full hover:bg-primary/90 transition-all shadow-md hover-lift"
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
