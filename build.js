// build.js
const fs = require('fs');
const path = require('path');

// Read the main file
const mainFile = fs.readFileSync('index.js', 'utf8');

// Convert to ES modules
const esModuleContent = mainFile
  .replace("const { readdir, stat } = require('fs/promises');", "import { readdir, stat } from 'fs/promises';")
  .replace("const { readdirSync, statSync } = require('fs');", "import { readdirSync, statSync } from 'fs';")
  .replace(/^\/\/ CommonJS exports[\s\S]*$/m, `// ES modules exports
export default isEmptyDir;
export { isEmptyDir, isEmptyDirSync };`);

// Write the ES module file
fs.writeFileSync('index.mjs', esModuleContent);

console.log('✅ Built ES modules version: index.mjs');
console.log('✅ Package supports both CommonJS (require) and ES modules (import)');
