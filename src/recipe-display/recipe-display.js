"use strict";

import stylesheet from "./recipe-display.css";
import db from "/database.js";
/**
 * View zur Anzeige oder zum Bearbeiten eines Rezept.
 */
class RecipeDisplay {
  /**
   * Konstruktor.
   *
   * @param {Objekt} app  Zentrales App-Objekt der Anwendung
   * @param {String} id   ID des darzustellenden Rezept
   */
  constructor(app, id) {
    this._app = app;
    this._id = id;
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
      //Datenbank erzeugen
      var recipes = new db.Recipes();
      //Haupt-div erzeugen
      let content = document.createElement("div");

    let test = document.createElement("p");
    test.innerHTML = "<h2>Display</h2><br>Hier kann man bald Rezepte sehen!";

    //var ergebnisse= recipes.getById(parseInt(this._id)).then((result)=>{
    let ergebnisse = recipes.getById(parseInt(this._id));
    ergebnisse.then((result)=>{
    console.log(result);
    let rezeptkasten = document.createElement("div");
    rezeptkasten.setAttribute("id", result["id"]);
    rezeptkasten.setAttribute("class","kasten");

    // BILD
    let imagefeld=document.createElement("div");
    imagefeld.setAttribute("class", "imgfeld");
    let image= document.createElement("img");
    image.setAttribute("class", "img");
    imagefeld.appendChild(image);
    image.src=result["thumbnail"];
    rezeptkasten.appendChild(imagefeld);

                    // Titel bzw. Rezeptname
                    let titel= document.createElement("div");
                    titel.setAttribute("class", "titel");
                    titel.innerHTML=(result["title"]);
                    rezeptkasten.appendChild(titel);

    content.appendChild(rezeptkasten);
});
    //});
    content.appendChild(test);

    return {
      className: "recipe-display",
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
    return "Rezept anzeigen";
  }
}

export default RecipeDisplay;
