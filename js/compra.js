document.addEventListener("DOMContentLoaded", ()=>{
    const comprarProductos = async () => {
        const total = carrito.reduce((suma, producto) => suma + producto.precio, 0);
        if (user.saldo_pesos >= total) {
            user.setSaldo_pesos(-total);
            carrito = [];
            await actualizarCarrito();
            Swal.fire({
                title: "Compra realizada con éxito",
                text: "Tu compra te llegará dentro de 5 días hábiles",
                icon: "success",
            });
            alert("Compra realizada con éxito");
            localStorage.setItem("usuario", JSON.stringify(user));
        } else {
            Swal.fire({
                title: "Saldo insuficiente",
                text: "No tienes suficiente saldo para realizar esta compra",
                icon: "error",
            });
        }
    };
    const botonComprar = document.getElementById("btnComprar");
    botonComprar.addEventListener("click", comprarProductos);

});