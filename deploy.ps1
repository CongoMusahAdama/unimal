# Quick Netlify Deployment Script

## Step 1: Build the project
Write-Host "Building project..." -ForegroundColor Cyan
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed! Please fix TypeScript errors first." -ForegroundColor Red
    exit 1
}

Write-Host "Build successful!" -ForegroundColor Green

## Step 2: Install Netlify CLI (if not installed)
Write-Host "`nChecking for Netlify CLI..." -ForegroundColor Cyan
$netlifyCLI = Get-Command netlify -ErrorAction SilentlyContinue

if (-not $netlifyCLI) {
    Write-Host "Netlify CLI not found. Installing..." -ForegroundColor Yellow
    npm install -g netlify-cli
} else {
    Write-Host "Netlify CLI found!" -ForegroundColor Green
}

## Step 3: Deploy
Write-Host "`nReady to deploy to Netlify!" -ForegroundColor Cyan
Write-Host "Run: netlify deploy --prod" -ForegroundColor Yellow
Write-Host "`nOr for drag-and-drop deployment:" -ForegroundColor Cyan
Write-Host "1. Go to https://app.netlify.com" -ForegroundColor Yellow
Write-Host "2. Drag the 'dist' folder to deploy" -ForegroundColor Yellow
