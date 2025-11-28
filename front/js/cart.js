// js/cart.js

// =====================
// 1) AUTENTICACIÓN Y DATOS
// =====================
// Obtenemos token y datos de la tienda desde localStorage
const token = localStorage.getItem("token");
const tienda = JSON.parse(localStorage.getItem("tienda"));

// Si no hay token o datos de tienda, redirigimos al login
if (!token || !tienda) window.location.href = "login.html";

// Obtenemos carrito del localStorage o inicializamos vacío
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const carritoContainer = document.getElementById("carritoContainer");

// =====================
// 2) RENDERIZAR CARRITO
// =====================
function renderCarrito() {
  carritoContainer.innerHTML = "";

  // Si está vacío, mostrar mensaje
  if (carrito.length === 0) {
    carritoContainer.innerHTML = "<p>El carrito está vacío.</p>";
    return;
  }

  // Recorrer cada producto del carrito
  carrito.forEach(p => {
    // Obtener datos reales del producto en la tienda
    const productoReal = tienda.productos.find(prod => prod.id === p.id);
    const precioReal = productoReal ? productoReal.precio : 0;

    const col = document.createElement("div");
    col.className = "col-md-4 mb-3";
    col.innerHTML = `
      <div class="card">
        <img src="${productoReal.imagen}" class="card-img-top" alt="${productoReal.nombre}">
        <div class="card-body">
          <h5 class="card-title">${p.nombre}</h5>
          <p class="card-text">Precio: $${precioReal.toFixed(2)}</p>
        </div>
      </div>`;
    carritoContainer.appendChild(col);
  });
}

// Llamamos a la función para mostrar carrito al cargar
renderCarrito();

// =====================
// 3) REALIZAR COMPRA
// =====================
document.getElementById("comprarBtn").addEventListener("click", async () => {
  if (carrito.length === 0) {
    alert("El carrito está vacío.");
    return;
  }

  // Preparamos datos para enviar al servidor
  const carritoParaServidor = carrito.map(p => ({
    id: p.id,
    nombre: p.nombre
  }));

  try {
    const res = await fetch("http://localhost:3000/carritos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
      body: JSON.stringify({ carrito: carritoParaServidor })
    });

    const data = await res.json();

    if (res.ok) {
      alert(`Compra realizada con éxito! Total: $${data.total.toFixed(2)}`);
      carrito = [];
      localStorage.removeItem("carrito");
      renderCarrito();
    } else {
      alert(data.mensaje);
    }
  } catch (err) {
    console.error(err);
    alert("Error al procesar la compra");
  }
});

// =====================
// 4) VACIAR CARRITO
// =====================
document.getElementById("vaciarBtn").addEventListener("click", () => {
  if (carrito.length === 0) {
    alert("El carrito ya está vacío.");
    return;
  }

  if (confirm("¿Seguro que quieres vaciar el carrito?")) {
    carrito = [];
    localStorage.removeItem("carrito");
    renderCarrito();
    alert("Carrito vaciado correctamente.");
  }
});

// =====================
// 5) CERRAR SESIÓN
// =====================
document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.clear();
  window.location.href = "login.html";
});
