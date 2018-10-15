"use strict";

import stylesheet from "./app.css";
import Navigo from "navigo/lib/navigo.js";

/**
 * Hauptklasse der Anwendung. Kümmert sich darum, die Anwendung auszuführen
 * und die angeforderten Bildschirmseiten anzuzeigen.
 */
class App {
  /**
   * Konstruktor.
   */
  constructor() {
    // Single Page Router aufsetzen
    this._router = new Navigo();
    this._currentUrl = "";
    this._navAborted = false;

    this._router.on({



    });

    this._router.hooks({
      after: params => {
        if (!this._navAborted) {
          // Navigation durchführen, daher die neue URL merken
          this._currentUrl = this._router.lastRouteResolved().url;
        } else {
          // Navigation abbrechen, daher die URL in der Adresszeile
          // auf den alten Wert der bisherigen View zurücksetzen
          this._router.pause(true);
          this._router.navigate(this._currentUrl);
          this._router.pause(false);

          this._navAborted = false;
        }
      }
    });
  }

  /**
   * Ab hier beginnt die Anwendung zu laufen. Startfunktion.
   */
  start() {
    this._router.resolve();
  }
}

export default App;
