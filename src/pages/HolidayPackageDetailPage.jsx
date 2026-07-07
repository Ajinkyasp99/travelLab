import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star, MapPin, Clock, Calendar as CalendarIcon, Check, X, Shield, Plane, Utensils, Bed, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HolidayPackageCard } from "@/components/packages/HolidayPackageCard";
import { holidayPackages } from "@/data/holidayPackages";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export default function HolidayPackageDetailPage() {
  const { packageId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { toast } = useToast();
  
  const pkg = holidayPackages?.find(p => p.id === packageId);
  const [selectedDate, setSelectedDate] = useState(pkg?.availableDates?.[0] || "");
  const [openAccordion, setOpenAccordion] = useState(null);

  if (!pkg) {
    return <div className="container mx-auto py-24 text-center text-xl font-bold">Package not found</div>;
  }

  const handleWishlist = () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }
    const wishlist = JSON.parse(localStorage.getItem("travel_lab_wishlist") || "[]");
    const exists = wishlist.some(item => item.itemId === pkg.id);
    if (!exists) {
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
      localStorage.setItem("travel_lab_wishlist", JSON.stringify(wishlist));
      toast({ title: "Added to Wishlist" });
    } else {
      toast({ title: "Already in Wishlist" });
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      {/* Header & Gallery */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-bold uppercase tracking-wider">{pkg.category}</span>
              <span className="flex items-center gap-1 text-sm font-medium text-muted-foreground">
                <MapPin size={14} /> {pkg.destination}, {pkg.country}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3" data-testid="package-detail-title">{pkg.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
              <span className="flex items-center gap-1 text-yellow-500" data-testid="package-detail-rating">
                <Star size={16} className="fill-current" /> {pkg.rating} ({pkg.reviewCount} Reviews)
              </span>
              <span className="flex items-center gap-1 text-muted-foreground">
                <Clock size={16} /> {pkg.durationDays} Days / {pkg.durationNights} Nights
              </span>
            </div>
          </div>
          
          <div className="text-left md:text-right w-full md:w-auto p-4 bg-muted/30 md:bg-transparent rounded-lg border md:border-none">
            <p className="text-xs text-muted-foreground uppercase font-bold mb-1">Starting Price</p>
            <div className="flex items-baseline gap-2 justify-start md:justify-end mb-1">
              <p className="text-3xl font-bold text-primary" data-testid="package-detail-price">₹{pkg.pricePerPerson.toLocaleString()}</p>
              {pkg.originalPrice > pkg.pricePerPerson && (
                <p className="text-lg text-muted-foreground line-through">₹{pkg.originalPrice.toLocaleString()}</p>
              )}
            </div>
            <p className="text-xs text-muted-foreground mb-4">per person on twin sharing</p>
            <div className="flex gap-2">
              <Button onClick={handleWishlist} variant="outline" size="sm" className="hidden sm:flex">Add to Wishlist</Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 h-[300px] md:h-[450px] rounded-xl overflow-hidden" data-testid="package-detail-gallery">
          <div className="col-span-1 md:col-span-2 row-span-2 relative group cursor-pointer">
            <img src={pkg.image} alt="Main" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          </div>
          {pkg.gallery?.slice(0, 4).map((img, idx) => (
            <div key={idx} className="hidden md:block relative group cursor-pointer overflow-hidden">
              <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Overview */}
          <section id="overview" className="scroll-mt-20">
            <h2 className="text-2xl font-bold mb-4 border-b pb-2">Overview</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">{pkg.description}</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-muted/30 rounded-lg border text-center">
                <Bed className="mx-auto mb-2 text-primary" size={24} />
                <p className="text-xs text-muted-foreground font-medium uppercase">Hotel</p>
                <p className="font-bold">{pkg.hotelCategory}</p>
              </div>
              <div className="p-4 bg-muted/30 rounded-lg border text-center">
                <Utensils className="mx-auto mb-2 text-primary" size={24} />
                <p className="text-xs text-muted-foreground font-medium uppercase">Meals</p>
                <p className="font-bold">{pkg.mealPlan}</p>
              </div>
              <div className="p-4 bg-muted/30 rounded-lg border text-center">
                <Plane className="mx-auto mb-2 text-primary" size={24} />
                <p className="text-xs text-muted-foreground font-medium uppercase">Flights</p>
                <p className="font-bold">{pkg.flightIncluded ? "Included" : "Excluded"}</p>
              </div>
              <div className="p-4 bg-muted/30 rounded-lg border text-center">
                <Shield className="mx-auto mb-2 text-primary" size={24} />
                <p className="text-xs text-muted-foreground font-medium uppercase">Type</p>
                <p className="font-bold">{pkg.packageType}</p>
              </div>
            </div>
          </section>

          {/* Itinerary */}
          <section id="itinerary" className="scroll-mt-20">
            <h2 className="text-2xl font-bold mb-4 border-b pb-2">Itinerary</h2>
            <div className="space-y-4" data-testid="package-itinerary-accordion">
              {pkg.itinerary?.map((day, idx) => (
                <div key={idx} className="border rounded-lg overflow-hidden">
                  <button 
                    className="w-full flex items-center justify-between p-4 bg-muted/10 hover:bg-muted/30 transition-colors text-left"
                    onClick={() => setOpenAccordion(openAccordion === idx ? null : idx)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-primary text-primary-foreground font-bold px-3 py-1 rounded text-sm min-w-[60px] text-center">
                        Day {day.day}
                      </div>
                      <h4 className="font-bold text-lg">{day.title}</h4>
                    </div>
                    <span className="text-2xl text-muted-foreground leading-none">{openAccordion === idx ? "−" : "+"}</span>
                  </button>
                  {openAccordion === idx && (
                    <div className="p-4 bg-background border-t">
                      <p className="text-muted-foreground mb-4 leading-relaxed">{day.description}</p>
                      <div className="flex flex-wrap gap-4 text-sm font-medium">
                        <span className="flex items-center gap-1 bg-muted px-2 py-1 rounded"><Utensils size={14}/> {day.meals?.join(", ")}</span>
                        <span className="flex items-center gap-1 bg-muted px-2 py-1 rounded"><Bed size={14}/> Overnight in {day.stay}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Inclusions & Exclusions */}
          <section id="inclusions" className="scroll-mt-20">
            <h2 className="text-2xl font-bold mb-4 border-b pb-2">Inclusions & Exclusions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-green-100 bg-green-50/30">
                <CardHeader className="pb-3 border-b border-green-100">
                  <CardTitle className="text-green-700 flex items-center gap-2">
                    <Check size={20} /> What's Included
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4" data-testid="package-inclusions-list">
                  <ul className="space-y-3">
                    {pkg.inclusions?.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <Check size={16} className="text-green-500 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="border-red-100 bg-red-50/30">
                <CardHeader className="pb-3 border-b border-red-100">
                  <CardTitle className="text-red-700 flex items-center gap-2">
                    <X size={20} /> What's Excluded
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4" data-testid="package-exclusions-list">
                  <ul className="space-y-3">
                    {pkg.exclusions?.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <X size={16} className="text-red-400 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Policies */}
          <section id="policies" className="scroll-mt-20">
            <h2 className="text-2xl font-bold mb-4 border-b pb-2">Policies & Info</h2>
            <div className="space-y-4">
              <div>
                <h4 className="font-bold flex items-center gap-2 mb-1"><Info size={16} className="text-primary"/> Cancellation Policy</h4>
                <p className="text-sm text-muted-foreground">{pkg.cancellationPolicy}</p>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar Sticky Booking Card */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24 border-primary/20 shadow-lg">
            <CardHeader className="bg-muted/30 border-b pb-4">
              <CardTitle>Book this Package</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="mb-6">
                <label className="block text-sm font-bold mb-2">Select Departure Date</label>
                <select 
                  className="w-full border rounded-md p-3 outline-none focus:ring-2 focus:ring-primary bg-background"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  data-testid="package-available-date"
                >
                  <option value="" disabled>Select Date</option>
                  {pkg.availableDates?.map(date => (
                    <option key={date} value={date}>{new Date(date).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' })}</option>
                  ))}
                </select>
              </div>
              
              <div className="bg-primary/5 p-4 rounded-lg mb-6 border border-primary/10">
                <div className="flex justify-between mb-2 text-sm">
                  <span>Price per adult</span>
                  <span className="font-bold">₹{pkg.pricePerPerson.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Taxes & Fees</span>
                  <span>Calculated next step</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <Button 
                  onClick={() => navigate(`/holiday-packages/booking/${pkg.id}`, { state: { selectedDate } })} 
                  className="w-full h-12 text-lg font-bold"
                  data-testid="package-detail-book-button"
                  disabled={!selectedDate}
                >
                  Proceed to Book
                </Button>
                <Button 
                  onClick={() => navigate(`/holiday-packages/enquiry/${pkg.id}`)} 
                  variant="outline" 
                  className="w-full h-12"
                  data-testid="package-detail-enquire-button"
                >
                  Request a Call Back
                </Button>
              </div>
              
              <p className="text-xs text-center text-muted-foreground mt-4">
                You won't be charged yet. Secure your spot today!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Similar Packages */}
      <section className="mt-16 border-t pt-12">
        <h2 className="text-2xl font-bold mb-6">Similar Packages You Might Like</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {holidayPackages?.filter(p => p.destination === pkg.destination && p.id !== pkg.id).slice(0, 3).map(similarPkg => (
            <HolidayPackageCard key={similarPkg.id} pkg={similarPkg} />
          ))}
        </div>
      </section>
    </div>
  );
}
