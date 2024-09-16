# TestTiger Prototyp und dynamische Aufgaben

## Mitarbeit und Installation

Erstelle dir als einen GitHub-Account. Lasse dich über diesen Account in dieses Repository einladen.

Installiere drei Programme auf deinen Computer:

1. [GitHub Desktop](https://github.com/apps/desktop) für den Zugriff auf den Quellcode.
2. [NodeJS](https://nodejs.org/en) als Laufzeitumgebung (empfohlene Version 20 LTS )
3. [VS Code](https://code.visualstudio.com/) als Code-Editor

Öffne nun GitHub Desktop, melde dich an und nutze "clone repository", um den TestTiger auf deinen Computer zu speichern. Wähle einen Ordner dafür aus.

Starte Code, klicke "open folder" und öffne den obigen Ordner. Klicke auf "trust", wenn danach gefragt wird.

Öffe in Code ein Terminal mit **Strg-ö** und führe diesen Befehl aus: `npm install`.

Für ein gutes Arbeitserlebnis, richte noch paar Dinge im Editor ein:

- Gehe unter View > Extensions und installiere `Tailwind CSS IntelliSense` und `Prettier - Code formatter`
- Gehe unter File > Preferences > Settings und aktiviere "Format on Save" und setze "Default Formatter" auf "Prettier - Code formatter".

Lasse jetzt im Terminal `npm run dev` laufen. Öffne http://localhost:3000/ im Browser. Du hast jetzt eine Vorschau. Änderungen im Code werden sofort dargestellt.

Um deine Änderungen zu veröffentlichen, erstelle über GitHub Desktop einen Commit und pushe.
