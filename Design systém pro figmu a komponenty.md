# Design Systém pro Figmu: Aplikace "Objednáme"

Tento dokument slouží jako komplexní podklad pro vytvoření design systému a knihovny komponent ve Figmě. Cílem je zajistit vizuální a funkční konzistenci napříč celou aplikací a zefektivnit budoucí designérské i vývojářské práce.

## 1. Základní stavební kameny (Tokens)

### 1.1. Barevná paleta

Barvy jsou klíčové pro vizuální identitu a orientaci uživatele.

- **Primary (Primární):**
  - `orange-500`: `#FF8A48` (Hlavní CTA tlačítka, aktivní prvky, grafy)
  - `orange-100`: `#FFEFE6` (Pozadí aktivních prvků, highlighty)
- **Neutral (Neutrální):**
  - `gray-900`: `#1A1A1A` (Hlavní text, nadpisy)
  - `gray-700`: `#4B4B4B` (Sekundární text, popisky)
  - `gray-500`: `#8C8C8C` (Placeholder text, méně důležité informace)
  - `gray-300`: `#D1D1D1` (Okraje, oddělovače)
  - `gray-100`: `#F7F7F7` (Pozadí sekcí, karet)
  - `white`: `#FFFFFF` (Pozadí hlavních kontejnerů)
- **System & Status (Systémové barvy):**
  - `success`: `#28A745` (Potvrzení, stav "Completed")
  - `warning`: `#FFC107` (Upozornění, stav "On Process")
  - `danger`: `#DC3545` (Chyby, stav "Cancelled")
  - `info`: `#17A2B8` (Informační štítky)

### 1.2. Typografie

Použijeme moderní bezpatkový font **Inter**, který je skvěle čitelný na obrazovkách.

- **Font Family:** Inter

**Typografická škála:**

| Použití             | Font-size | Font-weight | Line-height | Příklad v UI                  |
| ------------------- | --------- | ----------- | ----------- | ----------------------------- |
| **Display (D1)**    | 48px      | Bold (700)  | 56px        | Velké částky na dashboardu    |
| **Heading 1 (H1)**  | 32px      | Bold (700)  | 40px        | "Dashboard"                   |
| **Heading 2 (H2)**  | 24px      | SemiBold (600) | 32px        | Názvy sekcí ("Recent Orders") |
| **Heading 3 (H3)**  | 20px      | SemiBold (600) | 28px        | Názvy položek v kartách       |
| **Body Large (BL)** | 16px      | Medium (500) | 24px        | Jména zákazníků, ceny         |
| **Body (B)**        | 14px      | Regular (400)| 20px        | Běžný text, popisky, menu     |
| **Caption (C)**     | 12px      | Regular (400)| 16px        | Malý text, metadata (datum)   |

### 1.3. Spacing a Grid

Doporučuji používat **8pt grid system**. Všechny rozestupy a velikosti budou násobkem 8 (8px, 16px, 24px, 32px...).

- **Základní mezery:**
  - `space-xs (4px)`: Malé mezery uvnitř komponent.
  - `space-s (8px)`: Mezery mezi ikonou a textem.
  - `space-m (16px)`: Padding v tlačítkách, mezery mezi položkami v seznamu.
  - `space-l (24px)`: Padding v kartách a sekcích.
  - `space-xl (32px)`: Mezery mezi hlavními sekcemi na stránce.
- **Border Radius (Zaoblení rohů):**
  - `radius-s (4px)`: Pro štítky, malé prvky.
  - `radius-m (8px)`: Pro tlačítka, inputy.
  - `radius-l (16px)`: Pro karty, hlavní kontejnery.

---

## 2. Základní komponenty (Atoms & Molecules)

### 2.1. Tlačítka (Buttons)

- **Zdroj:** `ui/button.tsx`
- **Popis:** Základní interaktivní prvek pro spouštění akcí.
- **Umístění:** V celé aplikaci, např. "Upgrade Now" v sidebaru, "See All Orders" v sekcích, "Uložit" v editačním panelu.

