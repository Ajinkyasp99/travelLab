const cities = ["Pune", "Goa", "Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata", "Hyderabad"];

export const cabs = Array.from({ length: 40 }, (_, i) => ({
  id: `cab_${i+1}`,
  driverName: `Driver ${i+1}`,
  carModel: 'Dzire',
  type: 'Sedan',
  rating: ((i % 5) * 0.2 + 4.0).toFixed(1),
  pricePerKm: 12 + i % 5,
  origin: cities[i % cities.length],
  destination: cities[(i + 3) % cities.length],
  available: true
}));
