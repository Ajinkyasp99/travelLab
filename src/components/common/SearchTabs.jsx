import { useState } from "react";
import { BedDouble, Plane, Train, Bus, Car, Building, Building2, Umbrella } from "lucide-react";
import { useNavigate } from "react-router-dom";

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

  const handleSearch = (e) => {
    e.preventDefault();
    if (activeTab === "hotel") {
      navigate("/hotels");
    } else if (activeTab === "flight") {
      navigate("/flights");
    } else if (activeTab === "train") {
      navigate("/trains");
    } else if (activeTab === "bus") {
      navigate("/buses");
    } else if (activeTab === "cab") {
      navigate("/cabs");
    } else if (activeTab === "package") {
      navigate("/packages");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-card rounded-xl shadow-lg border -mt-12 relative z-10 p-2">
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
        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-muted-foreground mb-1 uppercase">Destination</label>
            <input 
              type="text" 
              placeholder="Where are you going?" 
              data-testid={`${activeTab}-destination-input`}
              className="w-full p-3 bg-muted/50 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 text-lg" 
            />
          </div>
          
          <div className="md:col-span-1">
            <label className="block text-xs font-medium text-muted-foreground mb-1 uppercase">Date</label>
            <input 
              type="date" 
              className="w-full p-3 bg-muted/50 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50" 
            />
          </div>

          <div className="md:col-span-1 flex items-end">
            <button 
              type="submit" 
              data-testid={`${activeTab}-search-button`}
              className="w-full bg-primary text-primary-foreground font-bold p-3 rounded-md hover:bg-primary/90 transition-colors text-lg"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
