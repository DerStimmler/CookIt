"use strict";

import Dexie from "dexie/dist/dexie.js";

let db = new Dexie("CookIt");

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

database.version(1).stores({
    recipes: "id, title, href, ingredients, thumbnail, fav, extern, date"
});

class Recipes {

    //Neues Rezept hinzufügen
    async saveNew(recipe) {
        return db.recipes.add(recipe);
    }
    //bestehendes Rezept aktualisieren
    async update(songtext) {
        return db.recipes.put(songtext);
    }
    //Rezept anhand von ID löschen
    async delete(id) {
        return db.recipes.delete(id);
    }
    //Rezept anhand der ID auslesen
    async getById(id) {
        return db.recipes.get(id);
    }
    //alle Rezepte nach Datum sortiert als Array bekommen
    async getAllRecipesByDate(){
        return db.recipes.sortBy(date).toArray();
    }
    //alle Rezepte nach Titel sortiert als Array bekommen
    async getAllRecipesByTitle(){
        return db.recipes.sortBy(title).toArray();
    }
}

export default{
    db,
    Recipes,
};