class Pinche extends Personaje {
    constructor(pinche) {
      super(pinche);
      this.dropping = false;
    }
    
    init() {
      this.dropping = true;
      setTimeout(() => {
        if (this.dropping) {
          this.div.classList.add('pdrop');
          this.drop();
        }
      }, 10000);
    }


    drop() {
      const self = this;
      // this.div.style.opacity = "100%";
      const timer = setInterval(function() {
        const randomLeft = Math.floor(Math.random() * (600 - 50 + 1) + 50);
        pinche.style.left = randomLeft + 'px';
        if (!self.dropping) clearInterval(timer);
      }, 15000);
      // this.div.style.opacity = "0%";
    }
    
    stop() {
      this.dropping = false;
      this.div.classList.remove('pdrop');
    }
  }
  