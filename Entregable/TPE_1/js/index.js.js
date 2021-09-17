"use strict";

document.addEventListener("DOMContentLoaded", function (e) {
  //-------------------------------CANVAS PRINCIPAL (LADO IZQ)------------------------------------
  let canvasPricipal = document.querySelector("#canvasPrincipal");
  let ctx = canvasPricipal.getContext("2d"); //contexto para la superficie de dibujo
  let width = canvasPricipal.width;
  let height = canvasPricipal.height;
  let editado = false;

  //dejo el canvas en blanco
  let matriz = ctx.getImageData(0, 0, width, height); //capturo la matriz
  let imagenPrincipal = limpiar(matriz);
  ctx.putImageData(imagenPrincipal, 0, 0);
  //--------------------------------------------------------------------------------------------//

  //----------------------------------------------------------------------------------------------
  //-------------------------------CANVAS EDITABLE (LADO DER)-------------------------------------
  //----------------------------------------------------------------------------------------------
  let canvasEditable = document.querySelector("#canvasEditable");
  let ctxEditable = canvasEditable.getContext("2d"); //contexto para la superficie de dibujo
  let widthEditable = canvasEditable.width;
  let heightEditable = canvasEditable.height;

  //dejo el canvas en blanco
  let matrizEditable = ctxEditable.getImageData(
    0,
    0,
    widthEditable,
    heightEditable
  );
  let imagenSecundaria = limpiar(matrizEditable);
  ctxEditable.putImageData(imagenSecundaria, 0, 0);

  //--------------------------------------------------------------------------------------------//

  //----------------------------------------------------------------------------------------------
  //---------------------------------------FUNCION LIMPIAR----------------------------------------
  //----------------------------------------------------------------------------------------------
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
    editado = false;
    return imagen;
  }
  //-------------------------------------------------------------------------------------------//


  
  //----------------------------------------------------------------------------------------------
  //-------------------------------------EDITAR PIXELES DEL CANVAS--------------------------------
  //----------------------------------------------------------------------------------------------
  function editarPixel(imageData, x, y, r, g, b, a) {
    let index = (x + y * imageData.height) * 4; //convierto la matriz en un array
    imageData.data[index] = r;
    imageData.data[index + 1] = g;
    imageData.data[index + 2] = b;
    imageData.data[index + 3] = a;
  }



  //----------------------------------------------------------------------------------------------
  //-----------------------------------OBTENER PIXELES DEL CANVAS---------------------------------
  //----------------------------------------------------------------------------------------------
  function obtenerPixel(imageData, x, y) {
    let index = (x + y * imageData.height) * 4; //convierto la matriz en un array
    let r = imageData.data[index + 0];
    let g = imageData.data[index + 1];
    let b = imageData.data[index + 2];
    let a = imageData.data[index + 3];

    return [r, g, b, a];
  }



  //----------------------------------------------------------------------------------------------
  //------------------------------------------BOTONES---------------------------------------------
  //----------------------------------------------------------------------------------------------
  /*
   * BOTON GRIS
   */
  document.querySelector("#btnGris").addEventListener("click", (e) => {
    let imagenEditada = obtenerGrises();
    ctxEditable.putImageData(imagenEditada, 0, 0);
  });

  /*
   *BOTON LAPIZ Y GOMA
   */
  let lapiz = document.querySelector("#lapiz");
  let goma = document.querySelector("#goma");
  let click = false;
  let dibujando = false;
  let borrado = false;

  /*
   * BOTON NEGATIVO
   */
  document.querySelector("#btnNegativo").addEventListener("click", (e) => {
    let imagenEditada = obtenerNegativo();
    ctxEditable.putImageData(imagenEditada, 0, 0);
  });

  /*
   * BOTON SEPIA
   */
  document.querySelector("#btnSepia").addEventListener("click", (e) => {
    let imagenEditada = obtenerSepia();
    ctxEditable.putImageData(imagenEditada, 0, 0);
  });

  /*
   * BOTON BRILLO - RANGO
   */
  document.querySelector("#btnBrillo").addEventListener("click", (e) => {
    let fuerzaBrillo = document.querySelector("#rangoBrillo").value;
    let imagenEditada = obtenerBrillo(fuerzaBrillo);
    ctxEditable.putImageData(imagenEditada, 0, 0);
  });

  /*
   * BOTON REESTABLECER
   */
  document.querySelector("#btnReestablecer").addEventListener("click", (e) => {
    let imagenEditada = obtenerOriginal();
    ctxEditable.putImageData(imagenEditada, 0, 0);
  });

  /*
   * BOTON NUEVO LIENZO
   */
  document.querySelector("#newCanvas").addEventListener("click", (e) => {
    let imagenEditada = limpiar(matrizEditable);
    ctxEditable.putImageData(imagenEditada, 0, 0);
  });

  ///////////////////////////////////////////////
  /*
   *ESPECIALES
   * BOTON BLUR
   */

  document.querySelector("#btnBlur").addEventListener("click", (e) => {
    let imagenPrincipal = ctx.getImageData(0, 0, width, height);
    let imagenEditada = blur(imagenPrincipal);
    ctxEditable.putImageData(imagenEditada, 0, 0);
  });

  /*
   * BOTON SATURACION - RANGO
   */
  document.querySelector("#btnSatur").addEventListener("click", (e) => {
    let mas_menos = document.querySelector("#rangoSat").value;
    let imagenEditada = obtenerSaturacion(mas_menos * 0.1);
    ctxEditable.putImageData(imagenEditada, 0, 0);
  });

  /*
   * BOTON DESCARGAR IMAGEN
   */
  let descargar = document.querySelector("#descargarCanvas");
  descargar.addEventListener("click", (e) => {
    let ubicacion = canvasEditable.toDataURL("image/jpg");
    descargar.href = ubicacion;
  });



  //----------------------------------------------------------------------------------------------
  //---------------------------------------EVENTOS------------------------------------------------
  //----------------------------------------------------------------------------------------------
  /*
   *CARGAR IMAGEN DESDE ORDENADOR
   */
  document.querySelector("#inputFile").addEventListener("change", (e) => {
    let cargarImagen = document.querySelector("#inputFile").files[0];
    let leerArchivo = new FileReader();
    if (cargarImagen) {
      leerArchivo.readAsDataURL(cargarImagen);
    }
    leerArchivo.addEventListener(
      "load",
      (e) => {
        let imagen = new Image();
        imagen.src = leerArchivo.result;
        imagen.onload = function () {
          myDrawImageMethod(imagen);
        };
      },
      false
    );
  });

  /*
   * LAPIZ
   */
  lapiz.addEventListener("click", (e) => {
    dibujando = true;
    borrado = false;
    dibujarLinea();
  });

  /*
   * GOMA
   */
  goma.addEventListener("click", (e) => {
    dibujando = false;
    borrado = true;
    dibujarLinea();
  });


  //----------------------------------------------------------------------------------------------
  //--------------------------------------CARGAR IMAGEN PRICIPAL----------------------------------
  //----------------------------------------------------------------------------------------------
  function myDrawImageMethod(imagen) {
    ctx.drawImage(imagen, 0, 0, width, height);
  }


  //----------------------------------------------------------------------------------------------
  //---------------------------------------EVENTOS MOUSE------------------------------------------
  //----------------------------------------------------------------------------------------------
  function dibujarLinea() {
    if (!click) {
      canvasEditable.addEventListener("mousedown", (e) => {
        ctxEditable.beginPath(); //INICIA EL CAMINO O DIBUJO MIENTRAS EL CLICK ESTE PRECIONADO
        click = true;
      });
    }

    canvasEditable.addEventListener("mousemove", (e) => {
      if (click) {
        dibujar(e);
      }
    });

    canvasEditable.addEventListener("mouseup", (e) => {
      click = false;
      ctxEditable.closePath(); //FINALIZO EL CAMINO O DIBUJO CUANDO SUELTO EL CLICK
    });

    function dibujar(e) {
      let x = e.layerX;
      let y = e.layerY;
      trazarLinea(x, y);
    }

    function trazarLinea(x, y) {
      if (dibujando) {
        let color = document.getElementById("colores").value;
        let anchoLapiz = document.getElementById("rango").value;
        ctxEditable.strokeStyle = color;
        ctxEditable.lineWidth = anchoLapiz;
      } else if (borrado) {
        ctxEditable.strokeStyle = "#FFFFFF";
      }
      if (click) {
        ctxEditable.lineTo(x, y);
        ctxEditable.stroke();
      }
    }
  }


  //----------------------------------------------------------------------------------------------
  //------------------------------------FUNCION COLORES-------------------------------------------
  //----------------------------------------------------------------------------------------------
  /*
   *FUNCION PARA ESCALA DE GRISES
   */
  function obtenerGrises() {
    let matriz;
    if (!editado) {
      matriz = ctx.getImageData(0, 0, width, height);
    } else {
      matriz = ctxEditable.getImageData(0, 0, width, height);
    }
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        let pixel = obtenerPixel(matriz, i, j);
        let valor = Math.floor((pixel[0] + pixel[1] + pixel[2]) / 3);
        let tamanio = verificarTamanio(valor);
        let r = tamanio;
        let g = tamanio;
        let b = tamanio;
        let a = 255;
        editarPixel(matriz, i, j, r, g, b, a);
      }
    }
    editado = true;
    return matriz;
  }

  /*
   *FUNCION PARA IMAGEN EN NEGATIVO
   */
  function obtenerNegativo() {
    let matriz;
    if (!editado) {
      matriz = ctx.getImageData(0, 0, width, height);
    } else {
      matriz = ctxEditable.getImageData(0, 0, width, height);
    }
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        let pixel = obtenerPixel(matriz, i, j);
        let r = 255 - pixel[0];
        let g = 255 - pixel[1];
        let b = 255 - pixel[2];
        let a = 255;
        editarPixel(matriz, i, j, r, g, b, a);
      }
    }
    editado = true;
    return matriz;
  }

  /*
   *FUNCION PARA IMAGEN EN TONO SEPIA
   */
  function obtenerSepia() {
    let matriz;
    if (!editado) {
      matriz = ctx.getImageData(0, 0, width, height);
    } else {
      matriz = ctxEditable.getImageData(0, 0, width, height);
    }
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        let pixel = obtenerPixel(matriz, i, j);
        let r = pixel[0] * 0.98823529411764705882352941176471; // (252/255)
        let g = pixel[1] * 0.58431372549019607843137254901961; // (149/255)
        let b = pixel[2] * 0.17647058823529411764705882352941; // (45/255)
        let a = 255;
        editarPixel(matriz, i, j, r, g, b, a);
      }
    }
    editado = true;
    return matriz;
  }

  /*
   *FUNCION PARA BRILLO DE IMAGEN
   */
  function obtenerBrillo(fuerzaBrillo) {
    let matriz;
    if (!editado) {
      matriz = ctx.getImageData(0, 0, width, height);
    } else {
      matriz = ctxEditable.getImageData(0, 0, width, height);
    }
    let mas_menos_brillo = 255 * (fuerzaBrillo * 0.1);
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        let pixel = obtenerPixel(matriz, i, j);
        let r = verificarTamanio(pixel[0] + mas_menos_brillo);
        let g = verificarTamanio(pixel[1] + mas_menos_brillo);
        let b = verificarTamanio(pixel[2] + mas_menos_brillo);
        let a = 255;
        editarPixel(matriz, i, j, r, g, b, a);
      }
    }
    return matriz;
  }

  /*
   *FUNCION PARA RESETEAR LA IMAGEN
   */
  function obtenerOriginal() {
    return ctx.getImageData(0, 0, width, height);
  }

  /*
   *FUNCION BLUR
   */
  function blur(img) {
    if (!editado) {
      img = ctx.getImageData(0, 0, width, height);
    } else {
      img = ctxEditable.getImageData(0, 0, width, height);
    }
    let cant = 9;
    let matriz = [
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
    ];
    return obtenerBlur(matriz, cant, img);
  }

  function obtenerBlur(ma, cant, imagen) {
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        let parteSupIzq = obtenerPixel(imagen, x, y);
        let parteSupCentro = obtenerPixel(imagen, x, y + 1);
        let parteSupDer = obtenerPixel(imagen, x, y + 2);
        let centroIzq = obtenerPixel(imagen, x + 1, y);
        let centroCentro = obtenerPixel(imagen, x + 1, y + 1);
        let centroDer = obtenerPixel(imagen, x + 1, y + 2);
        let parteInfIzq = obtenerPixel(imagen, x + 2, y);
        let parteInfCentro = obtenerPixel(imagen, x + 2, y + 1);
        let parteInfDer = obtenerPixel(imagen, x + 2, y + 2);

        let r = Math.floor(
          (parteSupIzq[0] * ma[0][0] +
            parteSupCentro[0] * ma[0][1] +
            parteSupDer[0] * ma[0][2] +
            centroIzq[0] * ma[1][0] +
            centroCentro[0] * ma[1][1] +
            centroDer[0] * ma[1][2] +
            parteInfIzq[0] * ma[2][0] +
            parteInfCentro[0] * ma[2][1] +
            parteInfDer[0] * ma[2][2]) /
            cant
        );
        let g = Math.floor(
          (parteSupIzq[1] * ma[0][0] +
            parteSupCentro[1] * ma[0][1] +
            parteSupDer[1] * ma[0][2] +
            centroIzq[1] * ma[1][0] +
            centroCentro[1] * ma[1][1] +
            centroDer[1] * ma[1][2] +
            parteInfIzq[1] * ma[2][0] +
            parteInfCentro[1] * ma[2][1] +
            parteInfDer[1] * ma[2][2]) /
            cant
        );
        let b = Math.floor(
          (parteSupIzq[2] * ma[0][0] +
            parteSupCentro[2] * ma[0][1] +
            parteSupDer[2] * ma[0][2] +
            centroIzq[2] * ma[1][0] +
            centroCentro[2] * ma[1][1] +
            centroDer[2] * ma[1][2] +
            parteInfIzq[2] * ma[2][0] +
            parteInfCentro[2] * ma[2][1] +
            parteInfDer[2] * ma[2][2]) /
            cant
        );

        let a = 255;
        editarPixel(imagen, x, y, r, g, b, a);
      }
    }
    ctxEditable.putImageData(imagen, 0, 0);
    return imagen;
  }

  /*
   *FUNCION SATURACION
   */
  function obtenerSaturacion(saturacion) {
    let matriz = ctx.getImageData(0, 0, width, height);
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        let pixelRGBA = obtenerPixel(matriz, x, y);
        let hsv = rgbToHsv(pixelRGBA[0], pixelRGBA[1], pixelRGBA[2], 255);
        let rgb = HSVtoRGB(hsv[0], hsv[1] + saturacion, hsv[2]);

        editarPixel(matriz, x, y, rgb[0], rgb[1], rgb[2], 255);
      }
    }
    return matriz;
  }

  function rgbToHsv(r, g, b, a) {
    let h, s, v;
    if (arguments.length === 1) {
      (g = r.g), (b = r.b), (r = r.r);
    }
    let maxColor = Math.max(r, g, b);
    let minColor = Math.min(r, g, b);
    let delta = maxColor - minColor;
    (s = maxColor === 0 ? 0 : delta / maxColor), (v = maxColor / a);

    switch (maxColor) {
      case minColor:
        h = 0;
        break;
      case r:
        h = g - b + delta * (g < b ? 6 : 0);
        h /= 6 * delta;
        break;
      case g:
        h = b - r + delta * 2;
        h /= 6 * delta;
        break;
      case b:
        h = r - g + delta * 4;
        h /= 6 * delta;
        break;
    }
    return [h, s, v];
  }

  function HSVtoRGB(h, s, v) {
    let r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
      (s = h.s), (v = h.v), (h = h.h);
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
      case 0:
        (r = v), (g = t), (b = p);
        break;
      case 1:
        (r = q), (g = v), (b = p);
        break;
      case 2:
        (r = p), (g = v), (b = t);
        break;
      case 3:
        (r = p), (g = q), (b = v);
        break;
      case 4:
        (r = t), (g = p), (b = v);
        break;
      case 5:
        (r = v), (g = p), (b = q);
        break;
    }
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
  }



  //----------------------------------------------------------------------------------------------
  //-------------------------------------VERIFICAR TAMAÑO-----------------------------------------
  //----------------------------------------------------------------------------------------------
  function verificarTamanio(tamanio) {
    if (tamanio > 255) {
      tamanio = 255;
    }

    if (tamanio < 0) {
      tamanio = 0;
    }
    return tamanio;
  }
});
