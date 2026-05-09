const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src', 'components', 'home');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
  });
}

function processPills(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Dark background pills
  content = content.replace(/className="[^"]*rounded-full[^"]*border-white[^"]*uppercase tracking-[^"]+"/g, (match) => {
    // Keep 'mb-X' if it exists
    let mb = match.match(/mb-\d+/);
    let mbClass = mb ? mb[0] : '';
    return `className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-200 backdrop-blur-md shadow-sm ${mbClass}"`;
  });

  // Light background pills - matching various legacy combinations
  content = content.replace(/className="[^"]*bg-slate-500[^"]*uppercase tracking-[^"]+"/g, (match) => {
    let mb = match.match(/mb-\d+/);
    let mbClass = mb ? mb[0] : '';
    return `className="inline-block rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-brand-navy shadow-sm ${mbClass}"`;
  });
  
  content = content.replace(/className="[^"]*bg-slate-100[^"]*uppercase tracking-[^"]+"/g, (match) => {
    let mb = match.match(/mb-\d+/);
    let mbClass = mb ? mb[0] : '';
    return `className="inline-block rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-brand-navy shadow-sm ${mbClass}"`;
  });

  // Services Page special pill
  content = content.replace(/className="[^"]*border-white\/30 bg-white\/10[^"]*uppercase tracking-[^"]+"/g, (match) => {
    let mb = match.match(/mb-\d+/);
    let mbClass = mb ? mb[0] : '';
    return `className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-200 backdrop-blur-md shadow-sm ${mbClass}"`;
  });

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated pills in: ${filePath}`);
  }
}

walkDir(directoryPath, function(filePath) {
  if (filePath.endsWith('.jsx')) {
    processPills(filePath);
  }
});

console.log('Pill standardization complete.');
