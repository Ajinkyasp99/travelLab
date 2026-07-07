import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchTabs from "@/components/common/SearchTabs";
import { Sparkles, MapPin, ArrowRight, ArrowUp } from "lucide-react";

const allDestinations = [
  { id: 1, name: "Paris, France", img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=800&auto=format&fit=crop", tours: 12 },
  { id: 2, name: "Bali, Indonesia", img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=800&auto=format&fit=crop", tours: 24 },
  { id: 3, name: "Tokyo, Japan", img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=800&auto=format&fit=crop", tours: 18 },
  { id: 4, name: "New York, USA", img: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=800&auto=format&fit=crop", tours: 8 },
  { id: 5, name: "Rome, Italy", img: "https://images.unsplash.com/photo-1552832230-c0197dd311f5?q=80&w=800&auto=format&fit=crop", tours: 15 },
  { id: 6, name: "Dubai, UAE", img: "https://images.unsplash.com/photo-1512453979436-5a53301719c9?q=80&w=800&auto=format&fit=crop", tours: 32 },
  { id: 7, name: "Santorini, Greece", img: "https://images.unsplash.com/photo-1570077173024-ce5a56f5b999?q=80&w=800&auto=format&fit=crop", tours: 9 },
  { id: 8, name: "Maldives", img: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=800&auto=format&fit=crop", tours: 11 },
];

export default function Home() {
  const navigate = useNavigate();
  const [showAllDestinations, setShowAllDestinations] = useState(false);
  const displayedDestinations = showAllDestinations ? allDestinations : allDestinations.slice(0, 4);

  return (
    <div className="pb-16 bg-background">
      {/* Immersive Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col justify-center px-4 overflow-hidden">
        {/* Background Video or Image Layer */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/30 via-background/40 to-background z-10" />
          <img 
            src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop" 
            alt="Travel Background" 
            className="w-full h-full object-cover animate-[float_20s_ease-in-out_infinite] scale-110" 
          />
        </div>
        
        {/* Content Layer */}
        <div className="container mx-auto relative z-10 w-full mt-20 mb-10">
          <div className="text-center max-w-4xl mx-auto mb-12 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white mb-6 shadow-glow">
              <Sparkles size={16} className="text-secondary" />
              <span className="text-sm font-semibold tracking-wide uppercase">Your Next Journey Begins Here</span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tight text-white drop-shadow-lg leading-tight">
              Discover The <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-secondary">
                World With Us
              </span>
            </h1>
            <p className="text-lg md:text-2xl text-white/90 max-w-2xl mx-auto font-medium drop-shadow-md">
              Experience seamless bookings, luxury stays, and unforgettable adventures.
            </p>
          </div>

          {/* Floating Search Widget */}
          <div className="max-w-5xl mx-auto glass rounded-3xl p-2 shadow-2xl animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <SearchTabs />
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="container mx-auto py-24 px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-black mb-4">Trending <span className="text-primary">Destinations</span></h2>
            <p className="text-muted-foreground text-lg">Explore the most sought-after locations for your next holiday.</p>
          </div>
          <button 
            onClick={() => setShowAllDestinations(!showAllDestinations)}
            className="hidden md:flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all"
          >
            {showAllDestinations ? "Show less" : "See all destinations"} {showAllDestinations ? <ArrowUp size={20} /> : <ArrowRight size={20} />}
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {displayedDestinations.map((dest, idx) => (
            <div 
              key={dest.id} 
              className="group relative rounded-3xl overflow-hidden cursor-pointer shadow-soft hover-lift animate-fade-in-up"
              style={{ animationDelay: `${0.1 * (idx % 4)}s` }}
              onClick={() => navigate(`/destinations/${dest.name.split(',')[0]}`)}
              data-testid={`popular-destination-${dest.id}`}
            >
              <div className="aspect-[3/4] w-full">
                <img src={dest.img} alt={dest.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-6">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-2xl font-bold text-white mb-2">{dest.name}</h3>
                  <div className="flex items-center gap-2 text-white/80 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                    <MapPin size={16} className="text-secondary" /> {dest.tours} Packages Available
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button 
          onClick={() => setShowAllDestinations(!showAllDestinations)}
          className="md:hidden w-full mt-8 flex items-center justify-center gap-2 text-primary font-bold py-4 bg-primary/10 rounded-xl"
        >
          {showAllDestinations ? "Show less" : "See all destinations"} {showAllDestinations ? <ArrowUp size={20} /> : <ArrowRight size={20} />}
        </button>
      </section>
    </div>
  );
}
