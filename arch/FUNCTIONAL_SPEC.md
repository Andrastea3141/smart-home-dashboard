# Smart Home Dashboard – Funktionale Spezifikation

**Version:** 1.0  
**Datum:** 2026-08-30  
**Status:** Draft / MVP Specification

## 1. Produktvision

Das Dashboard ist die zentrale, einfach bedienbare Oberfläche für den täglichen Smart-Home-Haushalt.

Auf einen Blick sollen Benutzer erkennen:

- Wie ist das Wetter?
- Was steht im Kalender?
- Was steht auf der Einkaufsliste?
- Wie ist der Zustand wichtiger Smart-Home-Geräte?
- Welche Geräte können direkt gesteuert werden?

Zusätzlich soll Spracheingabe das schnelle Hinzufügen von Einkaufsartikeln ermöglichen.

## 2. Zielplattformen

Primär:

- Tablet im Querformat
- Amazon Show / kompatibles Browser-Erlebnis

Sekundär:

- Desktop Browser
- Smartphone Browser

## 3. MVP Scope

### Im MVP enthalten

- Dashboard
- Wetter
- Einkaufsliste
- Kalender
- Smart-Home-Geräte
- Aktorsteuerung
- Sprachgesteuertes Hinzufügen zur Einkaufsliste
- Responsive UI
- Fehler- und Offline-Zustände

### Nicht zwingend im MVP

- Benutzerverwaltung
- komplexe Automationsregeln
- Push Notifications
- Energieauswertung
- Multi-Household
- native Android/iOS App

## 4. Dashboard

Das Dashboard ist die Startseite.

Empfohlene Struktur:

```text
┌───────────────────────────────────────────────────┐
│ Uhrzeit                  Datum                    │
├───────────────────────┬───────────────────────────┤
│ Wetter                │ Kalender                  │
│ Temperatur            │ Nächste Termine           │
│ Wetterlage            │                           │
├───────────────────────┼───────────────────────────┤
│ Einkaufsliste         │ Smart Home                │
│ offene Einträge       │ Räume / Aktoren           │
│ + Sprache             │ Licht / Steckdosen etc.   │
└───────────────────────┴───────────────────────────┘
```

Das genaue Layout darf sich an Bildschirmgröße und Orientierung anpassen.

## 5. Wetter

### Anzeige

Mindestens:

- aktuelle Temperatur
- Wetterzustand
- gefühlte Temperatur
- Tageshöchst-/Tiefsttemperatur

Optional:

- Niederschlagswahrscheinlichkeit
- Wind
- Stundenprognose

### Verhalten

- automatische Aktualisierung
- Loading State
- Fehler State
- Zeitpunkt des letzten erfolgreichen Updates

Beispiel:

```text
☀️ 22 °C
Heute 25° / 14°
```

## 6. Einkaufsliste

### Funktionen

Benutzer kann:

- Artikel hinzufügen
- Artikel abhaken
- Artikel wieder öffnen
- Artikel löschen
- Liste anzeigen

Optional später:

- Kategorien
- Mengen
- Prioritäten
- mehrere Listen

### Datenmodell

```text
ShoppingItem
- id
- name
- completed
- createdAt
- completedAt?
```

### UI

Offene Artikel stehen prominent oben.

Abgehakte Artikel werden visuell zurückgenommen.

## 7. Spracheingabe

Primärer Use Case:

> „Füge Milch zur Einkaufsliste hinzu.“

### Ablauf

1. Benutzer aktiviert Mikrofon
2. System zeigt aktiven Aufnahmezustand
3. Sprache wird in Text umgewandelt
4. Text wird interpretiert
5. erkannter Artikel wird angezeigt
6. Benutzer bestätigt oder System fügt ihn direkt hinzu
7. Liste wird aktualisiert

### Fehlerfälle

Wenn Sprache nicht verstanden wurde:

```text
Ich habe dich nicht verstanden.
Nochmal versuchen
```

Wenn kein Mikrofon verfügbar ist:

```text
Spracheingabe ist auf diesem Gerät nicht verfügbar.
```

