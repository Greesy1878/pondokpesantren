$ErrorActionPreference='Stop'
Write-Output "Running diagnostics script in $PSScriptRoot"
# Stop uvicorn processes
$procs = Get-CimInstance Win32_Process | Where-Object { $_.CommandLine -like '*uvicorn*' -or $_.CommandLine -like '*uvicorn.exe*' }
if ($procs) { $procs | ForEach-Object { Write-Output "Stopping PID $($_.ProcessId)"; Stop-Process -Id $_.ProcessId -Force } } else { Write-Output "No uvicorn processes found" }

# Start uvicorn from venv python
$py = Join-Path $PSScriptRoot '.venv\Scripts\python.exe'
Write-Output "Using python: $py"
Start-Process -FilePath $py -ArgumentList '-m','uvicorn','backend.server:app','--host','0.0.0.0','--port','8000' -RedirectStandardOutput "$PSScriptRoot\uvicorn_out.log" -RedirectStandardError "$PSScriptRoot\uvicorn_err.log" -NoNewWindow -PassThru | Out-Null
Start-Sleep -Seconds 3

# Fetch OpenAPI
try {
    Invoke-WebRequest 'http://localhost:8000/openapi.json' -UseBasicParsing -OutFile "$PSScriptRoot\openapi.json" -ErrorAction Stop
    Write-Output 'Fetched openapi.json'
} catch {
    Write-Output "Failed to fetch openapi: $($_.Exception.Message)"
}

# Run POST test script and capture output
Write-Output 'Running test_post_inspirasi.py'
& "$py" "$PSScriptRoot\test_post_inspirasi.py" *> "$PSScriptRoot\test_post_out.txt"

# Docker status for tunas-mongo
try {
    docker ps --filter 'name=tunas-mongo' --format '{{.Names}} {{.Status}}' | Out-File "$PSScriptRoot\docker_ps.txt" -Encoding utf8
} catch {
    Write-Output "docker command failed: $($_.Exception.Message)"
}

Write-Output 'Diagnostics complete. Files: uvicorn_out.log, uvicorn_err.log, openapi.json, test_post_out.txt, docker_ps.txt'