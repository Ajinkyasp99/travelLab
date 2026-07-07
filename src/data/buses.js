export const buses = Array.from({ length: 20 }, (_, i) => ({
  id: `bus_${i+1}`,
  operator: `Travels ${i+1}`,
  busType: i % 2 === 0 ? 'AC Sleeper' : 'Volvo AC',
  origin: 'DEL',
  destination: 'MANALI',
  departureTime: new Date(Date.now() + i * 86400000).toISOString(),
  arrivalTime: new Date(Date.now() + i * 86400000 + 43200000).toISOString(),
  duration: '12h 0m',
  price: 800 + i * 50,
  availableSeats: 15 + i
}));
