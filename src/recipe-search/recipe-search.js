"use strict";

import stylesheet from "./recipe-search.css";

/**
 * View mit der Rezeptsuche
 */
var activeItems = []; //Array in dem alle aktuell ausgewählten Bilder/Zutaten gespeichert sind

/*Hier alle Zutaten eintragen, die als Bild angezeigt werden sollen. 
Dementsprechend muss auch ein Eintrag in der recipe-search.css gemacht werden um das Hintergrundbild festzulegen
und das Bild muss dementsprechend abgespeichert sein.*/
var ingredients = [
  "tomato",
  "mushrooms",
  "pepper",
  "onion",
  "garlic",
  "carrot",
  "corn",
  "salad",
  "brokkoli",
  "potato",
  "aubergine",
  "leek"
];

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
    // Haupt-div erzeugen
    let content = document.createElement("div");
    content.setAttribute("id", "main-div");
    content.classList.remove("results");

    activeItems = [];

    //Beschreibung Begriff-Suchfeld
    let beschreibung = document.createElement("div");
    beschreibung.classList.add("description");
    beschreibung.innerHTML = "Bitte einen Suchbegriff auf Englisch eingeben:";
    content.appendChild(beschreibung);
    //Begriff-Suchfeld
    let input = document.createElement("INPUT");
    input.setAttribute("id", "searchQuery");
    input.setAttribute("placeholder", "pasta / pancake / omelet / salad ...");
    content.appendChild(input);

    let itemView = document.createElement("div");
    itemView.setAttribute("id", "itemView");

    //Zutaten Bilder hinzufügen
    for (let i = 0; i < ingredients.length; i++) {
      let temp = document.createElement("div");
      temp.setAttribute("id", ingredients[i]);
      temp.classList.add("item");
      temp.classList.add("grey");
      temp.addEventListener("click", event => {
        if (event.target.classList.contains("grey")) {
          event.target.classList.remove("grey");
          activeItems.push(ingredients[i]);
        } else {
          event.target.classList.add("grey");
          this.delete(ingredients[i]);
        }
      });
      itemView.appendChild(temp);
    }

    content.appendChild(itemView);

    //Beschreibung Zutaten-Suchfeld
    let beschreibung2 = document.createElement("div");
    beschreibung2.classList.add("description");
    beschreibung2.innerHTML =
      "Bitte weitere Zutaten auf Englisch mit Komma getrennt eingeben:";
    content.appendChild(beschreibung2);
    //weitere Zutaten-Suchfeld
    let input2 = document.createElement("INPUT");
    input2.setAttribute("id", "searchIngredients");
    input2.setAttribute("placeholder", "noodles, chili, rice ...");
    content.appendChild(input2);

    //Suchen Button
    let searchButton = document.createElement("BUTTON");
    searchButton.setAttribute("id", "searchButton");
    searchButton.setAttribute("type", "button");
    searchButton.setAttribute("class", "button");
    searchButton.addEventListener("click", () => {
      let value_searchQuery = document.getElementById("searchQuery").value;
      let value_searchIngredients = document.getElementById("searchIngredients")
        .value;
      let value_activeItems = activeItems.toString();
      console.log(value_activeItems);
      let href;
      if (value_searchQuery === "") {
        value_searchQuery = " ";
      }
      if (value_searchIngredients === "" && value_activeItems === "") {
        value_searchIngredients = " ";
      }
      if (value_searchIngredients != "" && value_activeItems != "") {
        //wenn in beidem Werte sind, Komma anhängen
        value_activeItems = value_activeItems + ",";
      }
      href =
        "/search/results/" +
        value_searchQuery +
        "/" +
        value_activeItems +
        value_searchIngredients +
        "/";
      this._app.navigate(href);
    });

    let text = document.createTextNode("Suchen");
    searchButton.appendChild(text);
    content.appendChild(searchButton);

    return {
      className: "recipe-search",
      main: content
    };
  }

  delete(item) {
    activeItems.splice(activeItems.indexOf(item), 1);
    console.log(item + " gelöscht! activeItems: ", activeItems);
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

export default RecipeSearch;
