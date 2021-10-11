"use strict";
window.onload = function () {
  let canvas = document.querySelector("#canvas");
  let ctx = canvas.getContext("2d");
  let width = canvas.width;
  let height = canvas.height;

  let tablero;

  //Variables que utilizo para obtener el valor de los jugadores
  let jugador1;
  let jugador2;
  let turno;
  let tieneTurno = true;

  //Variables que utilizo para las fichas
  let btnFichaJ1;
  let btnFichaJ2;
  let cantFichas;
  let tamFicha = 50;
  let fichasJ1 = [];
  let fichasJ2 = [];
  let j1_o_j2;
  let clickedFigure = null;//variable que uso para saber si clickee en Ficha

  //Variables que utilizo para obtener el color de las fichas
  let colorJ1;
  let colorJ2;

  /**
   * Obtengo los valores de las fichas 
   */
  document.querySelector("#ficha1").addEventListener("click", function () {
    btnFichaJ1 = "image/ficha.png";
  });

  document.querySelector("#ficha2").addEventListener("click", function () {
    btnFichaJ1 = "image/fichaAzul.png";
  });
  document.querySelector("#ficha3").addEventListener("click", function () {
    btnFichaJ1 = "image/fichaRoja.png";
  });

  document.querySelector("#ficha4").addEventListener("click", function () {
    btnFichaJ2 = "image/ficha.png";
  });
  document.querySelector("#ficha5").addEventListener("click", function () {
    btnFichaJ2 = "image/fichaAzul.png";
  });
  document.querySelector("#ficha6").addEventListener("click", function () {
    btnFichaJ2 = "image/fichaRoja.png";
  });


  /**
   * Inicio el Juego
   */
  let btnJugar = document.querySelector("#jugar");
  btnJugar.addEventListener("click", (e) => {
    iniciar();
  });

  function iniciar() {
    let tam = getDimensiones();
    let fila = tam[0];
    let col = tam[1];
    fichasJ1 = [];
    fichasJ2 = [];
    cantFichas = (fila * col) / 2;

    colorJ1 = document.querySelector("#colorJ1").value;
    colorJ2 = document.querySelector("#colorJ2").value;

    //ficha1 = document.querySelector("#ficha-2").value;
    //ficha2 = document.querySelector("#ficha-3").value;
    j1_o_j2 = obtenerValor();

    jugador1 = document.querySelector("#jugador1").value; //esta
    jugador2 = document.querySelector("#jugador2").value; //esta

    tablero = new Tablero(canvas, ctx, fila, col, jugador1, jugador2);
    tablero.crearTablero();
    tablero.nombreIndice(j1_o_j2, jugador1, jugador2);

    crearFichasJ1(30, 340, colorJ1, cantFichas);
    crearFichasJ2(680, 340, colorJ2, cantFichas);
  }

  /*
   *Éste metodo transformo los values del select del html
   *Parse c/ cadena de caracter lo convierto en entero
   
   *ej value="5x6"
   */
  function getDimensiones() {
    let select = document.querySelector(".dimensiones");
    let dimensiones = [];
    let value = select.value;
    let cant_filas = parseInt(value.charAt(0), 10); //tomo el valor 5 del ejemplo anterior
    let cant_col = parseInt(value.charAt(2), 10); //tomo el valor 6 del ejemplo anterior
    dimensiones.push(cant_filas); //agrego al array 
    dimensiones.push(cant_col); //agrego al array 
    return dimensiones;
  }

  /**
   * Éste metodo de da un valor aleatorio entre 1 y 2
   * Si es 1 lo retorno como true sino false
   * Uso este metodo para establecer turnos aleatorios a los jugadores
   */
  function obtenerValor() {
    btnJugar.setAttribute("disabled", " "); //desactivo el boton de jugar
    let result = Math.floor(Math.random() * 2 + 1);

    if (result == 1) {
      return (turno = true);
    } else {
      return (turno = false);
    }
  }


  //---------------------------------------------------------------------------------------------
  //--------------------------------------- CREAR FICHAS ----------------------------------------
  //---------------------------------------------------------------------------------------------

  /*
   * Creo 2 arreglos globales "fichasJ1" y "fichasJ2"
   * Los siguientes metodos cran hacen un NEW de la Ficha
   * y esas fichas se van agregando a sus respectivos array
   */
  function crearFichasJ1(x, y, color, cantFichas) {
    let turnoJugador1; // alternar turnos para fichas
    if (j1_o_j2 === true) {
      //reutlizo el metodo que sortea el turno
      turnoJugador1 = true; // alternar turnos para fichas
    } else {
      turnoJugador1 = false;
    }

    let img = new Image();
    img.src = btnFichaJ1;
    img.onload = function () {
      //Fichas para el jugador 1
      let decremetoX = 15;
      for (let i = 1; i <= cantFichas; i++) {
        fichasJ1[i - 1] = new Ficha(
          x + Math.floor(Math.random() * 200 + 1), //creo una pos aletatoria de X con una max de 195px.
          y + decremetoX, // la pos Y va a ir decrementano en 15px.
          color,
          canvas,
          jugador1,
          turnoJugador1, // Esto lo preciso para los movimietos de las Fichas, donde una condicion me...
          //NO me permite mover la ficha de quien no corresponde
          tamFicha
        );

        decremetoX += 5;
        fichasJ1[i - 1].setImage(img);
        fichasJ1[i - 1].drawImage();
      }
    };
  }

  function crearFichasJ2(x, y, color, cantFichas) {
    let turnoJugador2; // alternar turnos para fichas
    if (j1_o_j2 === false) {
      //reutlizo el metodo que sortea el turno
      turnoJugador2 = true;
    } else {
      turnoJugador2 = false; // alternar turnos para fichas
    }

    let img = new Image();
    img.src = btnFichaJ2;
    img.onload = function () {
      //Fichas para el jugador 2
      let decremetoX = 15;
      for (let i = 1; i <= cantFichas; i++) {
        fichasJ2[i - 1] = new Ficha(
          x + Math.floor(Math.random() * 200 + 1),
          y + decremetoX,
          color,
          canvas,
          jugador2,
          turnoJugador2,
          tamFicha
        );

        decremetoX += 5;
        fichasJ2[i - 1].setImage(img);
        fichasJ2[i - 1].drawImage();
      }
    };
  }

   /**
   * Es éste metodo recorro todas las fichas y determino si hice....
   * Click en algunas de ellas. Si clickee dentro del radio de la misma
   */
    function clickeeFigura(x, y) {
      for (let r = 0; r < fichasJ1.length; r++) {
        if (fichasJ1[r].hit(x, y)) { //recorro las fichas y si hice click dentro de la misma la retorno
          return fichasJ1[r];
        }
      }
  
      for (let a = 0; a < fichasJ2.length; a++) {
        if (fichasJ2[a].hit(x, y)) {
          return fichasJ2[a];
        }
      }
    }

  //---------------------------------------------------------------------------------------------
  //------------------------------------ EVENTO MOUSEDOWN----------------------------------------
  //---------------------------------------------------------------------------------------------

    canvas.addEventListener("mousedown", function (e) {
      //CUANDO HAGO CLICK
      //let clicked = findClicked(e.pageX - canvas.offsetLeft, e.pageY - this.offsetTop)
      let eX = e.layerX;
      let eY = e.layerY;
      let hiceClick = clickeeFigura(eX, eY);
      let turnoJugador = hiceClick.turnoJugador;
  
      if((hiceClick != null)&&(tieneTurno == turnoJugador)&&(hayGanador == false) ){
        console.log(hiceClick.jugador)//me trae el jugador..interesantee...
        clickedFigure = hiceClick;            
    }
    });


  //---------------------------------------------------------------------------------------------
  //------------------------------------ EVENTO MOUSEDOWN----------------------------------------
  //---------------------------------------------------------------------------------------------

    canvas.addEventListener("mouseleave", function () {
      //CUANDO EL PUNTERO DEL MOUSE DEJA EL ELEMENTO SELECCIONADO
      clickedFigure = null;
    });
  






};
