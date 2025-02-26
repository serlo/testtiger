# Readme for Developer

## Einleitung

Dieses Repository enthält den Quellcode und die Inhalte für die nächste Generation der Prüfungsvorbereitung von Serlo. Es ist angedacht als eine selbstständige App zum Mathe-Üben. Sie ist als Web-App implementiert. Als Web-Framework kommt [next.js 14](https://nextjs.org/) zum Einsatz, für native Wrapper sind zudem [ionic 8](https://ionicframework.com/) und [capacitor 7](https://capacitorjs.com/docs) integriert. Das Haupt-Target ist aktuell Web.

## Getting Started

Es wird [node.js v20](https://nodejs.org/en) oder höher benötigt. Führe nach dem Klonen des Repository im Hauptverzeichnis `npm start` aus. Dadurch werden alle Abhängigkeiten installiert und der Dev-Server auf http://localhost:3000/ gestartet. Du kannst auch `npm install` und `npm run dev` separat ausführen.

Erstelle ein production-build mit `npm run build`. Das Repository ist mit dem Serlo-Account von [vercel.com](https://vercel.com) und dort wird der Prototyp unter https://testtiger-nine.vercel.app/ gehostet. Pushe auf `main` für ein neues Deployment.

Das Repo enthält in `/backend` auch eine Backend-Server-Komponente. Führe `npm install` separat in diesem Repo aus und dann `npm start`. Das Backend wird aktuell dem Asteroid `testtige` des Serlo-Uberspace gehostet. Dort ist ein Verzeichnis `backend-testtiger` angelegt. Mit dem `./deploy.sh`-Script lässt sich eine neue Version des Servers deployen.

    Ordner- & Dateistruktur
        Verzeichnisaufbau: Erklärung der Hauptordner und deren Zweck (z.B. src, components, assets, styles, etc.).
        Namenskonventionen: Wie Dateien und Komponenten benannt werden.

    Technologien & Abhängigkeiten
        Frontend-Framework: (z.B. React, Vue, Angular) und kurze Begründung der Auswahl.
        Wichtige Libraries & Tools: Beschreibung der wichtigsten externen Pakete, Build-Tools, Linter, Formatter, etc.

    Entwicklungs- & Deployment-Prozess
        Workflow: Branching-Strategie, Code Reviews, Merge-Prozesse.
        Testing: Welche Testarten (Unit, Integration, E2E) implementiert sind und wie sie ausgeführt werden.
        CI/CD: Informationen zu automatisierten Tests, Builds und Deployments (z.B. über GitHub Actions, Jenkins o.ä.).

    Coding Guidelines & Best Practices
        Code-Style: Konventionen, die eingehalten werden (z.B. ESLint/Prettier-Konfigurationen).
        Commit-Messages: Vorlagen oder Regeln für sinnvolle Commit-Beschreibungen.

    Troubleshooting & FAQ
        Häufige Probleme: Bekannte Stolpersteine und deren Lösungen.
        Debugging-Tipps: Hilfreiche Tools und Vorgehensweisen zur Fehleranalyse.

    Weiterführende Ressourcen & Dokumentation
        Links: Zu externen Dokumentationen, Tutorials, oder Design-Guidelines.
        Kontakt & Support: An wen man sich bei Fragen wenden kann.

Diese Struktur deckt alle wesentlichen Bereiche ab, die dein Nachfolger kennen sollte, um sich schnell zurechtzufinden und produktiv zu arbeiten. Natürlich kannst du je nach Komplexität deines Repos und den Bedürfnissen deines Teams einzelne Punkte noch erweitern oder anpassen.