## 8. Kalender

### Anzeige

Auf dem Dashboard:

- heutiges Datum
- nächste Termine
- Uhrzeit
- Titel
- optional Ort

Beispiel:

```text
HEUTE

09:00  Team Meeting
13:30  Zahnarzt
18:00  Elternabend
```

### Kalenderintegration

Kalenderprovider werden abstrahiert.

MVP kann zunächst einen Kalender unterstützen.

Technische Integrationen:

- CalDAV
- ICS
- später Google/Microsoft/etc. über separate Adapter

### Verhalten

- automatische Aktualisierung
- Fehlerzustand
- leere Tage werden sinnvoll dargestellt

## 9. Smart Home

OpenHAB ist die primäre Quelle für Smart-Home-Geräte.

### Gerätetypen

MVP sollte mindestens unterstützen:

- Licht
- Schalter
- Steckdose
- Dimmer
- Rolladen/Jalousie
- Temperatur-/Sensorwerte

Weitere Gerätetypen sollen architektonisch möglich sein.

## 10. Räume

Geräte werden Räumen zugeordnet.

Beispiel:

```text
Wohnzimmer

[Deckenlicht]   ON
[Stehlampe]     OFF
[Rollladen]     60%
[Temperatur]    22.4 °C
```

## 11. Aktorsteuerung

Benutzer kann einen unterstützten Aktor direkt bedienen.

Beispiele:

### Schalter

```text
OFF → ON
```

### Dimmer

```text
30 % → 50 %
```

### Rolladen

```text
60 % → 0 %
```

### Sicherheitsanforderung

Nur bekannte und explizit freigegebene Commands dürfen an OpenHAB gesendet werden.

## 12. Command States

Nach einer Aktion zeigt die UI:

```text
PENDING
```

Danach:

```text
ON
```

Bei Fehler:

```text
FAILED
```

Bei unbekanntem Gerätezustand:

```text
UNKNOWN
```

## 13. Echtzeitaktualisierung

Wenn ein Gerät außerhalb des Dashboards verändert wird, soll die UI möglichst schnell aktualisiert werden.

Beispiel:

```text
Wandschalter → OpenHAB → Dashboard
```

Das Dashboard soll nicht ausschließlich auf eigene Benutzeraktionen reagieren.

## 14. Navigation

MVP:

```text
Dashboard
Shopping
Calendar
Smart Home
Settings
```

Die wichtigsten Funktionen bleiben über das Dashboard direkt erreichbar.

Auf kleinen Displays kann die Navigation als Bottom Navigation oder Drawer umgesetzt werden.

## 15. Einstellungen

MVP-Einstellungen:

- Wetterstandort
- verwendeter Kalender
- Dashboard Layout
- bevorzugte Räume
- Aktualisierungsintervalle

Später:

- Theme
- Benutzer
- Sprachprovider
- Integrationen

## 16. Offline / Verbindungsfehler

Wenn Backend oder OpenHAB nicht erreichbar sind:

Dashboard bleibt benutzbar, soweit lokale Daten vorhanden sind.

Beispiel:

```text
⚠ Smart Home momentan nicht erreichbar
Letzte Aktualisierung: 17:42
```

Keine UI soll bei einem einzelnen fehlenden Dienst komplett blockieren.

## 17. Ladezustände

Jedes Widget besitzt einen eigenen Zustand:

```text
LOADING
SUCCESS
EMPTY
ERROR
```

Ein Fehler im Wetter darf beispielsweise nicht verhindern, dass die Einkaufsliste angezeigt wird.

## 18. Aktualisierung

Empfehlung:

- Smart Home: eventbasiert + Fallback Polling
- Wetter: periodisch
- Kalender: periodisch
- Einkaufsliste: sofort nach Mutation + Cache Update

Intervalle sollen konfigurierbar sein.

## 19. UX-Anforderungen

### Touch

- große Touch Targets
- ausreichend Abstand
- keine kleinen Icon-only Buttons ohne verständlichen Kontext

### Feedback

Jede Aktion muss unmittelbar Feedback geben.

