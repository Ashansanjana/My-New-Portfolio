import fs from 'fs';
import path from 'path';

const distDir = path.join(process.cwd(), 'dist');
const htmlFile = path.join(distDir, 'index.html');

if (!fs.existsSync(htmlFile)) {
  console.error("No index.html found in dist");
  process.exit(1);
}

let html = fs.readFileSync(htmlFile, 'utf8');

// Inline CSS
const cssRegex = /<link[^>]*rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/g;
html = html.replace(cssRegex, (match, href) => {
  const cssPath = path.join(distDir, href);
  if (fs.existsSync(cssPath)) {
    const cssContent = fs.readFileSync(cssPath, 'utf8');
    return `<style>${cssContent}</style>`;
  }
  return match;
});

// Inline JS
const jsRegex = /<script[^>]*src="([^"]+)"[^>]*><\/script>/g;
html = html.replace(jsRegex, (match, src) => {
  const jsPath = path.join(distDir, src);
  if (fs.existsSync(jsPath)) {
    const jsContent = fs.readFileSync(jsPath, 'utf8');
    // Vite script tags are usually module
    return `<script type="module">${jsContent}</script>`;
  }
  return match;
});

const outputFile = path.join(process.cwd(), 'portfolio.html');
fs.writeFileSync(outputFile, html);
console.log("Successfully created inline portfolio.html");
