class Crow extends Personaje {
  constructor(domId) {
    super(domId);
    //this.init();
  }

  init() {
    setTimeout(() => {
      this.div.classList.add("crowMove");
    }, 1800); //Es el tiempo que tarda en salir el cuervo a la pantalla
  }
  stop() {
    //Cuando el avatar pierde quito la clase
    this.div.classList.remove("crowMove");
  }
}