Beispiel:

```text
Stehlampe
[ EIN ]

→ Klick

Stehlampe
[ WIRD GESCHALTET … ]

→ Erfolg

Stehlampe
[ AUS ]
```

## 20. Accessibility

Das System muss:

- Tastaturbedienung unterstützen
- sichtbaren Fokus anzeigen
- sinnvolle Screenreader Labels besitzen
- ausreichenden Kontrast verwenden
- Statusänderungen zugänglich kommunizieren

## 21. Performance

Ziel:

- Dashboard initial schnell anzeigen
- Widgets unabhängig laden
- keine unnötigen Netzwerkrequests
- Bilder nur wenn tatsächlich benötigt
- UI soll auch auf schwächerer Hardware flüssig bleiben

## 22. Akzeptanzkriterien MVP

### Dashboard

- [ ] Dashboard kann geöffnet werden
- [ ] Wetter wird angezeigt
- [ ] Kalender wird angezeigt
- [ ] Einkaufsliste wird angezeigt
- [ ] Smart-Home-Geräte werden angezeigt
- [ ] Widgets können unabhängig Fehler anzeigen

### Einkaufsliste

- [ ] Artikel hinzufügen
- [ ] Artikel abhaken
- [ ] Artikel löschen
- [ ] Liste wird nach Änderungen aktualisiert

### Sprache

- [ ] Mikrofon kann aktiviert werden
- [ ] Sprache wird erkannt
- [ ] „Füge X zur Einkaufsliste hinzu“ funktioniert
- [ ] Fehler werden verständlich dargestellt

### Smart Home

- [ ] Geräte aus OpenHAB werden angezeigt
- [ ] Gerätezustand wird dargestellt
- [ ] unterstützte Aktoren können geschaltet werden
- [ ] externe Zustandsänderungen erscheinen im Dashboard

### Kalender

- [ ] heutige Termine werden angezeigt
- [ ] kommende Termine werden angezeigt
- [ ] Kalenderfehler werden dargestellt

## 23. Nichtfunktionale Anforderungen

### Wartbarkeit

- klare Architekturgrenzen
- TypeScript strict
- automatisierte Tests
- dokumentierte Architekturentscheidungen

### Sicherheit

- keine Secrets im Browser
- API Validierung
- Command Whitelisting
- sichere Konfiguration

### Erweiterbarkeit

Neue Integrationen sollen über Adapter ergänzt werden können:

```text
Integration
   ↓
Port / Interface
   ↓
Adapter
```

Beispiele:

```text
OpenHabAdapter
WeatherAdapter
CalendarAdapter
SpeechAdapter
```

## 24. Future Features

Nach MVP denkbar:

- Szenen („Gute Nacht“)
- Raum-Übersicht
- Energieverbrauch
- Anwesenheit
- automatische Routinen
- Benachrichtigungen
- mehrere Einkaufslisten
- Mengen und Kategorien
- mehrere Kalender
- Wettervorhersage
- Sprachsteuerung für Smart-Home-Aktionen
- Benutzerprofile
- PIN-/Authentifizierung für kritische Aktionen

## 25. Offene Architekturentscheidungen

Vor Implementierungsstart zu klären:

1. Welche OpenHAB-Version wird eingesetzt?
2. Welche OpenHAB Items/Things/Groups sollen sichtbar sein?
3. Welche konkreten Homematic-IP-Geräte sind vorhanden?
4. Welcher Kalenderprovider wird verwendet?
5. Wo läuft der Dashboard-Server?
6. Welche Amazon-Show-Generation bzw. welches konkrete Gerät wird verwendet?
7. Muss das System ausschließlich lokal funktionieren?
8. Ist externe Sprachverarbeitung erlaubt oder soll Speech-to-Text lokal laufen?
9. Ist Authentifizierung im Heimnetz erforderlich?
10. Welche Räume und Aktoren sollen im MVP tatsächlich auf dem Dashboard erscheinen?

Diese Punkte sollten vor dem ersten produktiven Feature in einer kurzen technischen Discovery geklärt werden.
