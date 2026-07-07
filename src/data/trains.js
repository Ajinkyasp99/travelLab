export const trains = Array.from({ length: 20 }, (_, i) => ({
  id: `train_${i+1}`,
  trainName: `Express ${i+1}`,
  trainNumber: `${12000 + i}`,
  origin: i % 2 === 0 ? 'NDLS' : 'CSMT',
  destination: i % 2 === 0 ? 'CSMT' : 'MAS',
  departureTime: new Date(Date.now() + i * 86400000).toISOString(),
  arrivalTime: new Date(Date.now() + i * 86400000 + 43200000).toISOString(),
  duration: '12h 0m',
  price: 1500 + i * 100,
  class: i % 4 === 0 ? '1A' : '3A',
  availableSeats: 50 + i * 2
}));
