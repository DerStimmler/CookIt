"use strict";

import stylesheet from "./recipe-search-results.css";
import "../fav_heart.scss";
import db from "/database.js";

/**
 * View mit der Rezeptsuche
 */

 //Sammlung von allen abgerufenen Rezepten
 var allResults = [];
 //ID zum identifizieren von Rezepten
 var IDs = 0;

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
    //allResults zurück setzen
    allResults = [];
    //IDs zurück setzen
    IDs = 0;
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
    let arrowdiv = document.createElement("div");
    arrowdiv.setAttribute("id","arrowdiv");
    let arrow = document.createElement("i");
    arrowdiv.classList.add("hidden");
    arrow.setAttribute("id","arrow");
    arrow.addEventListener("click", () => {
        pagecount++;
        console.log(pagecount);
        showSearch(content, this._ingredients, this._word, pagecount);
    });
    arrowdiv.appendChild(arrow);
    content.appendChild(arrowdiv);

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
      "https://cors-anywhere.herokuapp.com/http://recipepuppy.com/api/?i=" +
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
      console.log("1. Abgerufen:", results);

      //Erhaltene Rezepte weiter verarbeiten
      for (let i = 0; i < results.length; i++) {
        results[i].id = parseInt(Date.now() + Math.random().toString().slice(2)); //Erstellen einer einzigartigen ID
        results[i].fav = false; //Rezept ist nach dem Abrufen nicht favorisiert
        results[i].extern = true; //Rezept ist von Extern (RecipePuppy)
        results[i].date = null; //Noch kein Favorisierungsdatum vorhanden
      }
      console.log("2. weiter vearbeitet:", results);
      printResults(results, content);
    }
    else if (xhr.status == 503){
      let errorText = document.createElement("div");
      errorText.setAttribute("id","error503");
      errorText.innerHTML = "Keine Verbindung zur API möglich!";
      content.appendChild(errorText);
    }
  }
}


function printResults(results, content) {
//Wenn keine Rezepte geliefert wurden Nachricht anzeigen
if (results.length === 0){
    let errorText = document.createElement("div");
    errorText.setAttribute("id","error");
    errorText.innerHTML = "Keine Rezepte gefunden!";
    content.appendChild(errorText);
    let hint = document.getElementById("hint");
    content.removeChild(hint);
}
else{
  console.log("3. zum Print bereit:", results);

  //Hier wird das neu gelieferte Array results an das Array allResults dran gehängt, sodass man immer absolut alle Rezepte in diesem Array gespeichert hat
  allResults.push.apply(allResults, results);
  console.log("Alle Results", allResults);


  //Objekt erzeugen um DB samt Funktionen zu benutzen
  var recipes = new db.Recipes();

  //"Suchen..." ausblenden
  let hint = document.getElementById("hint");
  content.removeChild(hint);


  //Ergebnisse anzeigen
  for (let i = 0; i < results.length; i++) {


    //Rezeptkasten
    let rezeptkasten = document.createElement("div");
    rezeptkasten.setAttribute("class", "item");
    rezeptkasten.setAttribute("id", IDs);


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
    let iHeart = document.createElement("i");
    iHeart.setAttribute("class","fa fa-2x fa-heart-o not-liked");
    iHeart.addEventListener("click", doLikeButton);
    iHeart.addEventListener("click", () =>{
      let id = event.target.parentNode.parentNode.getAttribute("id");
      let newRecipe = allResults[id];
      newRecipe.fav = true;
      newRecipe.date = new Date();
      recipes.saveNew(newRecipe);
      console.log("Rezept " + id + " wurde gespeichert!")
    });
    star.appendChild(iHeart);
    rezeptkasten.appendChild(star);


    content.appendChild(rezeptkasten);
    IDs++;
  }


  let arrowdiv = document.getElementById("arrowdiv");
  arrowdiv.classList.remove("hidden");
  content.appendChild(arrowdiv);
}
}

//Button Zeug
function doLikeButton(e) {
  toggleButton(e.target);
}

function toggleButton(button) {
  button.classList.remove('liked-shaked');
  button.classList.toggle('liked');
  button.classList.toggle('not-liked');
  button.classList.toggle('fa-heart-o');
  button.classList.toggle('fa-heart');

  if(button.classList.contains("liked")) {
      button.classList.add('liked-shaked');
  }
}

export default RecipeSearchResults;
