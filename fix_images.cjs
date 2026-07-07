const fs = require('fs');

const hotelImages = [
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1542314831-c6a4d27ce6a2?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1551882547-ff40c0d5e150?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1498503182468-3b51cbb6cb24?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517840901100-8179e982acb7?q=80&w=800&auto=format&fit=crop"
];

const packageImages = [
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1473625247510-8ceb1760943f?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500835556837-99ac94a94552?q=80&w=800&auto=format&fit=crop"
];

// Update hotels.js
const hotelsPath = './src/data/hotels.js';
let hotelsContent = fs.readFileSync(hotelsPath, 'utf8');

// The original hotels.js uses: images: [`https://picsum.photos/seed/hotel${i}/400/300`],
// We can replace the picsum.photos with our array.
let hotelCount = 0;
hotelsContent = hotelsContent.replace(/`https:\/\/picsum\.photos\/seed\/hotel\$\{i\}\/400\/300`/g, () => {
  const img = hotelImages[hotelCount % hotelImages.length];
  hotelCount++;
  return `"${img}"`;
});

// Write back
fs.writeFileSync(hotelsPath, hotelsContent);

// Update holidayPackages.js
const packagesPath = './src/data/holidayPackages.js';
let packagesContent = fs.readFileSync(packagesPath, 'utf8');

// The original uses: image: "https://source.unsplash.com/800x600/?goa,beach",
let pkgCount = 0;
packagesContent = packagesContent.replace(/"https:\/\/source\.unsplash\.com\/800x600\/\?[^"]+"/g, () => {
  const img = packageImages[pkgCount % packageImages.length];
  pkgCount++;
  return `"${img}"`;
});

packagesContent = packagesContent.replace(/"https:\/\/source\.unsplash\.com\/400x300\/\?[^"]+"/g, () => {
  const img = packageImages[pkgCount % packageImages.length];
  pkgCount++;
  return `"${img}"`;
});

fs.writeFileSync(packagesPath, packagesContent);

console.log("Images updated successfully!");
