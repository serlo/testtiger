# Readme for Developer

## Einleitung

Dieses Repository enthält den Quellcode und die Inhalte für die nächste Generation der Prüfungsvorbereitung von Serlo. Es ist angedacht als eine selbstständige App zum Mathe-Üben. Sie ist als Web-App implementiert. Als Web-Framework kommt [next.js 14](https://nextjs.org/) zum Einsatz, für native Wrapper sind zudem [ionic 8](https://ionicframework.com/) und [capacitor 7](https://capacitorjs.com/docs) integriert. Das Haupt-Target ist aktuell Web.

## Getting Started

Es wird [node.js v20](https://nodejs.org/en) oder höher benötigt. Für nach dem Klonen des Repository im Hauptverzeichnis `npm start` aus. Dadurch werden alle Dependencies installiert und der Dev-Server auf http://localhost:3000/ gestartet. Du kannst auch `npm install` und `npm run dev` separat ausführen.

Erstelle ein production-build mit `npm run build`. Das Repository ist mit dem Serlo-Account von [vercel.com](https://vercel.com) und dort wird der Prototyp unter https://testtiger-nine.vercel.app/ gehostet. Pushe auf `main` für ein neues Deployment.

Das Repo enthält in `/backend` auch eine Backend-Server-Komponente. Führe `npm install` separat in diesem Repo aus und dann `npm start`. Das Backend wird aktuell dem Asteroid `testtige` des Serlo-Uberspace gehostet. Dort ist ein Verzeichnis `backend-testtiger` angelegt. Mit dem `./deploy.sh`-Script lässt sich eine neue Version des Servers deployen.

## 
