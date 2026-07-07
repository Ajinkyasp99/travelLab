export const hotels = Array.from({ length: 20 }, (_, i) => ({
  id: `hotel_${i+1}`,
  name: `Hotel Grand ${i+1}`,
  destinationId: `dest_${(i % 10) + 1}`,
  address: `${100 + i} Main Street`,
  starRating: (i % 3) + 3,
  userRating: ((i % 5) * 0.5 + 3).toFixed(1),
  reviewCount: 50 + i * 10,
  amenities: ['Free WiFi', 'Pool', 'Spa', 'Restaurant'],
  images: [`https://picsum.photos/seed/hotel${i}/400/300`],
  description: 'A wonderful place to stay with great amenities.',
  pricePerNight: 2000 + i * 500,
  contact: `+91 98765432${i.toString().padStart(2, '0')}`
}));
