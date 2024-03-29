class Ficha extends Figura {
  constructor(posX, posY, color, canvas, jugador, turnoJugador, tamFicha) {
    super(posX, posY, color, canvas);
    this.tamFicha = tamFicha;
    this.jugador = jugador;
    this.turnoJugador = turnoJugador;
  }

  cargarImg() {
    let t = this; 
    this.img.onload = function () {
      t.drawImage();
    };
  }

  //---------------------------------------------------------------------------------------------
  //-----------------------------------DIBUJO LA FICHA-------------------------------------------
  //---------------------------------------------------------------------------------------------
  drawImage() {
    this.ctx.beginPath(); //Inicio el camino

    //CIRCULOS DE LAS FICHAS
    this.ctx.arc(this.posX, this.posY, 25, 0, 2 * Math.PI); //Creo un circulo del tam de la Ficha
    this.ctx.fillStyle = this.color; //Le aplico un color

    //DIBUJA LOS CIRCULOS,DE FICHAS
    this.ctx.fill();
    this.ctx.lineWidth = 1;
    this.ctx.lineCap = "round";
    this.ctx.strokeStyle = "black";
    this.ctx.stroke();
    if (this.image != null) {
      this.ctx.drawImage(
        this.image,
        this.posX - 25,
        this.posY - 25,
        25 * 2,
        25 * 2
      );
    }
    this.ctx.closePath(); //Finalizo el camino
  }

  //---------------------------------------------------------------------------------------------
  //----------------------------------------HIT--------------------------------------------------
  //---------------------------------------------------------------------------------------------
  /**
   * La coordenada del click la resto a la coordenada donde se creo la ficha tanto de X-Y
   * Al resultado lo elevo al cuadrado 
   * La suma debe ser menor que el tamaño de la ficha
   */
  hit(x, y) {
    let m = Math.pow(x - this.posX, 2) + Math.pow(y - this.posY, 2);
    return m < Math.pow(25, 2);
  }

  //---------------------------------------------------------------------------------------------
  //-----------------------------------GETTERS/SETTERS-------------------------------------------
  //---------------------------------------------------------------------------------------------
  setPos(x, y) {
    let radio = this.tamFicha / 2;

    this.posX = x - radio;
    this.posY = y - radio;
  }

  setColor(color) {
    this.color = color;
  }

  
}
