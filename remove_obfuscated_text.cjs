const fs = require('fs');
const path = require('path');

function xorDecode(encoded, key = 42) {
  try {
    const xored = atob(encoded);
    return xored.split('').map(c => 
      String.fromCharCode(c.charCodeAt(0) ^ key)
    ).join('');
  } catch (e) {
    return '';
  }
}

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;
      
      const importRegex = /import\s+\{\s*ObfuscatedText\s*\}\s+from\s+['"][^'"]+security['"];?\n?/g;
      if (importRegex.test(content)) {
        content = content.replace(importRegex, '');
        changed = true;
      }
      
      const tagRegex = /<ObfuscatedText\s+enc=["']([^"']+)["']\s*\/>/g;
      if (tagRegex.test(content)) {
        content = content.replace(tagRegex, (match, enc) => {
          const decoded = xorDecode(enc);
          // escape curly braces and tags if needed, but usually plain text
          return decoded.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\{/g, '&#123;').replace(/\}/g, '&#125;');
        });
        changed = true;
      }
      
      if (changed) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log('Updated ' + fullPath);
      }
    }
  });
}

processDirectory(path.join(__dirname, 'src'));
