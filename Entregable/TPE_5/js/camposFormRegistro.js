document.getElementById("btnRegistrar").addEventListener("click", ()=> {
    document.getElementById("sectionL").classList.add("sectionOculta");
    document.getElementById("sectionR").classList.remove("sectionOculta");
});


document.getElementById("iniSec").addEventListener("click", ()=> {
    document.getElementById("sectionR").classList.add("sectionOculta");
    document.getElementById("sectionL").classList.remove("sectionOculta");
});


document.getElementById("btn-reg").addEventListener("click", ()=> {
    
    // localStorage.setItem('existe_nombre', 'false');
    let userName = document.getElementById("inputUsuario");
    let nombre_usuario = document.getElementById("error_nombre");
    console.log(nombre_usuario.getAttribute('existe-nombre'));
    
    /*  EJEMPLO DE QUE EXISTA UN USUARIO CON EL MISMO NOMBRE  */
    if(userName.value == "c"){
        nombre_usuario.classList.remove("mensajeInputOculto");
        userName.classList.add("error");
        nombre_usuario.innerHTML = "*Nombre de usuario ya existente. Por favor ingrese otro";
    }else{
        userName.classList.remove("error");
        nombre_usuario.classList.remove("mensajeInput");
        nombre_usuario.classList.add("mensajeInputOculto");
        nombre_usuario.setAttribute('existe-nombre','true');
        redirigir("posts");
    }
   
});


