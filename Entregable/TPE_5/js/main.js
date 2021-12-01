'use strict'

let btn_menu_more_1 = document.querySelector('#boton-menu-more-1');
let menu_more_1 = document.querySelector('#menu-more-1');
let btn_menu_more_2 = document.querySelector('#boton-menu-more-2');
let menu_more_2 = document.querySelector('#menu-more-2');

let listaMenus = [];
listaMenus[0] = menu_more_1;
listaMenus[1] = menu_more_2;

btn_menu_more_1.addEventListener('click', function(event) {
  abrirMenuMore(menu_more_1, event);
});
btn_menu_more_2.addEventListener('click', function(event) {
  abrirMenuMore(menu_more_2, event);
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