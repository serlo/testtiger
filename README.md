# TestTiger Prototyp und dynamische Aufgaben

## Mitarbeit und Installation

Erstelle dir als einen GitHub-Account. Lasse dich über diesen Account in dieses Repository einladen.

Installiere drei Programme auf deinen Computer:

1. [GitHub Desktop](https://github.com/apps/desktop) für den Zugriff auf den Quellcode.
2. [NodeJS](https://nodejs.org/en) als Laufzeitumgebung (empfohlene Version 20 LTS, du brauchst keine Tools für native Bibliotheken)
3. [VS Code](https://code.visualstudio.com/) als Code-Editor

Öffne nun GitHub Desktop, melde dich an und nutze "clone repository", um den TestTiger auf deinen Computer zu speichern. Wähle einen Ordner dafür aus.

Starte Code, klicke "open folder" und öffne den obigen Ordner. Klicke auf "trust", wenn danach gefragt wird.

Öffe in Code ein Terminal mit **Strg-ö** und führe diesen Befehl aus: `npm install`.

Für ein gutes Arbeitserlebnis, richte noch paar Dinge im Editor ein:

- Gehe unter View > Extensions und installiere `Tailwind CSS IntelliSense` und `Prettier - Code formatter`
- Gehe unter File > Preferences > Settings und aktiviere "Format on Save" und setze "Default Formatter" auf "Prettier - Code formatter".

Lasse jetzt im Terminal `npm start` laufen. Öffne http://localhost:3000/ im Browser. Du hast jetzt eine Vorschau. Änderungen im Code werden sofort dargestellt.

Um deine Änderungen zu veröffentlichen, erstelle über GitHub Desktop einen Commit und pushe.

--- ENGLISH VERSION ---

# TestTiger Prototype and Dynamic Tasks

## Collaboration and Installation

Create a GitHub account. Have yourself invited to this repository using that account.

Install three programs on your computer:

1. [GitHub Desktop](https://github.com/apps/desktop) for accessing the source code.
2. [NodeJS](https://nodejs.org/en) as the runtime environment (recommended version 20 LTS, you do not need tools for native libraries).
3. [VS Code](https://code.visualstudio.com/) as the code editor.

Now open GitHub Desktop, sign in, and use "clone repository" to save TestTiger on your computer. Choose a folder for it.

Start Code, click "open folder," and open the selected folder. Click "trust" if prompted.

Open a terminal in Code with **Ctrl-ö** and execute the following command: `npm install`.

For an optimal working experience, configure a few additional settings in the editor:

- Go to **View > Extensions** and install `Tailwind CSS IntelliSense` and `Prettier - Code formatter`.
- Go to **File > Preferences > Settings**, enable "Format on Save," and set the "Default Formatter" to "Prettier - Code formatter."

Now run `npm start` in the terminal. Open [http://localhost:3000/](http://localhost:3000/) in your browser. You now have a preview, and changes in the code are displayed immediately.

To publish your changes, create a commit via GitHub Desktop and push.
