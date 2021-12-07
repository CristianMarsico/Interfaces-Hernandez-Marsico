'use strict'
document.addEventListener('DOMContentLoaded', () => {
  
  let valorBusqueda = document.querySelector('#valorBusqueda')

  if(valorBusqueda != null) {
    if(localStorage.getItem('valorBusqueda') != null)
      valorBusqueda.innerHTML = localStorage.getItem('valorBusqueda');
    else
      valorBusqueda.innerHTML = "búsqueda avanzada";
  }

  // mostrar u ocultar filtros aplicados
  let filtrosBusquedaAvanzada = document.querySelector('#filtrosBusquedaAvanzada');
  if(filtrosBusquedaAvanzada != null) {
    if (localStorage.getItem('busquedaAvanzada') == 'true')
      filtrosBusquedaAvanzada.removeAttribute('hidden');
    else
      if(!filtrosBusquedaAvanzada.hidden)
        filtrosBusquedaAvanzada.setAttribute('hidden', 'true');
  }

  let botones_buscar = document.querySelectorAll('.boton_lupa_busqueda');
  let input_buscar = document.querySelector('#input_buscar');
});

let boton_buscar = document.querySelector('#boton_lupa_busqueda');
let boton_busqueda_avanzada = document.querySelector('#boton_lupa_busqueda_avanzada');
let input_buscar = document.querySelector('#input_buscar');

/* ===== BARRA DE BÚSQUEDA ===== */
boton_buscar.addEventListener('click', () => {
  let valorInput = input_buscar.value;
  localStorage.removeItem('valorBusqueda');
  localStorage.setItem("valorBusqueda", valorInput);
  localStorage.setItem("busquedaAvanzada",false);
  redirigir("busqueda");
});

boton_busqueda_avanzada.addEventListener('click', () => {
  if(localStorage.getItem('valorBusqueda') != null)
    localStorage.removeItem('valorBusqueda');
  localStorage.setItem("busquedaAvanzada",true);
  redirigir("busqueda");
});

 /**
 * =============== BÚSQUEDA AVANZADA ===============
 */
let busqueda_avanzada = document.querySelector('#busqueda_avanzada');
input_buscar.addEventListener("click", (event) => {
  mostrarOcultarBusquedaAvanzada(event);
});

function mostrarOcultarBusquedaAvanzada(event) {
  event.preventDefault();
  if(busqueda_avanzada.hidden)
    busqueda_avanzada.removeAttribute('hidden');
  else  
    busqueda_avanzada.setAttribute('hidden','true');
}