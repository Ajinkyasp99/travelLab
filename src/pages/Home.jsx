import { useNavigate } from "react-router-dom";
import SearchTabs from "@/components/common/SearchTabs";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="pb-16">
      {/* Hero Section */}
      <section className="relative bg-primary/90 text-primary-foreground py-20 px-4">
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <img src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop" alt="Travel Background" className="w-full h-full object-cover" />
        </div>
        <div className="container mx-auto relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
            Discover Your Next Adventure
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-8 font-medium">
            A static travel booking automation practice site for Selenium and other test automation tools.
          </p>
        </div>
      </section>

      {/* Search Widget */}
      <section className="px-4">
        <SearchTabs />
      </section>

      {/* Popular Destinations */}
      <section className="container mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Popular Destinations</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { id: 1, name: "Paris, France", img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=800&auto=format&fit=crop" },
            { id: 2, name: "Bali, Indonesia", img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=800&auto=format&fit=crop" },
            { id: 3, name: "Tokyo, Japan", img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=800&auto=format&fit=crop" },
            { id: 4, name: "New York, USA", img: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=800&auto=format&fit=crop" },
          ].map(dest => (
            <div 
              key={dest.id} 
              className="group relative rounded-xl overflow-hidden cursor-pointer shadow-md"
              onClick={() => navigate(`/destinations/${dest.name.split(',')[0]}`)}
              data-testid={`popular-destination-${dest.id}`}
            >
              <div className="aspect-[4/5] w-full">
                <img src={dest.img} alt={dest.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6">
                <h3 className="text-xl font-bold text-white">{dest.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
