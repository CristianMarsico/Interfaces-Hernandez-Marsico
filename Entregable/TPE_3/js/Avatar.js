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
 
}
