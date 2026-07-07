export const cars = Array.from({ length: 20 }, (_, i) => ({
  id: `car_${i+1}`,
  model: i % 2 === 0 ? 'Swift' : 'Innova',
  type: i % 2 === 0 ? 'Hatchback' : 'SUV',
  transmission: 'Automatic',
  fuelType: 'Petrol',
  seats: i % 2 === 0 ? 4 : 7,
  pricePerDay: 2000 + i * 200,
  location: 'DEL',
  images: [`https://picsum.photos/seed/car${i}/400/300`],
  available: true
}));
