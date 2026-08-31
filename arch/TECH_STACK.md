# Smart Home Dashboard – Tech Stack

**Version:** 1.0  
**Datum:** 2026-08-30  
**Status:** Architecture Proposal

## 1. Ziel

Das Projekt ist eine moderne, touch-optimierte Web-Oberfläche für ein Smart-Home-System auf Basis von OpenHAB und Homematic IP. Die Anwendung soll primär auf Tablets und Amazon-Show-Geräten laufen und zusätzlich normale Desktop-/Mobile-Browser unterstützen.

Kernfunktionen:

- Smart-Home-Status und Aktorsteuerung
- Wetter
- Einkaufsliste
- Kalender
- Sprachgesteuertes Hinzufügen von Einkaufseinträgen
- Erweiterbare Integrationsarchitektur

## 2. Empfohlener Stack

| Bereich | Technologie | Begründung |
|---|---|---|
| Frontend | **React + TypeScript** | Reifes Ökosystem, sehr gute Komponentenarchitektur, langfristig wartbar |
| Build | **Vite** | Schnell, schlank und für eine reine Dashboard-SPA passender als ein unnötig komplexes SSR-Framework |
| UI | **Tailwind CSS + eigene Design Tokens** | Responsive, konsistent und gut für ein individuelles Dashboard |
| Komponenten | **shadcn/ui / Radix-Prinzipien** | Zugängliche, composable Komponenten; visuell vollständig anpassbar |
| Icons | **Lucide** | Konsistentes, modernes Icon-Set |
| State | **Zustand** | Kleine, gut testbare globale Zustände ohne unnötige Komplexität |
| Server-/Remote-State | **TanStack Query** | Caching, Refetching, Fehler- und Ladezustände |
| Routing | **React Router** | Für ein Dashboard ausreichend und etabliert |
| Backend | **Node.js + TypeScript + Fastify** | Kleiner, performanter API-/Integration-Layer |
| Validierung | **Zod** | Gemeinsame Runtime-Validierung von API-Daten |
| OpenHAB | **eigener Adapter im Backend** | OpenHAB bleibt Integrationsgrenze; Frontend kennt keine OpenHAB-Details |
| Kalender | **CalDAV/ICS-Adapter** | Provider-unabhängige Abstraktion |
| Einkaufsliste | **eigene REST-API + SQLite** | Einfach, lokal, wartbar; später leicht austauschbar |
| Wetter | **Provider-Adapter** | Verhindert Kopplung an einen einzelnen Wetterdienst |
| Sprache | **Web Speech API als UI-Einstieg + Backend-Parser** | Sprachinput möglichst direkt im Browser; Interpretation zentral und testbar |
| Datenbank | **SQLite** | Für einen lokalen Single-Household-Dashboard-Server ideal |
| ORM/DB Layer | **Drizzle ORM** | TypeScript-nah, leichtgewichtig und migrationsfähig |
| Tests | **Vitest + Testing Library + Playwright** | Unit-, Komponenten- und E2E-Tests |
| Lint/Format | **ESLint + Prettier** | Automatisierte Codequalität |
| Package Manager | **pnpm** | Schnelle, reproduzierbare Monorepo-Workflows |
| CI | **GitHub Actions** | Automatisierbare Checks und Releases |
| Deployment | **Docker Compose** | Reproduzierbarer lokaler Betrieb |

## 3. Architektur

Empfohlen wird ein **Monorepo**:

```text
smart-home-dashboard/
├── apps/
│   ├── web/                 # React SPA
│   └── api/                 # Fastify Backend
├── packages/
│   ├── domain/              # Domänenmodelle und Regeln
│   ├── api-client/          # typisierter API Client
│   ├── ui/                  # wiederverwendbare UI-Komponenten
│   └── config/              # gemeinsame TS/ESLint-Konfiguration
├── tests/
│   └── e2e/
├── docs/
├── docker/
├── package.json
├── pnpm-workspace.yaml
└── README.md
```

### Schichten

```text
┌──────────────────────────────┐
│          React UI            │
├──────────────────────────────┤
│     Application / Hooks      │
├──────────────────────────────┤
│       Backend API            │
├──────────────────────────────┤
│          Domain              │
├──────────────────────────────┤
│       Integration Layer      │
├──────────┬──────────┬────────┤
│ OpenHAB  │ Calendar │ Weather│
└──────────┴──────────┴────────┘
```

Das Frontend kommuniziert **niemals direkt mit OpenHAB, Wetterdiensten oder Kalenderprovidern**.

## 4. Warum kein Next.js?

Für das Dashboard ist primär eine dauerhaft geöffnete, lokale Web-App erforderlich. SEO und serverseitiges Rendering sind keine Kernanforderungen.

Eine Vite-basierte SPA reduziert:

- Laufzeitkomplexität
- Deployment-Komplexität
- Framework-Abhängigkeiten
- Überraschungen bei lokalem Betrieb

SSR kann später ergänzt werden, falls konkrete Anforderungen entstehen.

