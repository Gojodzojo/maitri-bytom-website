@echo off
set /p mail=Podaj swoj adres e-mail: 
echo Podano adres: %mail%

set /p imie=Podaj swoje imie: 
echo Podano imie: %imie%

set /p nazwisko=Podaj swoje nazwisko: 
echo Podano nazwisko: %nazwisko%

git config --global user.name "%imie% %nazwisko%"
git config --global user.email %mail%

echo Pobieranie projektu...
git clone https://github.com/Gojodzojo/maitri-bytom-website.git
PAUSE