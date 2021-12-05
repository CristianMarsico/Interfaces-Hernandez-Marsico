let bienvenida_mensajes = document.querySelector('#bienvenida_mensajes');
let boton_chat_usuario = document.querySelector('#boton_chat_usuario');
let notificacion_usuario = document.querySelector('#notificacion_usuario');
let seccion_chat = document.querySelector('#seccion_chat');

boton_chat_usuario.addEventListener('click', (event) => {
  abrirChatUsuario(event);
});

function abrirChatUsuario(event) {
  event.preventDefault();
  if(seccion_chat.hidden) {
    bienvenida_mensajes.setAttribute('hidden','true');
    notificacion_usuario.setAttribute('hidden','true');
    seccion_chat.removeAttribute('hidden');
    document.querySelector('#usuario-chat').classList.add('chat-seleccionado');
  }
}

let sobre_mensajes = document.querySelector('#imagen_sobre');
let tienes_msj_nuevos = document.querySelector('#tienes_msj_nuevos');
sobre_mensajes.addEventListener('click', leerTodosLosMensajes);

function leerTodosLosMensajes() {
  let nuevoNombre = sobre_mensajes.getAttribute('src');
  nuevoNombre = nuevoNombre.replace("_msjnuevos.svg", "_sinmsj.svg");
  sobre_mensajes.setAttribute('src', nuevoNombre);
  tienes_msj_nuevos.innerHTML = 'No tienes mensajes nuevos.';
  document.querySelectorAll('.notificacion').forEach((item) => {
    item.setAttribute('hidden','true');
  })
}

let boton_enviar_mensaje = document.querySelector('#boton_enviar_mensaje');
let textarea_mensaje = document.querySelector('#textarea_mensaje');
textarea_mensaje.addEventListener('input', () => {
  boton_enviar_mensaje.classList.add('listo-para-enviar');
  if(textarea_mensaje.value == '')
    boton_enviar_mensaje.classList.remove('listo-para-enviar');
});
/*
textarea_mensaje.addEventListener('change', () => {
  if(textarea_mensaje.value == '')
    boton_enviar_mensaje.classList.remove('listo-para-enviar');
});
*/