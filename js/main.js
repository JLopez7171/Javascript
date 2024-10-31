function esta_vacio(variable) {
    if (!variable || variable.trim() == "") {
        return true
    }
}
function es_igual(var1, var2) {
    if (var1 === var2) {
        return true
    }
}
class User {
    constructor(nombre, id) {
        this.nombre_de_usuario = nombre;
        this.id = id;
        this.saldo_pesos = 0;
    }
    getSaldo_pesos() {
        return this.saldo_pesos;
    }
    setSaldo_pesos(monto) {
        this.saldo_pesos = this.saldo_pesos + monto;
    }
    getDatos() {
        return this.nombre_de_usuario, this.id, this.saldo_pesos;
    }
}
class Producto {
    constructor(nombre, modelo, marca, precio) {
        this.nombre = nombre;
        this.modelo = modelo;
        this.marca = marca;
        this.precio = precio;
    }
    sumaIva() {
        return this.precio * 1.22
    }
    vendido() {
        return true
    }
}
class Transacciones {

}
let nombre_usuario = prompt("Ingrese su nombre de usuario");
let contraseña = prompt("Ingrese su contraseña");

if (!esta_vacio(nombre_usuario) && !esta_vacio(contraseña)) {
    alert("Registro realizado con éxito");

} else {

    while (esta_vacio(nombre_usuario) || esta_vacio(contraseña)) {
        alert("No fue posible realizar el registro, inténtelo de nuevo");
        nombre_usuario = prompt("Ingrese su nombre de usuario");
        contraseña = prompt("Ingrese su contraseña");
    }

    alert("Registro realizado con éxito");

}
alert("Para iniciar sesión, ingrese sus datos");

let nombre_ingresado = prompt("Ingrese su nombre de usuario");

let contraseña_ingresada = prompt("Ingrese su contraseña");

if (!es_igual(nombre_ingresado, nombre_usuario) || !es_igual(contraseña_ingresada, contraseña)) {

    while (!es_igual(nombre_ingresado, nombre_usuario) || !es_igual(contraseña_ingresada, contraseña)) {
        alert("Datos incorrectos, intentelo de nuevo");
        nombre_ingresado = prompt("Ingrese su nombre de usuario");
        contraseña_ingresada = prompt("Ingrese su contraseña");
    }

} else {
    alert("Sesión iniciada, bienvenido");
}
const usuario1 = new User(nombre_ingresado, 176322);

const productos= [];
productos.push(new Producto("Guitarra eléctrica Classic Sunburst", "Les Paul", "Gibson", 17000));
productos.push(new Producto("Guitarra eléctrica American Performer", "Stratocaster", "Fender", 115000));
productos.push(new Producto("Guitarra eléctrica Rga622xh-bk", "Super Stratocaster", "Ibanez", 91000));
productos.push(new Producto("Órgano", "Ctx800", "Casio", 17000));
productos.push(new Producto("Órgano", "Go Keys 5", "Roland", 42500));
productos.push(new Producto("Órgano", "Psrsx700", "Yamaha", 98500));
for (const iva of productos) {
    iva.sumaIva();
}

let ver_cuenta_productos = prompt("Si quiere ver el estado de su cuenta, ingrese `Cuenta`. Si quiere consultar por nuestros productos, ingrese `Productos`");

if (ver_cuenta_productos.toLowerCase() == "cuenta") {
    alert("Nombre de Usuario: " + usuario1.nombre_de_usuario + "  ID: " + usuario1.id + "  Saldo: $" + usuario1.saldo_pesos)
} else if (ver_cuenta_productos.toLowerCase() == "productos") {
    for (const producto of productos) {
        alert("Nombre: " + producto.nombre + "\nModelo: " + producto.modelo + "\nMarca: " + producto.marca + "\nPrecio: $" + producto.precio);
    }
} else {
    alert("Opción invalida")
}

let nombreProductoUsuario = prompt("Ingrese el nombre del producto que desea buscar:");

let productoUsuario = productos.filter(producto => 
    producto.nombre.toLowerCase().includes(nombreProductoUsuario.toLowerCase())
);

if (productoUsuario.length > 0) {

    productoUsuario.forEach(producto => {
        alert("Nombre: " + producto.nombre + "\nMarca: " + producto.marca + "\nPrecio: $" + producto.precio);
    });
} else {
    alert("No se encontraron productos con ese nombre");
}







