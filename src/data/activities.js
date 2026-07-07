export const activities = Array.from({ length: 20 }, (_, i) => ({
  id: `act_${i+1}`,
  title: `Activity ${i+1}`,
  destinationId: `dest_${(i % 10) + 1}`,
  duration: `${1 + (i % 4)} Hours`,
  price: 500 + i * 200,
  rating: ((i % 5) * 0.2 + 4.0).toFixed(1),
  description: 'A fun activity.',
  images: [`https://picsum.photos/seed/act${i}/400/300`],
  category: 'Adventure'
}));
