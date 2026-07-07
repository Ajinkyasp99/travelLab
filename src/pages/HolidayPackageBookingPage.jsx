import { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { holidayPackages } from "@/data/holidayPackages";
import { ArrowLeft, Check, Users, MapPin, Calendar, Clock } from "lucide-react";

export default function HolidayPackageBookingPage() {
  const { packageId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const pkg = holidayPackages?.find(p => p.id === packageId);
  const initialDate = location.state?.selectedDate || pkg?.availableDates?.[0] || "";

  const [step, setStep] = useState(1);
  const [agreed, setAgreed] = useState(false);
  
  const [bookingData, setBookingData] = useState({
    travelDate: initialDate,
    adults: 2,
    children: 0,
    travellers: [{ name: "", email: "", phone: "", age: "", gender: "Male", idType: "Aadhaar", idNumber: "" }],
    roomPreference: "Twin Sharing",
    mealPreference: "Veg",
    pickupCity: "",
    specialRequest: "",
    addons: []
  });

  if (!pkg) return <div className="text-center py-24">Package not found</div>;

  const availableAddons = [
    { id: "ins", name: "Travel Insurance", price: 499 },
    { id: "apt", name: "Airport Pickup", price: 1200 },
    { id: "cab", name: "Private Cab Upgrade", price: 3500 },
    { id: "din", name: "Candlelight Dinner", price: 2500 },
    { id: "upg", name: "Premium Hotel Upgrade", price: 5000 },
  ];

  const handleAddonToggle = (addonId) => {
    setBookingData(prev => {
      const exists = prev.addons.includes(addonId);
      if (exists) return { ...prev, addons: prev.addons.filter(id => id !== addonId) };
      return { ...prev, addons: [...prev.addons, addonId] };
    });
  };

  const handleTravellerChange = (index, field, value) => {
    const updated = [...bookingData.travellers];
    updated[index] = { ...updated[index], [field]: value };
    setBookingData({ ...bookingData, travellers: updated });
  };

  const handleAdultChange = (val) => {
    const num = Math.max(1, Number(val));
    const total = num + bookingData.children;
    const diff = total - bookingData.travellers.length;
    let newTravellers = [...bookingData.travellers];
    if (diff > 0) {
      for(let i=0; i<diff; i++) newTravellers.push({ name: "", email: "", phone: "", age: "", gender: "Male", idType: "Aadhaar", idNumber: "" });
    } else if (diff < 0) {
      newTravellers = newTravellers.slice(0, total);
    }
    setBookingData({ ...bookingData, adults: num, travellers: newTravellers });
  };

  const calculateTotal = () => {
    const base = pkg.pricePerPerson * (bookingData.adults + (bookingData.children * 0.5));
    const addonTotal = bookingData.addons.reduce((sum, id) => {
      return sum + (availableAddons.find(a => a.id === id)?.price || 0);
    }, 0);
    const taxes = (base + addonTotal) * 0.18;
    return { base, addonTotal, taxes, total: base + addonTotal + taxes };
  };

  const handleContinuePayment = () => {
    const { base, addonTotal, taxes, total } = calculateTotal();
    
    const draftBooking = {
      bookingId: `TL-PKG-${new Date().toISOString().split('T')[0].replace(/-/g, '')}-${Math.floor(Math.random() * 1000)}`,
      bookingType: "holiday_package",
      packageId: pkg.id,
      packageTitle: pkg.title,
      destination: pkg.destination,
      travelDate: bookingData.travelDate,
      travellers: bookingData.travellers,
      preferences: {
        room: bookingData.roomPreference,
        meal: bookingData.mealPreference,
        pickup: bookingData.pickupCity,
        request: bookingData.specialRequest
      },
      addOns: bookingData.addons,
      baseAmount: base,
      addOnAmount: addonTotal,
      taxes: taxes,
      totalAmount: total,
      status: "pending_payment",
      createdAt: new Date().toISOString()
    };
    
    localStorage.setItem("travel_lab_selected_package_booking", JSON.stringify(draftBooking));
    
    navigate("/payment", { state: { type: 'holiday_package', totalAmount: total, bookingId: draftBooking.bookingId } });
  };

  const renderStepper = () => (
    <div className="flex justify-between items-center mb-8 relative" data-testid="package-booking-stepper">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-muted -z-10"></div>
      <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary -z-10 transition-all duration-300" style={{ width: `${((step - 1) / 4) * 100}%` }}></div>
      
      {[1, 2, 3, 4, 5].map(s => (
        <div key={s} className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= s ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'} transition-colors`}>
          {step > s ? <Check size={16} /> : s}
        </div>
      ))}
    </div>
  );

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6" data-testid="package-booking-back-button">
        <ArrowLeft size={16} /> Back to Package
      </button>

      <h1 className="text-3xl font-bold mb-8">Book Holiday Package</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {renderStepper()}
          
          <Card className="min-h-[400px]">
            <CardHeader className="border-b bg-muted/20">
              <CardTitle>
                {step === 1 && "Package Summary & Dates"}
                {step === 2 && "Traveller Details"}
                {step === 3 && "Travel Preferences"}
                {step === 4 && "Add-ons & Upgrades"}
                {step === 5 && "Review Booking"}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              
              {/* STEP 1: SUMMARY & DATES */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg border">
                    <img src={pkg.image} alt={pkg.title} className="w-24 h-24 object-cover rounded-md" />
                    <div>
                      <h3 className="font-bold text-lg mb-1">{pkg.title}</h3>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1"><MapPin size={14}/> {pkg.destination}</span>
                        <span className="flex items-center gap-1"><Clock size={14}/> {pkg.durationDays} Days</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Travel Date</label>
                      <select 
                        className="w-full border rounded-md p-3 outline-none focus:ring-2 focus:ring-primary bg-background"
                        value={bookingData.travelDate}
                        onChange={(e) => setBookingData({...bookingData, travelDate: e.target.value})}
                        data-testid="package-booking-travel-date-input"
                      >
                        <option value="" disabled>Select Date</option>
                        {pkg.availableDates?.map(date => (
                          <option key={date} value={date}>{new Date(date).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' })}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Number of Adults</label>
                      <Input 
                        type="number" min="1" max={pkg.maxGuests} 
                        value={bookingData.adults} 
                        onChange={(e) => handleAdultChange(e.target.value)}
                        data-testid="package-booking-adult-count-input"
                      />
                    </div>
                  </div>
                </div>
              )}
              
              {/* STEP 2: TRAVELLERS */}
              {step === 2 && (
                <div className="space-y-8">
                  {bookingData.travellers.map((traveller, index) => (
                    <div key={index} className="border rounded-lg p-4 bg-background">
                      <h4 className="font-bold mb-4 flex items-center gap-2 border-b pb-2">
                        <Users size={16} className="text-primary"/> 
                        {index === 0 ? "Lead Traveller" : `Traveller ${index + 1}`}
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium mb-1">Full Name</label>
                          <Input 
                            value={traveller.name} 
                            onChange={(e) => handleTravellerChange(index, "name", e.target.value)} 
                            data-testid={index === 0 ? "package-booking-traveller-name-input" : ""}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium mb-1">Age</label>
                          <Input 
                            type="number" 
                            value={traveller.age} 
                            onChange={(e) => handleTravellerChange(index, "age", e.target.value)} 
                          />
                        </div>
                        {index === 0 && (
                          <>
                            <div>
                              <label className="block text-xs font-medium mb-1">Email</label>
                              <Input 
                                type="email" 
                                value={traveller.email} 
                                onChange={(e) => handleTravellerChange(index, "email", e.target.value)} 
                                data-testid="package-booking-email-input"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium mb-1">Phone</label>
                              <Input 
                                value={traveller.phone} 
                                onChange={(e) => handleTravellerChange(index, "phone", e.target.value)} 
                                data-testid="package-booking-phone-input"
                              />
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {/* STEP 3: PREFERENCES */}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Room Preference</label>
                      <select 
                        className="w-full border rounded-md p-3 outline-none focus:ring-2 focus:ring-primary bg-background"
                        value={bookingData.roomPreference}
                        onChange={(e) => setBookingData({...bookingData, roomPreference: e.target.value})}
                      >
                        <option value="Twin Sharing">Twin Sharing</option>
                        <option value="Single Room">Single Room (Extra Cost)</option>
                        <option value="Triple Sharing">Triple Sharing</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Meal Preference</label>
                      <select 
                        className="w-full border rounded-md p-3 outline-none focus:ring-2 focus:ring-primary bg-background"
                        value={bookingData.mealPreference}
                        onChange={(e) => setBookingData({...bookingData, mealPreference: e.target.value})}
                      >
                        <option value="Veg">Vegetarian</option>
                        <option value="Non-Veg">Non-Vegetarian</option>
                        <option value="Jain">Jain Food</option>
                        <option value="Any">Any</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Any Special Request</label>
                    <textarea 
                      className="w-full border rounded-md p-3 min-h-[100px] outline-none focus:ring-2 focus:ring-primary bg-background"
                      value={bookingData.specialRequest}
                      onChange={(e) => setBookingData({...bookingData, specialRequest: e.target.value})}
                      placeholder="E.g., early check-in, ground floor room..."
                    />
                  </div>
                </div>
              )}
              
              {/* STEP 4: ADDONS */}
              {step === 4 && (
                <div className="space-y-4">
                  <p className="text-muted-foreground mb-4">Enhance your trip with these optional add-ons.</p>
                  {availableAddons.map(addon => (
                    <div key={addon.id} className={`border rounded-lg p-4 flex items-center justify-between cursor-pointer transition-colors ${bookingData.addons.includes(addon.id) ? 'bg-primary/5 border-primary/50' : 'bg-background hover:bg-muted/30'}`} onClick={() => handleAddonToggle(addon.id)}>
                      <div className="flex items-center gap-3">
                        <Checkbox 
                          checked={bookingData.addons.includes(addon.id)} 
                          onCheckedChange={() => handleAddonToggle(addon.id)} 
                          data-testid="package-booking-addon-checkbox"
                        />
                        <span className="font-medium">{addon.name}</span>
                      </div>
                      <span className="font-bold">₹{addon.price.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              )}
              
              {/* STEP 5: REVIEW */}
              {step === 5 && (
                <div className="space-y-6">
                  <div className="bg-muted/30 p-4 rounded-lg border">
                    <h4 className="font-bold mb-2">Package Details</h4>
                    <p className="text-sm"><strong>{pkg.title}</strong></p>
                    <p className="text-sm text-muted-foreground">Date: {new Date(bookingData.travelDate).toLocaleDateString()} | {bookingData.adults} Adults</p>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-lg border">
                    <h4 className="font-bold mb-2">Lead Traveller</h4>
                    <p className="text-sm">{bookingData.travellers[0].name || "Not provided"}</p>
                    <p className="text-sm text-muted-foreground">{bookingData.travellers[0].email} | {bookingData.travellers[0].phone}</p>
                  </div>

                  <div className="flex items-start gap-2 pt-4 border-t">
                    <Checkbox 
                      id="terms" 
                      checked={agreed} 
                      onCheckedChange={setAgreed} 
                      data-testid="package-booking-terms-checkbox"
                    />
                    <label htmlFor="terms" className="text-sm leading-tight text-muted-foreground">
                      I agree to the <a href="#" className="text-primary hover:underline">Terms & Conditions</a> and <a href="#" className="text-primary hover:underline">Cancellation Policy</a>.
                    </label>
                  </div>
                </div>
              )}
              
            </CardContent>
            
            <div className="p-4 border-t flex justify-between bg-muted/10 rounded-b-lg">
              <Button 
                variant="outline" 
                onClick={() => setStep(s => Math.max(1, s - 1))}
                disabled={step === 1}
              >
                Back
              </Button>
              
              {step < 5 ? (
                <Button 
                  onClick={() => setStep(s => s + 1)}
                  data-testid="package-booking-next-button"
                  disabled={step === 1 && !bookingData.travelDate}
                >
                  Continue
                </Button>
              ) : (
                <Button 
                  onClick={handleContinuePayment}
                  data-testid="package-booking-continue-payment-button"
                  disabled={!agreed}
                >
                  Proceed to Payment
                </Button>
              )}
            </div>
          </Card>
        </div>

        {/* Sidebar Price Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24 shadow-sm" data-testid="package-booking-price-summary">
            <CardHeader className="bg-muted/30 border-b pb-4">
              <CardTitle>Price Summary</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="flex justify-between text-sm">
                <span>Base Price ({bookingData.adults} Adults)</span>
                <span>₹{calculateTotal().base.toLocaleString()}</span>
              </div>
              
              {bookingData.addons.length > 0 && (
                <div className="flex justify-between text-sm text-primary">
                  <span>Add-ons ({bookingData.addons.length})</span>
                  <span>+ ₹{calculateTotal().addonTotal.toLocaleString()}</span>
                </div>
              )}
              
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Taxes & Fees (18%)</span>
                <span>₹{calculateTotal().taxes.toLocaleString()}</span>
              </div>
              
              <div className="border-t pt-4 flex justify-between font-bold text-lg">
                <span>Total Amount</span>
                <span className="text-primary">₹{calculateTotal().total.toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
