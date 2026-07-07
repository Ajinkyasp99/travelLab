import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { holidayPackages } from "@/data/holidayPackages";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

export default function HolidayPackageEnquiryPage() {
  const { packageId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const pkg = holidayPackages?.find(p => p.id === packageId);

  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", travelMonth: "", travellers: "", budget: "", message: "", preferredCallbackTime: "Anytime"
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [refId, setRefId] = useState("");

  if (!pkg) return <div className="text-center py-24">Package not found</div>;

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email || !formData.email.includes("@")) newErrors.email = "Valid email is required";
    if (!formData.phone || formData.phone.length < 10) newErrors.phone = "Valid phone number is required";
    if (!formData.travellers) newErrors.travellers = "Number of travellers is required";
    if (!formData.budget) newErrors.budget = "Budget is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const generatedId = `TL-ENQ-${new Date().toISOString().split('T')[0].replace(/-/g, '')}-${Math.floor(Math.random() * 1000)}`;
      
      const enquiry = {
        enquiryId: generatedId,
        packageId: pkg.id,
        packageTitle: pkg.title,
        ...formData,
        status: "submitted",
        createdAt: new Date().toISOString()
      };
      
      const enquiries = JSON.parse(localStorage.getItem("travel_lab_package_enquiries") || "[]");
      enquiries.push(enquiry);
      localStorage.setItem("travel_lab_package_enquiries", JSON.stringify(enquiries));
      
      setRefId(generatedId);
      setIsSubmitted(true);
      toast({ title: "Enquiry submitted successfully", description: `Ref ID: ${generatedId}` });
    }
  };

  if (isSubmitted) {
    return (
      <div className="container mx-auto py-16 px-4 max-w-2xl text-center">
        <CheckCircle2 size={64} className="text-green-500 mx-auto mb-6" />
        <h1 className="text-3xl font-bold mb-4" data-testid="package-enquiry-success-message">Enquiry Submitted!</h1>
        <p className="text-muted-foreground mb-8">Thank you for your interest in <strong>{pkg.title}</strong>. Our travel experts will contact you shortly.</p>
        
        <Card className="bg-muted/30 border-dashed mb-8">
          <CardContent className="pt-6">
            <p className="text-sm font-medium mb-1 uppercase tracking-wider">Your Reference ID</p>
            <p className="text-2xl font-bold font-mono" data-testid="package-enquiry-reference-id">{refId}</p>
          </CardContent>
        </Card>
        
        <Button onClick={() => navigate("/holiday-packages")}>Explore More Packages</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4 max-w-5xl">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft size={16} /> Back to Package
      </button>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Send Enquiry</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6" data-testid="package-enquiry-form">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Full Name *</label>
                    <Input 
                      value={formData.name} 
                      onChange={e => setFormData({...formData, name: e.target.value})} 
                      data-testid="package-enquiry-name-input" 
                    />
                    {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email *</label>
                    <Input 
                      type="email" 
                      value={formData.email} 
                      onChange={e => setFormData({...formData, email: e.target.value})} 
                      data-testid="package-enquiry-email-input" 
                    />
                    {errors.email && <p className="text-destructive text-xs mt-1" data-testid="package-enquiry-email-error">{errors.email}</p>}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Phone Number *</label>
                    <Input 
                      value={formData.phone} 
                      onChange={e => setFormData({...formData, phone: e.target.value})} 
                      data-testid="package-enquiry-phone-input" 
                    />
                    {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Travel Month</label>
                    <Input 
                      placeholder="e.g. August 2026" 
                      value={formData.travelMonth} 
                      onChange={e => setFormData({...formData, travelMonth: e.target.value})} 
                      data-testid="package-enquiry-travel-month-input" 
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Number of Travellers *</label>
                    <Input 
                      type="number" 
                      value={formData.travellers} 
                      onChange={e => setFormData({...formData, travellers: e.target.value})} 
                      data-testid="package-enquiry-travellers-input" 
                    />
                    {errors.travellers && <p className="text-destructive text-xs mt-1">{errors.travellers}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Total Budget (₹) *</label>
                    <Input 
                      type="number" 
                      value={formData.budget} 
                      onChange={e => setFormData({...formData, budget: e.target.value})} 
                      data-testid="package-enquiry-budget-input" 
                    />
                    {errors.budget && <p className="text-destructive text-xs mt-1">{errors.budget}</p>}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Any Special Request / Message</label>
                  <textarea 
                    className="w-full border rounded-md p-3 text-sm min-h-[100px] outline-none focus:ring-2 focus:ring-primary bg-background"
                    value={formData.message} 
                    onChange={e => setFormData({...formData, message: e.target.value})} 
                    data-testid="package-enquiry-message-input"
                  />
                </div>
                
                <Button type="submit" size="lg" className="w-full sm:w-auto px-8" data-testid="package-enquiry-submit-button">
                  Submit Enquiry
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-1">
          <Card className="bg-muted/30">
            <CardContent className="pt-6">
              <h3 className="font-bold text-lg mb-4">Package Summary</h3>
              <img src={pkg.image} alt={pkg.title} className="w-full h-32 object-cover rounded-md mb-4" />
              <p className="font-bold mb-1">{pkg.title}</p>
              <p className="text-sm text-muted-foreground mb-4">{pkg.durationDays} Days • {pkg.destination}</p>
              <div className="border-t pt-4">
                <p className="text-sm text-muted-foreground">Starting from</p>
                <p className="text-2xl font-bold text-primary">₹{pkg.pricePerPerson.toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