## 5. Backend als Integrationsgrenze

Das Backend stellt eine stabile interne API bereit, beispielsweise:

```text
GET    /api/weather
GET    /api/calendar/events
GET    /api/shopping/items
POST   /api/shopping/items
DELETE /api/shopping/items/:id

GET    /api/devices
GET    /api/devices/:id/state
POST   /api/devices/:id/commands
```

Dadurch kann OpenHAB später ersetzt oder ergänzt werden, ohne die UI grundlegend umzubauen.

## 6. OpenHAB

OpenHAB ist die zentrale Smart-Home-Integration.

Das Backend soll einen `OpenHabAdapter` implementieren. Intern darf dieser die OpenHAB REST API und ggf. Events/WebSockets verwenden.

Die Domäne arbeitet dagegen mit eigenen Modellen:

```ts
type Device = {
  id: string;
  name: string;
  type: DeviceType;
  capabilities: Capability[];
  state: DeviceState;
};
```

OpenHAB-spezifische Begriffe bleiben außerhalb der Domain.

## 7. Echtzeit

Für Smart-Home-Zustände sollte die UI nicht ausschließlich pollen.

Empfehlung:

- Backend empfängt/erkennt OpenHAB-Änderungen
- Backend publiziert interne Events
- Browser erhält Änderungen per WebSocket oder Server-Sent Events
- TanStack Query aktualisiert den relevanten Cache

Fallback: periodisches Polling.

## 8. Sprachsteuerung

Ziel ist zunächst:

> „Füge Milch zur Einkaufsliste hinzu.“

Pipeline:

```text
Mikrofon
   ↓
Speech-to-Text
   ↓
Command Parser
   ↓
Validated Command
   ↓
Shopping List Service
   ↓
Database
   ↓
UI Update
```

Die Sprachverarbeitung wird von der eigentlichen Einkaufslistenlogik getrennt.

Beispiel eines internen Commands:

```ts
{
  type: "shopping.add",
  item: "Milch"
}
```

Dadurch kann später ein anderer Speech-to-Text-Anbieter integriert werden, ohne die Domäne zu ändern.

## 9. Amazon Show

Die Amazon-Show-Kompatibilität wird als **Browser-/Web-App-Kompatibilität** betrachtet, nicht als eigene UI-Plattform.

Wichtig:

- große Touch Targets
- hohe Kontraste
- keine Hover-only Interactions
- robuste Darstellung bei festen Auflösungen
- wenig Text
- klare Zustände
- automatische Aktualisierung
- kein zwingend erforderlicher Login-Dialog im täglichen Betrieb

Die tatsächlich unterstützte Browser-/WebView-Version des konkreten Geräts muss vor dem Deployment validiert werden.

## 10. Responsive Design

Breakpoints sollen nicht gerätebezogen, sondern nach Layout-Bedarf definiert werden.

Beispiel:

```text
mobile
tablet
large-tablet
desktop
```

Das Dashboard soll primär für Querformat optimiert werden, aber Hochformat sinnvoll unterstützen.

## 11. Datenhaltung

SQLite ist für das erste Release ausreichend.

Tabellen:

```text
shopping_items
calendar_sources
dashboard_settings
audit_events
```

Smart-Home-Zustände werden grundsätzlich nicht redundant dauerhaft gespeichert, sofern OpenHAB die Quelle der Wahrheit ist.

## 12. Security

Auch im lokalen Netzwerk wird Security berücksichtigt:

- keine Secrets im Frontend
- OpenHAB Credentials nur serverseitig
- CORS restriktiv konfigurieren
- API Input validieren
- Rate Limits für mutierende Endpunkte
- keine beliebigen OpenHAB-Kommandos aus der UI zulassen
- explizite Capability-/Command-Whitelist
- Docker Container möglichst non-root
- Secrets über Environment/Secret Store

## 13. Deployment

Produktionsumgebung:

```text
Docker Compose
├── dashboard-web
└── dashboard-api
      └── SQLite volume
```

OpenHAB bleibt ein externes System.

Optional später:

```text
Reverse Proxy
TLS
Authentication
Monitoring
Backup
```

## 14. Qualitätsziele

Definition of Done für Features:

- TypeScript strict
- ESLint ohne Fehler
- Formatter clean
- Unit Tests für Domain-Logik
- Komponenten-Tests für relevante UI-Logik
- E2E-Test für kritische User Journeys
- keine unkontrollierten `any`
- Fehlerzustände implementiert
- Loading-/Empty-States implementiert
- Accessibility geprüft

## 15. ADRs

Architekturentscheidungen werden als ADRs dokumentiert:

```text
docs/adr/
├── 0001-monorepo.md
├── 0002-react-vite.md
├── 0003-openhab-adapter.md
├── 0004-sqlite.md
└── 0005-speech-architecture.md
```

Jede wesentliche Architekturentscheidung enthält:

- Kontext
- Entscheidung
- Alternativen
- Konsequenzen
