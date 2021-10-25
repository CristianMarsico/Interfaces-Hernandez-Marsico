class Personaje {
  constructor(personaje) {
    this.personaje = personaje;
    this.div = document.getElementById(this.personaje);
    this.width = this.div.getBoundingClientRect().width;
    this.height = this.div.getBoundingClientRect().height;
    this.position = {top: this.div.getBoundingClientRect().top, left: this.div.offsetLeft, rigth: this.div.getBoundingClientRect().right,};
  }

  updatePosition() {
    this.position.top = this.div.getBoundingClientRect().top;
    this.position.left = this.div.offsetLeft;
    this.position.right = this.div.getBoundingClientRect().right;
  }
  
  
  stopAnimation(){
    this.div.style.animationPlayState = 'paused';
  }
  
  playAnimation(){
    this.div.style.animationPlayState = 'running';
  }
  
}