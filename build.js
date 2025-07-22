// build.js
const fs = require('fs');
const path = require('path');

// Read the main file
const mainFile = fs.readFileSync('index.js', 'utf8');

// Convert require to import (handle both single and double quotes)
let esModuleContent = mainFile
  .replace(/const \{ readdir, stat \} = require\(["']fs\/promises["']\);/, "import { readdir, stat } from 'fs/promises';")
  .replace(/const \{ readdirSync, statSync \} = require\(["']fs["']\);/, "import { readdirSync, statSync } from 'fs';");

// Remove all CommonJS exports
esModuleContent = esModuleContent.replace(/\n?\/\/ CommonJS exports[\s\S]*?(?=\n\/\/|$)/g, '');
esModuleContent = esModuleContent.replace(/\n?module\.exports[\s\S]*?(?=\n|$)/g, '');

// Add ESM exports at the end
esModuleContent += `\n// ES modules exports\nexport default isEmptyDir;\nexport { isEmptyDir, isEmptyDirSync };\n`;

// Write the ES module file
fs.writeFileSync('index.mjs', esModuleContent);

console.log('✅ Built ES modules version: index.mjs');
console.log('✅ Package supports both CommonJS (require) and ES modules (import)');
