import { Star, MapPin, Wifi, Coffee } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function HotelCard({ hotel, onBook }) {
  return (
    <Card className="overflow-hidden flex flex-col md:flex-row mb-6 hover:shadow-lg transition-shadow group">
      <div className="w-full md:w-1/3 relative overflow-hidden">
        <img 
          src={hotel.images[0]} 
          alt={hotel.name} 
          className="w-full h-48 md:h-full object-cover group-hover:scale-105 transition-transform duration-300" 
        />
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-primary flex items-center gap-1 shadow-sm">
          <Star size={12} className="fill-primary" /> {hotel.userRating}
        </div>
      </div>
      <CardContent className="w-full md:w-2/3 p-6 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">{hotel.name}</h3>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <MapPin size={14} /> {hotel.address}
              </p>
            </div>
            <div className="flex gap-1 text-yellow-500">
              {Array.from({ length: hotel.starRating }).map((_, i) => (
                <Star key={i} size={16} className="fill-current" />
              ))}
            </div>
          </div>
          
          <div className="mt-4 flex flex-wrap gap-2">
            {hotel.amenities.map(amenity => (
              <span key={amenity} className="text-xs bg-muted px-2 py-1 rounded-md text-muted-foreground flex items-center gap-1">
                {amenity.toLowerCase().includes('wifi') && <Wifi size={12} />}
                {amenity.toLowerCase().includes('restaurant') && <Coffee size={12} />}
                {amenity}
              </span>
            ))}
          </div>
          <p className="text-sm mt-4 text-muted-foreground line-clamp-2">{hotel.description}</p>
        </div>
        
        <div className="flex justify-between items-end mt-6 border-t pt-4">
          <div>
            <p className="text-xs text-muted-foreground uppercase font-medium">Price per night</p>
            <p className="text-2xl font-bold text-primary">₹{hotel.pricePerNight.toLocaleString()}</p>
          </div>
          <Button onClick={() => onBook(hotel.id)} data-testid="hotel-view-button">
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