| Typ         | Pozadí      | Text        | Okraj         | Velikost (Výška) | Padding (Y/X) | Příklad použití                       |
| ----------- | ----------- | ----------- | ------------- | ---------------- | ------------- | ------------------------------------- |
| **Primary** | `orange-500`| `white`     | -             | L (48px), M (40px) | 12px / 24px   | Hlavní akce ("Upgrade Now", "Uložit") |
| **Secondary**| `white`     | `gray-700`  | 1px `gray-300`| M (40px)         | 10px / 20px   | Sekundární akce ("See All Orders")    |
| **Tertiary**| `transparent`| `gray-700`  | -             | M (40px)         | 10px / 20px   | Méně důležité akce ("Zrušit")         |
| **Icon Button**| `transparent`| Ikona `gray-700`| -       | 40x40px          | -             | Notifikace, nastavení, ikony v záhlaví |

### 2.2. Štítky (Tags/Badges)

- **Popis:** Vizuální indikátory pro stavy, role nebo kategorie.
- **Umístění:** V tabulce objednávek (stavy "Completed"), u jmen uživatelů ("Kitchen Admin"), na kartách položek ("Nové", "Pálivé").

- **Specifikace:**
  - **Padding:** 4px / 8px
  - **Font:** Caption (12px), Medium (500)
  - **Border Radius:** 4px
- **Příklady:**
  - **Success:** Zelené pozadí, bílý text ("Completed")
  - **Warning:** Oranžové pozadí, bílý text ("On Process")
  - **Danger:** Červené pozadí, bílý text ("Cancelled")
  - **Info:** Světle šedé pozadí, tmavě šedý text ("Kitchen Admin")

### 2.3. Formulářové prvky (Inputs)

- **Zdroj:** `ui/input.tsx`
- **Popis:** Prvky pro zadávání textu a výběr z možností.
- **Umístění:** Vyhledávání v záhlaví, editační panel pro položky a kategorie.

- **Search Input:**
  - **Použití:** Hlavní vyhledávání v záhlaví ("Search anything..."), filtrování v tabulkách.
  - **Specifikace:** Výška 48px, pozadí `gray-100`, ikona lupy vlevo.
- **Text Input:**
  - **Použití:** Pole pro název, cenu, popis v `ItemEditor.tsx`.
  - **Specifikace:** Podobný styl jako Search, ale bez ikony.
- **Dropdown / Select:**
  - **Použití:** Výběr časového období ("This Week"), filtrování kategorií.
  - **Specifikace:** Vzhledově podobný jako input, s ikonou šipky dolů vpravo.

### 2.4. Ikony

- **Zdroj:** `common/DynamicIcon.tsx`
- **Popis:** Vizuální symboly pro akce a navigaci. Doporučuji konzistentní sadu **Lucide Icons**.
- **Umístění:** Všude v aplikaci - v sidebaru, u tlačítek, v záhlaví sekcí.
- **Specifikace:**
  - **Velikosti:** 16px, 20px, 24px.
  - **Styl:** Line (čárový), 1.5-2px tloušťka.

---

## 3. Pokročilé komponenty (Organisms)

### 3.1. Layout & Navigace

- **Sidebar (Boční menu):**
  - **Zdroj:** `layout/Sidebar.tsx`
  - **Popis:** Hlavní navigace aplikace, vždy viditelná na levé straně.
  - **Struktura:** Logo, seznam navigačních položek (`Dashboard`, `Orders`, ...), a CTA blok ("Streamline restaurant management...").
  - **Aktivní položka:** Zvýrazněna pozadím `orange-100` a barvou textu/ikony `orange-500`.
- **Header (Záhlaví):**
  - **Zdroj:** `layout/Header.tsx`
  - **Popis:** Horní lišta obsahující název stránky, globální akce a profil uživatele.
  - **Struktura:** Breadcrumb/název stránky, vyhledávací pole, ikony akcí (notifikace, nastavení), profil uživatele.
- **Breadcrumbs (Drobečková navigace):**
  - **Zdroj:** `ui/breadcrumb.tsx`, `CategoryManagement/Breadcrumb.tsx`
  - **Popis:** Ukazuje cestu v zanořené struktuře kategorií.
  - **Umístění:** Nad seznamem položek v `CategoryManagement`.

### 3.2. Karty (Cards)

