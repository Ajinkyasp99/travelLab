export const restaurants = Array.from({ length: 20 }, (_, i) => ({
  id: `rest_${i+1}`,
  name: `Restaurant ${i+1}`,
  destinationId: `dest_${(i % 10) + 1}`,
  cuisine: ['Indian', 'Chinese'],
  rating: ((i % 5) * 0.2 + 3.5).toFixed(1),
  averageCost: 500 + i * 100,
  address: `${i + 1} Food St`,
  images: [`https://picsum.photos/seed/rest${i}/400/300`],
  isVegetarian: i % 4 === 0
}));
