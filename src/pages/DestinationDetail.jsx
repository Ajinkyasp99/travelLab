import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin, ArrowLeft } from "lucide-react";

export default function DestinationDetail() {
  const { name } = useParams();
  const navigate = useNavigate();

  // For this mock app, we'll just show a nice placeholder destination page
  return (
    <div className="container mx-auto py-12 px-4 min-h-screen">
      <Button 
        variant="ghost" 
        className="mb-6 flex items-center gap-2" 
        onClick={() => navigate(-1)}
        data-testid="back-button"
      >
        <ArrowLeft size={16} /> Back
      </Button>

      <div className="relative rounded-2xl overflow-hidden h-[400px] mb-8 shadow-xl">
        <img 
          src={`https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1600&auto=format&fit=crop`} 
          alt={name} 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-black/40 flex items-end p-8">
          <div>
            <h1 className="text-5xl font-bold text-white mb-2" data-testid="destination-title">{name}</h1>
            <div className="flex items-center text-white/90 gap-2 text-lg">
              <MapPin size={20} /> Popular Destination
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card rounded-xl p-6 border shadow-sm">
            <h2 className="text-2xl font-bold mb-4">About {name}</h2>
            <p className="text-muted-foreground leading-relaxed">
              Explore the amazing sights, sounds, and experiences of {name}. From world-class dining to historic monuments, {name} offers an unforgettable adventure for every type of traveler. This page serves as a placeholder for detailed destination guides.
            </p>
          </div>
          
          <div className="bg-card rounded-xl p-6 border shadow-sm">
            <h2 className="text-2xl font-bold mb-4">Top Attractions</h2>
            <ul className="list-disc pl-5 text-muted-foreground space-y-2">
              <li>Iconic City Landmarks</li>
              <li>Local Cultural Tours</li>
              <li>Premium Shopping Districts</li>
              <li>World-Renowned Museums</li>
            </ul>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-card rounded-xl p-6 border shadow-sm">
            <h3 className="text-xl font-bold mb-4">Plan Your Trip</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Ready to explore {name}? Check out our holiday packages and book your next adventure today.
            </p>
            <Button 
              className="w-full" 
              onClick={() => navigate("/holiday-packages")}
              data-testid="view-packages-button"
            >
              View Packages
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
