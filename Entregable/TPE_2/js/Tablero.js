class Tablero {
  constructor(canvas, ctx, fila, col, jugador1, jugador2) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.fila = fila;
    this.col = col;
    this.enLinea = this.fila - 1;

    this.jugador1 = jugador1;
    this.jugador2 = jugador2;

    this.tamFicha = 50;
    this.punto = "#862";

    this.img = new Image();
    this.img.src = "image/contenedor4.png";

    this.posFicha = { f: 0, c: 0 };

    this.crearMatriz();
  }

  //---------------------------------------------------------------------------------------------
  //-----------------------------------CREO MATRIZ INICIAL---------------------------------------
  //---------------------------------------------------------------------------------------------
  crearMatriz() {
    this.mat = [this.getFila];
    for (let f = 0; f < this.getFila(); f++) {
      this.mat[f] = [];
      for (let c = 0; c < this.getCol(); c++) {
        this.mat[f][c] = null;
      }
    }
  }

  //---------------------------------------------------------------------------------------------
  //-----------------------------------CREO EL TABLERO ------------------------------------------
  //---------------------------------------------------------------------------------------------
  crearTablero() {
    let t = this; //Hago referencia a mí mismo como Objeto
    this.img.onload = function () {
      //Cargo la imagen de la ficha
      t.redibujarTablero();
    };
  }

  //Una vez creada la matriz verifico que sus valores primero sean NULL
  //Con el objetivo de poder dibujar el tablero con sus punteros.
  //Al crear la ficha, voy a entrar a este metodo pero ya sus valores NO son NULL y...
  //procede a dibujar la imagen de la Ficha
  redibujarTablero() {
    for (let f = 0; f < this.fila; f++) {
      for (let c = 0; c < this.col; c++) {
        if (this.mat[f][c] != null) {
          this.mat[f][c].drawImage();
        }
      }
    }
    // hago los indicadores del tablero por cada filas (Los puntos de arriba)
    for (let i = 0; i < this.col; i++) {
      this.ctx.beginPath();
      this.ctx.fillStyle = this.punto;
      this.ctx.arc(275 + this.tamFicha * i, 180, 10, 0, 2 * Math.PI);
      this.ctx.closePath();
      this.ctx.fill();
    }
    //Establezco un patron
    //Dibujo el tablero
    let miPatron = this.ctx.createPattern(this.img, "repeat");
    this.ctx.fillStyle = miPatron;
    this.ctx.fillRect(
      250,
      200,
      this.tamFicha * this.col,
      this.tamFicha * this.fila
    );
  }

  //---------------------------------------------------------------------------------------------
  //-----------------------------------CREO LOS NOMBRES  ----------------------------------------
  //---------------------------------------------------------------------------------------------
  /**
   *Me determina quien es el jugador que tiene el turno
   * Dependiendo la condicion es el valor que se imprime en el canvas
   */
  nombreIndice(turn, j1, j2) {
    if (turn == true) {
      this.drawPlayer("PLAYER 1", j1, 150, 50);
    } else {
      this.drawPlayer("PLAYER 2", j2, 550, 50);
    }
  }

  drawPlayer(player, name, x, y) {
    /* Dibujando texto relleno y con contorno */
    this.ctx.beginPath(); // Inicializamos una ruta
    this.ctx.lineCap = "butt"; // Trazo sin terminaciones
    this.ctx.lineWidth = 4; // Trazo de 1 pixeles de ancho
    this.ctx.strokeStyle = "#000000"; // Azul
    this.ctx.fillStyle = "#F3E00B"; // Amarillo
    this.ctx.font = "45px Verdana"; // Establecemos la tipografía
    this.ctx.strokeText(player, x, y);
    this.ctx.fillText(player, x, y);
    this.ctx.strokeText(name, x + 40, y + 50);
    this.ctx.fillText(name, x + 40, y + 50);
    this.ctx.closePath();
  }

  mensajeGanador(clickedFigure, hayGanador) {
    if (hayGanador == true) {
      let msjGanador = document.querySelector("#win");
      let c = clickedFigure.color;

      msjGanador.style.display = "none";
      let jugadorGanador = clickedFigure.jugador;
      msjGanador.innerHTML = "EL GANADOR ES \n" + jugadorGanador + " !";
      msjGanador.style = `background : ${c}`;
      this.ctx.beginPath();
      this.ctx.strokeStyle = "#fafafa";
      this.ctx.fillStyle = "#fafafa";
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      //----------------------------------
      this.ctx.fillStyle = `${c}`;
      this.ctx.font = "20px Verdana";
      this.ctx.textAlign = "center";
      this.ctx.fillText(
        "Hay Ganador!!!",
        this.canvas.width / 2,
        this.canvas.height / 5
      );
      this.ctx.fillText(
        "FELICITACIONES " + jugadorGanador + "!!!",
        this.canvas.width / 2,
        this.canvas.height / 4
      );
      this.ctx.closePath();
    }
  }

  msjFinTiempo(){
    this.ctx.beginPath(); 
       this.ctx.strokeStyle = "#000000";
       this.ctx.fillStyle="#000000";
      this.ctx.font = "20px Verdana";
       this.ctx.textAlign = "center";
       this.ctx.fillText("Mala suerte...", this.canvas.width/2, this.canvas.height/5); 
       this.ctx.fillText("Se agotó el tiempo !!!",this.canvas.width/2, this.canvas.height/4);
       this.ctx.closePath();
 }

  //---------------------------------------------------------------------------------------------
  //-------------------------VERIFICACION E INGRESO DE FICHAS------------------------------------
  //---------------------------------------------------------------------------------------------

  puedoIngresarFicha(clickedFigure) {
    //console.log("puedo ingresar ficha")
    //le paso una ficha
    let ubicacionX = clickedFigure.posX + this.tamFicha / 2; //
    let ubicacionY = clickedFigure.posY + this.tamFicha / 2; //

    for (let i = 1; i <= this.col; i++) {
      //recorro por la cantidad de puntos
      //tengo que corroborar que el x coincida desde el centro, un poco mas
      let x_delPunto = 250 + this.tamFicha * i;
      let y_delPunto = 215;

      let distancia = Math.sqrt(
        (ubicacionX - x_delPunto) * (ubicacionX - x_delPunto) +
          (ubicacionY - y_delPunto) * (ubicacionY - y_delPunto)
      );
      //console.log(distancia)
      if (distancia < 30 && this.mat[0][i - 1] == null) {
        // distancia al tamaño de mi punto
        return i;
      }
    }
    return -1;
  }

  //El evento mouseup me genera estas funciones
  //comprobamos si podemos ingresar una Ficha en la matriz
  ingresarFicha(clickedFigure, colDeEstaFicha) {
    //meterla en la fila de la matriz si no esta vacia //desde atras para adelante
    this.posFicha.c = colDeEstaFicha;

    let finalF = this.fila - 1; //Obtengo la ultima Pos de la FILA (el maximo)

    //En 250 comienza el tablero
    //La ficha mide 50 x 50px y lo multiplico por la COL que quiero colocar la ficha
    //El resultado me da el extremo X
    let x = 250 + this.tamFicha * colDeEstaFicha;
    let y = 0;
    for (let f = finalF; f >= 0; f--) {
      //Recorro las Filas de abajo hacia arriba
      //console.log(this.mat[filaDeEstaFicha][c])

      if (this.mat[f][colDeEstaFicha - 1] == null) {
        //Crequeo que la POS este vacia
        //console.log("entro aca")
        this.mat[f][colDeEstaFicha - 1] = clickedFigure; //Asigno la Ficha seleccionada a la matriz
        this.posFicha.f = f;
        //console.log(this.posFicha.f)

        y = 250 + this.tamFicha * f;
        clickedFigure.setPos(x, y);
        break;
      }
    }
    //console.log(this.mat)
    //console.log(y)
    //console.log(clickedFigure)
  }

  //---------------------------------------------------------------------------------------------
  //-------------------------------- VERIFICACION DE GANADOR ------------------------------------
  //---------------------------------------------------------------------------------------------

  corroborarGanador() {
    let f = this.posFicha.f;
    let c = this.posFicha.c;
    //para horizontal paso fila - vertical paso col - asc y desc fila y col
    return (
      this.posHorizontal(f) || this.posVertical(c) || this.posDiagonalAsc(f, c) || this.posDiagonalDesc(f,c)
    );
  }

  /**
   *
   * Recorro la matriz en la mismas fila y voy aumentando las columnas
   * Verifico que fila y col en pos y que fila y col+1...
   *  sean distintas a null y si cumple la condicion...
   * que el color de fila y col en pos sea igual al color de fila y col+1
   */
  posHorizontal(fila) {
    let contador = 1;
    let c = 0;
    //console.log(ficha)
    //tengo que recorrer la matriz
    while (c < this.col - 1) {
      if (this.mat[fila][c] != null && this.mat[fila][c + 1] != null) {
        if (this.mat[fila][c].color == this.mat[fila][c + 1].color) {
          contador++;

          if (contador == this.enLinea) {
            return true;
          }
        } else {
          contador = 1;
        }
      } else {
        contador = 1;
      }
      c++;
    }
    return false;
  }

  /**
   *
   * Chequeo similar al anterior, la col en este caso es estatica y voy aumentando las...
   * filas en 1.
   * El que las fichas sean iguales lo determina si los colores de las mismas sean iguales.
   */
  posVertical(columna) {
    let contador = 1;
    let f = 0;
    columna = columna - 1;

    while (f < this.fila - 1) {
      if (this.mat[f][columna] != null && this.mat[f + 1][columna] != null) {
        if (this.mat[f][columna].color == this.mat[f + 1][columna].color) {
          contador++;
          //console.log("aqui"+contador)
          if (contador == this.enLinea) {
            return true;
          }
        } else {
          contador = 1;
        }
      } else {
        contador = 1;
      }
      f++;
    }
    return false;
  }

  posDiagonalAsc(f, c) {
    let contador = 1;
    c = c - 1;

    if (this.mat[f][c] == null) {
      console.log("no");
    }
    while (
      f > 0 &&
      c < this.col - 1 &&
      this.mat[f][c] != null &&
      this.mat[f - 1][c + 1] != null &&
      this.mat[f][c].color == this.mat[f - 1][c + 1].color
    ) {
      f--;
      c++;
    }

    while (f < this.fila - 1 && c > 0) {
      if (this.mat[f][c] != null && this.mat[f + 1][c - 1] != null) {
        if (this.mat[f][c].color == this.mat[f + 1][c - 1].color) {
          contador++;

          if (contador == this.enLinea) {
            console.log(contador + "cuatrooo");
            return true;
          }
        } else contador = 1;
      } else contador = 1;
      f++;
      c--;
    }
    return false;
  }

  posDiagonalDesc(f, c) {
    let contador = 1;
    c = c - 1;

    while (
      f > 0 &&
      c > 0 &&
      this.mat[f][c] != null &&
      this.mat[f - 1][c - 1] != null &&
      this.mat[f][c].color == this.mat[f - 1][c - 1].color
    ) {
      f--;
      c--;
    }

    while (f < this.fila - 1 && c < this.col - 1) {
      if (this.mat[f][c] != null && this.mat[f + 1][c + 1] != null) {
        if (this.mat[f][c].color == this.mat[f + 1][c + 1].color) {
          contador++;
          //console.log(contador)
          if (contador == this.enLinea) {
            console.log(contador + "cuatrooo");
            return true;
          }
        } else contador = 1;
      } else contador = 1;
      f++;
      c++;
    }
    return false;
  }

  //---------------------------------------------------------------------------------------------
  //------------------------------------ GETTERS/SETTER -----------------------------------------
  //---------------------------------------------------------------------------------------------

  getFila() {
    return this.fila;
  }

  getCol() {
    return this.col;
  }
}
