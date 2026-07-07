import { useState, useMemo } from "react";
import { Search, MapPin, SlidersHorizontal, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { HolidayPackageCard } from "@/components/packages/HolidayPackageCard";
// We'll import the data once it's created. Using a fallback if not available yet.
import { holidayPackages as defaultPackages } from "@/data/holidayPackages";

export default function HolidayPackagesPage() {
  const packages = defaultPackages || [];
  
  // States
  const [searchQuery, setSearchQuery] = useState("");
  const [destinationFilter, setDestinationFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [durationFilter, setDurationFilter] = useState("");
  const [sortBy, setSortBy] = useState("Recommended");
  const [priceRange, setPriceRange] = useState([0, 200000]);

  const filteredPackages = useMemo(() => {
    return packages.filter(pkg => {
      // Search
      const searchStr = searchQuery.toLowerCase();
      const matchesSearch = !searchQuery || 
        pkg.title.toLowerCase().includes(searchStr) || 
        pkg.destination.toLowerCase().includes(searchStr) ||
        pkg.tags?.some(tag => tag.toLowerCase().includes(searchStr));

      // Destination
      const matchesDest = !destinationFilter || pkg.destination === destinationFilter || pkg.country === destinationFilter;
      
      // Category
      const matchesCategory = !categoryFilter || pkg.category === categoryFilter;

      // Duration
      let matchesDuration = true;
      if (durationFilter === "1-3 Days") matchesDuration = pkg.durationDays >= 1 && pkg.durationDays <= 3;
      else if (durationFilter === "4-6 Days") matchesDuration = pkg.durationDays >= 4 && pkg.durationDays <= 6;
      else if (durationFilter === "7-10 Days") matchesDuration = pkg.durationDays >= 7 && pkg.durationDays <= 10;
      else if (durationFilter === "10+ Days") matchesDuration = pkg.durationDays > 10;

      // Price
      const matchesPrice = pkg.pricePerPerson >= priceRange[0] && pkg.pricePerPerson <= priceRange[1];

      return matchesSearch && matchesDest && matchesCategory && matchesDuration && matchesPrice;
    }).sort((a, b) => {
      if (sortBy === "Price Low to High") return a.pricePerPerson - b.pricePerPerson;
      if (sortBy === "Price High to Low") return b.pricePerPerson - a.pricePerPerson;
      if (sortBy === "Rating High to Low") return b.rating - a.rating;
      if (sortBy === "Duration Short to Long") return a.durationDays - b.durationDays;
      if (sortBy === "Duration Long to Short") return b.durationDays - a.durationDays;
      if (sortBy === "Discount High to Low") return b.discountPercent - a.discountPercent;
      return 0; // Recommended (Default order)
    });
  }, [packages, searchQuery, destinationFilter, categoryFilter, durationFilter, sortBy, priceRange]);

  const resetFilters = () => {
    setSearchQuery("");
    setDestinationFilter("");
    setCategoryFilter("");
    setDurationFilter("");
    setSortBy("Recommended");
    setPriceRange([0, 200000]);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Header / Search Area */}
      <div className="mb-8 p-6 bg-primary/5 rounded-xl border">
        <h1 className="text-3xl font-bold mb-2">Holiday Packages</h1>
        <p className="text-muted-foreground mb-6">Explore curated domestic and international travel packages</p>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 text-muted-foreground" size={20} />
            <Input 
              placeholder="Search by package, destination, or tags..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-lg bg-background"
              data-testid="package-search-input"
            />
          </div>
          
          <Button 
            size="lg" 
            className="h-12 px-8 w-full md:w-auto font-bold text-lg" 
            data-testid="package-search-button"
          >
            Search
          </Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="w-full lg:w-1/4 space-y-6">
          <div className="bg-card border rounded-xl p-6 sticky top-24 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-lg flex items-center gap-2"><SlidersHorizontal size={18}/> Filters</h3>
              <button 
                onClick={resetFilters} 
                className="text-sm text-primary hover:underline font-medium"
                data-testid="package-clear-filters-button"
              >
                Clear all
              </button>
            </div>
            
            <div className="mb-6">
              <h4 className="font-medium mb-3 text-sm text-muted-foreground uppercase tracking-wider">Destination</h4>
              <select 
                className="w-full border rounded-md p-2 text-sm outline-none focus:ring-1 focus:ring-primary bg-background"
                value={destinationFilter}
                onChange={(e) => setDestinationFilter(e.target.value)}
                data-testid="package-destination-filter"
              >
                <option value="">All Destinations</option>
                <option value="India">India</option>
                <option value="Goa">Goa</option>
                <option value="Dubai">Dubai</option>
                <option value="Bali">Bali</option>
                <option value="Paris">Paris</option>
              </select>
            </div>

            <div className="mb-6">
              <h4 className="font-medium mb-3 text-sm text-muted-foreground uppercase tracking-wider">Category</h4>
              <select 
                className="w-full border rounded-md p-2 text-sm outline-none focus:ring-1 focus:ring-primary bg-background"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                data-testid="package-category-filter"
              >
                <option value="">All Categories</option>
                <option value="Beach">Beach</option>
                <option value="Mountain">Mountain</option>
                <option value="Honeymoon">Honeymoon</option>
                <option value="Family">Family</option>
                <option value="Adventure">Adventure</option>
                <option value="Luxury">Luxury</option>
              </select>
            </div>

            <div className="mb-6">
              <h4 className="font-medium mb-3 text-sm text-muted-foreground uppercase tracking-wider">Duration</h4>
              <select 
                className="w-full border rounded-md p-2 text-sm outline-none focus:ring-1 focus:ring-primary bg-background"
                value={durationFilter}
                onChange={(e) => setDurationFilter(e.target.value)}
                data-testid="package-duration-filter"
              >
                <option value="">Any Duration</option>
                <option value="1-3 Days">1-3 Days</option>
                <option value="4-6 Days">4-6 Days</option>
                <option value="7-10 Days">7-10 Days</option>
                <option value="10+ Days">10+ Days</option>
              </select>
            </div>

            <div className="mb-6">
              <h4 className="font-medium mb-3 text-sm text-muted-foreground uppercase tracking-wider">Price Range</h4>
              <div className="flex items-center gap-2 mb-2">
                <Input 
                  type="number" 
                  value={priceRange[0]} 
                  onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                  className="h-8 text-sm"
                  data-testid="package-price-min-input"
                />
                <span className="text-muted-foreground">-</span>
                <Input 
                  type="number" 
                  value={priceRange[1]} 
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="h-8 text-sm"
                  data-testid="package-price-max-input"
                />
              </div>
            </div>
            
            <Button className="w-full mt-4" data-testid="package-apply-filters-button">Apply Filters</Button>
          </div>
        </div>

        {/* Package List */}
        <div className="w-full lg:w-3/4">
          <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 bg-muted/30 p-3 rounded-lg border">
            <span className="text-sm font-medium text-muted-foreground">
              Showing <span className="text-foreground font-bold">{filteredPackages.length}</span> packages
            </span>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <select 
                className="bg-background border rounded-md p-1.5 text-sm outline-none focus:ring-1 focus:ring-primary"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                data-testid="package-sort-select"
              >
                <option value="Recommended">Recommended</option>
                <option value="Price Low to High">Price: Low to High</option>
                <option value="Price High to Low">Price: High to Low</option>
                <option value="Rating High to Low">Rating: High to Low</option>
                <option value="Duration Short to Long">Duration: Short to Long</option>
                <option value="Duration Long to Short">Duration: Long to Short</option>
                <option value="Discount High to Low">Discount: High to Low</option>
              </select>
            </div>
          </div>
          
          {filteredPackages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredPackages.map(pkg => (
                <HolidayPackageCard key={pkg.id} pkg={pkg} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-card rounded-xl border border-dashed shadow-sm" data-testid="package-empty-state">
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search size={32} className="text-muted-foreground" />
              </div>
              <p className="text-xl font-bold mb-2">No holiday packages found.</p>
              <p className="text-muted-foreground mb-6">Try changing filters or search criteria.</p>
              <Button onClick={resetFilters} variant="outline">Clear Filters</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
