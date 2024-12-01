document.addEventListener("DOMContentLoaded", async () => {
    const productosContenedor = document.getElementById("productos-contenedor");
    const carritoProductos = document.getElementById("carrito_productos");
    const listaCarrito = document.getElementById("lista_carrito");
    const totalCarrito = document.getElementById("total_carrito");
    
    const user = JSON.parse(localStorage.getItem("usuarioRegistrado"));
    let carrito = [];

    const productos = [
        new Producto("Guitarra eléctrica Classic Sunburst", "Les Paul", "Gibson", 17000),
        new Producto("Guitarra eléctrica American Performer", "Stratocaster", "Fender", 115000),
        new Producto("Guitarra eléctrica Rga622xh-bk", "Super Stratocaster", "Ibanez", 91000),
        new Producto("Órgano", "Ctx800", "Casio", 17000),
        new Producto("Órgano", "Go Keys 5", "Roland", 42500),
        new Producto("Órgano", "Psrsx700", "Yamaha", 98500),
    ];

    const imagenes = [
        "../img/classic-sunburst.png",
        "../img/american-performer.jpg",
        "../img/ibanez-rga.jpg",
        "../img/organo-Ctx800.jpg",
        "../img/organo-gokeys5.jpg",
        "../img/organo-psrsx700.jpg",
    ];

    const cargarProductos = () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                productos.forEach((producto) => producto.sumaIva());
                resolve();
            }, 0);
        });
    };

    const mostrarProductos = async () => {
        await cargarProductos();
        productos.forEach((producto, index) => {
            agregarProducto(producto, imagenes[index]);
        });
    };

    const agregarProducto = (producto, imagenUrl) => {
        const createDiv = document.createElement("div");
        const createImg = document.createElement("img");
        const createH3 = document.createElement("h3");
        const createP = document.createElement("p");
        const createBtn = document.createElement("button");

        createImg.src = imagenUrl;
        createImg.alt = `Imagen de ${producto.nombre}`;
        createH3.innerText = `${producto.nombre} - ${producto.modelo} - ${producto.marca}`;
        createP.innerText = `$${producto.precio.toFixed(2)}`;
        createBtn.innerText = "Agregar al carrito";
        createBtn.classList.add("btnAgregarCarrito", "btn", "btn-dark");
        createBtn.addEventListener("click", () => agregarAlCarrito(producto));

        createDiv.appendChild(createImg);
        createDiv.appendChild(createH3);
        createDiv.appendChild(createP);
        createDiv.appendChild(createBtn);
        createDiv.classList.add("producto");
        productosContenedor.appendChild(createDiv);
    };

    const actualizarCarrito = async () => {
        listaCarrito.innerHTML = "";
        const total = carrito.reduce((suma, producto) => {
            const li = document.createElement("li");
            li.textContent = `${producto.nombre} - $${producto.precio.toFixed(2)}`;
            listaCarrito.appendChild(li);
            return suma + producto.precio;
        }, 0);
        totalCarrito.textContent = `$${total.toFixed(2)}`;
        await new Promise((resolve) => setTimeout(resolve, 200));
    };

    const agregarAlCarrito = async (producto) => {
        carrito = [...carrito, { ...producto }];
        await actualizarCarrito();
    };

    
    document.getElementById("btnCarrito").addEventListener("click", () => {
        carritoProductos.classList.toggle("display_none");
    });

    await mostrarProductos();
});
