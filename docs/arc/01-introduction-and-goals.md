# 1. Einführung und Ziele

- Status: Entwurf
- Stand: 2026-08-30

Dieses Dokument beschreibt Abschnitt 1 der arc42-Architekturdokumentation. Es fasst die fachliche Aufgabenstellung, die wichtigsten Qualitätsziele und die Stakeholder-Erwartungen zusammen.

## 1.1 Aufgabenstellung

Smart Home Dashboard ist eine touch-optimierte Webanwendung für einen einzelnen Haushalt. Sie bündelt die für den Alltag wichtigen Informationen und Bedienfunktionen in einer zentralen Oberfläche:

- Status und Steuerung freigegebener Smart-Home-Geräte über OpenHAB und Homematic IP
- Wetterinformationen
- Kalendertermine
- eine gemeinsame Einkaufsliste
- sprachgestütztes Hinzufügen von Einkaufsartikeln

Die Anwendung wird primär auf Tablets im Querformat und Amazon-Show-Geräten eingesetzt. Desktop- und Smartphone-Browser werden zusätzlich unterstützt. Das Dashboard soll im täglichen Betrieb ohne komplexe, wiederkehrende Anmeldeschritte nutzbar sein.

Das Frontend kommuniziert ausschließlich mit dem eigenen Backend. Dieses bildet die Integrationsgrenze zu OpenHAB, Wetterdiensten und Kalenderprovidern. Dadurch bleiben externe Systeme und ihre Datenmodelle von der Benutzeroberfläche entkoppelt.

### Fachlicher Nutzen

Bewohner erhalten auf einen Blick eine verständliche Übersicht über Haushalt, Termine und Wetter. Häufige Aktionen, etwa das Schalten eines Lichts oder das Ergänzen der Einkaufsliste, sind direkt und mit eindeutigem Feedback ausführbar.

### MVP-Abgrenzung

Im ersten Release sind Dashboard, Wetter, Kalender, Einkaufsliste, Geräteanzeige, Aktorsteuerung, Spracheingabe für Einkaufsartikel sowie Fehler- und Offline-Zustände enthalten.

Nicht Teil des MVP sind Benutzerverwaltung, komplexe Automationen, Push-Benachrichtigungen, Energieauswertungen, Multi-Household-Unterstützung und native Mobile Apps.

## 1.2 Qualitätsziele

| Priorität | Qualitätsziel | Bedeutung für das System |
|---|---|---|
| 1 | Bedienbarkeit | Die Oberfläche ist für Touch optimiert, klar verständlich und auch ohne Maus vollständig bedienbar. Aktionen zeigen sofortige, eindeutige Zustände. |
| 2 | Zuverlässigkeit | Ein Ausfall eines einzelnen Integrationsdienstes darf nicht das gesamte Dashboard blockieren. Widgets zeigen unabhängige Lade-, Leer- und Fehlerzustände. |
| 3 | Sicherheit | Secrets und OpenHAB-Zugangsdaten bleiben serverseitig. Eingaben werden validiert und nur explizit freigegebene Gerätekommandos werden ausgeführt. |
| 4 | Wartbarkeit | Fachlogik bleibt von React, Fastify, SQLite und externen Integrationen getrennt. TypeScript strict, Tests sowie dokumentierte Architekturentscheidungen sichern Änderungen ab. |
| 5 | Erweiterbarkeit | Weitere Kalender-, Wetter-, Sprach- oder Smart-Home-Anbieter können über Ports und Adapter ergänzt werden, ohne die Domäne oder UI grundlegend umzubauen. |
| 6 | Performance | Die Startansicht und einzelne Widgets laden zügig und bleiben auch auf ressourcenschwächeren Zielgeräten flüssig. Unnötige Netzwerkzugriffe werden vermieden. |

## 1.3 Stakeholder

| Stakeholder | Rolle | Erwartungen und Anliegen |
|---|---|---|
| Haushaltsmitglieder | Tägliche Nutzer | Schneller Überblick, große Touch-Ziele, verständliche Zustände und direkte Bedienung von Einkaufsliste und Geräten. |
| Systembetreiber | Verantwortlich für Betrieb und Konfiguration | Einfache lokale Installation, sichere Verwaltung der Integrationszugänge und nachvollziehbare Fehlerzustände. |
| Entwickler | Implementierung und Weiterentwicklung | Klare Modul- und Schichtengrenzen, typisierte Verträge, automatisierte Tests und gut dokumentierte Entscheidungen. |
| OpenHAB | Zentrales externes Smart-Home-System | Ist Quelle der Wahrheit für Gerätezustände; erhält ausschließlich validierte und freigegebene Kommandos. |
| Kalender- und Wetteranbieter | Externe Datenquellen | Werden ausschließlich über austauschbare Backend-Adapter eingebunden. |

## Verweise

- [Funktionale Spezifikation](../arch/FUNCTIONAL_SPEC.md)
- [Technologie- und Architekturvorgaben](../arch/TECH_STACK.md)
- [Coding Guidelines](../arch/CODING_GUIDELINES.md)
