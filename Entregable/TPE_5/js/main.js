'use strict'

/**
 * =============== ME GUSTA PUBLICACIONES ===============
 */

let btn_menu_more_1 = document.querySelector('#boton-menu-more-1');
let menu_more_1 = document.querySelector('#menu-more-1');
let btn_menu_more_2 = document.querySelector('#boton-menu-more-2');
let menu_more_2 = document.querySelector('#menu-more-2');
let btn_menu_more_3 = document.querySelector('#boton-menu-more-3');
let menu_more_3 = document.querySelector('#menu-more-3');

let puntaje_init_post_1 = 120;
let puntaje_init_post_2 = 63;
let puntaje_init_post_3 = -1;
let post_1_puntuacion = document.querySelector('#post_1_puntuacion');
let post_2_puntuacion = document.querySelector('#post_2_puntuacion');
let post_3_puntuacion = document.querySelector('#post_3_puntuacion');
let post_1_megusta_boton = document.querySelector('#post_1_megusta_boton');
let post_2_megusta_boton = document.querySelector('#post_2_megusta_boton');
let post_3_megusta_boton = document.querySelector('#post_3_megusta_boton');
let post_1_nomegusta_boton = document.querySelector('#post_1_nomegusta_boton');
let post_2_nomegusta_boton = document.querySelector('#post_2_nomegusta_boton');
let post_3_nomegusta_boton = document.querySelector('#post_3_nomegusta_boton');
let post_1_megusta_img = document.querySelector('#post_1_megusta_img');
let post_2_megusta_img = document.querySelector('#post_2_megusta_img');
let post_3_megusta_img = document.querySelector('#post_3_megusta_img');
let post_1_nomegusta_img = document.querySelector('#post_1_nomegusta_img');
let post_2_nomegusta_img = document.querySelector('#post_2_nomegusta_img');
let post_3_nomegusta_img = document.querySelector('#post_3_nomegusta_img');

let listaMenus = [];
listaMenus[0] = menu_more_1;
listaMenus[1] = menu_more_2;
listaMenus[2] = menu_more_3;

document.addEventListener('DOMContentLoaded', ()=> {
  post_1_puntuacion.innerHTML = puntaje_init_post_1;
  post_2_puntuacion.innerHTML = puntaje_init_post_2;
  post_3_puntuacion.innerHTML = puntaje_init_post_3;
})

post_1_megusta_boton.addEventListener('click', (event) => {
  subirBajarPuntaje(post_1_puntuacion, puntaje_init_post_1, true, event);
  resaltarBoton(post_1_megusta_img);
});

post_1_nomegusta_boton.addEventListener('click', (event) => {
  subirBajarPuntaje(post_1_puntuacion, puntaje_init_post_1, false, event);
  resaltarBoton(post_1_nomegusta_img);
});

post_2_megusta_boton.addEventListener('click', (event) => {
  subirBajarPuntaje(post_2_puntuacion, puntaje_init_post_2, true, event);
  resaltarBoton(post_2_megusta_img);
});

post_2_nomegusta_boton.addEventListener('click', (event) => {
  subirBajarPuntaje(post_2_puntuacion, puntaje_init_post_2, false, event);
  resaltarBoton(post_2_nomegusta_img);
});

post_3_megusta_boton.addEventListener('click', (event) => {
  subirBajarPuntaje(post_3_puntuacion, puntaje_init_post_3, true, event);
  resaltarBoton(post_3_megusta_img);
});

post_3_nomegusta_boton.addEventListener('click', (event) => {
  subirBajarPuntaje(post_3_puntuacion, puntaje_init_post_3, false, event);
  resaltarBoton(post_3_nomegusta_img);
});

function subirBajarPuntaje(puntaje, puntajeinit, subir, event) {
  event.preventDefault();
  if(subir) {
    if((puntaje.getAttribute('megusta') == 'false')) {
      puntaje.innerHTML = puntajeinit + 1;
      puntaje.setAttribute('megusta', 'true');
      if((puntaje.getAttribute('nomegusta') == 'true'))
        puntaje.setAttribute('nomegusta', 'false');
    }
    else {
      puntaje.setAttribute('megusta', 'false');
      puntaje.innerHTML = puntajeinit;
    }
  }
  else { 
    if(puntaje.getAttribute('nomegusta') == 'false') {
      puntaje.innerHTML = puntajeinit - 1;
      puntaje.setAttribute('nomegusta', 'true');
      if((puntaje.getAttribute('megusta') == 'true'))
        puntaje.setAttribute('megusta', 'false');
    }
    else {
      puntaje.setAttribute('nomegusta', 'false');
      puntaje.innerHTML = puntajeinit;
    }
  }
}

function resaltarBoton(botonimg) {
  let nuevaImagen = botonimg.getAttribute('src');
  if(nuevaImagen.includes('_fill.svg'))
    nuevaImagen = nuevaImagen.replace("_fill.svg", ".svg");
  else
    nuevaImagen = nuevaImagen.replace(".svg", "_fill.svg");
  console.log(nuevaImagen);
  botonimg.setAttribute('src', nuevaImagen);
}

/**
 * =============== MENÚ MORE ===============
 */

btn_menu_more_1.addEventListener('click', function(event) {
  abrirMenuMore(menu_more_1, event);
});
btn_menu_more_2.addEventListener('click', function(event) {
  abrirMenuMore(menu_more_2, event);
});
btn_menu_more_3.addEventListener('click', function(event) {
  abrirMenuMore(menu_more_3, event);
});

function abrirMenuMore(menu_more, event) {
  event.preventDefault();
  if(menu_more.classList.contains('invisible')) {
    ocultarTodos();
    menu_more.classList.remove('invisible');
  }
  else
    menu_more.classList.add('invisible');
}

function ocultarTodos() {
  listaMenus.forEach(menu => {
    if(!menu.classList.contains('invisible'))
      menu.classList.add('invisible');
  });
}

function hideOnClickOutside(element) {
  const outsideClickListener = event => {
      if (!element.contains(event.target) && isVisible(element)) { // or use: event.target.closest(selector) === null
        element.style.display = 'none'
        removeClickListener()
      }
  }
  const removeClickListener = () => {
      document.removeEventListener('click', outsideClickListener)
  }
}

/**
 * =============== BÚSQUEDA AVANZADA ===============
 */


let input_buscar = document.querySelector('#input_buscar');
let busqueda_avanzada = document.querySelector('#busqueda_avanzada');

input_buscar.addEventListener("click", (event) => {
  mostrarOcultarBusquedaAvanzada(event)
});

function mostrarOcultarBusquedaAvanzada(event) {
  event.preventDefault();
  if(busqueda_avanzada.hidden)
    busqueda_avanzada.removeAttribute('hidden');
  else  
    busqueda_avanzada.setAttribute('hidden','true');
}