class Moneda extends Personaje {
    constructor(money) {
      super(money);
      this.moneda = document.getElementById("moneda");
    }

    init() {
     
        setTimeout(() => {
          this.div.classList.add('moneda');
        }, 800);  //Es el tiempo que tarda en salir la moneda a la pantalla
      }
      
      
      stop() { 
        this.div.classList.remove('moneda');//Cuando el avatar pierde quito la clase
      }

      stopAnimation(){
        this.div.style.animationPlayState = 'paused';
      }

      playAnimation(){
        this.div.style.animationPlayState = 'running';
      }
  
  }