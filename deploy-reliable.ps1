# Ultra-reliable deployment script for GitHub Pages
# This script uses the absolute minimum steps needed for deployment

# Set error action preference to stop on any error
$ErrorActionPreference = "Stop"

try {
    # Step 1: Clean any previous build artifacts
    Write-Host "Cleaning previous build artifacts..." -ForegroundColor Green
    if (Test-Path "dist") {
        Remove-Item -Path "dist" -Recurse -Force
    }
    
    # Step 2: Build the application with minimal settings
    Write-Host "Building the application with minimal settings..." -ForegroundColor Green
    npm run build:minimal
    
    if (-not (Test-Path "dist")) {
        throw "Build failed: dist directory not found"
    }
    
    # Step 3: Prepare the dist directory for GitHub Pages
    Write-Host "Preparing dist directory for GitHub Pages..." -ForegroundColor Green
    
    # Create essential files
    New-Item -ItemType File -Path "dist/.nojekyll" -Force | Out-Null
    
    # Create a simple 404.html file
    $404Content = @"
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Redirecting...</title>
  <meta http-equiv="refresh" content="0;URL='/-Catering-Reservation-and-Ordering-System/'" />
  <script>
    window.location.href = '/-Catering-Reservation-and-Ordering-System/';
  </script>
</head>
<body>
  <p>Redirecting to home page... <a href="/-Catering-Reservation-and-Ordering-System/">Click here</a> if you are not redirected automatically.</p>
</body>
</html>
"@
    Set-Content -Path "dist/404.html" -Value $404Content
    
    # Step 4: Create a direct deployment to gh-pages branch
    Write-Host "Creating direct deployment to gh-pages branch..." -ForegroundColor Green
    
    # Create a temporary directory for deployment
    $tempDir = "temp_deploy"
    if (Test-Path $tempDir) {
        Remove-Item -Path $tempDir -Recurse -Force
    }
    New-Item -ItemType Directory -Path $tempDir -Force | Out-Null
    
    # Copy the built files to the temporary directory
    Copy-Item -Path "dist/*" -Destination $tempDir -Recurse
    
    # Initialize a new git repository in the temporary directory
    Set-Location $tempDir
    git init
    git add .
    
    # Configure git user if not already configured
    $gitUserName = git config --get user.name
    $gitUserEmail = git config --get user.email
    
    if (-not $gitUserName) {
        git config user.name "GitHub Actions"
    }
    
    if (-not $gitUserEmail) {
        git config user.email "actions@github.com"
    }
    
    # Commit the changes
    git commit -m "Deploy to GitHub Pages"
    
    # Add the remote repository
    git remote add origin https://github.com/ROHIT212005/-Catering-Reservation-and-Ordering-System.git
    
    # Force push to the gh-pages branch
    git push -f origin master:gh-pages
    
    # Return to the original directory
    Set-Location ..
    
    # Clean up
    Remove-Item -Path $tempDir -Recurse -Force
    
    Write-Host "Deployment complete! Your site should be available at https://rohit212005.github.io/-Catering-Reservation-and-Ordering-System/" -ForegroundColor Green
    Write-Host "Please allow a few minutes for GitHub Pages to update." -ForegroundColor Yellow
    
} catch {
    Write-Host "Error occurred during deployment: $_" -ForegroundColor Red
    # Return to the original directory if we're in the temp directory
    if ((Get-Location).Path -like "*temp_deploy") {
        Set-Location ..
    }
    exit 1
}