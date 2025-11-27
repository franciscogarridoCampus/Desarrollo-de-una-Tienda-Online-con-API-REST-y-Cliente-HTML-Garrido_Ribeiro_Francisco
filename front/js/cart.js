const token = localStorage.getItem("token");
const tienda = JSON.parse(localStorage.getItem("tienda")); // precios reales
if (!token || !tienda) window.location.href = "login.html";

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const carritoContainer = document.getElementById("carritoContainer");

function renderCarrito() {
  carritoContainer.innerHTML = "";
  if (carrito.length === 0) {
    carritoContainer.innerHTML = "<p>El carrito está vacío.</p>";
    return;
  }

  carrito.forEach(p => {
    // Buscar el producto en la tienda para obtener precio real
    const productoReal = tienda.productos.find(prod => prod.id === p.id);
    const precioReal = productoReal ? productoReal.precio : 0;

    const col = document.createElement("div");
    col.className = "col-md-4 mb-3";
    col.innerHTML = `
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">${p.nombre}</h5>
          <p class="card-text">Precio: $${precioReal.toFixed(2)}</p>
        </div>
      </div>`;
    carritoContainer.appendChild(col);
  });
}

renderCarrito();

// Comprar
document.getElementById("comprarBtn").addEventListener("click", async () => {
  if (carrito.length === 0) {
    alert("El carrito está vacío.");
    return;
  }

  // Enviar solo id y nombre al backend
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
  } catch(err) {
    console.error(err);
    alert("Error al procesar la compra");
  }
});

// Vaciar carrito
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

// Cerrar sesión
document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.clear();
  window.location.href = "login.html";
});
