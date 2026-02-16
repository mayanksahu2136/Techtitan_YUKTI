# Start Social Shield servers

$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path

# Start Backend Server in new window
Write-Host "Starting Backend Server..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$projectRoot\backend' ; venv\Scripts\activate.ps1 ; python app.py"

# Start Frontend Server in new window
Write-Host "Starting Frontend Server..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$projectRoot' ; npm run dev"

Write-Host "Both servers starting in new windows..." -ForegroundColor Yellow
Write-Host "Backend: http://localhost:5000" -ForegroundColor Green
Write-Host "Frontend: http://localhost:8080" -ForegroundColor Cyan
