"use strict";

import stylesheet from "./recipe-new.css";
import db from "/database.js";

/**
 * View zur Anzeige oder zum Bearbeiten eines Rezepts.
 */
class RecipeNew {
  /**
   * Konstruktor.
   *
   * @param {Objekt} app  Zentrales App-Objekt der Anwendung
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
    /** Die Map der hinzugefügten Zutaten Textfelder */
    let zutatenMap = new Map();

/* Haupt-Div erstellen*/
    let content = document.createElement("div");

/*Titel-Eingabe erstellen und einblenden*/
    let titel = document.createElement("p");
    titel.innerHTML = "<h2>Rezept erstellen</h2> <form><label> Titel: </label> <div class=‘side-by-side’> <input id='recipeTitle' name=‘recipeName’ type=‘text’/> </div> </form>";
    content.appendChild(titel);

/*    var zutaten = new Object({'value':'tomato', 'title':'Tomate'}, {'value':'onions', 'title':'Zwiebel'});
    test.innerHTML = "<h2>Rezept hinzufügen</h2>";

    //Gesamtes Array durchlaufen, um alle Daten zu erhalten
    for (var i=0; i<zutaten.length, i++) {
        //Aufbau EINES Feldes
    }
    */

/*Zutaten-Überschrift und -Felder erstellen*/
   let ueberschriftzutat = document.createElement("p");
   ueberschriftzutat.innerHTML= "<p>Zutaten: </p>";

   content.appendChild(ueberschriftzutat);

/* Hinzufügen-Button erstellen und einblenden*/
   let addButton = document.createElement("button");
   addButton.innerHTML = "<p>+</p>";
   addButton.id = 'kreuz';
   content.appendChild(addButton);

/*Neue Zutat hinzufügen*/
   addButton.addEventListener("click", function(){
       addZutat();
        }
   );

    let beschreibung = document.createElement("p");
   beschreibung.innerHTML = "<form><label for=‘beschreibung’> Beschreibung: </label> <div class=‘side-by-side’> <textarea name=‘beschreibung’ type=‘text’ placeholder=Beschreibung /> </textarea> </form>";
   beschreibung.id = 'beschreibung';
   content.appendChild(beschreibung);

    let saveButton = document.createElement("button");
    saveButton.innerHTML = "<p>Rezept speichern</p>";
    content.appendChild(saveButton);

    saveButton.addEventListener("click",function(){
        saveRecipe();
    });

    /**
     * Diese Funktion wird ein neues Textfeld mit einem dazugehörigen entfernen Button hinzufügen.
     * Des Weiteren wird das hinzugefügte TextFeld mit der eindeutigen ID der zutatenMap hinzugefügt.
     * Anschließend wird ein EventListener auf den neuen Button erstellt.
     */
    function addZutat(){
        let newIngredient = document.createElement("p");

        let ingredientName = 'ingredient' + zutatenMap.size.toString();

        newIngredient.innerHTML = "<form><label for=‘zutaten’> </label> <div class=‘side-by-side’> <input id='" + ingredientName + "' name='textbox'' type=‘text’/></div></form>";

        let removeButton = document.createElement("button");
        removeButton.innerHTML = "<p>x</p>";
        removeButton.id= ingredientName;

        zutatenMap.set(ingredientName,newIngredient);

        addRemoveEventListener(removeButton);

        /*Neue Zutat nach der anderen Zutat hinzufügen*/
        addButton.parentNode.insertBefore(newIngredient, addButton.nextSibling);
        newIngredient.parentNode.insertBefore(removeButton, newIngredient.nextSibling);
    }

    /**
     * Diese Funktion erstellt den "onClick" EventListener für den reingereichten Button (button).
     * Wenn das Event ausgelöst wird, wird die Zutat aus der zutatenMap wieder entfernt.
     * Das zu dem Button gehörende Textfeld sowie der Button selbst, werden wieder aus dem HTML DOM entfernt.
     */
    function addRemoveEventListener(button){
        button.addEventListener("click",function(){
            content.removeChild(zutatenMap.get(button.id));
            content.removeChild(button);

            if(zutatenMap.has(button.id))
            {
                zutatenMap.remove(button.id);
            }
             }
         );
    }

    /**
     * Diese Funktion sammelt alle eingegebenen Daten und bereitet diese zum speichern vor.
     * Das Erstelldatum ist ein TIMESTAMP der aktuellen Uhrzeit ( Timestamp = Anzahl der Sekunden seit 1.1.1970 UTC )
     * Das Thumbnail ist ein statischer Link zu einem Nutella Bild.
     * Zuletzt werden die aufbereiteten Daten in der Datenbank mit saveNew gespeichert.
     */
    function saveRecipe(){
        let recipeName = window.document.getElementById('recipeTitle').value;
        let favorited = true;
        let createdExternally = false;
        let collectedIngredients = collectIngredients();
        let createdAt = Date.now();

        let recipeID = generateID();
        let recipe = {id: recipeID, title:recipeName, href: "TODO", ingredients: collectedIngredients,  thumbnail:"https://images-na.ssl-images-amazon.com/images/I/51hbDoRj1dL.jpg", fav:favorited, extern: createdExternally, date:createdAt};

        let databaseConnection =  new db.Recipes();
        databaseConnection.saveNew(recipe);

        window.alert("Das Rezept wurde erfolgreich erstellt!");
    }

    /**
     * Diese Funktion erstellt eine unique ID anhand der aktuellen Zeit (TIMESTAMP) und einer "zufällig" generierten Nummer mittels Math.random().
     */
    function generateID(){
        let uniqueID = Date.now() + Math.random().toString().slice(2);
        return uniqueID;
    }

    /**
     * Diese Funktion Sammelt mittels der zutatenMap alle Zutaten und erstellt einen String,
     *  welcher als Trennzeichen der Zutaten ein Semikolon verwendet.
     */
    function collectIngredients(){
        let ingredients = "";

        zutatenMap.forEach(function(value, key) {
            let ingredient = window.document.getElementById(key).value;

            if(ingredients.length === 0)
            {
                ingredients = ingredient;
            }
            else
            {
                ingredients = ingredients + ';' + ingredient;
            }

        }, zutatenMap);

        return ingredients;
    }

    return {
      className: "recipe-new",
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
    return "Rezept hinzufügen";
  }
}

export default RecipeNew;
