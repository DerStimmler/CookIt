"use strict";

import stylesheet from "./recipe-overview.css";
import db from "/database.js";
/**
 * View mit der Übersicht der vorhandenen Songs.
 */
class RecipeOverview {
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
    //Datenbank erzeugen
    var recipes = new db.Recipes();
    //Haupt-div erzeugen
    let content = document.createElement("div");
    //let addButton = document.createElement("BUTTON");
    let page = document.createElement("a");
    page.setAttribute("href","/new/");
    page.setAttribute("data-navigo","");
    page.innerHTML="Rezept hinzufügen";
    content.appendChild(page);
    /*addButton.setAttribute("id","addButton");
    addButton.setAttribute("type", "button");
    content.appendChild(addButton);
    addButton.innerHTML=<a href="/new/">"Rezepz hinzufügen"</a>;
    addButton.onclick = function (){
    <window.location.href='/new/'>Continue</button>
}*/
    var ergebnisse= recipes.getAllRecipesByTitle().then(function(result){
        //let rezeptkasten = document.createElement("div");
        //rezeptkasten.setAttribute("class","kasten");
        //Test, ob Datenbank LEER oder nicht. JA=if und alle Daten auslesen+speichern in div. NEIN=Text anzeigen das es keine Favoriten gibt
        if (result.length === 0){
            let keinFav = document.createElement("div");
            keinFav.innerHTML="Keine Rezepte vorhanden";
            content.appendChild(keinFav);
        } else {
        // Gesamtes Array durchlaufen um alle Daten zu erhalten
            for (var i=0; i<result.length;i++){
        //Aufbau EINES Feldes
    let rezeptkasten = document.createElement("div");
    rezeptkasten.setAttribute("class","kasten");
                let titel= document.createElement("div");
                titel.setAttribute("id","rezepttitel");
                let stern= document.createElement("div");
                let image= document.createElement("img");
        //Einfügen aller Teile in den Kasten
                rezeptkasten.appendChild(image);
                rezeptkasten.appendChild(titel);
                rezeptkasten.appendChild(stern);
                image.src=result[i].thumbnail;
                titel.innerHTML=result[i].title;
                stern.innerHTML ="I´m a STAR";
                content.appendChild(rezeptkasten);
            }
        }
    });

    return {
      className: "recipe-overview",
      main: content
    };
  }

  /**
   * Von der Klasse App aufgerufene Methode, um festzustellen, ob der Wechsel
   * auf eine neue Seite erlaubt ist. Wird hier true zurückgegeben, wird der
   * Seitenwechsel ausgeführt.
   *
   * @param  {Function} goon Callbackf, um den Seitenwechsel zu einem späteren
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
    return "Übersicht";
  }
}

export default RecipeOverview;
