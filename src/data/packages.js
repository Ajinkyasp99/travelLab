export const packages = Array.from({ length: 20 }, (_, i) => ({
  id: `pkg_${i+1}`,
  title: `Tour Package ${i+1}`,
  destinationId: `dest_${(i % 10) + 1}`,
  duration: `${3 + (i % 4)} Days / ${2 + (i % 4)} Nights`,
  price: 15000 + i * 1000,
  description: 'A comprehensive holiday package.',
  inclusions: ['Flight', 'Hotel', 'Meals'],
  images: [`https://picsum.photos/seed/pkg${i}/400/300`],
  rating: ((i % 5) * 0.2 + 4.0).toFixed(1)
}));
