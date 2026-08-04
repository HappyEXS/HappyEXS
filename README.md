# Jan Jędrzejewski

**ML Engineer** · Warszawa · otwarty na propozycje

`analiza → implementacja → wdrożenie → produkcja`

Inżynier informatyki PW; specjalność Sztuczna Inteligencja; projekty od pomysłu
po wdrożenie na produkcji.

---

## O mnie

Jestem inżynierem informatyki z specjalizacją w dziedzinie Sztucznej Inteligencji.
Zajmuję się projektowaniem i wdrażaniem modeli ML od pomysłu po produkcję. Jestem
wielkim fanem szeroko rozumianej motoryzacji, w swoich projektach staram się łączyć
technologie AI z pasją do samochodów.

Wszystko co robię, to łączenie wiedzy z praktyką, aby tworzyć realne, działające
rozwiązania, nie projekty na półkę.

---

## Projekty

### Wycena samochodu używanego · wdrożony

Aplikacja webowa szacująca wartość rynkową używanego auta na podstawie parametrów
takich jak marka, rocznik, przebieg i pojemność silnika. Sercem jest model gradient
boosting (XGBoost) wytrenowany na danych ogłoszeń, udostępniony przez API FastAPI
z prostym formularzem. Model ładowany jednorazowo przy starcie zwraca wycenę
w milisekundach.

`Python` `JavaScript` `XGBoost` `FastAPI`

**[Live demo ↗](https://autovalue-p4g5.onrender.com/)** · [Kod ↗](https://github.com/HappyEXS/AutoValue)

---

### Predyktor wyników F1 · wdrożony

Symulator przewidujący wyniki wyścigów Formuły 1 metodą Monte Carlo, wielokrotnie
rozgrywający wyścig na podstawie oficjalnych danych pomiaru czasu (biblioteka
FastF1). Backend w FastAPI z cache'owaniem danych w SQLite liczy rozkłady
prawdopodobieństwa pozycji końcowych, a frontend w React (Vite + TypeScript)
prezentuje je w interfejsie.

`Python` `FastF1` `Monte Carlo` `FastAPI` `React`

**[Live demo ↗](https://pitwall-f1-predictor.onrender.com/)** · [Kod ↗](https://github.com/HappyEXS/PitWall-F1-predictor)

---

### Traffic Insights · w budowie

System analizy natężenia ruchu drogowego w czasie rzeczywistym, przetwarzający
obraz z publicznych kamer drogowych za pomocą detekcji obiektów (YOLO) i zliczający
pojazdy według typu. Architektura wielousługowa — collector pobierający klatki,
worker wykonujący inferencję, baza PostgreSQL, API FastAPI i dashboard Streamlit —
zbiera dane ciągle i wizualizuje wzorce ruchu w czasie.

`Python` `YOLO` `PostgreSQL` `FastAPI` `Streamlit`

Demo wkrótce · Kod: `{{LINK_KOD_3}}`

---

### Router tras · w budowie

Aplikacja wyznaczająca optymalne trasy drogowe w obrębie województwa mazowieckiego
na kompletnej sieci dróg regionu. Wyznaczanie tras realizują procedury pgRouting
bezpośrednio w bazie PostGIS, co utrzymuje niski narzut pamięci, a interaktywna mapa
po stronie frontendu wizualizuje wynik. Projekt pokazuje pracę z danymi
przestrzennymi, algorytmami grafowymi i przestrzenną bazą danych.

`PostgreSQL` `PostGIS` `pgRouting` `Python` `FastAPI`

Demo wkrótce · [Kod ↗](https://github.com/HappyEXS/Navigation-app)

---

## Stack

| Obszar | Technologie |
|---|---|
| **Języki** | Python · SQL · PL/SQL · JavaScript |
| **ML i analiza danych** | PyTorch · Pandas · NumPy · XGBoost · YOLO |
| **Backend i API** | FastAPI · Flask · SQLAlchemy · REST |
| **Bazy danych** | PostgreSQL · PostGIS · pgRouting · Oracle |
| **Frontend** | React · HTML · CSS · Oracle APEX |
| **Narzędzia i DevOps** | Git · Docker · GitHub Actions · GCP · Firebase · Azure · Jira |

---

## Kontakt

Szukam interesujących projektów w ML i nie tylko. Jeśli budujecie coś, co zamienia
dane w decyzje — chętnie porozmawiam. Najszybciej złapiesz mnie mailem.

- 📧 **[JedrzejewskiJ4n@gmail.com](mailto:JedrzejewskiJ4n@gmail.com)**
- 📄 [Pobierz CV (PDF)](assets/CV.pdf)
- 🌐 Portfolio: `{{URL_STRONY}}`
- 📍 Warszawa

<sub>Kod tej strony-portfolio leży w tym repo. Instrukcja uruchomienia i publikacji: [DEVELOPMENT.md](DEVELOPMENT.md).</sub>
