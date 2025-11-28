// js/product.js

const token = localStorage.getItem("token");
const tienda = JSON.parse(localStorage.getItem("tienda"));

if (!token || !tienda) window.location.href = "login.html";

const productoId = parseInt(localStorage.getItem("productoSeleccionado"));
const producto = tienda.productos.find(p => p.id === productoId);
const detalle = document.getElementById("productoDetalle");

if (producto) {
  // Obtener nombre de categoría de forma segura
  const categoria = tienda.categorias.find(c => c.id === producto.id_categoria);
  const nombreCategoria = categoria ? categoria.nombre : "Sin categoría";

  detalle.innerHTML = `
    <div class="card-body">
      <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
      <h5 class="card-title">${producto.nombre}</h5>
      <p class="card-text">Precio: $${producto.precio.toFixed(2)}</p>
      <p class="card-text">Categoría: ${nombreCategoria}</p>
      <button class="btn btn-success" id="addCartBtn">Añadir al carrito</button>
    </div>
  `;

  // Añadir al carrito
  document.getElementById("addCartBtn").addEventListener("click", () => {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert("Producto añadido al carrito");
  });
}

// Logout
document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.clear();
  window.location.href = "login.html";
});
