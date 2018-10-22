"use strict";

import Navigo from "navigo/lib/navigo.js";
import stylesheet from "/app.css";
import RecipeEdit from "./recipe-edit/recipe-edit.js";
import RecipeOverview from "./recipe-overview/recipe-overview.js";
import RecipeSearch from "./recipe-search/recipe-search.js";
import RecipeSearchResults from "./recipe-search-results/recipe-search-results.js"
import Info from "./info/info.js";

/**
 * Hauptklasse der Anwendung. Kümmert sich darum, die Anwendung auszuführen
 * und die angeforderten Bildschirmseiten anzuzeigen.
 */
class App {
  /**
   * Konstruktor.
   */
  constructor() {
    this._title = "CookIt!";
    this._currentView = null;
    // Single Page Router aufsetzen
    this._router = new Navigo();
    this._currentUrl = "";
    this._navAborted = false;

    //Hier die URLs einfügen
    this._router.on({
      "*": () => this.showRecipeOverview(), //Rezeptübersicht (favorisierte Rezepte)
      "/info/": () => this.showInfo(),      //Infoseite
      "/search/": () => this.showRecipeSearch(),   //Suchseite
      "/search/results/:word/:ingredients": params => this.showRecipeSearchResults(params.word,params.ingredients,)
      //"/new/": () => this.showNew()       //Seite um neues Rezept anzulegen
      //"edit/:id/": params => this.showRecipeEdit(params.id)   //Seite um ein Rezept zu bearbeiten
      //"display/:id/": params => this.showRecipeDisplay(params.id)   //Seite um ein Rezept anzuzeigen
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

  /**
   * Navigo Router auffordern, eine neue URL zu laden
   * @param {String} url URL der neuen Seite 
   */
  navigate(url) {
    this._router.navigate(url);
  }




/**
   * Aufruf der Übersichtsseite der vorhandenen Rezepte.
   * @return {Boolean} Flag, ob die neue Seite aufgerufen werden konnte
   */
  showRecipeOverview() {
    let view = new RecipeOverview(this);
    this._switchVisibleView(view);
  }

  /**
   * Aufruf der Seite zum Bearbeiten eines Rezepts.
   *
   * @param  {String} id Rezept-ID
   * @return {Boolean} Flag, ob die neue Seite aufgerufen werden konnte
   */
  showRecipeEdit(id) {
    let view = new RecipeEdit(this, id);
    this._switchVisibleView(view);
  }

  /**
   * Aufruf der Info Seite.
   * @return {Boolean} Flag, ob die neue Seite aufgerufen werden konnte
   */
  showInfo() {
    let view = new Info(this);
    this._switchVisibleView(view);
  }

  /**
   * Aufruf der Rezeptsuche Seite.
   * @return {Boolean} Flag, ob die neue Seite aufgerufen werden konnte
   */
  showRecipeSearch() {
    let view = new RecipeSearch(this);
    this._switchVisibleView(view);
  }

  /**
   * Aufruf der Ergebnisseite der Rezeptsuche.
   * @return {Boolean} Flag, ob die neue Seite aufgerufen werden konnte
   */
  showRecipeSearchResults(word,ingredients) {
    let view = new RecipeSearchResults(this, word, ingredients);
    this._switchVisibleView(view);
  }










  /**
   * Hilfsklasse zum Umschalten auf eine neue Seite. Sie ruft zunächst die
   * Methode onLeave() der gerade sichtbaren View auf und prüft damit, ob
   * die View verlassen werden kann. Falls ja ruft sie die Methode onShow()
   * der neuen View auf und übergibt das Ergebnis an die eigene Methode
   * _switchVisibleContent(), um den sichtbaren Inhalt der Seite auszutauschen.
   *
   * @param  {Object} view View-Objekt mit einer onShow()-Methode
   * @return {Boolean} Flag, ob die neue Seite aufgerufen werden konnte
   */
  _switchVisibleView(view) {
    // Callback, mit dem die noch sichtbare View den Seitenwechsel zu einem
    // späteren Zeitpunkt fortführen kann, wenn sie in der Methode onLeave()
    // false zurückliefert. Dadurch erhält sie die Möglichkeit, den Anwender
    // zum Beispiel zu fragen, ob er ungesicherte Daten speichern will,
    // bevor er die Seite verlässt.
    let newUrl = this._router.lastRouteResolved().url;
    let goon = () => {
      // ?goon an die URL hängen, weil der Router sonst nicht weiternavigiert
      this._router.navigate(newUrl + "?goon");
    };

    // Aktuelle View fragen, ob eine neue View aufgerufen werden darf
    if (this._currentView && !this._currentView.onLeave(goon)) {
      this._navAborted = true;
      return false;
    }

    // Alles klar, aktuelle View nun wechseln
    document.title = `${this._title} – ${view.title}`;

    this._currentView = view;
    this._switchVisibleContent(view.onShow());
    return true;
  }





  /**
 * Auswechseln des sichtbaren Inhalts der App. Hierfür muss der Methode
 * ein Objekt mit folgendem Aufbau übergeben werden:
 *
 *   {
        className: "CSS-Klassenname",
 *      main: DOM-Element
 *   }
 * 
 * @param {Object} content Objekt mit den anzuzeigenden DOM-Elementen
 */
  _switchVisibleContent(content) {
    // <header> und <main> des HTML-Grundgerüsts ermitteln
    let app = document.querySelector("#app");
    let main = document.querySelector("#app > main");

    // Zuvor angezeigte Inhalte entfernen
    // Bei der Topbar nur die untere Zeile, im Hauptbereich alles!
    app.className = "";
    main.innerHTML = "";

    // CSS-Klasse übernehmen, um die viewspezifischen CSS-Regeln zu aktivieren
    if (content && content.className) {
      app.className = content.className;
    }

    // Neue Inhalte des Hauptbereichs einfügen
    if (content && content.main) {
      main.appendChild(content.main);
    }
    // Navigo an die Links in der View binden
    this._router.updatePageLinks();
  }
}

export default App;
