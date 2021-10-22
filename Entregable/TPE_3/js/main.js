"use strict";

window.addEventListener('DOMContentLoaded', (event) => {
  
  window.addEventListener('keydown', pushKey);
 
  let loop = false;
  const avatar = new Avatar('avatar'); //Instancio el avatar
 

 /////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////// FUNCION QUE ME DETECTA LA TECLA PRESIONADA ////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

  function pushKey(event) {
    event.preventDefault();

     /*si preciono la tecla y la tecla es el 38(flecha arriba) el muñeco salta */
     if (event.type == 'keydown' && event.keyCode == 38) {
      avatar.jump();
    }
    
     /*si preciono la tecla y la tecla es 37(flecha izq) o es la 39(fecla derecha)
     el muñeco va hacia atras o adelante*/
     if (event.type == 'keydown' && event.keyCode == 37 || event.keyCode == 39) {
      avatar.move(event.keyCode);
    }
  }

  function start() {
    avatar.init();
    
    loop = true;
    
   
  }

  
    start();
  
  
  
  
});
