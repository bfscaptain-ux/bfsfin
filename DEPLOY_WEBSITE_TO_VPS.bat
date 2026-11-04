@echo off
title BFS Circle - Deploy Website to VPS
color 0A
cls
echo ======================================================================
echo           BFS CIRCLE - DEPLOY MAIN WEBSITE TO VPS (bfsfin.com)
echo ======================================================================
echo.
echo VPS IP      : 200.234.34.191
echo Live Domain : https://bfsfin.com
echo Git Branch  : master (Latest commit pushed to GitHub)
echo.
echo ======================================================================
echo Kya kya deploy hoga:
echo   1. WhatsApp API (9286683232) integration across all pages & database
echo   2. Interactive WhatsApp Chatbot Desk trigger
echo   3. 360 Agra Local SEO Keywords across all 26 areas
echo   4. City Hub page (/locations/agra) + all local areas
echo   5. Calculators & Tools Complete SEO metadata & keywords
echo   6. Dynamic Sitemap with 27 location URLs
echo ======================================================================
echo.
set /p confirm="Do you want to proceed with deployment to VPS? (y/n): "
if /i not "%confirm%"=="y" goto cancel

echo.
echo ======================================================================
echo [1/2] Uploading Update Script to VPS...
echo (Enter VPS root password when prompted)
echo ======================================================================
scp "e:\Downloads\2026-08-06-bfsfin\UPDATE_WEBSITE_ON_VPS.sh" root@200.234.34.191:/root/UPDATE_WEBSITE_ON_VPS.sh

if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Script upload failed! Please check password / connection.
    pause
    exit /b
)

echo.
echo ======================================================================
echo [2/2] Running Website Update on VPS...
echo (Enter VPS root password when prompted)
echo ======================================================================
ssh -t root@200.234.34.191 "bash /root/UPDATE_WEBSITE_ON_VPS.sh"

if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Deployment failed on VPS.
    pause
    exit /b
)

echo.
echo ======================================================================
echo   🎉 DEPLOYMENT TO VPS COMPLETED SUCCESSFULLY!
echo ======================================================================
echo.
echo Ab aap browser me https://bfsfin.com open karke check kar sakte hain!
echo.
pause
exit /b

:cancel
echo.
echo Deployment cancelled by user.
pause
