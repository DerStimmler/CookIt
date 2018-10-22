"use strict";

import stylesheet from "./recipe-search-results.css";
import "../fav_star.scss";
import "./arrow.scss";
import db from "/database.js";

/**
 * View mit der Rezeptsuche
 */
class RecipeSearchResults {
  /**
   * Konstruktor.
   * @param {Objekt} app Zentrales App-Objekt der Anwendung
   * @param {Objekt} word Suchwoerter
   * @param {Objekt} ingredients Zutaten
   */
  constructor(app, word, ingredients) {
    this._app = app;
    this._word = word;
    this._ingredients = ingredients;
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
    //Objekt erzeugen um DB samt Funktionen zu benutzen
    var recipes = new db.Recipes();
    //Pagecount um zu wissen, welche RecipePuppy Seite abgerufen werden soll
    var pagecount = 1;

    // Haupt-div erzeugen
    let content = document.createElement("div");

    //Button für neue Suche
    let newSearchButton = document.createElement("BUTTON");
    newSearchButton.setAttribute("id", "newSearchButton");
    newSearchButton.setAttribute("type", "button");
    newSearchButton.setAttribute("class", "button");
    newSearchButton.addEventListener("click", () => {
        this._app.navigate("/search/");
      });
    let text = document.createTextNode("Neue Suche");
    newSearchButton.appendChild(text);
    content.appendChild(newSearchButton);

    //weitere Ergebnisse laden
    let arrow = document.createElement("div");
    arrow.classList.add("arrow");
    arrow.classList.add("hidden");
    arrow.setAttribute("id","arrow");
    arrow.addEventListener("click", () => {
        pagecount++;
        console.log(pagecount);
        showSearch(content, this._ingredients, this._word, pagecount);
    });
    content.appendChild(arrow);

    //Ergebnisse anzeigen
    showSearch(content, this._ingredients, this._word, pagecount);



    return {
      className: "recipe-search-results",
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
    return "Suchergebnisse";
  }
}

//zeigt die Rezepte, die als Array übergeben werden auf der Website an
function showSearch(content, ingredients, word, pagecount) {
    //Ergebnisse abrufen
    let hint = document.createElement("div");
    hint.setAttribute("id", "hint");
    hint.innerHTML = "Suchen...";
    content.appendChild(hint);
    let apiURL =
      "https://cors-anywhere.herokuapp.com/http://www.recipepuppy.com/api/?i=" +
      ingredients +
      "&g=" +
      word +
      "&p=" +
      pagecount;
    getRecipes(apiURL, content);
  }


//Ruft anhand der URL von RecipePuppy entsprechende Rezepte ab, verarbeitet Sie und liefert sie in einem Array zurück
function getRecipes(url, content) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.send();

  xhr.onreadystatechange = processRequest;

  var results = [];

  function processRequest(e) {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var response = JSON.parse(xhr.responseText);
      results = response.results;
      console.log("1", results);

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
      console.log("2", results);
      printResults(results, content);
    }
  }
}


function printResults(results, content) {
if (results.length === 0){
    let errorText = document.createElement("div");
    errorText.setAttribute("id","error");
    errorText.innerHTML = "Keine Rezepte gefunden!";
    content.appendChild(errorText);
    let hint = document.getElementById("hint");
    content.removeChild(hint);
}
else{
  console.log("3", results);
  let hint = document.getElementById("hint");
  content.removeChild(hint);
  //Ergebnisse anzeigen
  for (let i = 0; i < results.length; i++) {
    //Rezeptkasten
    let rezeptkasten = document.createElement("div");
    rezeptkasten.setAttribute("class", "item");
    rezeptkasten.setAttribute("id", results[i].id);
    //Image
    let image = document.createElement("div");
    image.setAttribute("class", "image");
    let img = document.createElement("img");
    img.src = results[i].thumbnail;
    image.appendChild(img);
    rezeptkasten.appendChild(image);
    //Title
    let title = document.createElement("div");
    title.setAttribute("class", "title");
    let link = document.createElement("a");
    link.setAttribute("href", results[i].href);
    link.setAttribute("target", "_blank");
    link.innerHTML = results[i].title;
    title.appendChild(link);
    rezeptkasten.appendChild(title);
    //Star
    let star = document.createElement("div");
    star.setAttribute("class", "star");
    star.innerHTML =
      '<div class="Fav"><input id="fav-checkbox" class="Fav-checkbox" type="checkbox"><label for="fav-checkbox" class="Fav-label"><span class="Fav-label-text">Favourite</span></label><div class="Fav-bloom"></div><div class="Fav-sparkle"><div class="Fav-sparkle-line"></div><div class="Fav-sparkle-line"></div><div class="Fav-sparkle-line"></div><div class="Fav-sparkle-line"></div><div class="Fav-sparkle-line"></div></div><svg class="Fav-star" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><title>Star Icon</title><path d="M36.14,3.09l5.42,17.78H59.66a4.39,4.39,0,0,1,2.62,7.87L47.48,40.14,53,58.3a4.34,4.34,0,0,1-6.77,4.78L32,52l-14.26,11A4.34,4.34,0,0,1,11,58.27l5.55-18.13L1.72,28.75a4.39,4.39,0,0,1,2.62-7.87h18.1L27.86,3.09A4.32,4.32,0,0,1,36.14,3.09Z"/></svg></div>';
    rezeptkasten.appendChild(star);

    content.appendChild(rezeptkasten);
  }
  let arrow = document.getElementById("arrow");
  arrow.classList.remove("hidden");
  content.appendChild(arrow);
}
}

export default RecipeSearchResults;
