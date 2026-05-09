const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

function processContent(content) {
  let newContent = content;

  // Dark background pills: violet-400/30 bg-violet-400/10 text-violet-100/200 -> white/30 white/10 white
  newContent = newContent.replace(/border-violet-400\/30/g, 'border-white/30');
  newContent = newContent.replace(/bg-violet-400\/10/g, 'bg-white/10');
  newContent = newContent.replace(/text-violet-[12]00/g, 'text-white');
  newContent = newContent.replace(/text-violet-300/g, 'text-slate-300');
  newContent = newContent.replace(/bg-violet-400/g, 'bg-brand-navy');

  // Text Gradients: text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-violet-100 to-[^" ]+/g
  newContent = newContent.replace(/text-transparent bg-clip-text bg-gradient-to-[a-z] from-violet-\d+ via-violet-\d+ to-[a-z]+-\d+/g, 'text-white drop-shadow-sm');
  newContent = newContent.replace(/text-transparent bg-clip-text bg-gradient-to-[a-z] from-brand-orange to-brand-peach/g, 'text-brand-navy');

  // Light background pills: bg-violet-100 text-violet-700
  newContent = newContent.replace(/bg-violet-[15]0/g, 'bg-slate-50');
  newContent = newContent.replace(/bg-violet-100/g, 'bg-slate-100');
  newContent = newContent.replace(/border-violet-100/g, 'border-slate-200');
  newContent = newContent.replace(/text-violet-700/g, 'text-brand-navy');
  newContent = newContent.replace(/text-violet-600/g, 'text-brand-navy');
  newContent = newContent.replace(/text-violet-500/g, 'text-brand-navy');
  newContent = newContent.replace(/bg-violet-500/g, 'bg-brand-navy');
  newContent = newContent.replace(/bg-violet-600/g, 'bg-brand-navy');

  // Active / Hover states
  newContent = newContent.replace(/group-hover:bg-violet-600/g, 'group-hover:bg-brand-navy');
  newContent = newContent.replace(/hover:text-violet-700/g, 'hover:text-brand-navy');

  // Specific Blue gradients and blue elements
  newContent = newContent.replace(/from-violet-600\/30/g, 'from-white/10');
  newContent = newContent.replace(/to-blue-600\/20/g, 'to-transparent');
  newContent = newContent.replace(/bg-violet-500\/10/g, 'bg-white/5');
  newContent = newContent.replace(/bg-blue-500\/10/g, 'bg-white/5');
  newContent = newContent.replace(/bg-blue-100/g, 'bg-slate-100');
  newContent = newContent.replace(/text-blue-700/g, 'text-brand-navy');

  // RGBA radial gradients (purple/violet)
  newContent = newContent.replace(/rgba\(139,92,246,0\.25\)/g, 'rgba(255,255,255,0.05)');

  return newContent;
}

walkDir(directoryPath, function(filePath) {
  if (filePath.endsWith('.jsx')) {
    const originalContent = fs.readFileSync(filePath, 'utf8');
    const newContent = processContent(originalContent);
    if (originalContent !== newContent) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log(`Updated: ${filePath}`);
    }
  }
});

console.log('Theme substitution complete.');
