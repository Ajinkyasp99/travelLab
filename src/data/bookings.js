export const bookings = Array.from({ length: 20 }, (_, i) => ({
  id: `booking_${i+1}`,
  userId: i === 0 ? 'user_1' : `user_${(i % 10) + 1}`,
  type: i % 2 === 0 ? 'HOTEL' : 'FLIGHT',
  entityId: i % 2 === 0 ? `hotel_${(i % 20) + 1}` : `flight_${(i % 20) + 1}`,
  bookingDate: new Date(Date.now() - i * 86400000).toISOString(),
  travelDate: new Date(Date.now() + i * 86400000).toISOString(),
  status: i % 5 === 0 ? 'CANCELLED' : 'CONFIRMED',
  totalAmount: 5000 + i * 500
}));
