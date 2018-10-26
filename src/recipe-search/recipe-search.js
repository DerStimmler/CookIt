"use strict";

import stylesheet from "./recipe-search.css";
import db from "/database.js";

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
    // Haupt-div erzeugen
    let content = document.createElement("div");
    content.setAttribute("id", "main-div");
    content.classList.remove("results");

    //Beschreibung Begriff-Suchfeld
    let beschreibung = document.createElement("div");
    beschreibung.classList.add("description");
    beschreibung.innerHTML = "Bitte einen Suchbegriff auf Englisch eingeben:"
    content.appendChild(beschreibung);
    //Begriff-Suchfeld
    let input = document.createElement("INPUT");
    input.setAttribute("id", "searchQuery");
    input.setAttribute("placeholder", "pasta / pancake / omelet / salad ...");
    content.appendChild(input);


    //Tomate
    let tomato = document.createElement("div");
    tomato.setAttribute("id","tomato");
    tomato.classList.add("item");
    tomato.classList.add("grey");
    tomato.addEventListener("click", () =>{
      if(event.target.classList.contains("grey")){
        event.target.classList.remove("grey");
      }
      else{
        event.target.classList.add("grey");
      }
    });
    content.appendChild(tomato);

    //Pilze
    let mushrooms = document.createElement("div");
    mushrooms.setAttribute("id","mushrooms");
    mushrooms.classList.add("item");
    mushrooms.classList.add("grey");
    mushrooms.addEventListener("click", () =>{
      if(event.target.classList.contains("grey")){
        event.target.classList.remove("grey");
      }
      else{
        event.target.classList.add("grey");
      }
    });
    content.appendChild(mushrooms);

    //Paprika
    let pepper = document.createElement("div");
    pepper.setAttribute("id","pepper");
    pepper.classList.add("item");
    pepper.classList.add("grey");
    pepper.addEventListener("click", () =>{
      if(event.target.classList.contains("grey")){
        event.target.classList.remove("grey");
      }
      else{
        event.target.classList.add("grey");
      }
    });
    content.appendChild(pepper);

    //Zwiebel
    let onion = document.createElement("div");
    onion.setAttribute("id","onion");
    onion.classList.add("item");
    onion.classList.add("grey");
    onion.addEventListener("click", () =>{
      if(event.target.classList.contains("grey")){
        event.target.classList.remove("grey");
      }
      else{
        event.target.classList.add("grey");
      }
    });
    content.appendChild(onion);

    //Knoblauch
    let garlic = document.createElement("div");
    garlic.setAttribute("id","garlic");
    garlic.classList.add("item");
    garlic.classList.add("grey");
    garlic.addEventListener("click", () =>{
      if(event.target.classList.contains("grey")){
        event.target.classList.remove("grey");
      }
      else{
        event.target.classList.add("grey");
      }
    });
    content.appendChild(garlic);

    //Karotte
    let carrot = document.createElement("div");
    carrot.setAttribute("id","carrot");
    carrot.classList.add("item");
    carrot.classList.add("grey");
    carrot.addEventListener("click", () =>{
      if(event.target.classList.contains("grey")){
        event.target.classList.remove("grey");
      }
      else{
        event.target.classList.add("grey");
      }
    });
    content.appendChild(carrot);

    //Mais
    let corn = document.createElement("div");
    corn.setAttribute("id","corn");
    corn.classList.add("item");
    corn.classList.add("grey");
    corn.addEventListener("click", () =>{
      if(event.target.classList.contains("grey")){
        event.target.classList.remove("grey");
      }
      else{
        event.target.classList.add("grey");
      }
    });
    content.appendChild(corn);

    //Salat
    let salad = document.createElement("div");
    salad.setAttribute("id","salad");
    salad.classList.add("item");
    salad.classList.add("grey");
    salad.addEventListener("click", () =>{
      if(event.target.classList.contains("grey")){
        event.target.classList.remove("grey");
      }
      else{
        event.target.classList.add("grey");
      }
    });
    content.appendChild(salad);

    //Brokkoli
    let brokkoli = document.createElement("div");
    brokkoli.setAttribute("id","brokkoli");
    brokkoli.classList.add("item");
    brokkoli.classList.add("grey");
    brokkoli.addEventListener("click", () =>{
      if(event.target.classList.contains("grey")){
        event.target.classList.remove("grey");
      }
      else{
        event.target.classList.add("grey");
      }
    });
    content.appendChild(brokkoli);

    //Kartoffel
    let potato = document.createElement("div");
    potato.setAttribute("id","potato");
    potato.classList.add("item");
    potato.classList.add("grey");
    potato.addEventListener("click", () =>{
      if(event.target.classList.contains("grey")){
        event.target.classList.remove("grey");
      }
      else{
        event.target.classList.add("grey");
      }
    });
    content.appendChild(potato);


    //Beschreibung Zutaten-Suchfeld
    let beschreibung2 = document.createElement("div");
    beschreibung2.classList.add("description");
    beschreibung2.innerHTML = "Bitte weitere Zutaten auf Englisch mit Komma getrennt eingeben:"
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
      let value_searchIngredients = document.getElementById("searchIngredients").value;
      let href;
      if(value_searchQuery === ""){
        value_searchQuery = " ";
      }
      if (value_searchIngredients === ""){
        value_searchIngredients = " ";
      }
      href =
        "/search/results/" +
        value_searchQuery +
        "/" +
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

function showResults(searchQuery, searchIngredients) {
  //Objekt erzeugen um DB samt Funktionen zu benutzen
  var recipes = new db.Recipes();

  let content = document.getElementById("main-div");
  content.classList.add("results");
  content.innerHTML = "";

  //Neue Suche Button
  let link = document.createElement("a");
  link.setAttribute("href", "/search/");
  link.setAttribute("data-navigo", "");
  let newSearchButton = document.createElement("BUTTON");
  newSearchButton.setAttribute("id", "newSearchButton");
  newSearchButton.setAttribute("type", "button");
  let text = document.createTextNode("Neue Suche");
  newSearchButton.appendChild(text);
  link.appendChild(newSearchButton);
  content.appendChild(link);
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

export default RecipeSearch;
