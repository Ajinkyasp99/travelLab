export const offers = Array.from({ length: 20 }, (_, i) => ({
  id: `offer_${i+1}`,
  title: `${10 + i * 2}% Off`,
  code: `SAVE${10 + i * 2}`,
  discountPercentage: 10 + i * 2,
  maxDiscount: 2000 + i * 100,
  minBookingAmount: 5000 + i * 500,
  validTill: new Date(Date.now() + 30 * 86400000).toISOString(),
  type: i % 3 === 0 ? 'FLIGHT' : (i % 3 === 1 ? 'HOTEL' : 'ALL')
}));
