export const users = [
  { id: 'user_1', name: 'Shweta', email: 'shweta@tester.com', password: 'Test@123', phone: '9999999999', role: 'User', profileImage: 'https://i.pravatar.cc/150?u=user_1' },
  { id: 'user_2', name: 'Admin', email: 'admin@tester.com', password: 'Admin@123', phone: '8888888888', role: 'Admin', profileImage: 'https://i.pravatar.cc/150?u=user_2' }
];
for(let i = 3; i <= 20; i++) {
  users.push({ id: `user_${i}`, name: `User ${i}`, email: `user${i}@example.com`, password: `Pass${i}@123`, phone: `77777777${i.toString().padStart(2, '0')}`, role: 'User', profileImage: `https://i.pravatar.cc/150?u=user_${i}` });
}
