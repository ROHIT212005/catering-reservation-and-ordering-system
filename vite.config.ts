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
          // Copy the main.js content to main.tsx
          const mainJsContent = fs.readFileSync(mainJsPath, 'utf8');
          fs.writeFileSync(mainTsxPath, mainJsContent);
          console.log(`Created main.tsx from main.js content`);
        }
        
        // Copy .htaccess file
        const htaccessSrc = path.resolve(__dirname, 'public', '.htaccess');
        const htaccessDest = path.resolve(__dirname, 'dist', '.htaccess');
        
        if (fs.existsSync(htaccessSrc)) {
          fs.copyFileSync(htaccessSrc, htaccessDest);
          console.log(`Copied .htaccess file`);
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
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
    },
  },
}));
