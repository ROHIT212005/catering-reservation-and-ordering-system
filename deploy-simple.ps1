# Simple deployment script for GitHub Pages
# This script uses a simpler approach with fewer steps to reduce the chance of timeouts

# Build the application with optimized settings
Write-Host "Building the application..." -ForegroundColor Green
npm run build

# Create a temporary directory for deployment
$tempDir = "temp_deploy"
Write-Host "Creating temporary directory: $tempDir" -ForegroundColor Green
New-Item -ItemType Directory -Path $tempDir -Force | Out-Null

# Copy the built files to the temporary directory
Write-Host "Copying built files to temporary directory..." -ForegroundColor Green
Copy-Item -Path "dist/*" -Destination $tempDir -Recurse

# Create a .nojekyll file to bypass Jekyll processing
Write-Host "Creating .nojekyll file..." -ForegroundColor Green
New-Item -ItemType File -Path "$tempDir/.nojekyll" -Force | Out-Null

# Create a simple 404.html file that redirects to index.html
$404Content = @"
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Redirecting...</title>
  <script>
    // Redirect to the main page
    window.location.href = '/-Catering-Reservation-and-Ordering-System/';
  </script>
</head>
<body>
  <p>If you are not redirected automatically, click <a href="/-Catering-Reservation-and-Ordering-System/">here</a>.</p>
</body>
</html>
"@
Set-Content -Path "$tempDir/404.html" -Value $404Content

# Initialize a new git repository in the temporary directory
Write-Host "Initializing git repository..." -ForegroundColor Green
Set-Location $tempDir
git init
git add .

# Commit the changes
Write-Host "Committing changes..." -ForegroundColor Green
git commit -m "Deploy to GitHub Pages"

# Push to the gh-pages branch
Write-Host "Pushing to gh-pages branch..." -ForegroundColor Green
git remote add origin https://github.com/ROHIT212005/-Catering-Reservation-and-Ordering-System.git

# Use GitHub token if available (for CI/CD)
if ($env:GITHUB_TOKEN) {
    $repoUrl = "https://${env:GITHUB_TOKEN}@github.com/ROHIT212005/-Catering-Reservation-and-Ordering-System.git"
    git remote set-url origin $repoUrl
}

git push -f origin master:gh-pages

# Clean up
Write-Host "Cleaning up..." -ForegroundColor Green
Set-Location ..
Remove-Item -Path $tempDir -Recurse -Force

Write-Host "Deployment complete! Your site should be available at https://rohit212005.github.io/-Catering-Reservation-and-Ordering-System/" -ForegroundColor Green