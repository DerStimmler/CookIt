"use strict";

import stylesheet from "./recipe-search.css";

/**
 * View mit der Rezeptsuche
 */
class RecipeSearch {
  /**
   * Konstruktor.
   * @param {Objekt} app Zentrales App-Objekt der Anwendung
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
    // Anzuzeigende HTML-Elemente ermitteln
    let content = document.createElement("div");
    let test = document.createElement("p");
    test.innerHTML = "Search";

    content.appendChild(test);
    
    return {
      className: "recipe-search",
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
    return "Suche";
  }
}

//Ruft anhand der URL von RecipePuppy entsprechende Rezepte ab, verarbeitet Sie und liefert sie in einem Array zurück
function getRecipes(url) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.send();

  xhr.onreadystatechange = processRequest;

  function processRequest(e) {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var response = JSON.parse(xhr.responseText);
      var results = response.results;
    }
  }
  //Verarbeiten der Ergebnisse von Recipepuppy
  for (let i = 0; i < results.length; i++) {
    results[i].id =
      Date.now() +
      Math.random()
        .toString()
        .slice(2); //Erstellen einer einzigartigen ID
    results[i].fav = false; //Rezept ist nach dem Abrufen nicht favorisiert
    results[i].extern = true; //Rezept ist von Extern (RecipePuppy)
    results[i].date = null; //Noch kein Favorisierungsdatum vorhanden
  }
  return results;
}

//zeigt die Rezepte, die als Array übergeben werden auf der Website an
function showSearch(recipes) {}

export default RecipeSearch;