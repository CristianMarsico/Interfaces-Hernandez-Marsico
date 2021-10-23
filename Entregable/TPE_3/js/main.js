"use strict";

window.onload = function (event) {
  window.addEventListener("keydown", pushKey);

  let distanceMtrs = 0;
  let scoreMtrs = 0;
  let puntos = 0;

  let puntaje = document.getElementById("puntaje"); //puntaje
  let recorrido = document.getElementById("score"); //puntaje

  recorrido.innerText = "Recorrido ";
  puntaje.innerHTML = "Monedas: 0";
  let loop = false;

  let avatar = new Avatar("avatar"); //Instancio el avatar
  const cuervo = new Crow("cuervo"); //Instancio los obtaculos
  const moneda = new Moneda("moneda");
  const pinche = new Pinche("pinche");


  const menu = document.getElementById("menu");
  const empezarButton = document.getElementById("empezar");
  empezarButton.onclick = function () {
    start();
  };

  const buttonPlayStop = document.getElementById("buttonPlayStop");

  buttonPlayStop.addEventListener("click", () => {
    if (buttonPlayStop.classList.contains("play")) {
      resumeGame();
    } else {
      pauseGame();
    }
    buttonPlayStop.classList.toggle("play");
  });

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////// FUNCION QUE ME DETECTA DISTANCIA RECORRIDA ////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

  /*Controlo la pos de avatar con la de los obtaculos */
  function gameLoop() {
    moneda.init();
    if (avatar.checkCollision(moneda)) {
      //El avatar se encarga de saber si choca o colisiona con algun obstaculo
      moneda.stop();
      puntos++;
      puntaje.innerHTML = "Monedas: 0" + puntos;
    }

    if (avatar.checkCollision(cuervo)|| avatar.checkCollision(pinche)) {
      loop = false;
      avatar.die();
      gameOver();
    }
    if (loop) {
      requestAnimationFrame(gameLoop);
    }
  }

  function start() {
    scoreMtrs = 0;
    puntos = 0;
    puntaje.innerHTML = "Monedas: 0";
    distance();
    menu.style.display = "none";
    avatar.init();
    cuervo.init();
    moneda.init();
    pinche.init();
    loop = true;
    requestAnimationFrame(gameLoop);
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////// TERMINA EL JUEGO ////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////

  function gameOver() {
    scoreMtrs = 0;
    clearInterval(distanceMtrs);
    cuervo.stop();
    pinche.stop();
    setTimeout(() => {
      menu.style.display = "block";
      avatar.stop();
      moneda.stop();
    }, 1200);
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////// FUNCIONES PLAY-PAUSA ////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////

  function resumeGame() {
    avatar.playAnimation();
    cuervo.playAnimation();
    moneda.playAnimation();
    distance();
    document.getElementById("capauno").style.animationPlayState = "running";
    document.getElementById("capados").style.animationPlayState = "running";
    document.getElementById("capatres").style.animationPlayState = "running";
    document.getElementById("capaseis").style.animationPlayState = "running";
    document.getElementById("capasiete").style.animationPlayState = "running";
  }

  function pauseGame() {
    avatar.stopAnimation();
    cuervo.stopAnimation();
    moneda.stopAnimation();
    clearInterval(distanceMtrs);
    document.getElementById("capauno").style.animationPlayState = "paused";
    document.getElementById("capados").style.animationPlayState = "paused";
    document.getElementById("capatres").style.animationPlayState = "paused";
    document.getElementById("capaseis").style.animationPlayState = "paused";
    document.getElementById("capasiete").style.animationPlayState = "paused";
  }
};
