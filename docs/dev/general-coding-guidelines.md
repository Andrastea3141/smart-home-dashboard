# Allgemeine Coding Guidelines

- Status: Verbindliche Vorlage
- Gültigkeit: technologieunabhängig

Diese Richtlinien sind für wiederverwendbare, wartbare Softwareprojekte gedacht. Sie gelten unabhängig von Programmiersprache, Framework und Laufzeitumgebung.

## 1. Prioritäten

Bei Zielkonflikten gilt folgende Reihenfolge:

1. Verständlichkeit
2. Korrektheit
3. Testbarkeit
4. Wartbarkeit
5. Sicherheit
6. Performance
7. Cleverness

Code muss für eine andere Person verständlich sein, die das Projekt später übernimmt. Prägnante, einfache Lösungen sind komplexen Abkürzungen vorzuziehen.

## 2. Architektur und Abhängigkeiten

- Fachliche Regeln gehören in eine technologieunabhängige Domänen- oder Anwendungsschicht, nicht in UI-Komponenten, HTTP-Handler oder Datenbankabfragen.
- Abhängigkeiten zeigen nach innen: äußere Schichten wie UI, Infrastruktur und Integrationen hängen von der Fachlogik ab, nicht umgekehrt.
- Externe Systeme werden über klar benannte Schnittstellen oder Ports angebunden; konkrete Anbieter implementieren Adapter.
- Datenmodelle und Begriffe externer Systeme dürfen nicht unkontrolliert in die Kernlogik durchsickern.
- Eine Funktion, Klasse oder Komponente hat eine klar erkennbare Aufgabe. Sie wird geteilt, sobald sie mehrere unabhängige Verantwortlichkeiten vereint.

## 3. Benennung und Struktur

- Namen beschreiben Zweck und Bedeutung; unspezifische Namen wie `data`, `value` oder `result` werden nur in sehr engem, offensichtlichem Kontext verwendet.
- Boolesche Werte und Funktionen verwenden eine lesbare Semantik, zum Beispiel `isLoading`, `hasPermission` oder `canSubmit`.
- Dateien, Module und Verzeichnisse folgen einer teamweit vereinbarten, konsistenten Namenskonvention.
- Tests liegen nahe an der getesteten Einheit oder folgen einer klaren, einheitlichen Teststruktur.

## 4. Schnittstellen, Eingaben und Fehler

- Öffentliche Schnittstellen und externe Eingaben werden vor der Verarbeitung validiert.
- APIs sind konsistent gestaltet und geben stabile, dokumentierte Fehlerstrukturen zurück.
- Fehler werden nicht still geschluckt. Sie werden entweder sinnvoll behandelt, mit Kontext protokolliert oder an eine Schicht weitergegeben, die sie behandeln kann.
- Interne Details, Stack Traces, Secrets und personenbezogene Daten werden nicht an Clients ausgegeben oder in Logs geschrieben.
- Zeit, Zufall und externe Systeme werden abstrahiert oder injizierbar gemacht, wenn dies die Testbarkeit verbessert.

## 5. Sicherheit

- Zugangsdaten, Tokens und Schlüssel gehören nicht ins Repository und nicht in Client-Anwendungen.
- Berechtigungen werden explizit geprüft; mutierende oder sicherheitsrelevante Aktionen benötigen eine Positivliste erlaubter Operationen.
- Dynamische Ausführung von Befehlen oder Code aus Nutzereingaben ist verboten, sofern sie nicht zwingend erforderlich und abgesichert ist.
- Abhängigkeiten werden regelmäßig aktualisiert und bekannte Sicherheitslücken zeitnah bewertet.

## 6. Bedienbarkeit und Zugänglichkeit

- Oberflächen verwenden semantische Elemente und sind vollständig per Tastatur bedienbar.
- Fokuszustände, Fehlermeldungen und Statusänderungen sind wahrnehmbar und für assistive Technologien verständlich.
- Interaktionen funktionieren nicht ausschließlich per Hover; Touch- und Tastaturbedienung sind gleichwertig zu berücksichtigen.
- Aktionen geben zeitnahes, verständliches Feedback. Lade-, Leer-, Erfolgs- und Fehlerzustände werden explizit gestaltet.

## 7. Tests und Qualitätssicherung

- Fachliche Regeln, Fehlerfälle und kritische Transformationen werden durch automatisierte Unit-Tests abgesichert.
- Nutzerinteraktionen sowie Lade-, Leer- und Fehlerzustände werden durch Komponenten- oder Integrationstests geprüft.
- Kritische Nutzungsabläufe werden durch End-to-End-Tests abgedeckt.
- Formatierung, statische Analyse und Tests laufen automatisiert lokal und in der CI.
- Code Reviews prüfen mindestens Verständlichkeit, Architekturgrenzen, Fehlerbehandlung, Sicherheit, Tests und Zugänglichkeit.

## 8. Zusammenarbeit

- Commits sind klein, in sich geschlossen und beschreiben die Änderung verständlich.
- Pull Requests erläutern Änderung, Motivation, Tests, Architekturfolgen und sichtbare UI-Auswirkungen.
- Architekturentscheidungen mit langfristiger Wirkung werden dokumentiert, zum Beispiel als ADR.
- Änderungen an Verhalten, Schnittstellen oder Betrieb werden zusammen mit der zugehörigen Dokumentation aktualisiert.

## 9. Definition of Done

Ein Feature ist fertig, wenn:

- die Anforderungen erfüllt sind;
- automatisierte Qualitätsprüfungen fehlerfrei laufen;
- relevante Fehler-, Lade- und Leerzustände umgesetzt sind;
- Sicherheits- und Zugänglichkeitsanforderungen berücksichtigt wurden;
- Tests und Dokumentation zur Änderung passen;
- keine vermeidbare technische Schuld eingeführt wurde.
