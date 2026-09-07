@echo off  
echo Starting Rasa AI Server for Bhardwaj Financial Services  
cd /d "%~dp0chatbot"  
call venv\Scripts\activate.bat  
rasa run --enable-api --cors "*" --port 5005  
pause 
