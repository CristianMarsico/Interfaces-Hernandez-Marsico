"use strict";

document.addEventListener("DOMContentLoaded", function (e) {

  //-------------------------------CANVAS PRINCIPAL (LADO IZQ)------------------------------------
  let canvasPricipal = document.querySelector("#canvasPrincipal");
  let ctx = canvasPricipal.getContext("2d");//contexto para la superficie de dibujo
  let width = canvasPricipal.width;
  let height = canvasPricipal.height;

  //dejo el canvas en blanco
  let matriz = ctx.getImageData(0, 0, width, height); //capturo la matriz
  let imagenPrincipal = limpiar(matriz); 
  ctx.putImageData(imagenPrincipal, 0, 0);
  //--------------------------------------------------------------------------------------------//

  //------------------------------------> FUNCION LIMPIAR <-------------------------------------
  function limpiar(imagen) {
    for (let x = 0; x < height; x++) {
      for (let y = 0; y < width; y++) {
        let red = 255;
        let green = 255;
        let blue = 255;
        let alpha = 255;
        setPixel(imagen, x, y, red, green, blue, alpha);
      }
    }
    return imagen;
  }
  //-------------------------------------------------------------------------------------------//

  //-------------------------------------EDITAR PIXELES DEL CANVAS-----------------------------
  function setPixel(imageData, x, y, r, g, b, a) {
    let index = (x + y * imageData.height) * 4;//convierto la matriz en un array
    imageData.data[index] = r;
    imageData.data[index + 1] = g;
    imageData.data[index + 2] = b;
    imageData.data[index + 3] = a;
  }
  //-------------------------------------------------------------------------------------------
  
  //---------------------------------CARGAR IMAGEN DESDE ORDENADOR-----------------------------
  document.querySelector("#inputFile").addEventListener("change", (e) => {
    const ARCHIVO = document.querySelector("#inputFile").files[0];
    const OBJETO = new FileReader();
    if (ARCHIVO) {
      OBJETO.readAsDataURL(ARCHIVO);
    }
    OBJETO.addEventListener(
      "load",
      (e) => {
        let imagen = new Image();
        imagen.src = OBJETO.result;
        imagen.onload = function () {
            myDrawImageMethod(imagen);
        };
      },
      false
    );
  });
  //-------------------------------------------------------------------------------------------

  //--------------------------------------DIBUJAR----------------------------------------------
  function myDrawImageMethod(imagen) {
    ctx.drawImage(imagen, 0, 0, width, height);
  }
  //-------------------------------------------------------------------------------------------


});
