document.addEventListener("DOMContentLoaded", () => {
    function esta_vacio(variable) {
        return !variable || variable.trim() === "";
    }

    function es_igual(var1, var2) {
        return var1 === var2;
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
            this.saldo_pesos += monto;
        }

        getDatos() {
            return `Nombre de Usuario: ${this.nombre_de_usuario}, ID: ${this.id}, Saldo: $${this.saldo_pesos}`;
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
            return this.precio * 1.22;
        }
    }

    const productos = [
        new Producto("Guitarra eléctrica Classic Sunburst", "Les Paul", "Gibson", 17000),
        new Producto("Guitarra eléctrica American Performer", "Stratocaster", "Fender", 115000),
        new Producto("Guitarra eléctrica Rga622xh-bk", "Super Stratocaster", "Ibanez", 91000),
        new Producto("Órgano", "Ctx800", "Casio", 17000),
        new Producto("Órgano", "Go Keys 5", "Roland", 42500),
        new Producto("Órgano", "Psrsx700", "Yamaha", 98500)
    ];

    productos.forEach(producto => producto.sumaIva());

    let usuarioRegistrado = null;

    function registrarUsuario() {
        const nombre_usuario = document.getElementById('nombre_usuario').value;
        const contraseña = document.getElementById('contraseña').value;

        if (!esta_vacio(nombre_usuario) && !esta_vacio(contraseña)) {
            usuarioRegistrado = new User(nombre_usuario, Math.floor(Math.random() * 1000000));
            localStorage.setItem("usuarioRegistrado", JSON.stringify(usuarioRegistrado));

            alert("Registro realizado con éxito");
            document.getElementById("registro").classList.add("display_none");
            document.getElementById("inicio_sesion").classList.remove("display_none");
        } else {
            alert("Por favor, complete todos los campos.");
        }
    }

    function iniciarSesion() {
        const nombre_ingresado = document.getElementById('nombre_ingresado').value;
        const contraseña_ingresada = document.getElementById('contraseña_ingresada').value;
        const usuarioGuardado = JSON.parse(localStorage.getItem("usuarioRegistrado"));

        if (usuarioGuardado && es_igual(nombre_ingresado, usuarioGuardado.nombre_de_usuario) && es_igual(contraseña_ingresada, document.getElementById('contraseña').value)) {
            usuarioRegistrado = new User(usuarioGuardado.nombre_de_usuario, usuarioGuardado.id);
            usuarioRegistrado.saldo_pesos = usuarioGuardado.saldo_pesos;

            alert("Sesión iniciada, bienvenido");
            document.getElementById("inicio_sesion").classList.add("display_none");
            document.getElementById("opciones_usuario").classList.remove("display_none");
        } else {
            alert("Datos incorrectos, intentelo de nuevo");
        }
    }

    function verCuenta() {
        const datosCuenta = document.getElementById("datos_cuenta");
        datosCuenta.textContent = usuarioRegistrado.getDatos();
        document.getElementById("informacion_cuenta").classList.remove("display_none");
    }

    function depositarSaldo() {
        let monto = parseFloat(prompt("Ingrese el monto a depositar en su cuenta:"));
        if (!isNaN(monto) && monto > 0) {
            usuarioRegistrado.setSaldo_pesos(monto);

            localStorage.setItem("usuarioRegistrado", JSON.stringify(usuarioRegistrado));

            document.getElementById("datos_cuenta").textContent = usuarioRegistrado.getDatos();
            alert("Depósito realizado con éxito.");
        } else {
            alert("Monto no válido. Por favor, ingrese un número válido.");
        }
    }

    function verProductos() {
        const productosLista = document.getElementById("productos_lista");
        productosLista.innerHTML = "<h3>Lista de Productos</h3>";
        productos.forEach(producto => {
            productosLista.innerHTML += `
                <p>Nombre: ${producto.nombre} - Modelo: ${producto.modelo} - Marca: ${producto.marca} - Precio: $${producto.precio}</p>
            `;
        });
        productosLista.classList.remove("display_none");
    }

    document.querySelector("#registro button").addEventListener("click", registrarUsuario);
    document.querySelector("#inicio_sesion button").addEventListener("click", iniciarSesion);
    document.getElementById("btn_ver_cuenta").addEventListener("click", verCuenta);
    document.getElementById("btn_ver_productos").addEventListener("click", verProductos);
    document.querySelector("#informacion_cuenta button").addEventListener("click", depositarSaldo);
});
