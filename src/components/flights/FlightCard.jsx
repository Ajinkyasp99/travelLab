import { Plane } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function FlightCard({ flight, onBook }) {
  const formatTime = (isoString) => {
    return new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Card className="mb-4 hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center gap-4 w-full md:w-1/4 mb-4 md:mb-0">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
              <Plane size={20} />
            </div>
            <div>
              <p className="font-bold">{flight.airline}</p>
              <p className="text-xs text-muted-foreground">{flight.flightNumber} • {flight.class}</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between w-full md:w-2/4 px-4 mb-4 md:mb-0">
            <div className="text-center">
              <p className="text-2xl font-bold">{formatTime(flight.departureTime)}</p>
              <p className="text-sm font-medium">{flight.origin}</p>
            </div>
            
            <div className="flex flex-col items-center px-4 flex-1">
              <p className="text-xs text-muted-foreground mb-1">{flight.duration}</p>
              <div className="w-full relative flex items-center justify-center">
                <div className="w-full h-[2px] bg-border absolute"></div>
                <Plane size={14} className="text-muted-foreground relative z-10 bg-background px-1" />
              </div>
              <p className="text-[10px] text-muted-foreground mt-1">Non-stop</p>
            </div>
            
            <div className="text-center">
              <p className="text-2xl font-bold">{formatTime(flight.arrivalTime)}</p>
              <p className="text-sm font-medium">{flight.destination}</p>
            </div>
          </div>
          
          <div className="flex flex-row md:flex-col items-center justify-between md:justify-center w-full md:w-1/4 border-t md:border-t-0 md:border-l pt-4 md:pt-0 md:pl-6">
            <div className="md:mb-3">
              <p className="text-xs text-muted-foreground md:text-right">Price per adult</p>
              <p className="text-2xl font-bold text-primary md:text-right">₹{flight.price.toLocaleString()}</p>
            </div>
            <Button onClick={() => onBook(flight.id)} className="w-full md:w-auto" data-testid="flight-book-button">
              Book Now
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
