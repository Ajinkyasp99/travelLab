const hotelImages = [
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1542314831-c6a4d27ce6a2?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1551882547-ff40c0d5e150?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1498503182468-3b51cbb6cb24?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517840901100-8179e982acb7?q=80&w=800&auto=format&fit=crop"
];

const hotelBrands = ["Hyatt Regency", "Marriott", "Radisson Blu", "The Leela", "Taj Mahal Palace", "Four Seasons", "Hilton", "Novotel", "Sheraton", "ITC Grand", "Trident", "The Oberoi", "Le Meridien", "Westin", "Fairmont"];
const hotelSuffixes = ["Resort & Spa", "City Center", "Boutique", "Plaza", "Suites", "Grand", "Palace"];

export const hotels = Array.from({ length: 60 }, (_, i) => ({
  id: `hotel_${i+1}`,
  name: `${hotelBrands[i % hotelBrands.length]} ${hotelSuffixes[i % hotelSuffixes.length]}`,
  destinationId: `dest_${(i % 10) + 1}`,
  location: ["Goa", "Mumbai", "Delhi", "Pune", "Bangalore", "Jaipur", "Kerala", "Manali"][i % 8],
  address: `${100 + i} Main Street`,
  starRating: (i % 3) + 3,
  userRating: ((i % 5) * 0.5 + 3).toFixed(1),
  reviewCount: 50 + i * 10,
  amenities: ['Free WiFi', 'Pool', 'Spa', 'Restaurant'],
  images: [hotelImages[i % hotelImages.length]],
  description: 'A wonderful place to stay with great amenities.',
  pricePerNight: 2000 + (i * 500) % 5000,
  contact: `+91 98765432${i.toString().padStart(2, '0')}`
}));
