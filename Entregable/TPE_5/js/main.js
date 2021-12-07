'use strict'

/**
 * ============= BOTONES MENÚ MORE ============
 */

 let btn_menu_more_1 = document.querySelector('#boton-menu-more-1');
 let menu_more_1 = document.querySelector('#menu-more-1');
 let btn_menu_more_2 = document.querySelector('#boton-menu-more-2');
 let menu_more_2 = document.querySelector('#menu-more-2');
 let btn_menu_more_3 = document.querySelector('#boton-menu-more-3');
 let menu_more_3 = document.querySelector('#menu-more-3');
 let btn_menu_more_anuncio = document.querySelector('#boton-menu-more-anuncio');
 let menu_more_anuncio = document.querySelector('#menu-more-anuncio');
 let listaMenus = [];
listaMenus[0] = menu_more_1;
listaMenus[1] = menu_more_2;
listaMenus[2] = menu_more_3;
if(menu_more_anuncio != null) {
  listaMenus[3] = menu_more_anuncio;
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
if(btn_menu_more_anuncio != null) {
  btn_menu_more_anuncio.addEventListener('click', function(event) {
    abrirMenuMore(menu_more_anuncio, event);
  });
}

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