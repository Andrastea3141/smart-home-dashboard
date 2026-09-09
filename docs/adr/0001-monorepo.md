# ADR 0001: Monorepo für das Smart Home Dashboard

- Status: Accepted
- Datum: 2026-08-30

## Kontext

Das Smart Home Dashboard besteht aus einer React-Webanwendung, einem Fastify-Backend und mehreren gemeinsamen Paketen. Dazu gehören insbesondere Domänenmodelle, ein typisierter API-Client, UI-Komponenten sowie gemeinsame Tooling-Konfigurationen.

Diese Bestandteile werden gemeinsam entwickelt und müssen aufeinander abgestimmt versioniert werden. Änderungen an API-Verträgen oder Domänenmodellen betreffen häufig sowohl Backend als auch Frontend.

## Entscheidung

Das Projekt wird als pnpm-basiertes Monorepo geführt.

Die oberste Struktur ist:

```text
apps/
  web/          # React SPA
  api/          # Fastify-Backend
packages/
  domain/       # Domänenmodelle und Regeln
  api-client/   # Typisierter API-Client
  ui/           # Wiederverwendbare UI-Komponenten
  config/       # Gemeinsame Konfiguration
tests/
  e2e/          # End-to-End-Tests
```

Die Workspaces werden über `pnpm-workspace.yaml` verwaltet. Pakete dürfen nur in Richtung ihrer definierten Abhängigkeiten referenziert werden; insbesondere bleibt `packages/domain` unabhängig von UI-, Web- und Infrastrukturdetails.

## Alternativen

### Getrennte Repositories

Frontend, Backend und gemeinsame Bibliotheken könnten in separaten Repositories liegen. Das erhöht jedoch den Abstimmungs- und Veröffentlichungsaufwand, besonders bei gemeinsamen API- und Domänenänderungen.

### Monolith ohne Packages

Web- und Backend-Code könnten in einem einzelnen Projekt ohne Workspaces liegen. Dadurch wären gemeinsame Grenzen und wiederverwendbare Bausteine weniger klar und die gewünschte Schichtenarchitektur schwerer durchsetzbar.

## Konsequenzen

### Positiv

- Gemeinsame Typen und Verträge können ohne separate Veröffentlichungen verwendet werden.
- Änderungen über Frontend-, Backend- und Paketgrenzen hinweg sind atomar nachvollziehbar.
- Gemeinsame TypeScript-, ESLint- und Prettier-Konfigurationen bleiben konsistent.
- Tests und CI können zentral ausgeführt werden.

### Negativ

- Die Paketgrenzen und Abhängigkeitsrichtungen müssen aktiv gepflegt werden.
- Tooling und CI benötigen Workspace-Unterstützung.
- Unnötige Kopplung zwischen Paketen muss durch Code Reviews und Architekturregeln verhindert werden.
