const fs = require('fs');

function xorDecode(encoded, key = 42) {
  try {
    const xored = atob(encoded);
    return xored.replace(/[\s\S]/g, c => String.fromCharCode(c.charCodeAt(0) ^ key));
  } catch (e) {
    return '';
  }
}

// For About.tsx
let about = fs.readFileSync('src/components/About.tsx', 'utf8');
about = about.replace(/label:\s*['"]([^'"]+)['"]/g, (match, enc) => `label: ${JSON.stringify(xorDecode(enc))}`);
about = about.replace(/<ObfuscatedText enc=\{card\.label\} \/>/g, '{card.label}');
fs.writeFileSync('src/components/About.tsx', about);

// For Services.tsx
let services = fs.readFileSync('src/components/Services.tsx', 'utf8');
services = services.replace(/enc:\s*['"]([^'"]+)['"]/g, (match, enc) => `title: ${JSON.stringify(xorDecode(enc))}`);
services = services.replace(/<ObfuscatedText enc=\{item\.enc\} \/>/g, '{item.title || item.text}');
fs.writeFileSync('src/components/Services.tsx', services);

// For Navbar.tsx
let navbar = fs.readFileSync('src/components/Navbar.tsx', 'utf8');
navbar = navbar.replace(/,\s*enc:\s*['"][^'"]+['"]/g, '');
navbar = navbar.replace(/<ObfuscatedText enc=\{item\.enc\} \/>/g, '{item.id}');
fs.writeFileSync('src/components/Navbar.tsx', navbar);

// For Footer.tsx
let footer = fs.readFileSync('src/components/Footer.tsx', 'utf8');
footer = footer.replace(/,\s*enc:\s*['"][^'"]+['"]/g, '');
footer = footer.replace(/<ObfuscatedText enc=\{link\.enc\} \/>/g, '{link.id}');
fs.writeFileSync('src/components/Footer.tsx', footer);

// For WorkGallery.tsx
let work = fs.readFileSync('src/components/WorkGallery.tsx', 'utf8');
work = work.replace(/,\s*enc:\s*['"][^'"]+['"]/g, '');
work = work.replace(/<ObfuscatedText enc=\{tab\.enc\} \/>/g, '{tab.id}');
fs.writeFileSync('src/components/WorkGallery.tsx', work);

console.log('Script done');
