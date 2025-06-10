import { defineConfig, type ConfigEnv, type UserConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import * as path from "path";
import { componentTagger } from "lovable-tagger";
import * as fs from 'fs';

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  // Check if we're doing a minimal build for deployment
  const isMinimalBuild = process.env.VITE_MINIMAL_BUILD === 'true';
  
  return {
    base: mode === 'production' ? "/-Catering-Reservation-and-Ordering-System/" : "/", // Base path for GitHub Pages
    // Server configuration with HMR settings
    server: {
      host: "::",
      port: 8080,
      hmr: mode === 'production' ? false : true,
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
      // Use esbuild for minimal builds (faster) or terser for regular builds (smaller)
      minify: isMinimalBuild ? 'esbuild' : 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      // Optimize build performance
      reportCompressedSize: false,
      chunkSizeWarningLimit: 1000,
      // For minimal builds, use simpler settings
      ...(isMinimalBuild ? {
        // Minimal build settings
        cssCodeSplit: false,
        modulePreload: false,
      } : {}),
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
        },
        output: {
          // Optimize chunk size
          manualChunks: (id) => {
            // For minimal builds, use simpler chunking
            if (isMinimalBuild) {
              if (id.includes('node_modules')) {
                if (id.includes('react') || 
                    id.includes('react-dom') || 
                    id.includes('react-router-dom')) {
                  return 'vendor';
                }
                return 'deps'; // All other dependencies
              }
            } 
            // For regular builds, use more detailed chunking
            else {
              if (id.includes('node_modules')) {
                if (id.includes('react') || 
                    id.includes('react-dom') || 
                    id.includes('react-router-dom') ||
                    id.includes('@tanstack/react-query')) {
                  return 'vendor';
                }
                if (id.includes('@radix-ui') || 
                    id.includes('class-variance-authority') ||
                    id.includes('clsx') ||
                    id.includes('tailwind-merge')) {
                  return 'ui';
                }
                return 'deps'; // All other dependencies
              }
            }
            return null; // Default chunk
          }
        }
      },
    },
  };
});