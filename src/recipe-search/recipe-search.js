"use strict";

import stylesheet from "./recipe-search.css";
import db from "/database.js";

/**
 * View mit der Rezeptsuche
 */
var activeItems = []; //Array in dem alle aktuell ausgewählten Bilder/Zutaten gespeichert sind 

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
    itemView.setAttribute("id","itemView");

    //Tomate
    let tomato = document.createElement("div");
    tomato.setAttribute("id", "tomato");
    tomato.classList.add("item");
    tomato.classList.add("grey");
    tomato.addEventListener("click", (event) => {
      if (event.target.classList.contains("grey")) {
        event.target.classList.remove("grey");
        activeItems.push("tomato");
      } else {
        event.target.classList.add("grey");
        this.delete("tomato");
      }
    });
    itemView.appendChild(tomato);

    //Pilze
    let mushrooms = document.createElement("div");
    mushrooms.setAttribute("id", "mushrooms");
    mushrooms.classList.add("item");
    mushrooms.classList.add("grey");
    mushrooms.addEventListener("click", (event) => {
      if (event.target.classList.contains("grey")) {
        activeItems.push("mushrooms");
        event.target.classList.remove("grey");
      } else {
        event.target.classList.add("grey");
        this.delete("mushrooms");
      }
    });
    itemView.appendChild(mushrooms);

    //Paprika
    let pepper = document.createElement("div");
    pepper.setAttribute("id", "pepper");
    pepper.classList.add("item");
    pepper.classList.add("grey");
    pepper.addEventListener("click", (event) => {
      if (event.target.classList.contains("grey")) {
        event.target.classList.remove("grey");
        activeItems.push("pepper");
      } else {
        event.target.classList.add("grey");
        this.delete("pepper");
      }
    });
    itemView.appendChild(pepper);

    //Zwiebel
    let onion = document.createElement("div");
    onion.setAttribute("id", "onion");
    onion.classList.add("item");
    onion.classList.add("grey");
    onion.addEventListener("click", (event) => {
      if (event.target.classList.contains("grey")) {
        event.target.classList.remove("grey");
        activeItems.push("onion");
      } else {
        event.target.classList.add("grey");
        this.delete("onion");
      }
    });
    itemView.appendChild(onion);

    //Knoblauch
    let garlic = document.createElement("div");
    garlic.setAttribute("id", "garlic");
    garlic.classList.add("item");
    garlic.classList.add("grey");
    garlic.addEventListener("click", (event) => {
      if (event.target.classList.contains("grey")) {
        event.target.classList.remove("grey");
        activeItems.push("garlic");
      } else {
        event.target.classList.add("grey");
        this.delete("garlic");
      }
    });
    itemView.appendChild(garlic);

    //Karotte
    let carrot = document.createElement("div");
    carrot.setAttribute("id", "carrot");
    carrot.classList.add("item");
    carrot.classList.add("grey");
    carrot.addEventListener("click", (event) => {
      if (event.target.classList.contains("grey")) {
        event.target.classList.remove("grey");
        activeItems.push("carrot");
      } else {
        event.target.classList.add("grey");
        this.delete("carrot");
      }
    });
    itemView.appendChild(carrot);

    //Mais
    let corn = document.createElement("div");
    corn.setAttribute("id", "corn");
    corn.classList.add("item");
    corn.classList.add("grey");
    corn.addEventListener("click", (event) => {
      if (event.target.classList.contains("grey")) {
        event.target.classList.remove("grey");
        activeItems.push("corn");
      } else {
        event.target.classList.add("grey");
        this.delete("corn");
      }
    });
    itemView.appendChild(corn);

    //Salat
    let salad = document.createElement("div");
    salad.setAttribute("id", "salad");
    salad.classList.add("item");
    salad.classList.add("grey");
    salad.addEventListener("click", (event) => {
      if (event.target.classList.contains("grey")) {
        event.target.classList.remove("grey");
        activeItems.push("salad");
      } else {
        event.target.classList.add("grey");
        this.delete("salad");
      }
    });
    itemView.appendChild(salad);

    //Brokkoli
    let brokkoli = document.createElement("div");
    brokkoli.setAttribute("id", "brokkoli");
    brokkoli.classList.add("item");
    brokkoli.classList.add("grey");
    brokkoli.addEventListener("click", (event) => {
      if (event.target.classList.contains("grey")) {
        event.target.classList.remove("grey");
        activeItems.push("brokkoli");
      } else {
        event.target.classList.add("grey");
        this.delete("brokkoli");
      }
    });
    itemView.appendChild(brokkoli);

    //Kartoffel
    let potato = document.createElement("div");
    potato.setAttribute("id", "potato");
    potato.classList.add("item");
    potato.classList.add("grey");
    potato.addEventListener("click", (event) => {
      if (event.target.classList.contains("grey")) {
        event.target.classList.remove("grey");
        activeItems.push("potato");
      } else {
        event.target.classList.add("grey");
        this.delete("potato");
      }
    });
    itemView.appendChild(potato);

    //Aubergine
    let aubergine = document.createElement("div");
    aubergine.setAttribute("id", "aubergine");
    aubergine.classList.add("item");
    aubergine.classList.add("grey");
    aubergine.addEventListener("click", (event) => {
      if (event.target.classList.contains("grey")) {
        event.target.classList.remove("grey");
        activeItems.push("aubergine");
      } else {
        event.target.classList.add("grey");
        this.delete("aubergine");
      }
    });
    itemView.appendChild(aubergine);

    //Lauch
    let leek = document.createElement("div");
    leek.setAttribute("id", "leek");
    leek.classList.add("item");
    leek.classList.add("grey");
    leek.addEventListener("click", (event) => {
      if (event.target.classList.contains("grey")) {
        event.target.classList.remove("grey");
        activeItems.push("leek");
      } else {
        event.target.classList.add("grey");
        this.delete("leek");
      }
    });
    itemView.appendChild(leek);

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
      if (value_searchIngredients != "" && value_activeItems != ""){  //wenn in beidem Werte sind, Komma anhängen
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

  delete(item){
    activeItems.splice( activeItems.indexOf(item), 1 );
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
