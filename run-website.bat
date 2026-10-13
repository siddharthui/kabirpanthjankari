@echo off
title SKDV Website Local Server
echo ===================================================
echo SKDV Website Local Server shuru ho raha hai...
echo URL: http://localhost:8000/videos.html
echo ===================================================
cd /d "%~dp0"
start http://localhost:8000/videos.html
python -m http.server 8000
pause
