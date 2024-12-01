class User {
    constructor(nombre_de_usuario, contraseña, id) {
        this.nombre_de_usuario = nombre_de_usuario;
        this.contraseña = contraseña;
        this.id = id;
        this.saldo_pesos = 0;
    }

    getDatos() {
        return `Nombre de Usuario: ${this.nombre_de_usuario} ID: ${this.id} Saldo: $${this.saldo_pesos}`;
    }

    setSaldo_pesos(monto) {
        this.saldo_pesos += monto;
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
        this.precio *= 1.21;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const estaVacio = (variable) => !variable || variable.trim() === "";
    const esIgual = (var1, var2) => var1 === var2;

    let usuarioRegistrado = null;

    const obtenerUsuarioRegistrado = async () => {
        const data = await new Promise((resolve) =>
            setTimeout(() => resolve(JSON.parse(localStorage.getItem("usuarioRegistrado"))), 500)
        );
        return data;
    };

    const guardarUsuarioRegistrado = async (usuario) => {
        await new Promise((resolve) =>
            setTimeout(() => {
                localStorage.setItem("usuarioRegistrado", JSON.stringify(usuario));
                resolve();
            }, 500)
        );
    };

    const registrarUsuario = async () => {
        const nombreUsuario = document.getElementById("nombre_usuario").value;
        const contraseña = document.getElementById("contraseña").value;

        if (estaVacio(nombreUsuario) || estaVacio(contraseña)) {
            Swal.fire({
                title: "Registro fallido",
                text: "Por favor, complete todos los campos",
                icon: "warning",
            });
            return;
        }

        usuarioRegistrado = new User(nombreUsuario, contraseña, Math.floor(Math.random() * 100));
        await guardarUsuarioRegistrado(usuarioRegistrado);

        Swal.fire({
            icon: "success",
            title: "Registrado correctamente",
            toast: true,
            position: "top",
            showConfirmButton: false,
            timer: 3000,
        });

        document.getElementById("registro").classList.add("display_none");
        document.getElementById("inicio_sesion").classList.remove("display_none");
    };

    const iniciarSesion = async () => {
        const nombreIngresado = document.getElementById("nombre_ingresado").value;
        const contraseñaIngresada = document.getElementById("contraseña_ingresada").value;
        const usuarioGuardado = await obtenerUsuarioRegistrado();

        if (!usuarioGuardado) {
            Swal.fire({
                title: "Error",
                text: "No hay un usuario registrado. Por favor, regístrese",
                icon: "warning",
            });
            return;
        }

        if (esIgual(nombreIngresado, usuarioGuardado.nombre_de_usuario) && esIgual(contraseñaIngresada, usuarioGuardado.contraseña)) {
            usuarioRegistrado = new User(usuarioGuardado.nombre_de_usuario, usuarioGuardado.contraseña, usuarioGuardado.id);
            usuarioRegistrado.saldo_pesos = usuarioGuardado.saldo_pesos;

            Swal.fire({
                icon: "success",
                title: "Sesión iniciada, bienvenido",
                toast: true,
                position: "top",
                showConfirmButton: false,
                timer: 3000,
            });

            document.getElementById("inicio_sesion").classList.add("display_none");
            document.getElementById("opciones_usuario").classList.remove("display_none");
        } else {
            Swal.fire({
                title: "Inicio de sesión fallido",
                text: "Datos incorrectos, inténtelo de nuevo",
                icon: "warning",
            });
        }
    };

    const verCuenta = async () => {
        if (usuarioRegistrado) {
            const datosCuenta = document.getElementById("datos_cuenta");
            datosCuenta.textContent = usuarioRegistrado.getDatos();
            document.getElementById("informacion_cuenta").classList.remove("display_none");
        } else {
            Swal.fire({
                title: "Acción fallida",
                text: "Por favor, inicie sesión para ver la cuenta",
                icon: "warning",
            });
        }
    };

    const depositarSaldo = async () => {
        const monto = parseFloat(prompt("Ingrese el monto a depositar en su cuenta:"));
        if (!isNaN(monto) && monto > 0) {
            usuarioRegistrado.setSaldo_pesos(monto);
            await guardarUsuarioRegistrado(usuarioRegistrado);

            document.getElementById("datos_cuenta").textContent = usuarioRegistrado.getDatos();
            Swal.fire({
                title: "Depósito realizado",
                text: "Depósito realizado con éxito",
                icon: "success",
            });
        } else {
            Swal.fire({
                title: "Depósito fallido",
                text: "Monto no válido. Por favor, ingrese un número válido",
                icon: "error",
            });
        }
    };

    document.getElementById("btnRegis").addEventListener("click", registrarUsuario);
    document.getElementById("botonIniSesion").addEventListener("click", iniciarSesion);
    document.getElementById("btnIrInicioSesion").addEventListener("click", () => {
        document.getElementById("registro").classList.add("display_none");
        document.getElementById("inicio_sesion").classList.remove("display_none");
    });
    document.getElementById("botonIrRegistro").addEventListener("click", () => {
        document.getElementById("inicio_sesion").classList.add("display_none");
        document.getElementById("registro").classList.remove("display_none");
    });
    document.getElementById("btn_ver_cuenta").addEventListener("click", verCuenta);
    document.getElementById("depositar").addEventListener("click", depositarSaldo);
});
