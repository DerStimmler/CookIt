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

/*    var zutaten = new Object({'value':'tomato', 'title':'Tomate'}, {'value':'onions', 'title':'Zwiebel'});
    test.innerHTML = "<h2>Rezept hinzufügen</h2>";

    //Gesamtes Array durchlaufen, um alle Daten zu erhalten
    for (var i=0; i<zutaten.length, i++) {
        //Aufbau EINES Feldes
    }
    */


   test.innerHTML = "<h2>Rezept erstellen</h2> <form onsubmit =‘validateForm(event)’ action = ‘contact-form.php’ method = ‘POST’ > <!-- Name --> <label for=‘name’> Titel: <span class=‘required’>*</span> </label> <div class=‘side-by-side’> <input name=‘name’ type=‘text’ placeholder=Titel /> </div> <!-- Zutaten --><label for=‘zutaten’> Zutaten: <span class=‘required’>*</span> </label> <div class=‘side-by-side’> <input name=‘ingredients’ type=‘text’ placeholder=Zutat /> </div> <!-- Das Rezept --> <label for=‘beschreibung’> Beschreibung: <span class=‘required’>*</span> </label> <div class=‘side-by-side’> <textarea name=‘beschreibung’ type=‘text’ placeholder=Beschreibung /> </textarea>";

    content.appendChild(test);
    let button = document.createElement("button");
    button.innerHTML = "<p>Rezept speichern</p>";
    content.appendChild(button);

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
