# Smart Home Dashboard – Coding Guidelines

**Version:** 1.0  
**Datum:** 2026-08-30  
**Status:** Mandatory

## 1. Grundprinzipien

Das Projekt folgt diesen Prioritäten:

1. Verständlichkeit
2. Korrektheit
3. Testbarkeit
4. Wartbarkeit
5. Performance
6. Cleverness

Code soll für einen anderen Entwickler verständlich sein, der das Projekt sechs Monate später übernimmt.

## 2. TypeScript

TypeScript wird im gesamten Projekt verwendet.

### Regeln

- `strict: true`
- `noUncheckedIndexedAccess: true`
- `exactOptionalPropertyTypes: true`
- keine impliziten `any`
- `any` nur mit begründeter Ausnahme
- externe Daten niemals ungeprüft als Domain-Typ behandeln
- unbekannte Daten zunächst als `unknown` behandeln

Schlecht:

```ts
const device = response.data as Device;
```

Besser:

```ts
const device = DeviceSchema.parse(response.data);
```

## 3. Domain zuerst

Business-Regeln gehören nicht in React-Komponenten und nicht in HTTP-Handler.

Schlecht:

```text
React Component
  ├── API Call
  ├── OpenHAB Mapping
  ├── Business Rule
  └── UI
```

Besser:

```text
UI
 ↓
Application Service
 ↓
Domain
 ↓
Port
 ↓
Adapter
```

## 4. Dependency Rule

Abhängigkeiten zeigen nach innen.

```text
UI → Application → Domain ← Infrastructure
```

Die Domain darf nicht von:

- React
- Fastify
- SQLite
- OpenHAB
- Browser APIs

abhängen.

## 5. Ports & Adapters

Externe Systeme werden über Interfaces abstrahiert.

Beispiel:

```ts
interface SmartHomeGateway {
  getDevices(): Promise<Device[]>;
  sendCommand(deviceId: string, command: DeviceCommand): Promise<void>;
}
```

OpenHAB implementiert dieses Interface:

```ts
class OpenHabAdapter implements SmartHomeGateway {
  // ...
}
```

So bleibt die Domain unabhängig von OpenHAB.

## 6. Naming

### Dateien

React-Komponenten:

```text
ShoppingList.tsx
WeatherCard.tsx
DeviceTile.tsx
```

Services:

```text
shopping-list.service.ts
weather.service.ts
```

Tests:

```text
shopping-list.service.test.ts
```

### Variablen

Aussagekräftige Namen:

```ts
const activeCalendarEvents = ...
```

nicht:

```ts
const data = ...
```

### Booleans

Mit eindeutiger Semantik:

```ts
isLoading
isConnected
hasError
canToggle
```

## 7. Funktionen

Funktionen sollen eine klar erkennbare Aufgabe besitzen.

Wenn eine Funktion gleichzeitig:

- API-Daten lädt
- Daten transformiert
- Business-Regeln ausführt
- Logging macht
- UI-State verändert

muss sie aufgeteilt werden.

## 8. React

Komponenten sollen möglichst deklarativ sein.

Vermeiden:

- große Komponenten > ca. 200 Zeilen
- komplexe Business-Logik in JSX
- direkte API-Aufrufe in UI-Komponenten
- globale Mutable State
- unnötige `useEffect`-Ketten

Bevorzugt:

```text
Page
 ├── Feature
 │    ├── Hook
 │    ├── Service
 │    └── Components
```

## 9. State Management

Unterscheide strikt:

### Server State

Beispielsweise:

- Wetter
- Kalender
- Einkaufslisten
- Gerätezustände

→ TanStack Query

### UI State

Beispielsweise:

- geöffneter Dialog
- ausgewählter Raum
- aktueller Tab

→ React State oder Zustand

Nicht alles global speichern.

## 10. API Design

HTTP APIs sind resource-orientiert.

Beispiel:

```http
GET /api/shopping/items
POST /api/shopping/items
PATCH /api/shopping/items/:id
DELETE /api/shopping/items/:id
```

Fehler werden konsistent strukturiert:

```json
{
  "error": {
    "code": "SHOPPING_ITEM_NOT_FOUND",
    "message": "Shopping item was not found."
  }
}
```

Interne Stack Traces werden niemals an Clients ausgeliefert.

## 11. Validation

