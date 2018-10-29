# CookIt!
Schulprojekt für die Webprogrammierung Vorlesung an der DHBW Karlsruhe.

---

CookIt! ist eine Webanwendung, die auf allen gängigen Geräten im Browser aufgerufen werden kann und eine einfache Verwaltung von Koch- und Backrezepten ermöglicht. Innerhalb der App ist es möglich, Rezepte zu seinem persönlichen Rezeptbuch hinzu zu fügen und zu bearbeiten. Wenn einem die eigenen Rezepte mal nicht genug sind, kann auch aus einer Liste an Rezepten, die von verschiedenen Webseiten zusammengetragen wird und auf bevorzugten Zutaten basiert, ausgewählt werden.


## Benutzung

Mit `npm run start` im Root Verzeichnis kann die Anwendung gestartet werden.

---

Um nach Rezepten suchen zu können, muss zusätzlich [cors-anywhere](https://cors-anywhere.herokuapp.com/) gestartet werden.
Dafür unter `node_modules\cors-anywhere` den Befehl `node server.js` ausführen.

Für die Suche nach Rezepten wird die API von [recipepuppy](http://www.recipepuppy.com/about/api/) verwendet.