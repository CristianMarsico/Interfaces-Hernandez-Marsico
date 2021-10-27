"use strict";

window.onload = function (event) {
  window.addEventListener("keydown", pushKey);

  let distanceMtrs = 0; //lo uso para guardar el interval
  let scoreMtrs = 0; //distancia que recorre el avatar
  let puntos = 0; //son los recolectados

  let puntaje = document.getElementById("puntaje"); //puntaje
  let recorrido = document.getElementById("score"); //puntaje

  recorrido.innerText = "Recorrido ";
  puntaje.innerHTML = "Monedas: 00";
  let loop = false;

  let cantidadNecesariaMonedas = 10;
  document.querySelector('#cantidadNecesariaMonedas').innerHTML = cantidadNecesariaMonedas;

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
  
  var hiceClickJ1 = false;
  var hiceClickJ2 = false;
  
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

  // Obtengo los botones de escenarios
  var j1 = document.getElementById("j1");
  j1.addEventListener("click", () => {
    desbloquearBotonEmpezar();
    hiceClickJ1 = true;
    hiceClickJ2 = false
    j1 = 1;
    document.getElementById("j1").classList.add("seleccionado");
    document.getElementById("j2").classList.remove("seleccionado");
    obtenerEscenario();
  });
  var j2 = document.getElementById("j2");

  j2.addEventListener("click", () => {
    desbloquearBotonEmpezar();
    hiceClickJ1 = false;
    hiceClickJ2 = true
    j2 = 2;
    document.getElementById("j2").classList.add("seleccionado");
    document.getElementById("j1").classList.remove("seleccionado");
    obtenerEscenario();
  });

  // Desbloquea el botón de empezar a jugar cuando se haya elegido una escena
  function desbloquearBotonEmpezar() {
    empezarButton.classList.add("button");
    empezarButton.classList.remove("bloqueado");
  }

  // Tutorial
  let botonComoJugar = document.querySelector('#botonTutorial');
  let divTutorial = document.querySelector('#divTutorial');
  let btnCerrarTutorial = document.querySelector('#cerrarTutorial');
  botonComoJugar.addEventListener("click", () => {
    divTutorial.removeAttribute('hidden');
    document.querySelector('#contenidoMenu').setAttribute('hidden', 'true');  
  });
  btnCerrarTutorial.addEventListener("click", () => {
    divTutorial.setAttribute('hidden', 'true');
    document.querySelector('#contenidoMenu').removeAttribute('hidden');
  });
  

  empezarButton.onclick = function () {
    // Sólo comenzar si ya se hizo clic en alguna escena
    if(hiceClickJ1 || hiceClickJ2) {
      start();
    }
  };
  
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

    //console.log(event.keyCode);

    if(avatar.isAlive() && loop == true) {
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
      if(puntos < 10) {
        puntaje.innerHTML = "Monedas: 0" + puntos;
      }
      else {
        puntaje.innerHTML = "Monedas: " + puntos;
      }
    }
    //El avatar se encarga de saber si choca o colisiona con algun obstaculo

    if (puntos >= cantidadNecesariaMonedas) {
      loop = false;
      winGame();
    }

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
    //seteamos los los valores en cero
    menu.style.display = "none";
    document.querySelector('#buttonPlayStop').removeAttribute("hidden");
    scoreMtrs = 0;
    puntos = 0;
    puntaje.innerHTML = "Monedas: 00";
    distance();
    /*Inicio los Objetos*/
    avatar.init();
    cuervo.init();
    moneda.init();
    pinche.init();
    loop = true;

    /*Cuando dibuje ejecuta ésta función
     Se encarga el browser*/
    requestAnimationFrame(gameLoop);//llama a la actualización cuando el navegador este listo para dibujar nuevamente
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////// TERMINA EL JUEGO ////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////

  function winGame() {
    stopObjects();
    setTimeout(() => {
      divGanador.removeAttribute("hidden");
      document.querySelector('#monedasGanador').innerHTML = puntos;
      document.querySelector('#metrosGanador').innerHTML = scoreMtrs;
      document.querySelector('#empezarGanador').innerHTML = "Jugar de Nuevo";
      document.querySelector('#empezarGanador').addEventListener("click", function () {
        divGanador.setAttribute("hidden", "true");
        menu.style.display = "block";
        document.querySelector('#empezar').innerHTML = "Empezar";
      });
    }, 300);
  }
  
  function gameOver() {
    scoreMtrs = 0;
    stopObjects();
    setTimeout(() => {
      avatar.stop();
      menu.style.display = "block";
      document.querySelector('#empezar').innerHTML = "Jugar de Nuevo";
    }, 1200);
  }

  function stopObjects() {
    clearInterval(distanceMtrs);//detenemos el tiempo
    //detenemos los objetos
    document.querySelector('#buttonPlayStop').setAttribute("hidden", "true");
    cuervo.stop();
    pinche.stop();
    moneda.stop();
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

  function pauseGame() { //detenemos las animaciones 
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
