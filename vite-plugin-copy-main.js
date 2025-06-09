// vite-plugin-copy-main.js
import fs from 'fs';
import path from 'path';

export default function copyMainPlugin() {
  return {
    name: 'copy-main-plugin',
    closeBundle() {
      // Create src directory in dist
      const distSrcDir = path.resolve('dist', 'src');
      if (!fs.existsSync(distSrcDir)) {
        fs.mkdirSync(distSrcDir, { recursive: true });
      }

      // Create a simple JavaScript file that redirects to the bundled file
      const mainTsxContent = `
// This is a placeholder file to prevent 404 errors
// The actual code is in the bundled JavaScript file
console.log('Redirecting to bundled file...');
window.location.href = '/-Catering-Reservation-and-Ordering-System/';
`;

      fs.writeFileSync(path.resolve(distSrcDir, 'main.tsx'), mainTsxContent);
      console.log('Created placeholder main.tsx file in dist/src');
    }
  };
}