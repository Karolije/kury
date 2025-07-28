MÓJ KURNIK


Aplikacja do dodawania i zarządzania transakcjami (przychody, wydatki).

Funkcjonalności:

1. Formularz dodawania transakcji z polami:
- Kwota (wymagane)
- Typ (przychód / wydatek)
- Kategoria (wymagane)
- Notatka
- Data

2. Walidacja podstawowych pól formularza

3. Wysyłanie danych do backendu (np. json-server lub inny REST API)

4. Zarządzanie stanem transakcji w Reduxie


Technologie:
- React (funkcjonalne komponenty, hooks)
- Redux (do zarządzania stanem)
- UUID do generowania unikalnych ID
- CSS do prostego stylowania
- json-server (lub dowolny backend REST API) do przechowywania transakcji

Instalacja i uruchomienie
1. Klonuj repozytorium
- git clone <adres-repozytorium>
2. Zainstaluj zależności
- npm install
3. Uruchom backend (json-server lub własny serwer)
- npx json-server --watch db.json --port 3001
4. Uruchom frontend
- npm start

Testy
- npm test
