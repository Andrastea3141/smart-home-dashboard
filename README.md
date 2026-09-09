# Smart Home Dashboard

Eine touch-optimierte Web-Oberfläche für ein Smart Home. Das Dashboard ist für Tablets, Amazon-Show-Geräte sowie Desktop- und Mobil-Browser ausgelegt.

Der aktuelle Stand enthält die React-basierte Oberfläche. Die geplanten Integrationen für OpenHAB, Wetter, Kalender und Einkaufsliste sind noch nicht als Backend umgesetzt.

## Voraussetzungen

- [Node.js](https://nodejs.org/) 20 LTS oder neuer
- `corepack` (wird mit aktuellen Node.js-Versionen ausgeliefert)
- Git

Als Paketmanager wird pnpm 10 verwendet. Eine globale pnpm-Installation ist nicht erforderlich.

## Lokal starten

```bash
git clone <repository-url>
cd smart-home-dashboard
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

Danach ist die Anwendung standardmäßig unter [http://localhost:5173](http://localhost:5173) erreichbar. Der Entwicklungsserver aktualisiert die Seite bei Änderungen automatisch.

> Wenn du das Projekt bereits ohne Lockfile-Änderungen lokal entwickeln möchtest, ist auch `pnpm install` ausreichend. Für eine reproduzierbare Neuinstallation empfiehlt sich jedoch `--frozen-lockfile`.

## Verfügbare Befehle

| Befehl | Zweck |
| --- | --- |
| `pnpm dev` | Startet die Web-App im Entwicklungsmodus. |
| `pnpm typecheck` | Prüft TypeScript-Typen. |
| `pnpm build` | Führt den Typecheck aus und erstellt den Produktions-Build. |

Der Produktions-Build wird unter `apps/web/dist/` abgelegt. Dieser Ordner wird nicht versioniert und kann über jeden statischen Webserver ausgeliefert werden.

## Projektstruktur

```text
apps/
  web/                  React-, TypeScript- und Vite-Frontend
arch/                   Fachliche Spezifikation, Tech-Stack und Coding Guidelines
docs/                   Weiterführende Entwicklerdokumentation
package.json            Workspace-Skripte
pnpm-workspace.yaml     Monorepo-Konfiguration
```

Das Repository ist als pnpm-Workspace vorbereitet. Weitere Anwendungen und gemeinsame Pakete werden künftig unter `apps/` beziehungsweise `packages/` ergänzt.

## Konfiguration und Integrationen

Der sichtbare Name des Dashboards wird über [apps/web/public/dashboard-config.js](apps/web/public/dashboard-config.js) zur Laufzeit konfiguriert. Passe dafür den Wert von `dashboardName` an:

```js
window.__DASHBOARD_CONFIG__ = {
  dashboardName: "Mein Zuhause",
};
```

Die Datei wird beim Deployment mit ausgeliefert und kann danach direkt auf dem Webserver angepasst werden; ein neuer Frontend-Build ist nicht nötig. Für den aktuellen Stand sind keine Zugangsdaten erforderlich. Secrets – etwa für OpenHAB – gehören später ausschließlich in den Backend-/Deployment-Kontext und niemals in das Frontend oder Git.

Die vorgesehene Architektur, Integrationsgrenzen und Qualitätsziele sind in [arch/TECH_STACK.md](arch/TECH_STACK.md) beschrieben.

## Häufige Probleme

- **`pnpm` wird nicht gefunden:** Führe einmal `corepack enable` aus oder installiere pnpm 10 gemäß der [pnpm-Dokumentation](https://pnpm.io/installation).
- **Port 5173 ist belegt:** Beende den Prozess auf diesem Port oder starte Vite mit einem anderen Port, z. B. `pnpm --filter @smart-home-dashboard/web dev -- --port 5174`.
- **Abweichende Abhängigkeiten:** Lösche nicht vorschnell die Lockfile. Führe zuerst `pnpm install --frozen-lockfile` aus, damit exakt die versionierten Abhängigkeiten verwendet werden.
