"use strict";
window.onload = function () {
  let canvas = document.querySelector("#canvas");
  let ctx = canvas.getContext("2d");
  let width = canvas.width;
  let height = canvas.height;

  let tablero;
  

  let jugador1;
  let jugador2;





  let btnJugar = document.querySelector("#jugar");
  btnJugar.addEventListener("click", (e) => {
    inicial();
  });

  function inicial() {
    let tam = getDimensiones();
    let fila = tam[0];
    let col = tam[1];
   

    jugador1 = document.querySelector("#jugador1").value; //esta
    jugador2 = document.querySelector("#jugador2").value; //esta

    tablero = new Tablero(canvas, ctx, fila, col, jugador1, jugador2);
    tablero.crearTablero();

  }

  /**
   *Éste metodo transformo los values del select del html
   *Parse c/ cadena de caracter lo convierto en entero
   *ej value="5x6"
   */
  function getDimensiones() {
    let select = document.querySelector(".dimensiones");
    let dimensiones = [];
    let value = select.value;
    let cant_filas = parseInt(value.charAt(0), 10); //tomo el valor 5
    let cant_col = parseInt(value.charAt(2), 10); //tomo el valor 6
    dimensiones.push(cant_filas); //agrego al array (linea 122)
    dimensiones.push(cant_col); //agrego al array (linea 122)
    return dimensiones;
  }





};