- **Popis:** Základní kontejner pro zobrazení ucelené informace.
- **Specifikace:** Pozadí `white`, padding 24px, border-radius 16px, jemný stín.
- **Typy a umístění:**
  - **Stat Card:** Zobrazuje klíčové metriky (Total Orders, Total Revenue) na hlavní stránce Dashboardu.
  - **Menu Item Card:** Používá se v `StaffMenuView.tsx` a na dashboardu v sekci "Trending Menus". Zobrazuje obrázek, název, cenu a hodnocení.
  - **Customer Review Card:** Na dashboardu v sekci "Customer Reviews".
  - **Recent Activity Card:** Na dashboardu, zobrazuje poslední akce v systému.

### 3.3. Správa kategorií a položek

- **CategoryList:**
  - **Zdroj:** `CategoryManagement/CategoryList.tsx`
  - **Popis:** Seznam kategorií a podkategorií s možností drag-and-drop pro změnu pořadí.
  - **Umístění:** Levý panel na stránce správy menu.
- **ItemList:**
  - **Zdroj:** `CategoryManagement/ItemList.tsx`
  - **Popis:** Zobrazuje seznam položek ve vybrané kategorii.
  - **Umístění:** Pravý (hlavní) panel na stránce správy menu.
- **ItemEditor:**
  - **Zdroj:** `CategoryManagement/ItemEditor.tsx`
  - **Popis:** Postranní panel, který se vysouvá pro editaci nebo vytváření nové položky. Obsahuje záložky pro přehledné uspořádání (Základní, Varianty, Ingredience).
  - **Umístění:** Vysouvá se zprava na stránce správy menu.

### 3.4. Grafy (Charts)

- **Popis:** Vizuální reprezentace dat.
- **Umístění:** Všechny grafy jsou na hlavní stránce Dashboardu.
- **Typy:**
  - **Line Chart (Čárový):** Pro "Total Revenue".
  - **Bar Chart (Sloupcový):** Pro "Orders Overview".
  - **Donut Chart (Prstencový):** Pro "Top Categories".

### 3.5. Tabulka (Table)

- **Popis:** Strukturované zobrazení dat.
- **Umístění:** Na dashboardu v sekci "Recent Orders".
- **Struktura:** Hlavička s názvy sloupců, řádky s daty objednávek. Obsahuje text, malé obrázky a stavové štítky.

### 3.6. Ostatní pokročilé komponenty

- **User Profile:**
  - **Umístění:** V `Header.tsx`, vpravo nahoře.
  - **Obsah:** Avatar, jméno a role uživatele.
- **Collapsible:**
  - **Zdroj:** `ui/collapsible.tsx`
  - **Použití:** Pro rozbalování/sbalování sekcí, např. podkategorií v `Sidebar.tsx`.

---

## 4. Co mohlo být zapomenuto? (Návrhy na doplnění)

Pro kompletní a robustní design systém doporučuji nadesignovat i následující komponenty a jejich stavy:

1.  **Stavy komponent:**
    - **Hover:** Změna pozadí nebo barvy textu při najetí myší.
    - **Focused:** Vizuální zvýraznění (často `outline`) u formulářových prvků.
    - **Disabled:** "Zašedlý" vzhled pro neaktivní tlačítka a inputy.
    - **Loading:** Zobrazení spinneru v tlačítkách nebo na kartách při načítání dat.

2.  **Modální okna (Modals / Dialogs):**
    - Pro potvrzení akcí (např. "Opravdu chcete smazat tuto položku?").
    - Pro zobrazení detailnějších informací.

3.  **Notifikace / Toasts:**
    - Malé zprávy, které se na chvíli objeví na okraji obrazovky (např. "Položka byla úspěšně uložena.").

4.  **Tooltips:**
    - Malé bubliny s nápovědou, které se zobrazí při najetí na ikonu nebo prvek.

5.  **Paginace (Stránkování):**
    - Pro procházení dlouhých seznamů (např. v tabulce objednávek).

6.  **Breadcrumbs (Drobečková navigace):**
    - Pro orientaci v zanořených strukturách, jak je zmíněno v případové studii.

Věřím, že tento dokument poskytuje pevný základ pro vaši práci ve Figmě. Pokud budete mít jakékoliv dotazy, jsem k dispozici.
