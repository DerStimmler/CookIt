"use strict";

import stylesheet from "/recipe-search.css";

//Ruft anhand der URL von RecipePuppy entsprechende Rezepte ab, verarbeitet Sie und liefert sie in einem Array zurück
function getRecipes(url) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.send();
  
    xhr.onreadystatechange = processRequest;
  
    function processRequest(e) {
      if (xhr.readyState == 4 && xhr.status == 200) {
        var response = JSON.parse(xhr.responseText);
        var results = response.results;
      }
    }
    //Verarbeiten der Ergebnisse von Recipepuppy
    for(let i=0; i<results.length; i++){
        results[i].id = Date.now() + Math.random().toString().slice(2); //Erstellen einer einzigartigen ID
        results[i].fav = false; //Rezept ist nach dem Abrufen nicht favorisiert
        results[i].extern = true; //Rezept ist von Extern (RecipePuppy)
        results[i].date = null; //Noch kein Favorisierungsdatum vorhanden
    }
    return results;
  }

  //zeigt die Rezepte, die als Array übergeben werden auf der Website an
  function showSearch(recipes){
    
  }
