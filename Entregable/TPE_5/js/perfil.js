'use strict'

let pestana_personal = document.querySelector('#pestana_personal');
let pestana_publicaciones = document.querySelector('#pestana_publicaciones');
let pestana_galeria = document.querySelector('#pestana_galeria');

let div_personal = document.querySelector('#div_personal');
let div_publicaciones = document.querySelector('#div_publicaciones');
let div_galeria = document.querySelector('#div_galeria');

let arregloDivs = [];
arregloDivs[0] = div_personal;
arregloDivs[1] = div_publicaciones;
arregloDivs[2] = div_galeria;

pestana_personal.addEventListener('click', () => {
  mostrarSeccion(div_personal);
});
pestana_publicaciones.addEventListener('click', () => {
  mostrarSeccion(div_publicaciones);
});
pestana_galeria.addEventListener('click', () => {
  mostrarSeccion(div_galeria);
});

function mostrarSeccion(div_a_mostrar) {
  arregloDivs.forEach(div_arreglo => {
    if(div_arreglo.innerHTML != div_a_mostrar.innerHTML) {
      if(!div_arreglo.classList.contains('oculto')) 
          div_arreglo.classList.add('oculto');
    }
  });
  if(div_a_mostrar.classList.contains('oculto'))
    div_a_mostrar.classList.remove('oculto');
}