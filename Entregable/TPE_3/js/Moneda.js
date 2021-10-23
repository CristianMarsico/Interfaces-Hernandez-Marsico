class Moneda extends Personaje {
    constructor(domId) {
      super(domId);
      this.moneda = document.getElementById("moneda");
    }

    init() {
     
        setTimeout(() => {
          this.div.classList.add('moneda');
        }, 800);  //Es el tiempo que tarda en salir el cuervo a la pantalla
      }
      stop() { //Cuando el avatar pierde quito la clase
        this.div.classList.remove('moneda');
      }
  }