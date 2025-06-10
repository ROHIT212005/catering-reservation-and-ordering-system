import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import fs from 'fs';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? "/-Catering-Reservation-and-Ordering-System/" : "/", // Base path for GitHub Pages
  server: {
    host: "::",
    port: 8080,
  },
  // Disable HMR in production
  hmr: mode === 'production' ? false : {},
  plugins: [
    react(),
    {
      name: 'copy-public-files',
      closeBundle() {
        // Copy the public/src directory to dist/src
        const publicSrcDir = path.resolve(__dirname, 'public', 'src');
        const distSrcDir = path.resolve(__dirname, 'dist', 'src');
        
        if (!fs.existsSync(distSrcDir)) {
          fs.mkdirSync(distSrcDir, { recursive: true });
        }
        
        if (fs.existsSync(publicSrcDir)) {
          const files = fs.readdirSync(publicSrcDir);
          files.forEach(file => {
            const srcPath = path.resolve(publicSrcDir, file);
            const destPath = path.resolve(distSrcDir, file);
            fs.copyFileSync(srcPath, destPath);
            console.log(`Copied ${srcPath} to ${destPath}`);
          });
        }
        
        // Create a special main.tsx file that is actually JavaScript
        const mainTsxPath = path.resolve(distSrcDir, 'main.tsx');
        const mainJsPath = path.resolve(distSrcDir, 'main.js');
        
        if (fs.existsSync(mainJsPath)) {
          // Create a special version of main.tsx that redirects to the main app
          const mainTsxContent = `
// This is a special version of main.tsx that redirects to the main app
// It's used to handle 404 errors for main.tsx requests
console.log("main.tsx loaded successfully");
// No need to do anything else, the app is already loaded via entry.jsx
`;
          fs.writeFileSync(mainTsxPath, mainTsxContent);
          console.log(`Created special main.tsx file to handle 404 errors`);
        }
        
        // Copy .htaccess file
        const htaccessSrc = path.resolve(__dirname, 'public', '.htaccess');
        const htaccessDest = path.resolve(__dirname, 'dist', '.htaccess');
        
        if (fs.existsSync(htaccessSrc)) {
          fs.copyFileSync(htaccessSrc, htaccessDest);
          console.log(`Copied .htaccess file`);
        }
        
        // Copy favicon.ico file
        const faviconSrc = path.resolve(__dirname, 'public', 'favicon.ico');
        const faviconDest = path.resolve(__dirname, 'dist', 'favicon.ico');
        
        if (fs.existsSync(faviconSrc)) {
          fs.copyFileSync(faviconSrc, faviconDest);
          console.log(`Copied favicon.ico file`);
        }
      }
    },
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // Optimize build performance
    reportCompressedSize: false,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
      output: {
        // Optimize chunk size
        manualChunks: {
          vendor: [
            'react', 
            'react-dom', 
            'react-router-dom',
            '@tanstack/react-query'
          ],
          ui: [
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-label',
            '@radix-ui/react-slot',
            '@radix-ui/react-toast',
            'class-variance-authority',
            'clsx',
            'tailwind-merge'
          ]
        }
      }
    },
  },
}));
