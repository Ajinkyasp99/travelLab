import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { cabs } from "../data/cabs";
import { CarFront, Star, IndianRupee, MapPin, ArrowRightLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Cabs() {
  const location = useLocation();
  const navigate = useNavigate();
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("search")) setDestination(params.get("search"));
    if (params.get("origin")) setOrigin(params.get("origin"));
  }, [location.search]);

  const filteredCabs = cabs.filter(c => {
    const matchOrigin = !origin || c.origin.toLowerCase().includes(origin.toLowerCase());
    const matchDest = !destination || c.destination.toLowerCase().includes(destination.toLowerCase());
    return matchOrigin && matchDest;
  });

  const resetFilters = () => {
    setOrigin("");
    setDestination("");
    navigate("/cabs");
  };

  return (
    <div className="container mx-auto py-12 px-4 min-h-[80vh]">
      <div className="mb-8 p-6 bg-primary/5 rounded-xl border">
        <h1 className="text-3xl font-bold mb-6">Search Cabs</h1>
        
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1 w-full relative">
            <MapPin className="absolute left-3 top-3 text-muted-foreground" size={20} />
            <Input 
              placeholder="Pick-up Location" 
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
              placeholder="Drop-off Location" 
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

      {filteredCabs.length === 0 ? (
        <div className="text-center p-12 glass rounded-2xl text-muted-foreground">
          <CarFront size={48} className="mx-auto mb-4 opacity-50" />
          <h2 className="text-2xl font-bold mb-2">No cabs found</h2>
          <p>Try adjusting your search locations.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCabs.map(cab => (
            <div key={cab.id} className="glass p-6 rounded-3xl border border-white/20 shadow-soft hover-lift flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-black text-foreground">{cab.carModel}</h3>
                  <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">{cab.type}</div>
                </div>
                <div className="flex items-center gap-1 bg-yellow-100 text-yellow-800 px-2 py-1 rounded-lg text-sm font-bold">
                  <Star size={16} className="fill-current" /> {cab.rating}
                </div>
              </div>
              
              <div className="bg-muted/50 p-4 rounded-xl flex items-center justify-between my-2">
                <div className="text-center">
                  <div className="text-sm font-bold">{cab.origin}</div>
                </div>
                <div className="flex-1 border-t-2 border-dashed border-border mx-4 relative">
                  <CarFront size={16} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-muted-foreground bg-muted/50 px-1" />
                </div>
                <div className="text-center">
                  <div className="text-sm font-bold">{cab.destination}</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
                <div>
                  <div className="text-xs text-muted-foreground font-semibold uppercase">Est. Rate</div>
                  <div className="text-2xl font-black text-primary flex items-center">
                    <IndianRupee size={20} />{cab.pricePerKm} <span className="text-sm text-muted-foreground font-medium ml-1">/ km</span>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    const currentUser = JSON.parse(localStorage.getItem("travel_test_lab_current_user"));
                    if (!currentUser) return alert("Please login first!");
                    
                    const existingBookings = JSON.parse(localStorage.getItem("travel_test_lab_bookings") || "[]");
                    const newBooking = {
                      id: `b_${Date.now()}`,
                      userId: currentUser.id,
                      bookingType: 'cab',
                      details: { type: 'cab', name: cab.carModel, origin: cab.origin, destination: cab.destination },
                      packageTitle: `Cab: ${cab.carModel}`,
                      date: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
                      amount: cab.pricePerKm * 15, // Approx 15km
                      status: 'upcoming'
                    };
                    localStorage.setItem("travel_test_lab_bookings", JSON.stringify([...existingBookings, newBooking]));
                    window.location.hash = "#/my-trips";
                  }}
                  className="bg-primary text-primary-foreground font-bold px-6 py-2.5 rounded-full hover:bg-primary/90 transition-all shadow-md hover-lift"
                >
                  Book Cab
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
