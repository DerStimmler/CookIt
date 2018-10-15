"use strict";

import Navigo from "navigo/lib/navigo.js";
import stylesheet from "/app.css";
import RecipeEdit from "/recipe-edit.js";
import RecipeOverview from "/recipe-overview.js";
import Info from "/info.js";

/**
 * Hauptklasse der Anwendung. Kümmert sich darum, die Anwendung auszuführen
 * und die angeforderten Bildschirmseiten anzuzeigen.
 */
class App {
  /**
   * Konstruktor.
   */
  constructor() {
    this._title = "Cook It";
    this._currentView = null;
    // Single Page Router aufsetzen
    this._router = new Navigo();
    this._currentUrl = "";
    this._navAborted = false;

    //Hier die URLs einfügen
    this._router.on({
      "*": () => this.showRecipeOverview(),
      "/info/": () => this.showInfo(),
      "/search/": () => this.showSearch()
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
   * Aufruf der Übersichtsseite der favorisierten Rezepte.
   * @return {Boolean} Flag, ob die neue Seite aufgerufen werden konnte
   */
  showSongOverview() {
    let view = new RecipeOverview(this);
    this._switchVisibleView(view);
  }

  /**
   * Aufruf der Detailseite zur Anzeige oder zum Bearbeiten eines Songs.
   *
   * @param  {String} id Song-ID
   * @return {Boolean} Flag, ob die neue Seite aufgerufen werden konnte
   */
  showSongDisplayEdit(id) {
    let view = new SongDisplayEdit(this, id);
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
 *      topbar: [DOM Element, DOM Element, DOM Element, ...],
 *      main: [DOM Element, DOM Element, DOM Element, ...],
 *   }
 *
 * Beide Attribute (topbar und main) sind optional, was dazu führt, dass
 * im jeweiligen Bereich einfach nichts angezeigt wird. Werden sie jedoch
 * mitgegeben, müssen sie mit forEach(element => { … }) iteriert werden
 * können, um ihren Inhalt in den DOM-Baum zu integrieren.
 *
 * Wichtig ist, dass die übergebenen Elemente noch an keiner Stelle im
 * DOM vorhanden sein dürfen. Werden die Elemente in der index.html
 * als Vorlage definiert, muss hier deshalb eine Kopie anstelle der
 * Elemente selbst übergeben werden!
 *
 * @param {Object} content Objekt mit den anzuzeigenden DOM-Elementen
 */
  _switchVisibleContent(content) {
    // <header> und <main> des HTML-Grundgerüsts ermitteln
    let app = document.querySelector("#app");
    let header = document.querySelector("#app > header");
    let main = document.querySelector("#app > main");

    // Zuvor angezeigte Inhalte entfernen
    // Bei der Topbar nur die untere Zeile, im Hauptbereich alles!
    app.className = "";
    header
      .querySelectorAll(".bottom")
      .forEach(e => e.parentNode.removeChild(e));
    main.innerHTML = "";

    // CSS-Klasse übernehmen, um die viewspezifischen CSS-Regeln zu aktivieren
    if (content && content.className) {
      app.className = content.className;
    }

    // Neue Inhalte der Topbar einfügen
    if (content && content.topbar) {
      content.topbar.forEach(element => {
        element.classList.add("bottom");
        header.appendChild(element);
      });
    }

    // Neue Inhalte des Hauptbereichs einfügen
    if (content && content.main) {
      content.main.forEach(element => {
        main.appendChild(element);
      });
    }
    // Navigo an die Links in der View binden
    this._router.updatePageLinks();
  }
}

export default App;