Alle externen Inputs werden validiert:

- HTTP Request Body
- Query Parameter
- OpenHAB Responses
- Kalenderdaten
- Wetterdaten
- Sprachparser-Ergebnisse

Zod ist der Standard.

## 12. Error Handling

Keine still geschluckten Fehler.

Schlecht:

```ts
try {
  await saveItem();
} catch {}
```

Besser:

```ts
try {
  await saveItem();
} catch (error) {
  logger.error({ error }, "Failed to save shopping item");
  throw new ShoppingListError("ITEM_SAVE_FAILED");
}
```

Die UI muss Fehlerzustände sichtbar behandeln.

## 13. Logging

Logs müssen strukturiert und kontextreich sein.

Beispiel:

```ts
logger.info(
  {
    deviceId,
    command,
  },
  "Sending smart-home command",
);
```

Keine Passwörter, Tokens oder personenbezogenen Daten loggen.

## 14. Testing

### Unit Tests

Für:

- Domain-Regeln
- Parser
- Mapper
- Services
- Fehlerfälle

### Component Tests

Für:

- Interaktionen
- Loading
- Empty States
- Error States

### E2E Tests

Für kritische Abläufe:

1. Dashboard laden
2. Aktor schalten
3. Einkaufseintrag hinzufügen
4. Einkaufseintrag abhaken
5. Kalender anzeigen
6. Spracheingabe simulieren

## 15. Testbarkeit

Zeit, Zufall und externe Systeme werden abstrahiert.

Nicht:

```ts
new Date()
```

an vielen Stellen.

Bevorzugt ein injizierbarer Clock-/Time-Service.

## 16. Accessibility

Das Dashboard muss auch ohne Maus vollständig bedienbar sein.

Pflichten:

- semantisches HTML
- sichtbarer Fokus
- Tastaturbedienung
- ausreichende Kontraste
- Touch Targets mindestens ca. 44 × 44 px
- ARIA nur dort, wo Semantik nicht aus HTML entsteht

## 17. UI Guidelines

Das Dashboard soll ruhig und informationsorientiert wirken.

Prinzipien:

- klare visuelle Hierarchie
- wenige Primärfarben
- konsistente Abstände
- Karten nur dort, wo sie Informationen gruppieren
- keine unnötigen Animationen
- Status immer visuell und textuell verständlich

## 18. Responsive Regeln

Keine Interaktion darf ausschließlich über Hover funktionieren.

Touch ist Primary Input.

Buttons müssen großzügig dimensioniert sein.

Für Smart-Home-Aktionen werden eindeutige Zustände dargestellt:

```text
ON
OFF
UNKNOWN
UNAVAILABLE
PENDING
```

## 19. Security Coding Rules

Verboten:

- Secrets im Repository
- API Keys im Frontend
- dynamische Shell-Kommandos aus User Input
- unvalidierte OpenHAB Commands
- `dangerouslySetInnerHTML`, sofern nicht zwingend erforderlich

Abhängigkeiten regelmäßig aktualisieren.

## 20. Git

Commit Messages:

```text
feat: add shopping list
fix: handle unavailable device
refactor: extract weather adapter
test: add shopping service tests
docs: document speech architecture
chore: update dependencies
```

Branches:

```text
main
feature/*
fix/*
refactor/*
```

## 21. Pull Requests

Jeder PR beschreibt:

- Was wurde geändert?
- Warum?
- Wie wurde getestet?
- Gibt es Architekturänderungen?
- Gibt es UI-Auswirkungen?

Ein PR soll möglichst eine fachliche Änderung enthalten.

## 22. Code Review

Reviewer prüfen insbesondere:

- Verständlichkeit
- Domain-Grenzen
- Fehlerbehandlung
- Security
- Tests
- Accessibility
- unnötige Komplexität

Nicht jeder Stilpunkt muss diskutiert werden; automatisierte Regeln gehören in Linter/Formatter.

## 23. Definition of Done

Ein Feature ist fertig, wenn:

- Anforderungen erfüllt
- TypeScript erfolgreich kompiliert
- Lint erfolgreich
- Tests erfolgreich
- Fehlerfälle behandelt
- Loading-/Empty-State vorhanden
- Accessibility berücksichtigt
- Dokumentation aktualisiert
- keine unnötige technische Schuld eingeführt
