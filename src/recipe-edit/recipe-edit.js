"use strict";

import stylesheet from "./recipe-edit.css";

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
      var content = document.createElement("div");
      let neu = "<h2>Rezept bearbeiten</h2> <form onsubmit =‘validateForm(event)’ action = ‘contact-form.php’ method = ‘POST’ > <!-- Name --> <label for=‘firstname’> Titel: <span class=‘required’>*</span> </label> <div class=‘side-by-side’> <input name=‘name’ type=‘text’ placeholder=‘Titel’ /> </div> <!-- Zutaten --> <ul> <li> <label> <input type=‘checkbox’ name=‘ingredients’ value=‘tomato’> Tomate </label> </li> <li> <label> <input type=‘checkbox’ name=‘ingredients’ value=‘onions’> Zwiebel </label> </li> <li> <label> <input type=‘checkbox’ name=‘ingredients’ value=‘red pepper’> Roter Pfeffer </label> </li> <li> <label> <input type=‘checkbox’ name=‘ingredients’ value=‘garlic’> Knoblauch </label> </li> <li> <label> <input type=‘checkbox’ name=‘ingredients’ value=‘olive oil’> Olivenöl </label> </li> <li> <label> <input type=‘checkbox’ name=‘ingredients’ value=‘zucchini’> Zucchini </label> </li> <li> <label> <input type=‘checkbox’ name=‘ingredients’ value=‘cream cheese’> Frischkäse </label> </li> <li> <label> <input type=‘checkbox’ name=‘ingredients’ value=‘vermicelli’> Fadennudeln </label> </li> <li> <label> <input type=‘checkbox’ name=‘ingredients’ value=‘eggs’> Eier </label> </li> <li> <label> <input type=‘checkbox’ name=‘ingredients’ value=‘parmesan cheese’> Parmesankäse </label> </li> <li> <label> <input type=‘checkbox’ name=‘ingredients’ value=‘milk’> Milch </label> </li> <li> <label> <input type=‘checkbox’ name=‘ingredients’ value=‘italian seasoning’> Italienisches Gewürz </label> </li> <li> <label> <input type=‘checkbox’ name=‘ingredients’ value=‘salt’> Salz </label> </li> <li> <label> <input type=‘checkbox’ name=‘ingredients’ value=‘black pepper’> Schwarzer Pfeffer </label> </li> <li> <label> <input type=‘checkbox’ name=‘ingredients’ value=‘butter’> Butter </label> </li> <li> <label> <input type=‘checkbox’ name=‘ingredients’ value=‘bacon’> Bacon </label> </li> <li> <label> <input type=‘checkbox’ name=‘ingredients’ value=‘roasted red peppers’> Geröstete rote Tomaten </label> </li> <li> <label> <input type=‘checkbox’ name=‘ingredients’ value=‘oregano’> Oregano </label> </li> <li> <label> <input type=‘checkbox’ name=‘ingredients’ value=‘broccoli’> Brokkoli </label> </li> <li> <label> <input type=‘checkbox’ name=‘ingredients’ value=‘lowfat milk’> Fettarme Milch </label> </li> <li> <label> <input type=‘checkbox’ name=‘ingredients’ value=‘basil’> Basilikum </label> </li> <li> <label> <input type=‘checkbox’ name=‘ingredients’ value=‘caraway seed’> Kümmel </label> </li> <li> <label> <input type=‘checkbox’ name=‘ingredients’ value=‘coriander’> Koriander </label> </li> <li> <label> <input type=‘checkbox’ name=‘ingredients’ value=‘eggplant’> Aubergine </label> </li> <li> <label> <input type=‘checkbox’ name=‘ingredients’ value=‘lemon’> Zitrone </label> </li> <li> <label> <input type=‘checkbox’ name=‘ingredients’ value=‘chicken broth’> Hühnerbrühe </label> </li> <li> <label> <input type=‘checkbox’ name=‘ingredients’ value=‘cottage cheese’> Hüttenkäse </label> </li> <li> <label> <input type=‘checkbox’ name=‘ingredients’ value=‘egg substitute’> Ei-Ersatz </label> </li> <li> <label> <input type=‘checkbox’ name=‘ingredients’ value=‘bread’> Brot </label> </li> <li> <label> <input type=‘checkbox’ name=‘ingredients’ value=‘mozzarella cheese’> Mozzarella </label> </li> <li> <label> <input type=‘checkbox’ name=‘ingredients’ value=‘leaves’> Blätter </label> </li> <li> <label> <input type=‘checkbox’ name=‘ingredients’ value=‘parsley’> Petersilie </label> </li> <li> <label> <input type=‘checkbox’ name=‘ingredients’ value=‘thyme’> Thymian </label> </li> <li> <label> <input type=‘checkbox’ name=‘ingredients’ value=‘peas’> Erbsen </label> </li> <li> <label> <input type=‘checkbox’ name=‘ingredients’ value=‘potato’> Kartoffel </label> </li> <li> <label> <input type=‘checkbox’ name=‘ingredients’ value=‘water’> Wasser </label> </li> <li> <label> <input type=‘checkbox’ name=‘ingredients’ value=‘mushroom’> Pilze </label> </li> <li> <label> <input type=‘checkbox’ name=‘ingredients’ value=‘chili powder’> Chilipulver </label> </li> <li> <label> <input type=‘checkbox’ name=‘ingredients’ value=‘flour’> Mehl </label> </li> <li> <label> <input type=‘checkbox’ name=‘ingredients’ value=‘salad greens’> Salat </label> </li> </ul> <!-- Das Rezept --> <label for=‘recipe’> Beschreibung: <span class=‘required’>*</span> </label> <textarea name=‘message’></textarea> <!-- Button zum Abschicken des Formulars --> <input type=‘submit’ value=‘Abschicken’ /> </form> <div id=‘result’></div>";

      content.innerHTML = neu;


      document.getElementById('').innerHTML = neu;

      return {
        className: "recipe-edit",
        topbar: section.querySelectorAll("header > *"),
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
