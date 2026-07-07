export const rooms = [];
Array.from({ length: 20 }, (_, i) => {
  rooms.push({ id: `room_h${i+1}_1`, hotelId: `hotel_${i+1}`, type: 'Standard', pricePerNight: 2000 + i * 500, capacity: { adults: 2, children: 1 }, amenities: ['TV', 'WiFi'], images: [`https://picsum.photos/seed/room_s_${i}/400/300`], available: true });
  rooms.push({ id: `room_h${i+1}_2`, hotelId: `hotel_${i+1}`, type: 'Deluxe', pricePerNight: 3000 + i * 500, capacity: { adults: 2, children: 2 }, amenities: ['TV', 'WiFi', 'Mini-bar'], images: [`https://picsum.photos/seed/room_d_${i}/400/300`], available: i % 2 === 0 });
});
