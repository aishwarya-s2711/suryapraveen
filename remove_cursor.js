const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');

// Remove HTML elements
content = content.replace('  <div id="cursor"></div>\n  <div id="cursor-ring"></div>\n', '');

// Remove CSS
const cssRegex = /\/\* ============================\n   CUSTOM CURSOR\n============================ \*\/(.*?)(?=\/\* ============================\n   LOADING SCREEN)/s;
content = content.replace(cssRegex, '');

// Remove JS
const jsRegex = /\/\* CUSTOM CURSOR \*\/(.*?)(?=\/\* LOADER \*\/)/s;
content = content.replace(jsRegex, '');

fs.writeFileSync('index.html', content);
