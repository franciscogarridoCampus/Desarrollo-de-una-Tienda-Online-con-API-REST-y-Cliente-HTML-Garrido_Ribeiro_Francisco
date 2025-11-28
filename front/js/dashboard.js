// js/dashboard.js

const token = localStorage.getItem("token");
const tienda = JSON.parse(localStorage.getItem("tienda"));

if (!token || !tienda) window.location.href = "login.html";

const productosContainer = document.getElementById("productosContainer");

// Mostrar productos destacados (con imágenes)
tienda.productos.filter(p => p.destacado).forEach(producto => {
  const col = document.createElement("div");
  col.className = "col-md-4 mb-3";

  // Aquí se agrega la imagen del producto junto con el nombre y el precio
  col.innerHTML = `
    <div class="card h-100 producto-tarjeta" data-id="${producto.id}" style="cursor:pointer;">
      <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
      <div class="card-body">
        <h5 class="card-title">${producto.nombre}</h5>
        <p class="card-text">Precio: $${producto.precio.toFixed(2)}</p>
        <button class="btn btn-success add-cart" data-id="${producto.id}">Añadir al carrito</button>
      </div>
    </div>`;
  productosContainer.appendChild(col);
});

// Redirigir al hacer clic en la tarjeta
document.querySelectorAll(".producto-tarjeta").forEach(card => {
  card.addEventListener("click", (e) => {
    // Evitar que el clic en el botón "Añadir al carrito" active la tarjeta
    if (e.target.classList.contains("add-cart")) return;

    const productoId = parseInt(card.dataset.id);
    localStorage.setItem("productoSeleccionado", productoId);
    window.location.href = "product.html";
  });
});

// Botón "Añadir al carrito"
document.querySelectorAll(".add-cart").forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation(); // Evitar que se active el click de la tarjeta
    const productoId = parseInt(btn.dataset.id);
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const prod = tienda.productos.find(p => p.id === productoId);
    carrito.push(prod);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert(`${prod.nombre} añadido al carrito`);
  });
});

// Logout
document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.clear();
  window.location.href = "login.html";
});
