"use strict";

import Dexie from "dexie/dist/dexie.js";

const db = new Dexie("CookIt");

/**
 * Die Rezepte werden wie folgt als Objekt gespeichert:
 * {
 *     id: "Eindeutige ID zur Identifizierung des Rezepts ",
 *     title: "Name des Rezepts",
 *     href: "Link zum Rezept",
 *     ingredients: "Zutaten als String",
 *     thumbnail: "Link zum Vorschaubild",
 *     fav: "Boolean ob das Rezept favorisiert ist",
 *     extern: "Boolean ob das Rezept selbst erstellt ist oder von extern",
 *     date: "Erstelldatum des Rezepts / Favorisierdatum"
 * }
 */

db.version(1).stores({
  recipes: "id, title, href, ingredients, thumbnail, fav, extern, date"
});

class Recipes {
  //Neues Rezept hinzufügen
  async saveNew(recipe) {
    return db.recipes.add(recipe);
  }
  //bestehendes Rezept aktualisieren
  async update(recipe) {
    return db.recipes.put(recipe);
  }
  //Rezept anhand von ID löschen
  async delete(id) {
    return db.recipes.delete(id);
  }
  //Ganze Datenbank löschen
  async clear() {
    return db.recipes.clear();
  }
  //Rezept anhand der ID auslesen
  async getById(id) {
    return db.recipes.get(id);
  }
  //alle Rezepte nach Datum sortiert als Array bekommen
  async getAllRecipesByDate() {
    return db.recipes.orderBy("date").toArray();
  }
  //alle Rezepte nach Titel sortiert als Array bekommen
  async getAllRecipesByTitle() {
    return db.recipes.orderBy("title").toArray();
  }
  async clear() {
    return db.recipes.clear();
}
}

export default {
  db,
  Recipes,
};
