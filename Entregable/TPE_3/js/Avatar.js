class Avatar extends Personaje {
  constructor(domId) {
    super(domId);
  }
  
  init() {
    this.div.classList.remove('die');
    this.div.classList.add('run');
    this.div.style.display = 'block';
    this.div.style.left = '100px';
    this.div.style.bottom = '5px';
  }

  /*Metodo de salto
  Activo y dsactivo la clase en un lapso de tiempo */
  jump() {
    this.div.classList.add('jump');
    setTimeout(() => {
      this.div.classList.remove('jump');
    }, 700);
  }

  move(key) {
    this.updatePosition();
    switch (key) {
      case 37:
        this.div.style.left = this.position.left - 20 + 'px';
        break;
        
      case 39:
        this.div.style.left = this.position.left + 20 + 'px';
        break;
        
      default:
        break;
    }
  }


    /* Obtengo la posicion del div del avatar y la comparo con la posicion del obtaculo */
    checkCollision(element) {
      this.updatePosition();
      element.updatePosition();
      
  
          console.log("yo "+ this.position.left);
          console.log("araña "+ element.position.left);
  
  
  
      if (this.position.left  < element.position.left + element.width  &&
        this.position.left + this.width > element.position.left &&
        this.position.top < element.position.top + element.height &&
        this.position.top + this.height > element.position.top) {
        return true;
      }
      return false;
    }


    stop() {
      this.div.style.left = '100px';
      this.div.style.bottom = '100px';
      this.div.classList.remove('run');
    }



 
}
