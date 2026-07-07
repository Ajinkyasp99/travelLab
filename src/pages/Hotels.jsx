import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { hotels } from "@/data/hotels";
import { HotelCard } from "@/components/hotels/HotelCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal, Star } from "lucide-react";

export default function Hotels() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [priceFilter, setPriceFilter] = useState(10000);
  const [selectedStars, setSelectedStars] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [sortBy, setSortBy] = useState("Recommended");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("search")) {
      setSearchQuery(params.get("search"));
    }
  }, [location.search]);

  const filteredHotels = hotels.filter(hotel => {
    const matchSearch = hotel.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchPrice = hotel.pricePerNight <= priceFilter;
    const matchStars = selectedStars.length === 0 || selectedStars.includes(hotel.starRating);
    const matchAmenities = selectedAmenities.length === 0 || selectedAmenities.every(a => hotel.amenities.includes(a));
    return matchSearch && matchPrice && matchStars && matchAmenities;
  }).sort((a, b) => {
    if (sortBy === "Price: Low to High") return a.pricePerNight - b.pricePerNight;
    if (sortBy === "Price: High to Low") return b.pricePerNight - a.pricePerNight;
    if (sortBy === "Rating: High to Low") return parseFloat(b.userRating) - parseFloat(a.userRating);
    return 0; // Recommended
  });

  const resetFilters = () => {
    setSearchQuery("");
    setPriceFilter(10000);
    setSelectedStars([]);
    setSelectedAmenities([]);
    navigate("/hotels");
  };

  const handleStarChange = (star) => {
    setSelectedStars(prev => prev.includes(star) ? prev.filter(s => s !== star) : [...prev, star]);
  };

  const handleAmenityChange = (amenity) => {
    setSelectedAmenities(prev => prev.includes(amenity) ? prev.filter(a => a !== amenity) : [...prev, amenity]);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8 p-6 bg-primary/5 rounded-xl border">
        <h1 className="text-3xl font-bold mb-6">Find Your Perfect Stay</h1>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 text-muted-foreground" size={20} />
            <Input 
              placeholder="Search by hotel name..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-lg bg-background"
              data-testid="hotel-search-input"
            />
          </div>
          
          <div className="w-full md:w-64 flex flex-col justify-center">
            <div className="flex justify-between text-sm mb-2">
              <span className="font-medium flex items-center gap-1"><SlidersHorizontal size={14}/> Max Price</span>
              <span className="text-primary font-bold">₹{priceFilter}</span>
            </div>
            <input 
              type="range" 
              min="1000" 
              max="10000" 
              step="500" 
              value={priceFilter}
              onChange={(e) => setPriceFilter(Number(e.target.value))}
              className="w-full accent-primary"
              data-testid="hotel-price-filter"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="w-full lg:w-1/4">
          <div className="bg-card border rounded-xl p-6 sticky top-24">
            <h3 className="font-bold text-lg mb-4">Filters</h3>
            
            <div className="mb-6">
              <h4 className="font-medium mb-3 text-sm text-muted-foreground uppercase">Star Rating</h4>
              {[5, 4, 3].map(star => (
                <label key={star} className="flex items-center gap-2 mb-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={selectedStars.includes(star)}
                    onChange={() => handleStarChange(star)}
                    className="rounded border-input text-primary focus:ring-primary accent-primary" 
                  />
                  <span className="flex text-yellow-500">
                    {Array.from({ length: star }).map((_, i) => <Star key={i} size={14} className="fill-current"/>)}
                  </span>
                </label>
              ))}
            </div>

            <div className="mb-6">
              <h4 className="font-medium mb-3 text-sm text-muted-foreground uppercase">Amenities</h4>
              {['Free WiFi', 'Pool', 'Spa', 'Restaurant'].map(amenity => (
                <label key={amenity} className="flex items-center gap-2 mb-2 cursor-pointer text-sm">
                  <input 
                    type="checkbox" 
                    checked={selectedAmenities.includes(amenity)}
                    onChange={() => handleAmenityChange(amenity)}
                    className="rounded border-input text-primary focus:ring-primary accent-primary" 
                  />
                  <span>{amenity}</span>
                </label>
              ))}
            </div>
            
            <Button variant="outline" className="w-full" onClick={resetFilters} data-testid="hotel-reset-filters">Reset Filters</Button>
          </div>
        </div>

        {/* Hotel List */}
        <div className="w-full lg:w-3/4">
          <div className="mb-4 flex justify-between items-center text-sm text-muted-foreground">
            <span>Showing {filteredHotels.length} properties</span>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-background border rounded-md p-2 outline-none focus:ring-1 focus:ring-primary"
            >
              <option>Recommended</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Rating: High to Low</option>
            </select>
          </div>
          
          {filteredHotels.length > 0 ? (
            filteredHotels.map(hotel => (
              <HotelCard 
                key={hotel.id} 
                hotel={hotel} 
                onBook={(id) => navigate(`/hotels/${id}`)} 
              />
            ))
          ) : (
            <div className="text-center py-20 bg-muted/30 rounded-xl border border-dashed">
              <p className="text-muted-foreground font-medium text-lg mb-2">No hotels found</p>
              <p className="text-sm">Try adjusting your filters or search query.</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSearchQuery("");
                  setPriceFilter(10000);
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
