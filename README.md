# My Bookshelf App

Aplikacja webowa do zarządzania kolekcją książek, z backendem w Spring Boot i frontendem w React.

---

## Wymagania wstępne

- Java 17 lub nowsza  
- Node.js i npm lub yarn  
- PostgreSQL (baza danych)  
- System Linux/macOS lub Windows z Git Bash (zalecane do uruchamiania skryptu `start.sh`)  
- Maven (wrapper jest dołączony do backendu, więc nie trzeba instalować globalnie)

---
## Konfiguracja bazy danych PostgreSQL

Backend korzysta z bazy PostgreSQL.  

### Instalacja i konfiguracja

1. Zainstaluj PostgreSQL:  
   [https://www.postgresql.org/download/](https://www.postgresql.org/download/)  

2. Uruchom serwer PostgreSQL.  

3. Utwórz bazę danych, np.:  
   ```bash
   createdb bookshelfdb
---

## Struktura projektu

- `/backend` — backend w Spring Boot  
- `/frontend` — frontend w React  
- `start.sh` — skrypt uruchamiający backend i frontend jednocześnie (Linux/macOS lub Windows z Git Bash)  
- `.gitignore` — w folderach backend i frontend, ignoruje pliki build, node_modules itp.


