# TypeScript- und React-Guidelines

- Status: Verbindliche Vorlage
- Gültigkeit: Projekte mit TypeScript und React

Diese Vorgaben ergänzen die [allgemeinen Coding Guidelines](general-coding-guidelines.md). Für Projekte ohne TypeScript oder React sind sie nicht anzuwenden.

## 1. TypeScript

- Der Compiler läuft im Strict Mode.
- `noUncheckedIndexedAccess` und `exactOptionalPropertyTypes` sind aktiviert, sofern keine begründete projektspezifische Ausnahme besteht.
- Implizites `any` ist verboten. Explizites `any` ist nur als dokumentierte, eng begrenzte Ausnahme zulässig.
- Daten aus HTTP, Datenbanken, Browser-APIs oder Drittanbieter-SDKs gelten zunächst als `unknown` und werden vor der Verwendung validiert.
- Typzusicherungen (`as`) ersetzen keine Validierung externer Daten.
- Domänenmodelle beschreiben die eigene Fachlichkeit und übernehmen nicht unreflektiert Typen eines externen Anbieters.

```ts
// Nicht ausreichend: Die externe Antwort ist nicht geprüft.
const account = response.data as Account;

// Besser: Das Schema validiert und typisiert die Antwort.
const account = AccountSchema.parse(response.data);
```

## 2. React-Komponenten

- Komponenten bleiben deklarativ und konzentrieren sich auf Darstellung und Interaktion.
- Fachlogik, Mapping externer Daten und komplexe Seiteneffekte gehören in Services, Hooks oder die Anwendungslogik.
- Große Komponenten werden entlang fachlicher Verantwortlichkeiten aufgeteilt; als Richtwert sollten sie deutlich unter etwa 200 Zeilen bleiben.
- Direkte Netzwerkaufrufe im Komponentenrumpf und unnötige `useEffect`-Ketten sind zu vermeiden.
- Globaler, veränderlicher Zustand wird nicht ohne klaren Anwendungsfall eingeführt.

Eine sinnvolle Feature-Struktur kann beispielsweise so aussehen:

```text
Feature
  Page
  Hook
  Service
  Components
```

## 3. State Management

- Server State, etwa API-Ressourcen, wird getrennt von lokalem UI State behandelt.
- Für Server State wird eine Query-/Caching-Lösung eingesetzt, die Lade-, Fehler- und Aktualisierungszustände zentral handhabt.
- Kurzlebiger lokaler Zustand bleibt in der Komponente, sofern er nicht von mehreren Bereichen benötigt wird.
- Ein globaler Store wird nur für bereichsübergreifenden UI State eingesetzt und klein sowie testbar gehalten.
- Nach Mutationen werden Caches gezielt aktualisiert oder invalidiert; Daten dürfen nicht durch unkontrollierte Duplikate auseinanderlaufen.

## 4. Validierung, APIs und Fehler

- Für Laufzeitvalidierung wird ein Schema-Validator verwendet, beispielsweise Zod.
- Request Bodies, Pfad- und Query-Parameter sowie Antworten externer Dienste werden validiert.
- Fehler werden für die UI in eine stabile, fachlich verständliche Form überführt. Interne Implementierungsdetails bleiben serverseitig.
- `catch`-Blöcke bleiben nicht leer. Sie protokollieren Kontext, behandeln den Fehler gezielt oder werfen ihn weiter.

## 5. Tests

- Domänenlogik, Parser, Mapper und Services erhalten Unit-Tests.
- React-Komponenten werden über Nutzerverhalten getestet, nicht über Implementierungsdetails.
- Tests decken mindestens erfolgreiche Abläufe sowie Lade-, Leer- und Fehlerzustände ab.
- Bei zeitabhängiger Logik wird Zeit durch eine Clock, Fake-Timer oder eine vergleichbare Abstraktion kontrollierbar gemacht.
