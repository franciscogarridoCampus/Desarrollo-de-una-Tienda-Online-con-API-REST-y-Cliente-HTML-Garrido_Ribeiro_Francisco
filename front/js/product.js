// js/product.js

// =====================
// 1) AUTENTICACIÓN Y DATOS
// =====================
// Obtenemos token y datos de la tienda desde localStorage
const token = localStorage.getItem("token");
const tienda = JSON.parse(localStorage.getItem("tienda"));

// Si no hay token o datos de tienda, redirigimos al login
if (!token || !tienda) window.location.href = "login.html";

// =====================
// 2) OBTENER PRODUCTO SELECCIONADO
// =====================
// Recuperamos el ID del producto seleccionado almacenado previamente
const productoId = parseInt(localStorage.getItem("productoSeleccionado"));

// Buscamos el producto correspondiente en la tienda
const producto = tienda.productos.find(p => p.id === productoId);

// Contenedor donde se mostrará el detalle del producto
const detalle = document.getElementById("productoDetalle");

// =====================
// 3) MOSTRAR DETALLE DEL PRODUCTO
// =====================
if (producto) {
  // Obtenemos el nombre de la categoría de forma segura
  const categoria = tienda.categorias.find(c => c.id === producto.id_categoria);
  const nombreCategoria = categoria ? categoria.nombre : "Sin categoría";

  // Creamos la tarjeta con toda la información del producto
  detalle.innerHTML = `
    <div class="card-body">
      <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
      <h5 class="card-title">${producto.nombre}</h5>
      <p class="card-text">Precio: $${producto.precio.toFixed(2)}</p>
      <p class="card-text">Categoría: ${nombreCategoria}</p>
      <button class="btn btn-success" id="addCartBtn">Añadir al carrito</button>
    </div>
  `;

  // =====================
  // 4) AÑADIR AL CARRITO
  // =====================
  document.getElementById("addCartBtn").addEventListener("click", () => {
    // Recuperamos el carrito desde localStorage o iniciamos uno vacío
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    // Añadimos el producto
    carrito.push(producto);

    // Guardamos el carrito actualizado
    localStorage.setItem("carrito", JSON.stringify(carrito));

    alert("Producto añadido al carrito");
  });
}

// =====================
// 5) LOGOUT
// =====================
document.getElementById("logoutBtn").addEventListener("click", () => {
  // Limpiamos la sesión
  localStorage.clear();

  // Redirigimos al login
  window.location.href = "login.html";
});
