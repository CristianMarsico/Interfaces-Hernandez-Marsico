class Personaje {
  constructor(personaje) {
    this.personaje = personaje;
    this.div = document.getElementById(this.personaje);
    this.width = this.div.getBoundingClientRect().width;
    this.height = this.div.getBoundingClientRect().height;
    this.position = {top: this.div.getBoundingClientRect().top, left: this.div.offsetLeft};
  }

  updatePosition() {
    this.position.top = this.div.getBoundingClientRect().top;
    this.position.left = this.div.offsetLeft;
  }
}
