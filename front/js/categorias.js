const token = localStorage.getItem("token");
const tienda = JSON.parse(localStorage.getItem("tienda"));
if (!token || !tienda) window.location.href = "login.html";

const productosContainer = document.getElementById("productosContainer");
const categoryFilter = document.getElementById("categoryFilter");

// Mostrar las categorías en el filtro
function mostrarCategorias() {
  // Limpiar el filtro
  categoryFilter.innerHTML = `<option value="all">Todos</option>`; // Resetear el filtro de categorías

  tienda.categorias.forEach(categoria => {
    // Agregar la categoría al filtro
    const option = document.createElement("option");
    option.value = categoria.id;
    option.textContent = `${categoria.nombre}`;
    categoryFilter.appendChild(option);
  });

  // Mostrar los productos filtrados según la categoría seleccionada
  categoryFilter.addEventListener("change", () => {
    const selectedCategory = categoryFilter.value;
    if (selectedCategory === "all") {
      mostrarProductos(tienda.productos); // Mostrar todos los productos
    } else {
      const productosFiltrados = tienda.productos.filter(p => p.id_categoria === parseInt(selectedCategory));
      mostrarProductos(productosFiltrados);
    }
  });

  // Inicializar mostrando todos los productos
  mostrarProductos(tienda.productos);
}

// Mostrar los productos en el contenedor
function mostrarProductos(productos) {
  productosContainer.innerHTML = ""; // Limpiar productos anteriores

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

  // Hacer clic en una tarjeta de producto para ir a su página de detalle
  document.querySelectorAll(".producto-tarjeta").forEach(card => {
    card.addEventListener("click", (e) => {
      // Evitar que el clic en el botón "Añadir al carrito" active la tarjeta
      if (e.target.classList.contains("add-to-cart")) return;

      const productoId = parseInt(card.dataset.id);
      localStorage.setItem("productoSeleccionado", productoId);
      window.location.href = "product.html"; // Redirigir a la página de producto
    });
  });

  // Añadir productos al carrito
  document.querySelectorAll(".add-to-cart").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation(); // Evitar que el clic en "Añadir al carrito" active la tarjeta
      const productoId = parseInt(btn.dataset.id);
      const producto = tienda.productos.find(p => p.id === productoId);
      
      // Obtener el carrito del localStorage y añadir el producto
      let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
      carrito.push(producto);
      localStorage.setItem("carrito", JSON.stringify(carrito));
      
      alert(`${producto.nombre} añadido al carrito`);
    });
  });
}

// Mostrar las categorías al cargar la página
mostrarCategorias();

// Logout
document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.clear();
  window.location.href = "login.html";
});
