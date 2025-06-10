# Build the application
npm run build

# Create a temporary directory for deployment
$tempDir = "temp_deploy"
New-Item -ItemType Directory -Path $tempDir -Force

# Copy the built files to the temporary directory
Copy-Item -Path "dist/*" -Destination $tempDir -Recurse

# Create a .nojekyll file to bypass Jekyll processing
New-Item -ItemType File -Path "$tempDir/.nojekyll" -Force

# Initialize a new git repository in the temporary directory
Set-Location $tempDir
git init
git add .
git commit -m "Deploy to GitHub Pages"

# Push to the gh-pages branch
git remote add origin https://github.com/ROHIT212005/-Catering-Reservation-and-Ordering-System.git
git push -f origin master:gh-pages

# Clean up
Set-Location ..
Remove-Item -Path $tempDir -Recurse -Force

Write-Host "Deployment complete! Your site should be available at https://rohit212005.github.io/-Catering-Reservation-and-Ordering-System/"