# Quick Start Script for Delightful Dessert Frontend

Write-Host "================================" -ForegroundColor Cyan
Write-Host "Delightful Dessert - Frontend Setup" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

$projectPath = "D:\Personal Projects\Delightful_Dessert"
Set-Location $projectPath

# Check if Node.js is installed
Write-Host "Checking Node.js installation..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✓ Node.js version: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Node.js is not installed!" -ForegroundColor Red
    Write-Host "Please install Node.js from https://nodejs.org/" -ForegroundColor Red
    exit
}

# Check if Angular CLI is installed
Write-Host "Checking Angular CLI..." -ForegroundColor Yellow
try {
    $ngVersion = ng version --skip-nx 2>$null | Select-String "Angular CLI"
    Write-Host "✓ Angular CLI is installed" -ForegroundColor Green
} catch {
    Write-Host "Installing Angular CLI globally..." -ForegroundColor Yellow
    npm install -g @angular/cli
}

Write-Host ""
Write-Host "Installing project dependencies..." -ForegroundColor Yellow
npm install

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Dependencies installed successfully!" -ForegroundColor Green
} else {
    Write-Host "✗ Failed to install dependencies" -ForegroundColor Red
    exit
}

Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
Write-Host "Setup Complete!" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host "1. Update environment configuration:" -ForegroundColor White
Write-Host "   - Edit src/environments/environment.development.ts" -ForegroundColor Gray
Write-Host "   - Add your backend API URL" -ForegroundColor Gray
Write-Host "   - Add Stripe publishable key" -ForegroundColor Gray
Write-Host "   - Add Google Client ID" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Ensure backend API is running at:" -ForegroundColor White
Write-Host "   D:\Personal Projects\DelightfulDessert" -ForegroundColor Gray
Write-Host ""
Write-Host "3. Start the development server:" -ForegroundColor White
Write-Host "   npm start" -ForegroundColor Cyan
Write-Host ""
Write-Host "The app will open at: http://localhost:4200" -ForegroundColor Green
Write-Host ""
Write-Host "For detailed documentation, see:" -ForegroundColor Yellow
Write-Host "- SETUP_GUIDE.md" -ForegroundColor Gray
Write-Host "- README.md" -ForegroundColor Gray
Write-Host "- IMPLEMENTATION_GUIDE.md" -ForegroundColor Gray
Write-Host ""

# Ask if user wants to start the dev server
$start = Read-Host "Would you like to start the development server now? (y/n)"
if ($start -eq 'y' -or $start -eq 'Y') {
    Write-Host ""
    Write-Host "Starting development server..." -ForegroundColor Green
    npm start
}
