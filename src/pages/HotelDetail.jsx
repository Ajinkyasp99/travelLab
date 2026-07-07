import { useParams, useNavigate } from "react-router-dom";
import { hotels } from "@/data/hotels";
import { rooms } from "@/data/rooms";
import { MapPin, Star, Check, Wifi, Coffee, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function HotelDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const hotel = hotels.find(h => h.id === id);
  const hotelRooms = rooms.filter(r => r.hotelId === id);

  if (!hotel) {
    return <div className="container mx-auto py-20 text-center">Hotel not found</div>;
  }

  const handleBookRoom = (roomId) => {
    const room = hotel.rooms.find(r => r.id === roomId);
    navigate("/payment", { state: { 
      type: 'hotel', 
      bookingType: 'hotel',
      itemId: roomId, 
      hotelId: id,
      name: hotel.name,
      totalAmount: room ? room.price : 5000
    } });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">{hotel.name}</h1>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1"><MapPin size={16} /> {hotel.address}</span>
          <span className="flex items-center gap-1 text-yellow-500 font-medium">
            <Star size={16} className="fill-current" /> {hotel.userRating} ({hotel.reviewCount} reviews)
          </span>
        </div>
      </div>

      {/* Gallery Placeholder */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 h-[400px]">
        <div className="md:col-span-2 overflow-hidden rounded-xl">
          <img src={hotel.images[0]} alt={hotel.name} className="w-full h-full object-cover" />
        </div>
        <div className="hidden md:flex flex-col gap-4">
          <img src={hotel.images[0]} alt="" className="w-full h-1/2 object-cover rounded-xl" />
          <img src={hotel.images[0]} alt="" className="w-full h-1/2 object-cover rounded-xl" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-4">About this property</h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            {hotel.description} 
            Experience world-class service at {hotel.name}. Featuring free WiFi and a beautiful environment, this property is highly rated by guests for its excellent location and cleanliness.
          </p>

          <h2 className="text-2xl font-bold mb-4">Available Rooms</h2>
          <div className="space-y-4">
            {hotelRooms.map(room => (
              <Card key={room.id} className="overflow-hidden">
                <CardContent className="p-0 flex flex-col md:flex-row">
                  <div className="w-full md:w-1/3">
                    <img src={room.images[0]} alt={room.type} className="w-full h-48 object-cover" />
                  </div>
                  <div className="w-full md:w-2/3 p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="text-xl font-bold">{room.type} Room</h3>
                        {room.available ? (
                          <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
                            <Check size={12} /> Available
                          </span>
                        ) : (
                          <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-bold">
                            Sold Out
                          </span>
                        )}
                      </div>
                      
                      <div className="flex gap-4 mt-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1"><Users size={16} /> Max {room.capacity.adults} Adults, {room.capacity.children} Children</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mt-4">
                        {room.amenities.map(amenity => (
                          <span key={amenity} className="text-xs border px-2 py-1 rounded-md text-muted-foreground">{amenity}</span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-end mt-6">
                      <div>
                        <p className="text-2xl font-bold text-primary">₹{room.pricePerNight.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">per night</p>
                      </div>
                      <Button 
                        disabled={!room.available} 
                        onClick={() => handleBookRoom(room.id)}
                        data-testid={`book-room-${room.id}`}
                      >
                        Reserve
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-card border rounded-xl p-6 sticky top-24 shadow-sm">
            <h3 className="font-bold text-lg mb-4">Property Amenities</h3>
            <ul className="space-y-3 mb-6">
              {hotel.amenities.map(amenity => (
                <li key={amenity} className="flex items-center gap-2 text-muted-foreground">
                  <Check size={16} className="text-primary" /> {amenity}
                </li>
              ))}
            </ul>
            
            <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
              <h4 className="font-bold mb-2">Need Help?</h4>
              <p className="text-sm text-muted-foreground mb-4">Contact our support team 24/7 for any booking queries.</p>
              <Button variant="outline" className="w-full">Contact Support</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
