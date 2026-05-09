const fs = require('fs');
const path = require('path');

async function extractPDF(filePath) {
  // Dynamic import for ESM module
  const pdfjsLib = await import('pdfjs-dist/legacy/build/pdf.mjs');
  
  const data = new Uint8Array(fs.readFileSync(filePath));
  const doc = await pdfjsLib.getDocument({ data }).promise;
  
  let fullText = '';
  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const content = await page.getTextContent();
    const strings = content.items.map(item => item.str).join(' ');
    fullText += `\n=== PAGE ${i} ===\n${strings}\n`;
  }
  return fullText;
}

async function main() {
  const files = [
    { path: 'public/Fit Eats UIUX Case Study_compressed.pdf', out: 'fiteats_text.txt' },
    { path: 'public/Retirewell case study_compressed.pdf', out: 'retirewell_text.txt' },
    { path: 'public/Talenlio Case Study.pdf', out: 'talenlio_text.txt' },
  ];

  for (const f of files) {
    try {
      const text = await extractPDF(f.path);
      fs.writeFileSync(f.out, text);
      console.log(`Done: ${f.out} (${text.length} chars)`);
    } catch (e) {
      console.error(`Error ${f.path}:`, e.message);
    }
  }
}

main();
