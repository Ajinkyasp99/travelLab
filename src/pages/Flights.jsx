import { useState } from "react";
import { flights } from "@/data/flights";
import { FlightCard } from "@/components/flights/FlightCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, ArrowRightLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Flights() {
  const { toast } = useToast();
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");

  const filteredFlights = flights.filter(flight => 
    flight.origin.toLowerCase().includes(origin.toLowerCase()) &&
    flight.destination.toLowerCase().includes(destination.toLowerCase())
  );

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8 p-6 bg-primary/5 rounded-xl border">
        <h1 className="text-3xl font-bold mb-6">Search Flights</h1>
        
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1 w-full relative">
            <MapPin className="absolute left-3 top-3 text-muted-foreground" size={20} />
            <Input 
              placeholder="Origin (e.g. DEL)" 
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="pl-10 h-12 text-lg bg-background"
              data-testid="flight-origin-input"
            />
          </div>
          
          <div className="bg-background rounded-full p-2 border shadow-sm z-10 -mx-4 md:mx-0">
            <ArrowRightLeft size={16} className="text-muted-foreground" />
          </div>
          
          <div className="flex-1 w-full relative">
            <MapPin className="absolute left-3 top-3 text-muted-foreground" size={20} />
            <Input 
              placeholder="Destination (e.g. BOM)" 
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="pl-10 h-12 text-lg bg-background"
              data-testid="flight-destination-input"
            />
          </div>
          
          <div className="flex-1 w-full">
            <Input 
              type="date"
              className="h-12 text-lg bg-background"
            />
          </div>
          
          <Button size="lg" className="h-12 px-8 w-full md:w-auto font-bold text-lg" data-testid="flight-search-button">
            Search
          </Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="w-full lg:w-1/4">
          <div className="bg-card border rounded-xl p-6 sticky top-24">
            <h3 className="font-bold text-lg mb-4">Filters</h3>
            
            <div className="mb-6">
              <h4 className="font-medium mb-3 text-sm text-muted-foreground uppercase">Airlines</h4>
              {['IndiGo', 'Air India', 'SpiceJet', 'Vistara'].map(airline => (
                <label key={airline} className="flex items-center gap-2 mb-2 cursor-pointer text-sm">
                  <input type="checkbox" className="rounded border-input text-primary focus:ring-primary accent-primary" />
                  <span>{airline}</span>
                </label>
              ))}
            </div>

            <div className="mb-6">
              <h4 className="font-medium mb-3 text-sm text-muted-foreground uppercase">Stops</h4>
              {['Non-stop', '1 Stop', '2+ Stops'].map(stop => (
                <label key={stop} className="flex items-center gap-2 mb-2 cursor-pointer text-sm">
                  <input type="checkbox" className="rounded border-input text-primary focus:ring-primary accent-primary" />
                  <span>{stop}</span>
                </label>
              ))}
            </div>
            
            <Button variant="outline" className="w-full">Reset Filters</Button>
          </div>
        </div>

        {/* Flight List */}
        <div className="w-full lg:w-3/4">
          <div className="mb-4 flex justify-between items-center text-sm text-muted-foreground">
            <span>Showing {filteredFlights.length} flights</span>
            <select className="bg-background border rounded-md p-2 outline-none focus:ring-1 focus:ring-primary">
              <option>Cheapest First</option>
              <option>Fastest First</option>
              <option>Early Departure</option>
              <option>Late Departure</option>
            </select>
          </div>
          
          {filteredFlights.length > 0 ? (
            filteredFlights.map(flight => (
              <FlightCard 
                key={flight.id} 
                flight={flight} 
                onBook={(id) => {
                  const bkgId = `BKG-FL-${Math.floor(Math.random() * 1000000)}`;
                  toast({
                    title: "Booking Successful!",
                    description: `Your flight booking number is ${bkgId}`,
                    variant: "default",
                  });
                }} 
              />
            ))
          ) : (
            <div className="text-center py-20 bg-muted/30 rounded-xl border border-dashed">
              <p className="text-muted-foreground font-medium text-lg mb-2">No flights found</p>
              <p className="text-sm">Try adjusting your origin or destination.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
