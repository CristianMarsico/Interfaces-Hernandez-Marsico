/**
 * Clase padre Ficha
 */

class Figura {
    constructor(posX, posY, color, canvas) {
        this.posX = posX;
        this.posY = posY;
        this.color = color;
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.image = null;
    }

    setColour(colour) {
        this.colour = colour;
    }
    getColour() {
        return this.colour;
    }
    setImage(image) {
        this.image = image;
    }
    getImage() {
        return this.image;
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }
}