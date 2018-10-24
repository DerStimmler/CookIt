"use strict";

import stylesheet from "./recipe-overview.css";
import "../fav_heart.scss";
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
    let button = document.createElement("button");
    button.innerHTML="Rezept hinzufügen";
    button.setAttribute("id", "button");
    button.setAttribute("type", "button");
    button.setAttribute("class", "button");
    button.addEventListener("click", () => {
      let href ="/new/";
      this._app.navigate(href);
    });
    content.appendChild(button);
    var ergebnisse= recipes.getAllRecipesByTitle().then(function(result){
        //Test, ob Datenbank LEER oder nicht. JA=Text anzeigen das es keine Favoriten gibt, NEIN=Schleife, die alle Rezepte ausgibt
        if (result.length === 0){
            let keinFav = document.createElement("div");
            keinFav.innerHTML="Keine Rezepte vorhanden";
            content.appendChild(keinFav);
        } else {
        // Gesamtes Array durchlaufen um alle Daten zu erhalten
            for (var i=0; i<result.length;i++){
                //Aufbau EINES Feldes (beinhaltet immer 1 Rezept sprich Bild+Titel+Favorit)
                let rezeptkasten = document.createElement("div");
                rezeptkasten.setAttribute("id",result[i].id);
                rezeptkasten.setAttribute("class","kasten");

                // BILD
                let imagefeld=document.createElement("div");
                imagefeld.setAttribute("class", "imgfeld");
                let image= document.createElement("img");
                image.setAttribute("class", "img");
                imagefeld.appendChild(image);
                image.src=result[i].thumbnail;
                rezeptkasten.appendChild(imagefeld);

                // Titel bzw. Rezeptname
                let titel= document.createElement("div");
                titel.setAttribute("class", "titel");
                let link = document.createElement("a");
                link.setAttribute("class","a");
                link.setAttribute("href", "/display/"+rezeptkasten.getAttribute("id")+"/");
                link.setAttribute("data-navigo","");
                link.innerHTML=result[i].title;
                //titel.innerHTML=result[i].title;
                /*link.addEventListener("click", () => {
                let href ="/display/"+rezeptkasten.getAttribute("id")+"/";
                this._app.navigate(href);
                });*/
                titel.appendChild(link);
                rezeptkasten.appendChild(titel);
                // Favoritenstern (Kick=> Löschen)
                //let stern= document.createElement("div");
                //stern.setAttribute("class", "stern");
                //stern.innerHTML ="I´m a STAR";

                //Star
                let stern = document.createElement("div");
                stern.setAttribute("class", "stern");
                let iHeart = document.createElement("i");
                //iHeart.setAttribute("class", "heart");
                iHeart.setAttribute("class","fa fa-2x liked fa-heart liked-shaked heart");
                iHeart.addEventListener("click", doLikeButton);
                iHeart.addEventListener("click", () =>{
                  let id = event.target.parentNode.parentNode.getAttribute("id");
                  let deleteRecipe = result[id];
                  recipes.delete(deleteRecipe);
                  console.log("Rezept " + id + " wurde gelöscht!")
                });
                stern.appendChild(iHeart);
                rezeptkasten.appendChild(stern);
                //Einfügen aller Teile in den OBERSTEN DIV
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

export default RecipeOverview;
