const airlines = ['IndiGo', 'Air India', 'SpiceJet', 'Vistara'];
const cities = ['DEL', 'BOM', 'BLR', 'CCU', 'HYD', 'MAA'];
const stopOptions = ['Non-stop', '1 Stop', '2+ Stops'];

export const flights = Array.from({ length: 60 }, (_, i) => {
  const baseTime = Date.now() + (i * 1000 * 60 * 60 * 4); // Spread flights across hours
  const randomDurationMinutes = 60 + (i * 23) % 240; // 1 to 5 hours
  const arrivalTime = baseTime + randomDurationMinutes * 60 * 1000;
  
  return {
    id: `flight_${i+1}`,
    airline: airlines[i % airlines.length],
    flightNumber: `FL${100 + i}`,
    origin: cities[i % cities.length],
    destination: cities[(i + 1) % cities.length],
    departureTime: new Date(baseTime).toISOString(),
    arrivalTime: new Date(arrivalTime).toISOString(),
    duration: `${Math.floor(randomDurationMinutes / 60)}h ${randomDurationMinutes % 60}m`,
    stops: stopOptions[(i * 7) % 3],
    price: 3000 + (i * 350) % 7000,
    class: i % 3 === 0 ? 'Business' : 'Economy',
    availableSeats: 20 + (i % 30)
  };
});
