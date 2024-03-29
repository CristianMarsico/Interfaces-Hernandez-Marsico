"use strict";

document.addEventListener("DOMContentLoaded", function (e) {
  //----------------------------------------------------------------------------------------------
  //-------------------------------CANVAS PRINCIPAL (LADO IZQ)------------------------------------
  //----------------------------------------------------------------------------------------------
  let canvasPricipal = document.querySelector("#canvasPrincipal");
  let ctx = canvasPricipal.getContext("2d"); //contexto para la superficie de dibujo
  let width = canvasPricipal.width;
  let height = canvasPricipal.height;
  
 
  let matriz = ctx.getImageData(0, 0, width, height); //capturo la imagen
  let copia = ctx.getImageData(0, 0, width, width);

   //dejo el canvas en blanco
  let imagenPrincipal = limpiar(matriz);
  let imagCopia = limpiar(copia, width, height);

  //el metodo putImageData se dibuja la informacion de pixeles en el canvas.
  ctx.putImageData(imagenPrincipal, 0, 0);
  ctx.putImageData(imagCopia, 0, 0);

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
        //setea todos los valores en blanco
        editarPixel(imagen, x, y, red, green, blue, alpha);
      }
    }
    return imagen;
  }

  //----------------------------------------------------------------------------------------------
  //-------------------------------------EDITAR PIXELES DEL CANVAS--------------------------------
  //----------------------------------------------------------------------------------------------
  function editarPixel(imageData, x, y, r, g, b, a) {
    let index = (x + y * imageData.height) * 4; //convierto la matriz en un array
    
    //cambio los valores de los pixeles por los que vienen por parametro
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
    ctx.putImageData(imagenEditada, 0, 0);//dibuja la nueva imagen en el contexto
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

    //Y para finalizar con el retorno de la funcion, 
    //el metodo putImageData se dibuja la informacion de pixeles en el canvas.
    ctx.putImageData(imagenEditada, 0, 0);//dibuja la nueva imagen en el contexto
  });

  /*
   * BOTÓN BINARIZACIÓN
   */

  document.querySelector("#btnBinarizacion").addEventListener("click", (e) => {
    let imagenEditada = binarizacion();

    //Y para finalizar con el retorno de la funcion, 
    //el metodo putImageData se dibuja la informacion de pixeles en el canvas.
    ctx.putImageData(imagenEditada, 0, 0);//dibuja la nueva imagen en el contexto
  });

  /*
   * BOTON SEPIA
   */
  document.querySelector("#btnSepia").addEventListener("click", (e) => {
    let imagenEditada = obtenerSepia();

    //Y para finalizar con el retorno de la funcion, 
    //el metodo putImageData se dibuja la informacion de pixeles en el canvas.
    ctx.putImageData(imagenEditada, 0, 0);//dibuja la nueva imagen en el contexto
  });

  /*
   * BOTON BRILLO - RANGO
   */
  document.querySelector("#btnBrillo").addEventListener("click", (e) => {
    let fuerzaBrillo = document.querySelector("#rangoBrillo").value;//obtengo el valor del brillo
    
    let imagenEditada = obtenerBrillo(fuerzaBrillo);//paso por parametro el valor del brillo

    //Y para finalizar con el retorno de la funcion, 
    //el metodo putImageData se dibuja la informacion de pixeles en el canvas.
    ctx.putImageData(imagenEditada, 0, 0);//dibuja la nueva imagen en el contexto
  });

  /*
   * BOTON REESTABLECER
   */
  document.querySelector("#btnReestablecer").addEventListener("click", (e) => {
    if (copia)
      //capturo del CONTEXTO ORIGINAL
      myDrawImageMethod(copia, copia.width, copia.height);
  });

  /*
   * BOTON NUEVO LIENZO
   */
  document.querySelector("#newCanvas").addEventListener("click", (e) => {
    limpiarCanvas();
  });

  ///////////////////////////////////////////////
  /*
   * ESPECIALES
   * BOTON BLUR
   */

  document.querySelector("#btnBlur").addEventListener("click", (e) => {
    let imagenPrincipal = ctx.getImageData(0, 0, width, height);// trae la imagen del contexto
    let imagenEditada = obtenerBlur(imagenPrincipal);
    ctx.putImageData(imagenEditada, 0, 0);
  });

  /*
   * BOTON SOBEL
   */
  document.querySelector("#btnSobel").addEventListener("click", (e) => {
    let imagenOriginal = ctx.getImageData(0, 0, width, height);// trae la imagen del contexto
    let img = Sobel(imagenOriginal);
    ctx.putImageData(img, 0, 0);
  });

  /*
   * BOTON SATURACION - RANGO
   */
  document.querySelector("#btnSatur").addEventListener("click", (e) => {
    let mas_menos = document.querySelector("#rangoSat").value;
    let imagenEditada = obtenerSaturacion(mas_menos * 0.1);
    ctx.putImageData(imagenEditada, 0, 0);
  });

  /*
   * BOTON DESCARGAR IMAGEN
   */
  let descargar = document.querySelector("#descargarCanvas");
  descargar.addEventListener("click", (e) => {
    let ubicacion = canvasPricipal.toDataURL("image/jpg");
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

     //obtenemos el path de la imagen
    let leerArchivo = new FileReader();

    //si encontramos el archivo pasamos el source para empezar a dibujar
    if (cargarImagen) {
      leerArchivo.readAsDataURL(cargarImagen);
    }
    leerArchivo.addEventListener(
      "load",
      (e) => {
        let imagen = new Image(); //creo una imagen
        imagen.src = leerArchivo.result;
        imagen.onload = function () {
          let anchoImg = imagen.width;
          let altoImg = imagen.height;
          myDrawImageMethod(imagen, anchoImg, altoImg);
        };
      },
      false
    );
  });

  /*
   * LAPIZ
   */
  lapiz.addEventListener("click", (e) => {
    dibujando = true;//cambio la variable global
    borrado = false;
    dibujarLinea();
  });

  /*
   * GOMA
   */
  goma.addEventListener("click", (e) => {
    dibujando = false;
    borrado = true;//cambio la variable global
    dibujarLinea();
  });

  //----------------------------------------------------------------------------------------------
  //--------------------------------------CARGAR IMAGEN PRICIPAL----------------------------------
  //----------------------------------------------------------------------------------------------
  function myDrawImageMethod(imagen, anchoImg, altoImg) {
    limpiarCanvas();

    //Los siguientes if son para mantener el aspecto de la imagen original
    // si la imagen tiene más alto que ancho
    //Sacamos una proporcion de la imagen en base a ancho y altura
    if (anchoImg < altoImg) {
      let proporcion = (height * 100) / altoImg;
      anchoImg = anchoImg * (proporcion / 100);
      altoImg = altoImg * (proporcion / 100);

      // si la imagen tiene más ancho que alto
    } else if (anchoImg > altoImg) {
      let proporcion = (width * 100) / anchoImg;
      anchoImg = anchoImg * (proporcion / 100);
      altoImg = altoImg * (proporcion / 100);
      
      // si la imagen tiene mismo alto que ancho
    } else {
      let proporcionAncho = (width * 100) / anchoImg;
      let proporcionAlto = (height * 100) / altoImg;
      anchoImg = anchoImg * (proporcionAncho / 100);
      altoImg = altoImg * (proporcionAlto / 100);
    }

    let origenAncho = 0;
    let origenAlto = 0;
    if (anchoImg < width) origenAncho = (width - anchoImg) / 2;
    else if (altoImg < height) origenAlto = (height - altoImg) / 2;

    //Dibujo en el canvas a imagen seleccionada
    ctx.drawImage(imagen, origenAncho, origenAlto, anchoImg, altoImg);
    copia = imagen;
  }

  //----------------------------------------------------------------------------------------------
  //---------------------------------------EVENTOS MOUSE------------------------------------------
  //----------------------------------------------------------------------------------------------
  function dibujarLinea() {
    if (!click) {
      //evento del mouse, mientras el click esté precionado hace algo
      canvasPricipal.addEventListener("mousedown", (e) => {
        ctx.beginPath(); //INICIA EL CAMINO O DIBUJO MIENTRAS EL CLICK ESTE PRECIONADO
        click = true;//cambio la variable global
      });
    }

    //evento del mouse, mientras el click esté precionado y en moviemiento
    canvasPricipal.addEventListener("mousemove", (e) => {
      if (click) {
        dibujar(e);//mientras el click esté precionado yse mueva hace una linea
      }
    });

    //evento del mouse, mientras dejo de precionar el click
    canvasPricipal.addEventListener("mouseup", (e) => {
      click = false; //cuando suelto el click cambio la variable global a false y deja de dibujar
      ctx.closePath(); //FINALIZO EL CAMINO O DIBUJO CUANDO SUELTO EL CLICK
    });

    function dibujar(e) { //el evento me da coordenadas
      let x = e.layerX; 
      let y = e.layerY;
      trazarLinea(x, y);
    }

    function trazarLinea(x, y) {
      let anchoLapiz = document.getElementById("rango").value;
      if (dibujando) {
        let color = document.getElementById("colores").value;
        ctx.strokeStyle = color;
        ctx.lineWidth = anchoLapiz;
      } else if (borrado) {
        ctx.strokeStyle = "#FFFFFF";//color de la goma
        ctx.lineWidth = 40; //seteamos manualmente el tamaño de la goma
      }
      if (click) {
        ctx.lineTo(x, y);//agrega un punto y crea una línea HASTA ese punto DESDE el último punto, sin dibujar
        ctx.stroke();//dibuja la linea definida
      }
    }
  }

  //----------------------------------------------------------------------------------------------
  //------------------------------------FUNCION COLORES-------------------------------------------
  //----------------------------------------------------------------------------------------------
  /*
   *FUNCION PARA ESCALA DE GRISES

    Funcion que aplica filtro escala de grises a una imagen.
    Se obtiene sumando los 3 colores del pixel y luego dividiendo en 3.
    Los 3 colores deben ser iguales.
   */
  function obtenerGrises() {

    matriz = ctx.getImageData(0, 0, width, height);// trae la imagen del contexto

    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        let pixel = obtenerPixel(matriz, i, j);
        let valor = Math.floor((pixel[0] + pixel[1] + pixel[2]) / 3);//saco un promedio de los pixels
        let tamanio = verificarTamanio(valor);//chequeo el tamaño
        let a = 255;
        editarPixel(matriz, i, j, tamanio, tamanio, tamanio, a);
      }
    }
    return matriz;
  }

  /*
   * FUNCION BINARIZACION

  
  El binarizado de un color se obtiene obteniendo el promedio de los 3 colores de cada pixel.
  Si el promedio es mayor a 127 este se aplica blanco, caso contrario de aplica negro
  Con el metodo EditarPixel se setea en el arreglo los nuevos valores.
   */
  function binarizacion() {
    matriz = ctx.getImageData(0, 0, width, height);// trae la imagen del contexto

    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        let pixel = obtenerPixel(matriz, i, j);
        let color = 0;
        let a = 255;
        if ((pixel[0] + pixel[1] + pixel[2]) / 3 > 127) {//si es mayor a 127 es blanco sino negro
          color = 255;
        }
        editarPixel(matriz, i, j, color, color, color, a);
      }
    }
    return matriz;
  }

  /*
   *FUNCION PARA IMAGEN EN NEGATIVO
   */
  function obtenerNegativo() {
    
    matriz = ctx.getImageData(0, 0, width, height);// trae la imagen del contexto

    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        let pixel = obtenerPixel(matriz, i, j);
        let r = 255 - pixel[0]; //le resto al maximo los valores obtenidos
        let g = 255 - pixel[1];
        let b = 255 - pixel[2];
        let a = 255;
        editarPixel(matriz, i, j, r, g, b, a);
      }
    }
    return matriz;
  }

  /*
   *FUNCION PARA IMAGEN EN TONO SEPIA

   
    Se obtiene mediante la formula de convercion a sepia
    Primero se almacenan los pixeles de la imagen en un arreglo de enteros.
    Luego se accede a cada color como si fuera una matriz doble for.
    
   */
  function obtenerSepia() {
    
    matriz = ctx.getImageData(0, 0, width, height);// trae la imagen del contexto

    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        let pixel = obtenerPixel(matriz, i, j);

        //se asigna valores a r[0] g[1] b[2] según valores obtenidos gracias a los profes
        let r = 0.393 * pixel[0] + 0.769 * pixel[1] + 0.189 * pixel[2]; 
        let g = 0.349 * pixel[0] + 0.686 * pixel[1] + 0.168 * pixel[2]; 
        let b = 0.272 * pixel[0] + 0.534 * pixel[1] + 0.131 * pixel[2];
        let a = 255;
        editarPixel(matriz, i, j, r, g, b, a);
      }
    }
  
    return matriz;
  }

  /*
   *FUNCION PARA BRILLO DE IMAGEN
    
    El brillo de un color se obtiene multiplicando el max 255 por el porcentaje de brillo.
    El rango de brillo va entre 1 y 10
   */
  function obtenerBrillo(fuerzaBrillo) {

    matriz = ctx.getImageData(0, 0, width, height);

    let mas_menos_brillo = 255 * (fuerzaBrillo * 0.1);//aunmento del brillo
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        let pixel = obtenerPixel(matriz, i, j);//me devuelve un array con 4 valores
        /**
         * PIXEL[0] ROJO, PIXEL[1] VERDE, PIXEL[2] AZUL
         * ALFA QUEDA EN 255 PREDETERMINADO
         */

        //evitamos salirnos del rango, si es menor que cero lo seteamos a cero
        //si es mayor que 255, le setamos 255 
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
   *FUNCION BLUR

    El blur de un color se obtiene mediante la suma de cada color de cada pixel 
    dividio la cantidad de pixeles adyacentes.
   */
  function obtenerBlur(imagen) {

    imagen = ctx.getImageData(0, 0, width, height);

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height - 2; y++) {
        let parteSupIzq = obtenerPixel(imagen, x, y);
        let parteSupCentro = obtenerPixel(imagen, x, y + 1);
        let parteSupDer = obtenerPixel(imagen, x, y + 2);
        let centroIzq = obtenerPixel(imagen, x + 1, y);
        let centroCentro = obtenerPixel(imagen, x + 1, y + 1);
        let centroDer = obtenerPixel(imagen, x + 1, y + 2);
        let parteInfIzq = obtenerPixel(imagen, x + 2, y);
        let parteInfCentro = obtenerPixel(imagen, x + 2, y + 1);
        let parteInfDer = obtenerPixel(imagen, x + 2, y + 2);

        //Math.floor: que redondea un número dado hacia el número entero anterior.
        //r[0], g[1], b[2]
        //Obtengo los rojos de cada vecino y el centro
        //Los sumo y los divido por el de total de los mismos
        //Redondeo un valor
        let r = Math.floor(
          (parteSupIzq[0] +
            parteSupCentro[0] +
            parteSupDer[0] +
            centroIzq[0] +
            centroCentro[0] +
            centroDer[0] +
            parteInfIzq[0] +
            parteInfCentro[0] +
            parteInfDer[0]) /
            9
        );
        //Aca uso la pos [1] para el verde    
        //Mismo procedimiento que lo anterior
        let g = Math.floor(
          (parteSupIzq[1] +
            parteSupCentro[1] +
            parteSupDer[1] +
            centroIzq[1] +
            centroCentro[1] +
            centroDer[1] +
            parteInfIzq[1] +
            parteInfCentro[1] +
            parteInfDer[1]) /
            9
        );
        //Aca uso la pos [2] para el azul    
        //Mismo procedimiento que lo anterior
        let b = Math.floor(
          (parteSupIzq[2] +
            parteSupCentro[2] +
            parteSupDer[2] +
            centroIzq[2] +
            centroCentro[2] +
            centroDer[2] +
            parteInfIzq[2] +
            parteInfCentro[2] +
            parteInfDer[2]) /
            9
        );

        let a = 255;

        //edita desde el centro de la matriz
        editarPixel(imagen, x + 1, y + 1, r, g, b, a);
      }
    }
   // ctx.putImageData(imagen, 0, 0);
    return imagen;
  }

  /*
   * FUNCION SOBEL
   */
  function Sobel(img) {

    //obtenemos la imagen
    let imagenPrincipal = ctx.getImageData(0, 0, width, height);

    for (let x = 0; x < width; x++) {
      //la recorremos pixel a pixel obteniendo los valores de alrededor
      //Nos posicionamos en el centro de la matriz
      for (let y = 0; y < height; y++) {
        let parteSupIzq = obtenerPromedio( obtenerPixel(img, x -1 , y - 1));
        
        //No es necesario porque multiplica por cero
        //let parteSupCentro = obtenerPromedio( obtenerPixel(img, x - 1, y));
        let parteSupDer = obtenerPromedio( obtenerPixel(img, x - 1, y + 1));
        
        let centroIzq = obtenerPromedio( obtenerPixel(img, x, y - 1));
        
        //No es necesario porque multiplica por cero
        //let centroCentro = obtenerPromedio( obtenerPixel(img, x + 1, y + 1));
        let centroDer = obtenerPromedio( obtenerPixel(img, x, y + 1));

        let parteInfIzq = obtenerPromedio( obtenerPixel(img, x + 1, y - 1 ));
        
        //No es necesario porque multiplica por cero
        //let parteInfCentro = obtenerPromedio( obtenerPixel(img, x + 1  , y ));
        let parteInfDer = obtenerPromedio( obtenerPixel(img, x + 1, y + 1 ));

        //multiplicamos las matrices con los valores obtenido
        /*
          MatrizY = [
            [-1,0,1],
            [-2,0,2],
            [-1,0,1]
          ]
        */
       //salteamos multiplicar los valores en cero
       //recorremos las X
        let matrizGx = ((parteSupIzq * -1) + (parteSupDer * 1)+ (centroIzq * -2) + 
                       (centroDer * 2)+ ( parteInfIzq * -1) +(parteInfDer * 1)   
                        );

        //recorremos las Y
        let matrizGy = ((parteSupIzq * -1) + (centroIzq * -2) + (parteInfIzq * -1) + 
                        (parteSupDer * 1) + (centroDer * 2) + (parteInfDer * 1) );

        //Lo siguiente aplicar la formula
        //gx al cuadrado mas gy al cuadrado (Math.pow()) y a eso le aplico la raiz
        let formula = Math.sqrt((Math.pow(matrizGx, 2) + Math.pow(matrizGy, 2) ));
        let pixel = verificarTamanio(formula);
        editarPixel(imagenPrincipal, x, y, pixel,pixel,pixel, 255);
      }
    }
    return imagenPrincipal;
  }

  /**
   * FUNCION PARA OBTENER EL PROMEDIO DE LOS PIXELES
   */
  function obtenerPromedio(p){
    let contador = 0;
    for (let i = 0; i < p.length - 1; i++) {
      contador += p[i];
    }
    return contador / p.length - 1;
  }

  /*
   *FUNCION SATURACION
   */
  function obtenerSaturacion(saturacion) {
    let matriz = ctx.getImageData(0, 0, width, height);

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        let pixeles = obtenerPixel(matriz, x, y);
        let hsv = RGV_a_HSV(pixeles[0], pixeles[1], pixeles[2], 255);
        //hsv[1] seria saturacion
        //Al mismo corresponde sumarle la saturacion que recibo por parametro
        let rgb = HSV_a_RGB(hsv[0], hsv[1] + saturacion, hsv[2]); 

        editarPixel(matriz, x, y, rgb[0], rgb[1], rgb[2], 255);
      }
    }
    return matriz;
  }

  //Hacemos la conversion de rgb a hsv 
  function RGV_a_HSV(rojo, verde, azul, a) {

    let matiz, saturac, valor;
    
    if (arguments.length === 1) {
      verde = rojo.verde;
      azul = rojo.azul; 
      rojo = rojo.rojo;
    }
    //De los rgb me quedo con el que posea el maximo valor
    let maxColor = Math.max(rojo, verde, azul);//Obtengo el Maximo

    //De los rgb me quedo con el que posea el minimo valor
    let minColor = Math.min(rojo, verde, azul);//Obtengo el Minimo

    //Para obtener Delta es la diferencia e/ Maximo y Minimo
    let delta = maxColor - minColor;

    //Preciso obtener el valor para asignarle a la saturacion
    //Dependiendo del valor del maximo color, saturacion puede tener dos valores:
    //si el maximo color es cero, le asigno cero a la saturacion
    //si el maximo color es distinto a cero, le asigno el resultado de la division delta con el maximo
    let valorMax;
    if(maxColor === 0){
      valorMax = 0;
    }else{
      valorMax = (delta / maxColor);
    }
    saturac = valorMax;

    //Los valores R , G , B se dividen por 255 para cambiar el rango de 0..255 a 0..1:
    //En este caso tomo el Maximo
    valor = maxColor / a;
    //(s = maxColor === 0 ? 0 : delta / maxColor), (v = maxColor / a);

    switch (maxColor) {
      case minColor:
        matiz = 0;
        break;

      case rojo:
        matiz = verde - azul;
        let resultado;
        //si el tamaño del verde es menor que el azul al delta lo multiplico por 6 
        //sino por cero
        if(verde < azul){
          resultado = 6;
        }else{
          resultado = 0;
        }
        matiz = matiz + delta * resultado;
        matiz = matiz / (6 * delta); //El 6 representa el modulo
        break;

      case verde:
        matiz = azul - rojo + (delta * 2);
        matiz = matiz / (6 * delta);//El 6 representa el modulo
        break;

      case azul:
        matiz = rojo - verde + (delta * 4);
        matiz = matiz / (6 * delta);//El 6 representa el modulo
        break;
    }
    return [matiz, saturac, valor];
  }

   //Hacemos la conversion de hsv a rgb 
  function HSV_a_RGB(h, s, v) {
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
   //evita salir del rango, verifica el minimo y maximo de los valores de los pixels
  function verificarTamanio(tamanio) {
    if (tamanio > 255) {
      tamanio = 255;
    }
    if (tamanio < 0) {
      tamanio = 0;
    }
    return tamanio;
  }

  function limpiarCanvas() {
    let imagenEditada = limpiar(imagenPrincipal); //aplica todos los valores del rgba a 255, lo deja en blanco
    ctx.putImageData(imagenEditada, 0, 0);
  }
});
