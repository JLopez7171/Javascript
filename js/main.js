function esta_vacio(variable){
    if(!variable || variable.trim()==""){
        return true
    }
}
function es_igual(var1, var2){
    if(var1===var2){
        return true
    }
}
let nombre_usuario = prompt("Ingrese su nombre de usuario");
let contraseña = prompt("Ingrese su contraseña");

if (!esta_vacio(nombre_usuario) && !esta_vacio(contraseña)){
    alert("Registro realizado con éxito");

} else {

    while (esta_vacio(nombre_usuario) || esta_vacio(contraseña)) {
        alert("No fue posible realizar el registro, inténtelo de nuevo");
        nombre_usuario = prompt("Ingrese su nombre de usuario");
        contraseña = prompt("Ingrese su contraseña");
    }

    alert("Registro realizado con éxito");

}
alert("Para iniciar sesión, ingrese sus datos")

let nombre_ingresado= prompt("Ingrese su nombre de usuario")

let contraseña_ingresada= prompt("Ingrese su contraseña")

if(!es_igual(nombre_ingresado, nombre_usuario) || !es_igual(contraseña_ingresada, contraseña)){

    while(!es_igual(nombre_ingresado, nombre_usuario) || !es_igual(contraseña_ingresada, contraseña)){
        alert("Datos incorrectos, intentelo de nuevo")
        nombre_ingresado= prompt("Ingrese su nombre de usuario")
        contraseña_ingresada= prompt("Ingrese su contraseña")
    }

}else{
    alert("Sesión iniciada, bienvenido")
}


