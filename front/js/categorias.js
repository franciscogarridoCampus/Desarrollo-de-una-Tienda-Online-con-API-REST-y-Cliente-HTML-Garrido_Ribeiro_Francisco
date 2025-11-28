// js/categorias.js

// =====================
// 1) AUTENTICACIÓN Y DATOS
// =====================
// Obtenemos token y datos de la tienda desde localStorage
const token = localStorage.getItem("token");
const tienda = JSON.parse(localStorage.getItem("tienda"));

// Si no hay token o datos de tienda, redirigimos al login
if (!token || !tienda) window.location.href = "login.html";

// Contenedores y elementos de filtro
const productosContainer = document.getElementById("productosContainer");
const categoryFilter = document.getElementById("categoryFilter");

// =====================
// 2) MOSTRAR CATEGORÍAS EN EL SELECT
// =====================
function mostrarCategorias() {
  // Opción por defecto "Todos"
  categoryFilter.innerHTML = `<option value="all">Todos</option>`;

  // Añadimos cada categoría como opción
  tienda.categorias.forEach(categoria => {
    const option = document.createElement("option");
    option.value = categoria.id;
    option.textContent = categoria.nombre;
    categoryFilter.appendChild(option);
  });

  // Listener para cambiar el filtro
  categoryFilter.addEventListener("change", () => {
    const selected = categoryFilter.value;
    if (selected === "all") mostrarProductos(tienda.productos);
    else {
      const productosFiltrados = tienda.productos.filter(
        p => p.id_categoria === parseInt(selected)
      );
      mostrarProductos(productosFiltrados);
    }
  });

  // Mostrar todos los productos al cargar
  mostrarProductos(tienda.productos);
}

// =====================
// 3) FUNCIÓN PARA MOSTRAR PRODUCTOS
// =====================
function mostrarProductos(productos) {
  productosContainer.innerHTML = "";

  productos.forEach(producto => {
    const col = document.createElement("div");
    col.className = "col-md-4 mb-3";

    col.innerHTML = `
      <div class="card h-100 producto-tarjeta" data-id="${producto.id}" style="cursor:pointer;">
        <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
        <div class="card-body">
          <h5 class="card-title">${producto.nombre}</h5>
          <p class="card-text">Precio: $${producto.precio.toFixed(2)}</p>
          <button class="btn btn-success add-to-cart" data-id="${producto.id}">Añadir al carrito</button>
        </div>
      </div>`;

    productosContainer.appendChild(col);
  });

  // =====================
  // 4) CLICK EN PRODUCTO PARA VER DETALLE
  // =====================
  document.querySelectorAll(".producto-tarjeta").forEach(card => {
    card.addEventListener("click", (e) => {
      if (e.target.classList.contains("add-to-cart")) return; // Ignorar botón
      const productoId = parseInt(card.dataset.id);
      localStorage.setItem("productoSeleccionado", productoId);
      window.location.href = "product.html";
    });
  });

  // =====================
  // 5) AÑADIR PRODUCTO AL CARRITO
  // =====================
  document.querySelectorAll(".add-to-cart").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation(); // Evitar abrir detalle
      const productoId = parseInt(btn.dataset.id);
      const producto = tienda.productos.find(p => p.id === productoId);
      let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
      carrito.push(producto);
      localStorage.setItem("carrito", JSON.stringify(carrito));
      alert(`${producto.nombre} añadido al carrito`);
    });
  });
}

// =====================
// 6) FILTRO AUTOMÁTICO DESDE DASHBOARD
// =====================
mostrarCategorias();

const preselected = localStorage.getItem("selectedCategory");
if (preselected) {
  categoryFilter.value = preselected;
  const productosFiltrados = tienda.productos.filter(
    p => p.id_categoria === parseInt(preselected)
  );
  mostrarProductos(productosFiltrados);
  localStorage.removeItem("selectedCategory"); // Limpiar para la próxima visita
}

// =====================
// 7) LOGOUT
// =====================
document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.clear();
  window.location.href = "login.html";
});
