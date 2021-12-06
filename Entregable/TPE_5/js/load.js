let formularios = document.querySelector('#registro');

let btn_login = document.querySelector('#btn-login');
let btn_reg = document.querySelector('#btn-reg');
let btn_logout = document.querySelector('#btn-logout');

if(btn_login != null) {
    btn_login.addEventListener("click", function(){
    redirigir("posts");
    });
    btn_reg.addEventListener("click", function(){
        redirigir("posts");
    });
}
if(btn_logout != null) {
    btn_logout.addEventListener("click", function() {
        redirigir("login");
    })
}

function redirigir(seccion){
    // Ocultar todo
  ocultarTodo();
    
  let contenedorLoad = document.querySelector("#contenedor-load")
  if(contenedorLoad.classList.contains('oculto'))
    contenedorLoad.classList.remove('oculto');
  let direccion = seccion + ".html";
   setTimeout(function () {
     window.location.href = direccion;
   }, 1300);
}

function ocultarTodo() {
    document.querySelector(".container").style.display = "none";
    document.querySelector('#footer').style.display = "none";
    if(document.querySelector('#nav')) {
        document.querySelector('#nav').style.display = "none";
    }
    if(document.querySelector('#body-chat'))
      document.querySelector('#body-chat').style.display = "none";
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

