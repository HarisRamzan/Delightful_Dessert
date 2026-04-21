# Script to create Angular feature modules

Write-Host "Creating Auth Module..." -ForegroundColor Green

# Auth Module Structure
New-Item -ItemType Directory -Force -Path "src/app/features/auth"
New-Item -ItemType Directory -Force -Path "src/app/features/auth/components"

# Shop Module
Write-Host "Creating Shop Module..." -ForegroundColor Green
New-Item -ItemType Directory -Force -Path "src/app/features/shop"
New-Item -ItemType Directory -Force -Path "src/app/features/shop/components"

# Admin Module  
Write-Host "Creating Admin Module..." -ForegroundColor Green
New-Item -ItemType Directory -Force -Path "src/app/features/admin"
New-Item -ItemType Directory -Force -Path "src/app/features/admin/components"

# Cart Module
Write-Host "Creating Cart Module..." -ForegroundColor Green
New-Item -ItemType Directory -Force -Path "src/app/features/cart"

# Checkout Module
Write-Host "Creating Checkout Module..." -ForegroundColor Green
New-Item -ItemType Directory -Force -Path "src/app/features/checkout"

# Orders Module
Write-Host "Creating Orders Module..." -ForegroundColor Green
New-Item -ItemType Directory -Force -Path "src/app/features/orders"

Write-Host "Feature module directories created successfully!" -ForegroundColor Cyan
