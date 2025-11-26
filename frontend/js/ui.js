// ui.js - Funciones para renderizar productos y categorías

export function renderProductos(container, productos, addToCartCallback) {
    container.innerHTML = '';
    productos.forEach(p => {
        const div = document.createElement('div');
        div.className = 'producto';
        div.innerHTML = `
            <img src="img/${p.imagen}" alt="${p.nombre}" />
            <h3>${p.nombre}</h3>
            <p>Precio: $${p.precio}</p>
            <button id="add-${p.id}">Añadir al carrito</button>
        `;
        container.appendChild(div);
        document.getElementById(`add-${p.id}`).addEventListener('click', () => {
            addToCartCallback(p);
        });
    });
}

export function renderCategorias(container, categorias) {
    container.innerHTML = '';
    categorias.forEach(c => {
        const div = document.createElement('div');
        div.className = 'categoria';
        div.innerHTML = `
            <h3>${c.nombre}</h3>
            <a href="categories.html?categoria=${c.id}">Ver productos</a>
        `;
        container.appendChild(div);
    });
}
