export const reviews = Array.from({ length: 40 }, (_, i) => ({
  id: `review_${i+1}`,
  userId: `user_${(i % 10) + 1}`,
  entityType: i % 2 === 0 ? 'HOTEL' : 'PACKAGE',
  entityId: i % 2 === 0 ? `hotel_${(i % 20) + 1}` : `pkg_${(i % 20) + 1}`,
  rating: (i % 5) + 1,
  comment: 'Great experience overall.',
  date: new Date(Date.now() - i * 86400000).toISOString()
}));
