"use strict";

import stylesheet from "./recipe-new.css";

/**
 * View zur Anzeige oder zum Bearbeiten eines Rezepts.
 */
class RecipeNew {
  /**
   * Konstruktor.
   *
   * @param {Objekt} app  Zentrales App-Objekt der Anwendung
   */
  constructor(app) {
    this._app = app;
  }

  /**
   * Von der Klasse App aufgerufene Methode, um die Seite anzuzeigen. Die
   * Methode gibt daher ein passendes Objekt zurück, das an die Methode
   * _switchVisibleContent() der Klasse App übergeben werden kann, um ihr
   * die darzustellenden DOM-Elemente mitzuteilen.
   *
   * @return {Object} Darzustellende DOM-Elemente gemäß Beschreibung der
   * Methode App._switchVisibleContent()
   */
  onShow() {
    let content = document.createElement("div");
    let test = document.createElement("p");
    test.innerHTML = "<h2>NEW</h2><br>Hier werden neue Rezepte hinzugefügt!";

    content.appendChild(test);

    return {
      className: "recipe-new",
      main: content
    };
  }

  /**
   * Von der Klasse App aufgerufene Methode, um festzustellen, ob der Wechsel
   * auf eine neue Seite erlaubt ist. Wird hier true zurückgegeben, wird der
   * Seitenwechsel ausgeführt.
   *
   * @param  {Function} goon Callback, um den Seitenwechsel zu einem späteren
   * Zeitpunkt fortzuführen, falls wir hier false zurückgeben
   * @return {Boolean} true, wenn der Seitenwechsel erlaubt ist, sonst false
   */
  onLeave(goon) {
    return true;
  }

  /**
   * @return {String} Titel für die Titelzeile des Browsers
   */
  get title() {
    return "Rezept hinzufügen";
  }
}

export default RecipeNew;
