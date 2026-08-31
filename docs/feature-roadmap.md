# Feature-Roadmap

- Status: Entwurf
- Stand: 2026-08-31
- Grundlage: [Funktionale Spezifikation](../arch/FUNCTIONAL_SPEC.md)

Diese Roadmap gliedert die Anforderungen in lieferbare Inkremente. Die Reihenfolge folgt fachlichen Abhängigkeiten: Zuerst wird eine belastbare Basis geschaffen, danach werden unabhängige Funktionen als vertikale Schnitte umgesetzt. Die zeitliche Dauer ist bewusst nicht festgelegt.

## Überblick

| Phase | Ziel | Ergebnis |
|---|---|---|
| 0 | Technische Discovery und Fundament | Geklärte Integrationen, lauffähige Basis und gemeinsame Qualitätsstandards |
| 1 | Nutzbares Dashboard-Grundgerüst | Responsive Navigation und Widget-Rahmen mit robusten Zuständen |
| 2 | Einkaufsliste | Vollständig nutzbarer erster vertikaler Funktionsschnitt |
| 3 | Informationswidgets | Wetter und Kalender auf Dashboard und Detailseiten |
| 4 | Smart Home | Geräteübersicht, sichere Steuerung und Statusaktualisierung |
| 5 | Sprache und Einstellungen | Spracheingabe für die Einkaufsliste sowie konfigurierbare Integrationen |
| 6 | MVP-Härtung | Zugänglichkeit, Fehlertoleranz, Performance und End-to-End-Absicherung |
| Danach | Erweiterungen | Funktionen außerhalb des MVP-Scope |

## Phase 0 – Technische Discovery und Fundament

Ziel ist, die im Dokument offenen Architekturentscheidungen aufzulösen und eine sichere Entwicklungsbasis zu schaffen.

- Konkrete OpenHAB-Version, sichtbare Items, Räume und unterstützte Homematic-IP-Geräte festlegen.
- Kalenderprovider, Wetterprovider, Serverstandort, Zielgerät und Anforderungen an lokale Nutzung beziehungsweise Authentifizierung klären.
- Datenmodelle und Ports für Geräte, Wetter, Kalender und Einkaufsliste definieren.
- Backend-Grundgerüst mit Validierung, strukturierter Fehlerantwort, Konfiguration und Health-Check erstellen.
- SQLite-Migrationen für `shopping_items`, `calendar_sources`, `dashboard_settings` und `audit_events` aufsetzen.
- Frontend-Grundgerüst mit Design Tokens, Routing, Query-Client, zugänglichen Basiskomponenten und responsivem Layout anlegen.
- CI-Grundchecks für TypeScript, Linting, Formatierung und Tests einrichten.

**Abschlusskriterium:** Das Web-Frontend und die API starten lokal; eine konfigurierte Beispielintegration kann über einen Port/Adapter angesprochen werden.

## Phase 1 – Nutzbares Dashboard-Grundgerüst

Das Dashboard ist erreichbar und gibt der Anwendung eine einheitliche, touch-taugliche Bedienstruktur.

- Startseite mit Datum und Uhrzeit sowie Bereichen für Wetter, Kalender, Einkaufsliste und Smart Home.
- Navigation für Dashboard, Einkaufsliste, Kalender, Smart Home und Einstellungen.
- Responsive Layouts für Tablet im Querformat als Primärziel sowie sinnvolle Darstellung auf Desktop und Smartphone.
- Eigenständige Widget-Zustände: `LOADING`, `SUCCESS`, `EMPTY` und `ERROR`.
- Übergreifende Offline- und Verbindungsanzeige mit Zeitpunkt der letzten erfolgreichen Aktualisierung.

**Abschlusskriterium:** Die Anwendung ist auf den Ziel-Browsern navigierbar; ein fehlerhaftes Widget verhindert nicht die Nutzung der übrigen Oberfläche.

## Phase 2 – Einkaufsliste

Die Einkaufsliste wird als erster vollständiger vertikaler Funktionsschnitt umgesetzt.

- Artikel anzeigen und hinzufügen.
- Artikel abhaken, wieder öffnen und löschen.
- Offene Artikel prominent darstellen und erledigte Artikel visuell zurücknehmen.
- REST-API, Persistenz in SQLite, Eingabevalidierung und Fehlerbehandlung implementieren.
- Nach Mutationen sofort aktualisieren und die zugehörigen Lade-, Leer- und Fehlerzustände abbilden.

**Abschlusskriterium:** Ein Artikel bleibt nach einem Neustart erhalten, kann verwaltet werden und die UI aktualisiert sich nach jeder Aktion zuverlässig.

## Phase 3 – Informationswidgets: Wetter und Kalender

Das Dashboard erhält die zentralen Informationsquellen für den Tagesüberblick.

### Wetter

- Aktuelle Temperatur, Wetterzustand, gefühlte Temperatur sowie Tageshöchst- und -tiefsttemperatur anzeigen.
- Zeitpunkt der letzten erfolgreichen Aktualisierung ausweisen.
- Periodische Aktualisierung sowie unabhängige Lade- und Fehlerzustände umsetzen.

### Kalender

