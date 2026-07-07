import { useState } from "react";
import { BedDouble, Plane, Train, Bus, Car, Building, Building2, Umbrella } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export default function SearchTabs() {
  const [activeTab, setActiveTab] = useState("hotel");
  const navigate = useNavigate();

  const tabs = [
    { id: "hotel", label: "Hotels", icon: <Building2 size={18} /> },
    { id: "flight", label: "Flights", icon: <Plane size={18} /> },
    { id: "train", label: "Trains", icon: <Train size={18} /> },
    { id: "bus", label: "Buses", icon: <Bus size={18} /> },
    { id: "cab", label: "Cabs", icon: <Car size={18} /> },
    { id: "package", label: "Holiday Packages", icon: <Umbrella size={18} /> },
  ];

  const [destination, setDestination] = useState("");
  const [origin, setOrigin] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const { toast } = useToast();

  const handleSearch = (e) => {
    e.preventDefault();
    
    if (!destination || !fromDate || !toDate || !origin) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields (From, To, and Dates) to proceed.",
        variant: "destructive",
      });
      return;
    }
    
    const today = new Date().toISOString().split('T')[0];
    
    if (fromDate < today) {
      toast({
        title: "Invalid Date",
        description: "The From Date cannot be in the past. Please select a valid date.",
        variant: "destructive",
      });
      return;
    }

    if (toDate < fromDate) {
      toast({
        title: "Invalid Date",
        description: "The To Date cannot be earlier than the From Date.",
        variant: "destructive",
      });
      return;
    }

    let query = `?search=${encodeURIComponent(destination)}&origin=${encodeURIComponent(origin)}`;
    
    if (activeTab === "hotel") {
      navigate(`/hotels${query}`);
    } else if (activeTab === "flight") {
      navigate(`/flights${query}`);
    } else if (activeTab === "train") {
      navigate(`/trains${query}`);
    } else if (activeTab === "bus") {
      navigate(`/buses${query}`);
    } else if (activeTab === "cab") {
      navigate(`/cabs${query}`);
    } else if (activeTab === "package") {
      navigate(`/holiday-packages${query}`);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-card rounded-xl shadow-lg border -mt-12 relative z-10 p-2">
      <div className="flex overflow-x-auto pb-2 border-b scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-3 font-medium text-sm whitespace-nowrap transition-colors border-b-2 ${
              activeTab === tab.id
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>
      
      <div className="p-6">
        <form onSubmit={handleSearch} className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="col-span-1">
              <label className="block text-xs font-medium text-muted-foreground mb-1 uppercase">From</label>
              <input 
                type="text" 
                placeholder="Leaving from" 
                data-testid={`${activeTab}-origin-input`}
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="w-full p-3 bg-muted/50 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm" 
              />
            </div>
            
            <div className="col-span-1">
              <label className="block text-xs font-medium text-muted-foreground mb-1 uppercase">To</label>
              <input 
                type="text" 
                placeholder="Going to" 
                data-testid={`${activeTab}-destination-input`}
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full p-3 bg-muted/50 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm" 
              />
            </div>
            
            <div className="col-span-1">
              <label className="block text-xs font-medium text-muted-foreground mb-1 uppercase">From Date</label>
              <input 
                type="date" 
                data-testid={`${activeTab}-from-date`}
                min={new Date().toISOString().split('T')[0]}
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="w-full p-3 bg-muted/50 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm" 
              />
            </div>

            <div className="col-span-1">
              <label className="block text-xs font-medium text-muted-foreground mb-1 uppercase">To Date</label>
              <input 
                type="date" 
                data-testid={`${activeTab}-to-date`}
                min={fromDate || new Date().toISOString().split('T')[0]}
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="w-full p-3 bg-muted/50 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm" 
              />
            </div>
          </div>
          
          <div className="flex justify-center mt-2">
            <button 
              type="submit" 
              data-testid={`${activeTab}-search-button`}
              className="w-full md:w-1/3 bg-primary text-primary-foreground font-bold p-3.5 rounded-md hover:bg-primary/90 shadow-soft hover-lift transition-all text-base tracking-wide"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
