@echo on

cd /d "./setup"

call npm install --no-warnings

call npm start

cd /d ".."

pause
