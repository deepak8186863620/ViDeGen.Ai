<#
    Run a local HTTP server for the ViDeGen app (Windows PowerShell v5.1).
    This will try several options (py/python/npx) and open the default browser.

    Usage: From project root (powershell):
    .\run-local.ps1

    This script serves the current folder at http://localhost:3000 by default.
#>

$port = 3000

function Start-HttpServer {
    param($cmd, $args)
    Write-Host "Starting: $cmd $args" -ForegroundColor Cyan
    Start-Process -NoNewWindow -FilePath $cmd -ArgumentList $args -Wait
}

Write-Host "Looking for a local runtime to serve files (py, python, or Node / npx)..." -ForegroundColor Gray

if (Get-Command py -ErrorAction SilentlyContinue) {
    Write-Host "Using py to start HTTP server on port $port..." -ForegroundColor Green
    Start-Process -FilePath py -ArgumentList "-3 -m http.server $port" -WindowStyle Normal
    Start-Sleep -Seconds 1
    Start-Process "http://localhost:$port"
    return
}

if (Get-Command python -ErrorAction SilentlyContinue) {
    Write-Host "Using python to start HTTP server on port $port..." -ForegroundColor Green
    Start-Process -FilePath python -ArgumentList "-m http.server $port" -WindowStyle Normal
    Start-Sleep -Seconds 1
    Start-Process "http://localhost:$port"
    return
}

if (Get-Command npx -ErrorAction SilentlyContinue) {
    Write-Host "Using npx http-server to start HTTP server on port $port..." -ForegroundColor Green
    Start-Process -FilePath npx -ArgumentList "http-server -p $port" -WindowStyle Normal
    Start-Sleep -Seconds 1
    Start-Process "http://localhost:$port"
    return
}

Write-Host "No suitable runtime found: please install Python or Node.js (npx)." -ForegroundColor Yellow
Write-Host "Alternatively, install the VS Code Live Server extension (right-click index.html > Open with Live Server)." -ForegroundColor Gray
