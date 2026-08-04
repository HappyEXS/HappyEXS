# Strona-portfolio

Statyczna strona-wizytówka: czysty HTML + CSS + ~2 KB waniliowego JS.
Bez builda, bez `node_modules`, bez backendu. Pliki leżą w korzeniu repo
i GitHub Pages serwuje je bezpośrednio.

---

## Podgląd lokalny

Najprościej — kliknij dwukrotnie `index.html`. To wystarczy: strona nie robi
żadnych zapytań sieciowych, więc działa z `file://`.

Jeśli wolisz mieć prawdziwy serwer (przydatne przy sprawdzaniu ścieżek):

```bash
python -m http.server 8000
# → http://localhost:8000
```

lub

```bash
npx serve .
```

---

## Zanim wrzucisz na live — uzupełnij treść

Wszystkie nieuzupełnione miejsca są w formacie `{{POLE}}` i **świecą na żółto
na stronie**, żeby żadne nie przeszło niezauważone. Żeby je znaleźć:

```bash
grep -rn "{{" index.html
```

Oznaczenia znikają **same**, gdy pole przestaje zawierać `{{`:

- **tekst** — `main.js` zdejmuje klasę `ph` z każdego elementu, w którego treści
  ani w `href`/`src` nie ma już `{{`;
- **linki** — reguła `a[href*="{{"]` w CSS obrysowuje przerywaną linią każdy
  odnośnik z niewypełnionym adresem, nawet jeśli nie ma klasy `ph`.

Ta druga rzecz łapie najgroźniejszy przypadek: etykieta linku wygląda normalnie
(„Kod", „LinkedIn"), a adres nadal jest placeholderem — czyli link wychodzi na
produkcję martwy.

Gdy skończysz uzupełnianie, skasuj blok `6. PLACEHOLDERY` w `styles.css` i pętlę
„Sprzątanie markerów placeholderów" na początku `main.js`. To jedyne dwa miejsca,
które to obsługują.

### Lista pól

| Pole | Gdzie | Uwagi |
|---|---|---|
| `{{IMIE_NAZWISKO}}` | `<title>`, OG, hero, stopka | 4 wystąpienia |
| `{{TAGLINE}}` | `<title>`, OG, hero | np. „ML / Data Engineer" |
| `{{IN}}` | logo w nawigacji | inicjały, 2 znaki |
| `{{URL_STRONY}}` | canonical + OG | **pełny adres z `https://` i ukośnikiem na końcu** |
| `{{URL_GITHUB}}`, `{{URL_LINKEDIN}}`, `{{EMAIL}}` | hero, kontakt, stopka | |
| `{{NAZWA_REPO}}` | stopka, „Kod tej strony" | |
| `{{O_MNIE...}}`, `{{LOKALIZACJA}}`, `{{KIERUNEK}}` | hero, sekcja O mnie | |
| `{{OPIS_1..4}}` | karty projektów | 2–3 zdania; wciśnij konkretną liczbę |
| `{{LINK_DEMO_1..2}}`, `{{LINK_KOD_1..4}}` | karty projektów | |
| `{{STACK_1..4}}`, `{{*_INNE}}` | tagi, sekcja Stack | usuń `<li>`, jeśli nic nie dochodzi |

`{{URL_STRONY}}` musi być pełnym adresem — Open Graph nie akceptuje ścieżek
względnych, więc bez tego LinkedIn nie pokaże podglądu.

### Pliki do podmiany

| Plik | Co to jest |
|---|---|
| `assets/CV.pdf` | placeholder — nadpisz swoim CV, zachowaj nazwę |
| `assets/og-image.png` | placeholder 1200×630 — podgląd linku na LinkedIn |
| `assets/projects/*.svg` | placeholdery kart — podmień na zrzuty lub GIF-y |
| `assets/favicon.svg` | ikona w karcie przeglądarki |

Przy podmianie obrazków projektów zmień rozszerzenie w `index.html`
(`.svg` → `.png` / `.gif`) i popraw `width`/`height` na faktyczne wymiary —
bez tego przeglądarka nie zarezerwuje miejsca i strona „skacze" przy ładowaniu.
Trzymaj proporcję 16:9 i szerokość ok. 1200 px.

### Dodanie kolejnego projektu

Skopiuj cały blok `<article class="card">` i podmień treść. Zaktualizuj licznik
w nagłówku sekcji (`<span class="section__count">4</span>`).

Projekt bez działającego demo dostaje zamiast linku:

```html
<span class="link link--soon">Demo wkrótce</span>
```

To celowo **nie jest** `<a>`. Wyłączony link i tak zostaje klikalny, a czytnik
ekranu zapowiada go jako link prowadzący donikąd. Tutaj sam tekst niesie
informację i element jest poza kolejnością TAB.

---

## Zmiana koloru akcentu

Dwie linie w `styles.css` — po jednej na motyw:

```css
:root                  { --accent: #2DD4BF; }  /* ciemny */
:root[data-theme="light"] { --accent: #0F766E; }  /* jasny  */
```

