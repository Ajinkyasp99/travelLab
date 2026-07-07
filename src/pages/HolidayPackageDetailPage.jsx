import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star, MapPin, Clock, Calendar as CalendarIcon, Check, X, Shield, Plane, Utensils, Bed, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  const [activeTab, setActiveTab] = useState("overview");
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
    <div className="bg-background pb-12">
      {/* Immersive Edge-to-Edge Hero Banner */}
      <div className="relative w-full h-[60vh] min-h-[400px] mb-8">
        <img 
          src={pkg.image} 
          alt={pkg.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end">
          <div className="container mx-auto px-4 pb-12 w-full max-w-7xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
              <div className="text-white">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-lg">{pkg.category}</span>
                  <span className="flex items-center gap-1 text-sm font-medium bg-black/30 backdrop-blur-md px-3 py-1 rounded-full">
                    <MapPin size={14} /> {pkg.destination}, {pkg.country}
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 drop-shadow-md" data-testid="package-detail-title">{pkg.title}</h1>
                <div className="flex flex-wrap items-center gap-4 text-sm md:text-base font-medium drop-shadow-sm">
                  <span className="flex items-center gap-1 text-yellow-400 font-bold bg-black/40 px-3 py-1.5 rounded-full" data-testid="package-detail-rating">
                    <Star size={16} className="fill-current" /> {pkg.rating} ({pkg.reviewCount} Reviews)
                  </span>
                  <span className="flex items-center gap-1 bg-black/40 px-3 py-1.5 rounded-full">
                    <Clock size={16} /> {pkg.durationDays} Days / {pkg.durationNights} Nights
                  </span>
                </div>
              </div>
              
              <div className="bg-background/95 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border text-foreground w-full md:w-80 flex flex-col justify-between">
                <div>
                  <p className="text-sm text-muted-foreground uppercase font-bold mb-1 tracking-wider">Starting From</p>
                  <div className="flex items-baseline gap-2 mb-1">
                    <p className="text-4xl font-extrabold text-primary" data-testid="package-detail-price">₹{pkg.pricePerPerson.toLocaleString()}</p>
                  </div>
                  {pkg.originalPrice > pkg.pricePerPerson && (
                    <p className="text-sm text-muted-foreground line-through mb-1">₹{pkg.originalPrice.toLocaleString()}</p>
                  )}
                  <p className="text-xs text-muted-foreground mb-4">per person on twin sharing</p>
                </div>
                <Button onClick={handleWishlist} variant="outline" className="w-full border-primary/50 hover:bg-primary/5 font-semibold">
                  Save to Wishlist
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Left Main Content */}
          <div className="lg:col-span-2">
            
            {/* Custom Tabs */}
            <div className="flex overflow-x-auto gap-2 border-b mb-8 no-scrollbar pb-2">
              {["overview", "itinerary", "policies"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 font-semibold text-sm transition-all rounded-t-lg capitalize whitespace-nowrap ${
                    activeTab === tab 
                    ? "bg-primary text-primary-foreground shadow-md" 
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Contents */}
            <div className="min-h-[500px]">
              
              {/* Overview Tab */}
              {activeTab === "overview" && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
                  <section>
                    <h2 className="text-2xl font-bold mb-4">About This Package</h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">{pkg.description}</p>
                  </section>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-5 bg-card rounded-xl border shadow-sm flex flex-col items-center justify-center text-center transition-transform hover:-translate-y-1">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                        <Bed className="text-primary" size={24} />
                      </div>
                      <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider mb-1">Hotel</p>
                      <p className="font-semibold">{pkg.hotelCategory}</p>
                    </div>
                    <div className="p-5 bg-card rounded-xl border shadow-sm flex flex-col items-center justify-center text-center transition-transform hover:-translate-y-1">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                        <Utensils className="text-primary" size={24} />
                      </div>
                      <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider mb-1">Meals</p>
                      <p className="font-semibold">{pkg.mealPlan}</p>
                    </div>
                    <div className="p-5 bg-card rounded-xl border shadow-sm flex flex-col items-center justify-center text-center transition-transform hover:-translate-y-1">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                        <Plane className="text-primary" size={24} />
                      </div>
                      <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider mb-1">Flights</p>
                      <p className="font-semibold">{pkg.flightIncluded ? "Included" : "Excluded"}</p>
                    </div>
                    <div className="p-5 bg-card rounded-xl border shadow-sm flex flex-col items-center justify-center text-center transition-transform hover:-translate-y-1">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                        <Shield className="text-primary" size={24} />
                      </div>
                      <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider mb-1">Type</p>
                      <p className="font-semibold">{pkg.packageType}</p>
                    </div>
                  </div>

                  <section>
                    <h2 className="text-2xl font-bold mb-6">Key Highlights</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {pkg.highlights?.map((highlight, idx) => (
                        <div key={idx} className="flex gap-3 bg-muted/20 p-4 rounded-lg border border-border/50">
                          <Check className="text-primary shrink-0 mt-0.5" size={20} />
                          <span className="text-sm font-medium leading-relaxed">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                  
                  {pkg.gallery?.length > 0 && (
                    <section>
                      <h2 className="text-2xl font-bold mb-6">Gallery</h2>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {pkg.gallery.slice(0, 4).map((img, idx) => (
                          <div key={idx} className="aspect-square rounded-xl overflow-hidden shadow-sm group relative">
                            <img src={img} alt="gallery" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                          </div>
                        ))}
                      </div>
                    </section>
                  )}
                </div>
              )}

              {/* Itinerary Tab */}
              {activeTab === "itinerary" && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <h2 className="text-2xl font-bold mb-6">Day-by-Day Itinerary</h2>
                  <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent" data-testid="package-itinerary-accordion">
                    {pkg.itinerary?.map((day, idx) => (
                      <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-primary text-primary-foreground font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-md z-10">
                          {day.day}
                        </div>
                        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border bg-card shadow-sm hover:shadow-md transition-shadow">
                          <button 
                            className="w-full flex items-center justify-between text-left"
                            onClick={() => setOpenAccordion(openAccordion === idx ? null : idx)}
                          >
                            <h3 className="font-bold text-lg">{day.title}</h3>
                            <span className="text-primary font-bold ml-2">{openAccordion === idx ? "-" : "+"}</span>
                          </button>
                          {openAccordion === idx && (
                            <div className="mt-4 pt-4 border-t text-muted-foreground text-sm leading-relaxed animate-in fade-in slide-in-from-top-2">
                              {day.activities}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Policies Tab */}
              {activeTab === "policies" && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
                  <section className="bg-card border rounded-2xl p-6 md:p-8 shadow-sm">
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                      <Check className="text-green-500" /> What's Included
                    </h2>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                      {pkg.inclusions?.map((inc, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm">
                          <Check className="text-green-500 shrink-0 mt-0.5" size={16} />
                          <span className="leading-tight">{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                  
                  <section className="bg-card border rounded-2xl p-6 md:p-8 shadow-sm">
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                      <X className="text-red-500" /> What's Excluded
                    </h2>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                      {pkg.exclusions?.map((exc, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm">
                          <X className="text-red-500 shrink-0 mt-0.5" size={16} />
                          <span className="leading-tight text-muted-foreground">{exc}</span>
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section className="bg-muted/30 border rounded-2xl p-6 md:p-8">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <Info className="text-primary" /> Cancellation Policy
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {pkg.cancellationPolicy}
                    </p>
                  </section>
                </div>
              )}

            </div>
          </div>

          {/* Right Sidebar - Sticky Booking Box */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <Card className="shadow-xl border-primary/20 overflow-hidden">
                <div className="bg-primary p-4 text-primary-foreground text-center">
                  <h3 className="font-bold text-lg">Ready to Book?</h3>
                  <p className="text-primary-foreground/80 text-sm">Secure your spot today</p>
                </div>
                <CardContent className="p-6">
                  <div className="space-y-5">
                    <div>
                      <label className="text-sm font-semibold mb-2 block">Select Travel Date</label>
                      <div className="relative">
                        <CalendarIcon className="absolute left-3 top-3 text-muted-foreground" size={18} />
                        <select 
                          className="w-full pl-10 p-3 border rounded-lg bg-background focus:ring-2 focus:ring-primary outline-none appearance-none font-medium"
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                        >
                          <option value="" disabled>Choose a date</option>
                          {pkg.availableDates?.map(date => (
                            <option key={date} value={date}>{new Date(date).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' })}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    <div className="bg-muted/50 p-4 rounded-xl border border-dashed flex justify-between items-center">
                      <span className="text-sm font-medium text-muted-foreground">Total Price</span>
                      <span className="text-2xl font-black text-primary">₹{pkg.pricePerPerson.toLocaleString()}</span>
                    </div>

                    <div className="flex flex-col gap-3 pt-2">
                      <Button 
                        size="lg" 
                        className="w-full text-lg h-14 font-bold shadow-lg hover:shadow-xl transition-shadow"
                        onClick={() => navigate(`/holiday-packages/book/${pkg.id}`)}
                      >
                        Book Now
                      </Button>
                      <Button 
                        variant="outline" 
                        size="lg" 
                        className="w-full h-14 font-bold border-2"
                        onClick={() => navigate(`/holiday-packages/enquiry/${pkg.id}`)}
                      >
                        Send Enquiry
                      </Button>
                    </div>
                    
                    <div className="text-center text-xs text-muted-foreground flex items-center justify-center gap-1 mt-4">
                      <Shield size={12} /> Safe & Secure Payments
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
