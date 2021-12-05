
let formularios = document.querySelector('#registro');

let btn_login = document.querySelector('#btn-login');

// document.getElementById("capa").style.background ='url("./img/images_login/a.png") ';
// document.getElementById("capa2").style.background ='url("./img/images_login/b.png") ';
// document.getElementById("capa3").style.background ='url("./img/images_login/images(2).jpg") ';


// document.getElementById("capad").style.background ='url("./img/images_login/a.png") ';

btn_login.addEventListener("click", function(){
  redirigir("posts");
});

function redirigir(seccion){
  document.querySelector(".container").style.display = "none";
  if(document.querySelector(".contenedor-load-flex").getAttribute('hidden'));
      document.querySelector(".contenedor-load-flex").removeAttribute('hidden');
  document.querySelector(".load").style.display = "block";
  let direccion = seccion + ".html";
   setTimeout(function () {
     window.location.href = direccion;
   }, 1300);
}

// animate input
document.querySelectorAll('.input-animado').forEach(e => {
    let input = e.querySelector('input');
    let button = e.querySelector('button');

    input.onkeyup = () => {
        if (input.value.trim().length > 0) {
            e.classList.add('active');
        } else {
            e.classList.remove('active');
        }

        /*activo el boton si la cantidad de caracteres es mayor a 6 */
        if (checkSigninInput()) {
            btn_login.removeAttribute('disabled');
        } else {
            btn_login.setAttribute('disabled', 'true');
        }
    }

    //mostrar-ocultar contraseña
    if (button) {
        button.onclick = () => {
            if (input.getAttribute('type') === 'text') {
                input.setAttribute('type', 'password')
                button.innerHTML = 'Mostrar'
            } else {
                input.setAttribute('type', 'text')
                button.innerHTML = 'Ocultar'
            }
        }
    }
})

checkSigninInput = () => {
    let inputs = formularios.querySelectorAll('input')
    return Array.from(inputs).every(input => {
        return input.value.trim().length >= 6
    })
}

