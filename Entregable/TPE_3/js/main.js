"use strict";

window.onload = function (event) {
  window.addEventListener("keydown", pushKey);

  let distanceMtrs = 0; //lo uso para guardar el interval
  let scoreMtrs = 0; //distancia que recorre el avatar
  let puntos = 0; //son los recolectados

  let puntaje = document.getElementById("puntaje"); //puntaje
  let recorrido = document.getElementById("score"); //puntaje

  recorrido.innerText = "Recorrido ";
  puntaje.innerHTML = "Monedas: 0";
  let loop = false;

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////// INSTANCIO LOS OBJETOS ///////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////
  let avatar = new Avatar("avatar"); //Instancio el avatar
  const cuervo = new Crow("cuervo"); //Instancio los obtaculos
  const moneda = new Moneda("moneda");
  const pinche = new Pinche("pinche");
  let escenario = new Escenario();

  /*Obtengo el boton de empezar*/
  const menu = document.getElementById("menu");
  const empezarButton = document.getElementById("empezar");
  empezarButton.onclick = function () {
    start();
  };

  let hiceClickJ1 = false;
  let hiceClickJ2 = false;

  const buttonPlayStop = document.getElementById("buttonPlayStop"); //btm play-pausa
  buttonPlayStop.addEventListener("click", () => {
    /**Hago el control del boton que clase contiene */
    if (buttonPlayStop.classList.contains("play")) {
      resumeGame();
    } else {
      pauseGame();
    }
    buttonPlayStop.classList.toggle("play");
  });

  
  let j1 = document.getElementById("j1");
  j1.addEventListener("click", () => {
    hiceClickJ1 = true;
    hiceClickJ2 = false
    j1 = 1;
    obtenerEscenario();
  });
  let j2 = document.getElementById("j2");
  j2.addEventListener("click", () => {
    hiceClickJ1 = false;
    hiceClickJ2 = true
    j2 = 2;
    obtenerEscenario();
  });
  
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////// FUNCION PARA LA SELECCION DE ESCENARIO ////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////
  function obtenerEscenario(){
    if(j1 == 1 &&  hiceClickJ1 == true){
      hiceClickJ2 = false;
      escenario.escenaNoche();
    }
    if(j2 == 2 && hiceClickJ2 == true) {
      hiceClickJ1 = false;
      escenario.escenaDia();
      
    }
  }

  



  /////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////// FUNCION QUE ME DETECTA DISTANCIA RECORRIDA ////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /**A cada segundo va sumando 1 punto */
  function distance() {
    distanceMtrs = setInterval(() => {
      scoreMtrs++;
      recorrido.innerText = "Recorrido " + scoreMtrs + "mtrs";
    }, 1000);
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////// FUNCION QUE ME DETECTA LA TECLA PRESIONADA ////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////

  function pushKey(event) {
    event.preventDefault();

    console.log(event.keyCode);
    /*si preciono la tecla y la tecla es el 38(flecha arriba) el muñeco salta */
    if (event.type == "keydown" && event.keyCode == 38) {
      avatar.jump();
    }

    /*si preciono la tecla y la tecla es 37(flecha izq) o es la 39(fecla derecha)
     el muñeco va hacia atras o adelante*/
    if (
      (event.type == "keydown" && event.keyCode == 37) ||
      event.keyCode == 39
    ) {
      avatar.move(event.keyCode);
    }
    /*tecla P*/
    if (
      (event.type == "keydown" && event.keyCode == 80) ||
      event.keyCode == 80
    ) {
      pauseGame();
    }

    /*tecla ENTER*/
    if (
      (event.type == "keydown" && event.keyCode == 13) ||
      event.keyCode == 13
    ) {
      resumeGame();
    }
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////// FUNCION QUE ME DETECTA LA LA COLISION /////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /*Controlo la pos de avatar con la de los obtaculos 
  Es un buble constante*/
  function gameLoop() {
    moneda.init();
    if (avatar.checkCollision(moneda)) {
      //El avatar se encarga de saber si choca con alguna moneda
      moneda.stop();
      puntos++;
      puntaje.innerHTML = "Monedas: 0" + puntos;
    }
    //El avatar se encarga de saber si choca o colisiona con algun obstaculo
    if (avatar.checkCollision(cuervo) || avatar.checkCollision(pinche)) {
      loop = false;
      avatar.die();
      gameOver();
    }
    if (loop) {
      requestAnimationFrame(gameLoop);
    }
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////// INICIO EL JUEGO  ////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////
  function start() {
    //seteamolos los valores en cero
    menu.style.display = "none";
    scoreMtrs = 0;
    puntos = 0;
    puntaje.innerHTML = "Monedas: 0";
    distance();
    /*Inicio los Objetos*/
    avatar.init();
    cuervo.init();
    moneda.init();
    pinche.init();
    loop = true;
    requestAnimationFrame(gameLoop);//llama a la actualización cuando el navegador este listo para dibujar nuevamente
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////// TERMINA EL JUEGO ////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////

  function gameOver() {
    scoreMtrs = 0;
    clearInterval(distanceMtrs);//detenemos el tiempo
    //detenemos los sprites
    cuervo.stop();
    pinche.stop();
    moneda.stop();
    setTimeout(() => {
      avatar.stop();
      menu.style.display = "block";
    }, 1200);
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////// FUNCIONES PLAY-PAUSA ////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////

  function resumeGame() {
    avatar.playAnimation();
    cuervo.playAnimation();
    moneda.playAnimation();
    pinche.playAnimation();
    distance();
    document.getElementById("capauno").style.animationPlayState = "running";
    document.getElementById("capados").style.animationPlayState = "running";
    document.getElementById("capatres").style.animationPlayState = "running";
    document.getElementById("capacuatro").style.animationPlayState = "running";
    document.getElementById("capacinco").style.animationPlayState = "running";
    document.getElementById("capaseis").style.animationPlayState = "running";
    document.getElementById("capasiete").style.animationPlayState = "running";

    document.getElementById("capasietedos").style.animationPlayState = "running";
    document.getElementById("capaseisdos").style.animationPlayState = "running";
    document.getElementById("capacincodos").style.animationPlayState = "running";
    document.getElementById("capadosdos").style.animationPlayState = "running";
  }

  function pauseGame() {
    avatar.stopAnimation();
    cuervo.stopAnimation();
    moneda.stopAnimation();
    pinche.stopAnimation();
    clearInterval(distanceMtrs);
    document.getElementById("capauno").style.animationPlayState = "paused";
    document.getElementById("capados").style.animationPlayState = "paused";
    document.getElementById("capatres").style.animationPlayState = "paused";
    document.getElementById("capacuatro").style.animationPlayState = "paused";
    document.getElementById("capacinco").style.animationPlayState = "paused";
    document.getElementById("capaseis").style.animationPlayState = "paused";
    document.getElementById("capasiete").style.animationPlayState = "paused";
    
    document.getElementById("capadosdos").style.animationPlayState = "paused";
    document.getElementById("capacincodos").style.animationPlayState = "paused";
    document.getElementById("capaseisdos").style.animationPlayState = "paused";
    document.getElementById("capasietedos").style.animationPlayState = "paused";
  
  }

};
