"use strict";

import stylesheet from "./recipe-display.css";
import db from "/database.js";
import imageURL from "../img/placeholderIMG.png";
/**
 * View zur Anzeige oder zum Bearbeiten eines Rezept.
 */
class RecipeDisplay {
  /**
   * Konstruktor.
   *
   * @param {Objekt} app  Zentrales App-Objekt der Anwendung
   * @param {String} id   ID des darzustellenden Rezept
   */
  constructor(app, id) {
    this._app = app;
    this._id = id;
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

    //var ergebnisse= recipes.getById(parseInt(this._id)).then((result)=>{
    let ergebnisse = recipes.getById(parseInt(this._id));
    //Kasten für BILD UND DANEBEN Titel
    let oberteil = document.createElement("div");
    oberteil.setAttribute("class","oberteil");
    ergebnisse.then((result)=>{
    console.log(result);
    let rezeptkasten = document.createElement("div");
    rezeptkasten.setAttribute("id", result["id"]);
    rezeptkasten.setAttribute("class","kasten");

    // BILD
    let imagefeld=document.createElement("div");
    imagefeld.setAttribute("class", "imgfeld");
    let image= document.createElement("img");
    image.setAttribute("class", "img");
    imagefeld.appendChild(image);
    if (result["thumbnail"]===""){
     image.src=imageURL;;
    } else{
    image.src=result["thumbnail"]; }
    //image.src=result["thumbnail"];
    oberteil.appendChild(imagefeld);

                    // Titel bzw. Rezeptname
                    let titel= document.createElement("div");
                    titel.setAttribute("class", "titel");
                    titel.innerHTML=(result["title"]);
                    oberteil.appendChild(titel);
    content.appendChild(oberteil);
    //content.appendChild(rezeptkasten);


    //Löschenbutton
    let trash = document.createElement("div");
    trash.setAttribute("id", "trash");
    trash.setAttribute("class", "trashbutton");
    trash.addEventListener("click", () =>{
        if (confirm("Soll das Rezept wirklich gelöscht werden?")==true){
            let id = result["id"];
            recipes.delete(parseInt(id));
            this._app.navigate("/");
            console.log("Rezept " + id + " wurde gelöscht!")
            }
        });

    // Bearbeitungsbutton
    if (result["extern"]==false){
    let change = document.createElement("div");
    change.setAttribute("id", "change");
    change.setAttribute("class", "changebutton");
    change.addEventListener("click", () =>{
            let id = result["id"];
            let href ="/edit/"+id+"/";
            this._app.navigate(href);

        });
        oberteil.appendChild(change);
    }
        oberteil.appendChild(trash);
    let zutaten = document.createElement("div");
    zutaten.innerHTML="<b>Zutaten: </b>"+result["ingredients"];
    zutaten.setAttribute("class","zutaten");
    content.appendChild(zutaten);

    if (result["extern"]==false){
        let beschreibung = document.createElement("div");
        beschreibung.setAttribute("class","beschreibung");
        //let schrift = document.createElement("div");
        //schrift.setAttribute("id","überschrift");
        //schrift.innerHTML="Beschreibung:</br>";
        //content.appendChild(schrift);
        beschreibung.innerHTML="<b>Beschreibung:</b></br>"+result["description"];
        content.appendChild(beschreibung);
    } else {
        /*let externlink = document.createElement("button");
        externlink.setAttribute("type","button");
        externlink.setAttribute("class", "link");
        //externlink.innerHTML= result["href"];
        let link = document.createElement("a");
        link.setAttribute("href", result["href"])
        link.innerHTML="Rezeptlink";
        externlink.appendChild(link);*/

        let extern = document.createElement("button");
        extern.innerHTML="Zum Rezept &#8680";
        extern.setAttribute("id", "button");
        extern.setAttribute("type", "button");
        extern.setAttribute("class", "button");
        extern.addEventListener("click", () => {
          let href =result["href"];
          window.open(href);
        });
        content.appendChild(extern);
        //content.appendChild(externlink);
    }
});
    //});

    return {
      className: "recipe-display",
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
    return "Rezept anzeigen";
  }
}

export default RecipeDisplay;
