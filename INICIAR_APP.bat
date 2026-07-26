@echo off
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo No se ha encontrado Node.js en este equipo.
  echo Abre index.html directamente con tu navegador.
  pause
  exit /b 1
)
node server.cjs
