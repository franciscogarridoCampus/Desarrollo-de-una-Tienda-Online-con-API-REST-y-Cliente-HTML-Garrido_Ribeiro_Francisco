// product.js - Funcionalidad específica de la ficha de producto
import { getTienda, getCarrito, saveCarrito, saveVistos, getVistos } from './store.js';

export function mostrarProducto(productoId, container) {
    const tienda = getTienda();
    const producto = tienda.productos.find(p => p.id === productoId);
    if(!producto) return;

    container.innerHTML = `
        <h1>${producto.nombre}</h1>
        <img src="img/${producto.imagen}" alt="${producto.nombre}" />
        <p>Precio: $${producto.precio}</p>
        <button id="addCartBtn">Añadir al carrito</button>
    `;

    // Añadir al carrito
    document.getElementById('addCartBtn').addEventListener('click', () => {
        const carrito = getCarrito();
        carrito.push(producto);
        saveCarrito(carrito);
        alert('Producto añadido al carrito');
    });

    // Guardar producto visto recientemente
    const vistos = getVistos();
    const existe = vistos.find(p => p.id === producto.id);
    if(!existe){
        vistos.push(producto);
        if(vistos.length > 5) vistos.shift(); // máximo 5 productos recientes
        saveVistos(vistos);
    }
}