Wartości różnią się celowo: ten sam teal, który świetnie czyta się na czerni,
ma na bieli tylko 3,7:1 kontrastu — za mało dla tekstu. Jeśli podmieniasz kolor,
sprawdź oba warianty (np. w webaim.org/resources/contrastchecker) i trzymaj
minimum **4,5:1** względem tła.

---

## Publikacja na GitHub Pages

1. Utwórz repo na GitHubie (publiczne — Pages dla repo prywatnych wymaga
   płatnego planu).
2. Wypchnij pliki na branch `main`:

   ```bash
   git init
   git add .
   git commit -m "Portfolio"
   git branch -M main
   git remote add origin https://github.com/UZYTKOWNIK/NAZWA-REPO.git
   git push -u origin main
   ```

3. W repo: **Settings → Pages**.
4. W sekcji **Build and deployment**:
   - *Source*: **Deploy from a branch**
   - *Branch*: **main**, katalog **/ (root)** → **Save**
5. Odczekaj 1–2 minuty. Adres pojawi się na tej samej stronie ustawień:
   - repo nazwane `UZYTKOWNIK.github.io` → `https://uzytkownik.github.io/`
   - dowolna inna nazwa → `https://uzytkownik.github.io/nazwa-repo/`
6. Zaznacz **Enforce HTTPS** (na dole Settings → Pages).

Ścieżki w kodzie są względne, więc strona działa w obu wariantach bez zmian.
Jedyne, co musisz dopasować ręcznie, to `{{URL_STRONY}}` w meta tagach.

Plik `.nojekyll` mówi Pages, żeby nie przepuszczało plików przez Jekyll —
bez niego katalogi i pliki zaczynające się od `_` byłyby pomijane.

---

## Własna domena (`twojenazwisko.dev`)

1. Zmień nazwę `CNAME.example` na `CNAME` i wpisz w środku samą domenę,
   bez `https://` i bez ukośnika:

   ```
   twojenazwisko.dev
   ```

2. U rejestratora domeny dodaj rekordy DNS:

   **Domena główna (apex, `twojenazwisko.dev`)** — cztery rekordy A:

   | Typ | Nazwa | Wartość |
   |---|---|---|
   | A | `@` | `185.199.108.153` |
   | A | `@` | `185.199.109.153` |
   | A | `@` | `185.199.110.153` |
   | A | `@` | `185.199.111.153` |

   Opcjonalnie IPv6 — cztery rekordy AAAA:
   `2606:50c0:8000::153`, `2606:50c0:8001::153`,
   `2606:50c0:8002::153`, `2606:50c0:8003::153`

   **Subdomena `www`** — jeden rekord CNAME:

   | Typ | Nazwa | Wartość |
   |---|---|---|
   | CNAME | `www` | `uzytkownik.github.io.` |

3. W **Settings → Pages → Custom domain** wpisz `twojenazwisko.dev` → **Save**.
   GitHub sprawdzi DNS (potrafi to potrwać od kilku minut do kilku godzin).
4. Gdy weryfikacja przejdzie, zaznacz **Enforce HTTPS**.
5. Zaktualizuj `{{URL_STRONY}}` w `index.html` na `https://twojenazwisko.dev/`
   — inaczej podgląd linku na LinkedIn nadal będzie wskazywał stary adres.

Uwaga do końcówki `.dev`: cała domena TLD jest na liście HSTS preload, więc
przeglądarki wymuszają HTTPS. Zanim GitHub wystawi certyfikat, strona będzie
niedostępna — to normalne, trzeba po prostu odczekać.

Po zmianie domeny warto przepuścić link przez
[LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/), żeby
odświeżyć cache podglądu.

---

## Struktura

```
.
├── index.html                 cała treść + meta i Open Graph
├── styles.css                 tokeny, motywy, layout, komponenty
├── main.js                    motyw, rok, pojawianie sekcji, aktywna nawigacja
├── assets/
│   ├── CV.pdf                 ← podmień
│   ├── og-image.png           ← podmień (1200×630)
│   ├── favicon.svg
│   └── projects/*.svg         ← podmień na zrzuty
├── .nojekyll
├── CNAME.example              → zmień nazwę na CNAME przy własnej domenie
├── .gitignore
└── README.md
```

## Uwagi techniczne

- **Zero pobieranych fontów** — typografia stoi na krojach systemowych.
  Brak dodatkowego zapytania, brak migotania tekstu przy ładowaniu.
- **Bez JS strona działa w całości.** Skrypt dokłada tylko przełącznik motywu,
  rok w stopce i animację pojawiania. Elementy chowają się dopiero, gdy JS
  wystartuje (`html.js`), więc treść nigdy nie zostaje ukryta na stałe.
- **Motyw** zapisuje się w `localStorage`. Wybór ustawiany jest inline'owym
  skryptem w `<head>`, przed pierwszym malowaniem — dzięki temu przy odświeżeniu
  nie mignie niewłaściwy motyw.
- **`prefers-reduced-motion`** wyłącza wszystkie przejścia i płynne przewijanie.
