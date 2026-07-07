const fs = require('fs');

const path = './src/data/holidayPackages.js';
let content = fs.readFileSync(path, 'utf8');

// The file exports an array: export const holidayPackages = [ ... ];
// We can extract the array content, parse it (or just duplicate the string).
// Since it's a JS file and not JSON, string manipulation is easiest.

const startIdx = content.indexOf('[');
const endIdx = content.lastIndexOf(']');

if (startIdx !== -1 && endIdx !== -1) {
  const arrayString = content.substring(startIdx, endIdx + 1);
  
  try {
    // We can evaluate it to an array
    const packages = eval(arrayString);
    
    // Duplicate and modify IDs
    const newPackages = [...packages];
    
    packages.forEach(pkg => {
      const clonedPkg = { ...pkg };
      clonedPkg.id = clonedPkg.id + '_v2';
      clonedPkg.title = clonedPkg.title + ' (Extended)';
      newPackages.push(clonedPkg);
    });
    
    // Convert back to string
    // Need to format nicely.
    const newString = JSON.stringify(newPackages, null, 2);
    
    // Replace the array
    const newContent = content.substring(0, startIdx) + newString + content.substring(endIdx + 1);
    
    fs.writeFileSync(path, newContent);
    console.log("Packages extended successfully to " + newPackages.length);
  } catch(e) {
    console.error("Error evaluating array:", e);
  }
} else {
  console.error("Could not find array bounds");
}
