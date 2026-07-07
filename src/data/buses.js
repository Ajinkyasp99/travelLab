const cities = ["Pune", "Goa", "Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata", "Hyderabad"];

export const buses = Array.from({ length: 40 }, (_, i) => ({
  id: `bus_${i+1}`,
  operator: `Travels ${i+1}`,
  busType: i % 2 === 0 ? 'AC Sleeper' : 'Volvo AC',
  origin: cities[i % cities.length],
  destination: cities[(i + 3) % cities.length],
  departureTime: new Date(Date.now() + i * 86400000).toISOString(),
  arrivalTime: new Date(Date.now() + i * 86400000 + 43200000).toISOString(),
  duration: '12h 0m',
  price: 800 + i * 50,
  availableSeats: 15 + i
}));
