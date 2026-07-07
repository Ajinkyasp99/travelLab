import { useNavigate } from "react-router-dom";
import { Star, MapPin, Clock, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export function HolidayPackageCard({ pkg }) {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    if (currentUser) {
      const wishlist = JSON.parse(localStorage.getItem("travel_lab_wishlist") || "[]");
      setIsWishlisted(wishlist.some(item => item.itemId === pkg.id));
    }
  }, [currentUser, pkg.id]);

  const handleWishlist = (e) => {
    e.stopPropagation();
    if (!currentUser) {
      navigate("/login");
      return;
    }

    const wishlist = JSON.parse(localStorage.getItem("travel_lab_wishlist") || "[]");
    const exists = wishlist.findIndex(item => item.itemId === pkg.id);
    
    if (exists >= 0) {
      wishlist.splice(exists, 1);
      setIsWishlisted(false);
      toast({ title: "Removed from Wishlist" });
    } else {
      wishlist.push({
        id: `wishlist-${pkg.id}`,
        type: "holiday_package",
        itemId: pkg.id,
        title: pkg.title,
        destination: pkg.destination,
        price: pkg.pricePerPerson,
        image: pkg.image,
        addedAt: new Date().toISOString()
      });
      setIsWishlisted(true);
      toast({ title: "Added to Wishlist" });
    }
    localStorage.setItem("travel_lab_wishlist", JSON.stringify(wishlist));
  };

  return (
    <Card className="overflow-hidden flex flex-col hover:shadow-lg transition-shadow group relative h-full" data-testid="holiday-package-card">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={pkg.image} 
          alt={pkg.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
        />
        {pkg.discountPercent > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold shadow-sm">
            {pkg.discountPercent}% OFF
          </div>
        )}
        <button 
          onClick={handleWishlist}
          className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm p-1.5 rounded-full text-muted-foreground hover:text-red-500 transition-colors shadow-sm"
          data-testid="holiday-package-wishlist-button"
        >
          <Heart size={16} className={isWishlisted ? "fill-red-500 text-red-500" : ""} />
        </button>
      </div>
      <CardContent className="p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center gap-1 text-sm text-muted-foreground bg-muted/50 px-2 py-1 rounded" data-testid="holiday-package-destination">
            <MapPin size={12} /> {pkg.destination}
          </div>
          <div className="flex items-center gap-1 text-yellow-500 text-sm font-medium" data-testid="holiday-package-rating">
            <Star size={14} className="fill-current" /> {pkg.rating} <span className="text-muted-foreground text-xs">({pkg.reviewCount})</span>
          </div>
        </div>
        
        <h3 className="text-lg font-bold mb-1 group-hover:text-primary transition-colors line-clamp-2 min-h-[3.5rem]" data-testid="holiday-package-title">
          {pkg.title}
        </h3>
        
        <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
          <span className="flex items-center gap-1"><Clock size={14} /> {pkg.durationDays}D / {pkg.durationNights}N</span>
          <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-xs">{pkg.packageType}</span>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
          {pkg.shortDescription}
        </p>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {pkg.tags?.slice(0, 3).map(tag => (
            <span key={tag} className="text-[10px] bg-secondary px-2 py-1 rounded-md text-secondary-foreground">{tag}</span>
          ))}
        </div>
        
        <div className="flex justify-between items-end border-t pt-4 mt-auto">
          <div>
            <p className="text-[10px] text-muted-foreground uppercase font-medium">Starting from</p>
            <div className="flex items-baseline gap-2">
              <p className="text-xl font-bold text-primary" data-testid="holiday-package-price">₹{pkg.pricePerPerson.toLocaleString()}</p>
              {pkg.originalPrice > pkg.pricePerPerson && (
                <p className="text-xs text-muted-foreground line-through">₹{pkg.originalPrice.toLocaleString()}</p>
              )}
            </div>
            <p className="text-[10px] text-muted-foreground">per person</p>
          </div>
        </div>
        
        <div className="flex flex-col gap-2 mt-4">
          <Button 
            onClick={() => navigate(`/holiday-packages/${pkg.id}`)} 
            className="w-full" 
            variant="default"
            data-testid="holiday-package-view-details-button"
          >
            View Details
          </Button>
          <div className="grid grid-cols-2 gap-2">
            <Button 
              onClick={() => navigate(`/holiday-packages/booking/${pkg.id}`)} 
              variant="secondary"
              data-testid="holiday-package-book-button"
            >
              Book Now
            </Button>
            <Button 
              onClick={() => navigate(`/holiday-packages/enquiry/${pkg.id}`)} 
              variant="outline"
              data-testid="holiday-package-enquire-button"
            >
              Enquire
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
