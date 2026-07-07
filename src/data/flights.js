const airlines = ['IndiGo', 'Air India', 'SpiceJet', 'Vistara'];
export const flights = Array.from({ length: 20 }, (_, i) => ({
  id: `flight_${i+1}`,
  airline: airlines[i % 4],
  flightNumber: `FL${100 + i}`,
  origin: i % 2 === 0 ? 'DEL' : 'BOM',
  destination: i % 2 === 0 ? 'BOM' : 'BLR',
  departureTime: new Date(Date.now() + i * 86400000).toISOString(),
  arrivalTime: new Date(Date.now() + i * 86400000 + 7200000).toISOString(),
  duration: '2h 0m',
  price: 3000 + i * 200,
  class: i % 3 === 0 ? 'Business' : 'Economy',
  availableSeats: 20 + i
}));
