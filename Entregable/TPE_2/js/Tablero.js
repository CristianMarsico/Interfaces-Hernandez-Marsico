class Tablero {
  constructor(canvas, ctx, fila, col, jugadores) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.fila = fila;
    this.col = col;

    this.jugador1 = jugador1;
    this.jugador2 = jugador2;

    this.tamFicha = 50;
    this.punto = "#862";

    this.img = new Image();
    this.img.src = "image/contenedor4.png";

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
  //-----------------------------------CREO LOS NOMBRES  ------------------------------------------
  //---------------------------------------------------------------------------------------------
  nombreIndice(turn, j1, j2) {
    if (turn == true) {
      this.drawPlayer("PLAYER 1", j1, 10, 55);
    } else {
      this.drawPlayer("PLAYER 2", j2, 620, 55);
    }
  }

  drawPlayer(player, name, x, y) {
    //let ctx = this.canvas.getContext('2d');
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


  getFila() {
    return this.fila;
  }

  getCol() {
    return this.col;
  }
}