- Heutiges Datum und die nächsten Termine mit Uhrzeit, Titel und optionalem Ort anzeigen.
- Einen Kalender über CalDAV oder ICS integrieren; die Schnittstelle bleibt providerunabhängig.
- Leere Tage sowie Fehlerzustände sinnvoll darstellen und periodisch aktualisieren.

**Abschlusskriterium:** Wetter und Kalender sind unabhängig konfigurierbar, über Adapter eingebunden und auf dem Dashboard auch bei Ausfall der jeweils anderen Dienste nutzbar.

## Phase 4 – Smart Home

OpenHAB wird als zentrale Quelle für Geräte- und Zustandsdaten eingebunden.

- Geräte nach Räumen anzeigen und die Typen Licht, Schalter, Steckdose, Dimmer, Rollladen/Jalousie sowie Sensorwerte unterstützen.
- Für jeden Gerätetyp Zustand und verfügbare Fähigkeiten verständlich darstellen.
- Freigegebene Aktoren steuern; nur bekannte, explizit erlaubte Kommandos an OpenHAB senden.
- Aktionszustände `PENDING`, `ON` beziehungsweise Zielzustand, `FAILED`, `UNKNOWN` und `UNAVAILABLE` anzeigen.
- Externe Zustandsänderungen bevorzugt ereignisbasiert, mit Polling als Fallback, in die UI übernehmen.
- OpenHAB-Zugangsdaten ausschließlich im Backend halten; Antworten und Kommandos validieren.

**Abschlusskriterium:** Ein freigegebenes Gerät kann sicher geschaltet werden, und eine außerhalb des Dashboards ausgelöste Änderung erscheint zeitnah in der Oberfläche.

## Phase 5 – Sprache und Einstellungen

Die Bedienung wird um Spracheingabe und die notwendige Konfiguration ergänzt.

### Spracheingabe

- Mikrofonzugriff und sichtbaren Aufnahmezustand implementieren.
- Sprache über die Web Speech API in Text überführen und den Befehl im Backend validieren und interpretieren.
- Den MVP-Use-Case „Füge X zur Einkaufsliste hinzu“ unterstützen.
- Erkannten Artikel bestätigen oder direkt hinzufügen; verständliche Rückmeldungen bei fehlendem Mikrofon oder nicht verstandener Sprache anzeigen.

### Einstellungen

- Wetterstandort, Kalenderquelle, Dashboard-Layout, bevorzugte Räume und Aktualisierungsintervalle konfigurieren.
- Einstellungen sicher persistieren und ihre Auswirkungen im Dashboard nachvollziehbar darstellen.

**Abschlusskriterium:** Ein Nutzer kann einen Einkaufsartikel per Sprache ergänzen und die für Wetter, Kalender und Dashboard benötigten Grundeinstellungen selbst verwalten.

## Phase 6 – MVP-Härtung und Abnahme

Der MVP wird für den täglichen Betrieb stabilisiert und gegen die Akzeptanzkriterien geprüft.

- Zugänglichkeit prüfen: Tastaturbedienung, sichtbarer Fokus, Kontrast, Screenreader-Labels und Statusankündigungen.
- Touch-Bedienung auf Zielgeräten prüfen; alle relevanten Aktionen erhalten ausreichend große Touch-Ziele.
- Fehler- und Offline-Szenarien für Backend, OpenHAB, Wetter, Kalender und Mikrofon testen.
- Performance auf ressourcenschwächeren Zielgeräten prüfen und unnötige Requests reduzieren.
- Unit-Tests für Domainlogik, Parser, Mapper und Services ergänzen.
- Komponenten-Tests für Interaktionen sowie Lade-, Leer- und Fehlerzustände ergänzen.
- End-to-End-Tests für Dashboard, Aktorsteuerung, Einkaufsliste, Kalender und Spracheingabe ergänzen.

**Abschlusskriterium:** Die Akzeptanzkriterien aus Abschnitt 22 der Functional Spec sind erfüllt; TypeScript, Linting, Formatierung und alle Tests laufen fehlerfrei.

## Nach dem MVP

Folgende Funktionen werden erst nach erfolgreicher MVP-Abnahme priorisiert:

- Szenen, Raumübersicht, Anwesenheit und automatische Routinen
- Energieverbrauch und Benachrichtigungen
- Mengen, Kategorien und mehrere Einkaufslisten
- Mehrere Kalender und Wettervorhersage
- Sprachsteuerung für Smart-Home-Aktionen
- Benutzerprofile sowie PIN- oder sonstige Authentifizierung für kritische Aktionen
- Multi-Household-Unterstützung und native Android-/iOS-Apps

## Abhängigkeiten und Risiken

- Phasen 3 bis 5 benötigen die in Phase 0 geklärten Provider, Zugangsdaten und Zielgeräte.
- Phase 4 hängt besonders von einer gepflegten Command-Whitelist und dem tatsächlichen OpenHAB-Datenmodell ab.
- Die Qualität der Spracheingabe hängt von der Browserunterstützung des Zielgeräts ab; ein manueller Fallback zum Hinzufügen von Artikeln bleibt erforderlich.
- Die Zielbrowser-Version des eingesetzten Amazon-Show-Geräts muss vor der produktiven Abnahme validiert werden.
