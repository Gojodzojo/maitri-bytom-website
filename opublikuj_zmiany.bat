@echo off
echo Pobieranie najnowszych zmian
git pull

set /p message=Podaj krotki opis zmian: 
git add -A
git commit -m "%message%"
git push -u origin main
PAUSE