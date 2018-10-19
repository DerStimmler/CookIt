"use strict";

import stylesheet from "./index.css";
import theme from "./theme.css";
import App from "/app.js";

// Erst loslaufen, wenn das Document Object Modul bereit ist
window.addEventListener("load", () => {
  // Anwendung starten
  let app = new App();
  app.start();

  document.getElementById("search").addEventListener("click",function(){
    document.getElementById("search").classList.add('active');
    document.getElementById("meine").classList.remove('active');
    document.getElementById("inf").classList.remove('active');
  }
  );

  document.getElementById("inf").addEventListener("click",function(){
    document.getElementById("inf").classList.add('active');
    document.getElementById("meine").classList.remove('active');
    document.getElementById("search").classList.remove('active');
}
);

    document.getElementById("meine").addEventListener("click",function(){
        document.getElementById("meine").classList.add('active');
        document.getElementById("inf").classList.remove('active');
        document.getElementById("search").classList.remove('active');
  }
  );
});
