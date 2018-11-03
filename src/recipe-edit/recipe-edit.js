"use strict";

import stylesheet from "./recipe-edit.css";
import db from "/database.js";

/**
 * View zur Anzeige oder zum Bearbeiten eines Songs.
 */
class RecipeEdit {
  /**
   * Konstruktor.
   *
   * @param {Objekt} app  Zentrales App-Objekt der Anwendung
   * @param {String} id   ID des darzustellenden Songs
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
      /* Verbindung zu Datenbank erstellen*/
        let databaseConnection =  new db.Recipes();

      /** Die Map der hinzugefügten Zutaten Textfelder */
        let zutatenMap = new Map();

    /* Rezept aus der Datenbank holen */
        let rezept = databaseConnection.getById(parseInt(this._id));

    /* Haupt-Div erstellen*/
        let content = document.createElement("div");


        /* Daten ins Formular laden */
        rezept.then((result)=>{
            console.log(result);

            /*Titel-Eingabe erstellen und einblenden*/
            let titel = document.createElement("p");
            titel.innerHTML = "<h2>Rezept bearbeiten</h2> <form><label> Titel: </label> <div class=‘side-by-side’> <input value="+result['title']+" id='recipeTitle' name=‘recipeName’ type=‘text’/> </div> </form>";
            content.appendChild(titel);

            /*Zutaten-Überschrift erstellen*/
            let ueberschriftzutat = document.createElement("p");
            ueberschriftzutat.innerHTML= "<p>Zutaten: </p>";
            content.appendChild(ueberschriftzutat);

            /*Neben-Div erstellen und einbinden */
            let nebendiv = document.createElement("div");
            nebendiv.id = 'nebendiv';
            content.appendChild(nebendiv);

            /* Hinzufügen-Button erstellen und einblenden*/
            let addButton = document.createElement("button");
            addButton.innerHTML = "<p>+</p>";
            addButton.id = 'kreuz';
            nebendiv.appendChild(addButton);

            /*Zutaten-Feld erstellen und hinzufügen*/
            let labelzutaten = document.createElement("label");
            labelzutaten.innerHTML = "Zutaten:";
            let currentIngredients = result["ingredients"];
            console.log(currentIngredients);
            let res = currentIngredients.split(";");
            console.log(res);

            for (let i=0; i<res.length; i++) {
                let inputingredients = document.createElement("input");
                inputingredients.value = res[i];

                let removeButton = document.createElement("button");
                removeButton.innerHTML = "<p>x</p>";
                let ingredientName = "ingredient"+i;
                removeButton.id= ingredientName;
                inputingredients.id = ingredientName;

                zutatenMap.set(ingredientName,inputingredients);
                console.log(zutatenMap);

                nebendiv.appendChild(inputingredients);
                nebendiv.appendChild(removeButton);

                addRemoveEventListener(removeButton);

            }

            /*Beschreibung erstellen und hinzufügen*/
            let currentDescription = result["description"];
            let labeldescription = document.createElement("label");
            labeldescription.innerHTML = "Beschreibung:";
            let textareadescription = document.createElement("textarea");
            textareadescription.value = currentDescription;
            textareadescription.id = "recipeDescription";
            content.appendChild(labeldescription);
            labeldescription.appendChild(textareadescription);



    /*        beschreibung.innerHTML = "<form><label for=‘beschreibung’> Beschreibung: </label><textarea value=currentDescription name=‘beschreibung’ type=‘text’ id='recipeDescription'></textarea></form>";
            beschreibung.setAttribute("id", "beschreibung");*/


            /* Button zum Speichern*/
            let saveButton = document.createElement("button");
            saveButton.innerHTML = "<p>Überarbeitung speichern</p>";
            content.appendChild(saveButton);

            saveButton.addEventListener("click",()=>{
                updateRecipe();
                let href ="/";
                this._app.navigate(href);
            });

            /*Neue Zutat hinzufügen*/
            addButton.addEventListener("click", function(){
                addZutat();
                }
                );


            /**
            * Diese Funktion wird ein neues Textfeld mit einem dazugehörigen entfernen Button hinzufügen.
            * Des Weiteren wird das hinzugefügte TextFeld mit der eindeutigen ID der zutatenMap hinzugefügt.
            * Anschließend wird ein EventListener auf den neuen Button erstellt.
            */
            function addZutat(){
            let newIngredient = document.createElement("input");
            let ingredientName = 'ingredient' + zutatenMap.size.toString();
            newIngredient.setAttribute("id",ingredientName);
            
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
             * Diese Funktion sammelt alle eingegebenen Daten und bereitet diese zum speichern vor.
             * Das Erstelldatum ist ein TIMESTAMP der aktuellen Uhrzeit ( Timestamp = Anzahl der Sekunden seit 1.1.1970 UTC )
             * Das Thumbnail ist ein statischer Link zu einem Nutella Bild.
             * Zuletzt werden die aufbereiteten Daten in der Datenbank mit saveNew gespeichert.
             */
            function updateRecipe(){
                let recipeName = window.document.getElementById('recipeTitle').value;
                let favorited = true;
                let createdExternally = false;
                let collectedIngredients = collectIngredients();
                let createdAt = result["date"];
                let createdDescription = window.document.getElementById('recipeDescription').value;
                let recipeID = result["id"];
                let bild = result["thumbnail"]
                let recipe = {id: recipeID, title:recipeName, href: "TODO", ingredients: collectedIngredients, description:createdDescription,  thumbnail:bild , fav:favorited, extern: createdExternally, date:createdAt};

                databaseConnection.update(recipe);

                window.alert("Das Rezept wurde erfolgreich überarbeitet!");
            }

        });




        /**
         * Diese Funktion Sammelt mittels der zutatenMap alle Zutaten und erstellt einen String,
         *  welcher als Trennzeichen der Zutaten ein Semikolon verwendet.
         */
        function collectIngredients(){
            let ingredients = "";

            zutatenMap.forEach(function(value, key) {
                let element = window.document.getElementById(key);

                if (element){
                    let ingredient = element.value;

                    if(ingredients.length === 0)
                    {
                        ingredients = ingredient;
                    }
                    else
                    {
                        ingredients = ingredients + ';' + ingredient;
                    }
                }
            }, zutatenMap);

            ingredients = ingredients;

            return ingredients;
        }

        /**
         * Diese Funktion erstellt den "onClick" EventListener für den reingereichten Button (button).
         * Wenn das Event ausgelöst wird, wird die Zutat aus der zutatenMap wieder entfernt.
         * Das zu dem Button gehörende Textfeld sowie der Button selbst, werden wieder aus dem HTML DOM entfernt.
         */
        function addRemoveEventListener(button){
            button.addEventListener("click",function(){
                nebendiv.removeChild(zutatenMap.get(button.id));
                nebendiv.removeChild(button);

                if(zutatenMap.has(button.id))
                {
                    zutatenMap.delete(button.id);
                }
                 }
             );
        }

      //document.getElementById('').innerHTML = neu;

      return {
        className: "recipe-edit",
        //topbar: section.querySelectorAll("header > *"),
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
    return "Rezept bearbeiten";
  }
}

export default RecipeEdit;
