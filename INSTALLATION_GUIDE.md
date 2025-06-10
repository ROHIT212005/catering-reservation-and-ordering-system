# Rural Catering Market - Installation & Deployment Guide

This guide provides detailed instructions for setting up, running, and deploying the Rural Catering Market application.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Local Development Setup](#local-development-setup)
3. [Environment Configuration](#environment-configuration)
4. [Building for Production](#building-for-production)
5. [Deployment Options](#deployment-options)
   - [GitHub Pages Deployment](#github-pages-deployment)
   - [Traditional Web Server Deployment](#traditional-web-server-deployment)
   - [Docker Deployment](#docker-deployment)
6. [Troubleshooting](#troubleshooting)

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (v14.0.0 or higher)
  - Download from [nodejs.org](https://nodejs.org/)
  - Verify installation with `node --version`

- **npm** (v6.0.0 or higher, comes with Node.js)
  - Verify installation with `npm --version`

- **Git** (for version control and deployment)
  - Download from [git-scm.com](https://git-scm.com/)
  - Verify installation with `git --version`

- **A code editor** (recommended: Visual Studio Code)
  - Download from [code.visualstudio.com](https://code.visualstudio.com/)

## Local Development Setup

Follow these steps to set up the project for local development:

1. **Clone the repository**

   ```bash
   git clone https://github.com/ROHIT212005/-Catering-Reservation-and-Ordering-System.git
   cd -Catering-Reservation-and-Ordering-System
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Access the application**

   Open your browser and navigate to:
   ```
   http://localhost:8080
   ```

   The development server features:
   - Hot Module Replacement (HMR) for instant updates
   - Error overlay for debugging
   - Source maps for easier debugging

## Environment Configuration

The application uses Vite's environment variables system for configuration:

1. **Create environment files**

   For development:
   ```
   .env.development
   ```

   For production:
   ```
   .env.production
   ```

2. **Available environment variables**

   ```
   # Base URL for the application
   VITE_APP_BASE_URL=/-Catering-Reservation-and-Ordering-System/

   # API URL (if using a backend)
   VITE_API_URL=https://api.example.com

   # Feature flags
   VITE_ENABLE_ANALYTICS=true
   ```

3. **Accessing environment variables in code**

   ```typescript
   // Access variables with import.meta.env
   const baseUrl = import.meta.env.VITE_APP_BASE_URL;
   ```

## Building for Production

To create a production-ready build:

1. **Run the build command**

   ```bash
   npm run build
   ```

   This creates a `dist` directory with optimized files:
   - Minified JavaScript
   - Optimized CSS
   - Compressed assets

2. **Preview the production build locally**

   ```bash
   npm run preview
   ```

   This serves the built files locally for testing before deployment.

## Deployment Options

### GitHub Pages Deployment

The project includes a PowerShell script for deploying to GitHub Pages:

1. **Update repository URL**

   Open `deploy.ps1` and update the repository URL:

   ```powershell
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
   ```

2. **Run the deployment script**

   ```bash
   powershell -ExecutionPolicy Bypass -File deploy.ps1
   ```

   This script:
   - Builds the application
   - Creates a temporary directory
   - Initializes a Git repository
   - Pushes to the gh-pages branch

3. **Configure GitHub Pages**

   - Go to your repository on GitHub
   - Navigate to Settings > Pages
   - Set the source to the gh-pages branch
   - Save the changes

4. **Access your deployed application**

   Your application will be available at:
   ```
   https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/
   ```

### Traditional Web Server Deployment

To deploy to a traditional web server (Apache, Nginx, etc.):

1. **Build the application**

   ```bash
   npm run build
   ```

2. **Configure the base URL**

   Update the `vite.config.ts` file:

   ```typescript
   export default defineConfig({
     base: '/', // Update this to match your server path
     // other configuration...
   });
   ```

3. **Upload files to your server**

   Upload the contents of the `dist` directory to your web server's public directory.

4. **Configure server for SPA routing**

   For Apache, create a `.htaccess` file in the root directory:

   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```

   For Nginx, update your server configuration:

   ```nginx
   location / {
     try_files $uri $uri/ /index.html;
   }
   ```

### Docker Deployment

To deploy using Docker:

1. **Create a Dockerfile**

   ```dockerfile
   # Build stage
   FROM node:16-alpine as build
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   RUN npm run build

   # Production stage
   FROM nginx:alpine
   COPY --from=build /app/dist /usr/share/nginx/html
   COPY nginx.conf /etc/nginx/conf.d/default.conf
   EXPOSE 80
   CMD ["nginx", "-g", "daemon off;"]
   ```

2. **Create an Nginx configuration file**

   Create a file named `nginx.conf`:

   ```nginx
   server {
     listen 80;
     server_name _;
     
     root /usr/share/nginx/html;
     index index.html;
     
     location / {
       try_files $uri $uri/ /index.html;
     }
     
     # Cache static assets
     location ~* \.(js|css|png|jpg|jpeg|gif|ico)$ {
       expires 1y;
       add_header Cache-Control "public, max-age=31536000";
     }
   }
   ```

3. **Build and run the Docker container**

   ```bash
   # Build the Docker image
   docker build -t rural-catering-market .

   # Run the container
   docker run -p 8080:80 rural-catering-market
   ```

4. **Access the application**

   Open your browser and navigate to:
   ```
   http://localhost:8080
   ```

## Troubleshooting

### Common Issues and Solutions

1. **404 errors after deployment**

   **Issue**: Routes work locally but return 404 errors when deployed.
   
   **Solution**: Ensure your server is configured to redirect all requests to index.html for client-side routing.

2. **Assets not loading**

   **Issue**: Images, CSS, or JavaScript files fail to load.
   
   **Solution**: Check that the base URL is correctly configured in `vite.config.ts`.

3. **Build errors**

   **Issue**: The build process fails with errors.
   
   **Solution**:
   - Clear the node_modules directory and reinstall dependencies
   - Update Node.js to the latest LTS version
   - Check for TypeScript errors in your code

4. **Deployment script errors**

   **Issue**: The PowerShell deployment script fails.
   
   **Solution**:
   - Ensure Git is installed and configured
   - Check that you have write access to the repository
   - Try running the script with administrator privileges

5. **Environment variables not working**

   **Issue**: Environment variables are undefined in the application.
   
   **Solution**:
   - Ensure variable names start with `VITE_`
   - Restart the development server after changing environment files
   - For production, rebuild the application after changing environment variables

### Getting Help

If you encounter issues not covered in this guide:

1. Check the [GitHub repository issues](https://github.com/ROHIT212005/-Catering-Reservation-and-Ordering-System/issues) for similar problems and solutions.

2. Create a new issue with:
   - A clear description of the problem
   - Steps to reproduce
   - Expected vs. actual behavior
   - Environment details (OS, Node.js version, etc.)

3. For urgent assistance, contact the project maintainers directly.