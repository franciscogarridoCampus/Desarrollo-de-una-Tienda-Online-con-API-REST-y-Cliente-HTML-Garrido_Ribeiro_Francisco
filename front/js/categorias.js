const token = localStorage.getItem("token");
const tienda = JSON.parse(localStorage.getItem("tienda"));
if (!token || !tienda) window.location.href = "login.html";

const categoriasContainer = document.getElementById("categoriasContainer");

tienda.categorias.forEach(categoria => {
  const col = document.createElement("div");
  col.className = "col-md-4 mb-3";
  col.innerHTML = `
    <div class="card h-100">
      <div class="card-body">
        <h5 class="card-title">${categoria.nombre}</h5>
        <button class="btn btn-primary view-products" data-id="${categoria.id}">Ver Productos</button>
      </div>
    </div>`;
  categoriasContainer.appendChild(col);
});

document.querySelectorAll(".view-products").forEach(btn => {
  btn.addEventListener("click", () => {
    const catId = parseInt(btn.dataset.id);
    localStorage.setItem("categoriaSeleccionada", catId);
    window.location.href = "dashboard.html"; // Podrías hacer otra página filtrada
  });
});

document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.clear();
  window.location.href = "login.html";
});