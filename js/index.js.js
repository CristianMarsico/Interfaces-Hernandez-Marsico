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

   //-------------------------------CANVAS EDITABLE (LADO DER)-------------------------------------
 let canvasEditable = document.querySelector("#canvasEditable");
 let ctxEditable = canvasEditable.getContext("2d"); //contexto para la superficie de dibujo
 let widthEditable = canvasEditable.width;
 let heightEditable = canvasEditable.height;

 //dejo el canvas en blanco
 let matrizEditable = ctxEditable.getImageData(0, 0, widthEditable, heightEditable);
 let imagenSecundaria = limpiar(matrizEditable);
 ctxEditable.putImageData(imagenSecundaria, 0, 0);
 //--------------------------------------------------------------------------------------------//

 //------------------------------------------BOTONES---------------------------------------------
 /*
  * BOTON GRIS
  */
 document.querySelector("#btnGris").addEventListener("click", (e) => {
  let imagenEditada = obtenerGrises();
  ctxEditable.putImageData(imagenEditada, 0, 0);
});
//--------------------------------------------------------------------------------------------//


//------------------------------------FUNCION COLORES-------------------------------------------
  /*
   *FUNCION PARA COLOR GRIS 
   */
   function obtenerGrises(){
    let matriz = ctx.getImageData(0, 0, width, height);
    for(let i = 0; i < width; i++){
      for(let j = 0; j < height; j++){
        let pixel = obtenerPixel(matriz, i, j);
        let valor = Math.floor((pixel[0] + pixel[1] + pixel[2]) / 3);
        let tamanio = verificarTamanio(valor);
        let r = tamanio;
        let g = tamanio;
        let b = tamanio;
        let a = 255;
        editarPixel(matriz, i, j , r, g, b , a);
      }
    }
    return matriz;
  }

  //-------------------------------------VERIFICAR TAMAÑO---------------------------------------
  function verificarTamanio(tamanio){
    if(tamanio > 255){
      tamanio = 255;  
    }

    if(tamanio < 0){
        tamanio = 0;
    }
    return tamanio;
  }
  //-------------------------------------------------------------------------------------------//

  //------------------------------------> FUNCION LIMPIAR <-------------------------------------
  function limpiar(imagen) {
    for (let x = 0; x < height; x++) {
      for (let y = 0; y < width; y++) {
        let red = 255;
        let green = 255;
        let blue = 255;
        let alpha = 255;
        editarPixel(imagen, x, y, red, green, blue, alpha);
      }
    }
    return imagen;
  }
  //-------------------------------------------------------------------------------------------//

  //-------------------------------------EDITAR PIXELES DEL CANVAS-----------------------------
  function editarPixel(imageData, x, y, r, g, b, a) {
    let index = (x + y * imageData.height) * 4;//convierto la matriz en un array
    imageData.data[index] = r;
    imageData.data[index + 1] = g;
    imageData.data[index + 2] = b;
    imageData.data[index + 3] = a;
  }
  //-------------------------------------------------------------------------------------------//

   //-----------------------------------OBTENER PIXELES DEL CANVAS-------------------------------
   function obtenerPixel(imageData, x, y) {
    let index = (x + y * imageData.height) * 4; //convierto la matriz en un array
    let r = imageData.data[index + 0];
    let g = imageData.data[index + 1];
    let b = imageData.data[index + 2];
    let a = imageData.data[index + 3];

    return [r,g,b,a];
  }
  //-------------------------------------------------------------------------------------------//
  
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
