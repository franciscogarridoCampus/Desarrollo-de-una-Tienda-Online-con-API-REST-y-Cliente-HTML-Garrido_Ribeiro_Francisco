// js/dashboard.js

// =====================
// 1) AUTENTICACIÓN Y DATOS
// =====================
// Obtenemos el token y los datos de la tienda desde localStorage
const token = localStorage.getItem("token");
const tienda = JSON.parse(localStorage.getItem("tienda"));

// Si no hay token o datos de tienda, redirigimos al login
if (!token || !tienda) {
  window.location.href = "login.html";
}

// =====================
// 2) ELEMENTOS DEL DOM
// =====================
const sliderTrack = document.getElementById("sliderTrack"); // Contenedor del slider de destacados
const recomendadosContainer = document.getElementById("recomendadosContainer"); // Contenedor de productos recomendados
const categoriasImgContainer = document.getElementById("categoriasImgContainer"); // Contenedor de categorías
const slideLeftBtn = document.getElementById("slideLeft"); // Botón izquierda del slider
const slideRightBtn = document.getElementById("slideRight"); // Botón derecha del slider

// =====================
// 3) FUNCIONES AUXILIARES
// =====================

// Normaliza el texto eliminando acentos y convirtiendo a minúsculas
function normalizeText(s) {
  return s.toString().toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').trim();
}

// Busca el ID de una categoría por su nombre
function findCategoryIdByName(name) {
  const target = normalizeText(name);
  const found = tienda.categorias.find(c => normalizeText(c.nombre) === target);
  return found ? found.id : null;
}

// =====================
// 4) SLIDER DE PRODUCTOS DESTACADOS
// =====================
const destacados = tienda.productos.filter(p => p.destacado).slice(0, 3);

// Si no hay destacados, mostramos un mensaje
if (destacados.length === 0) {
  sliderTrack.innerHTML = `<div class="slider-item"><div class="card p-4 text-center">No hay productos destacados</div></div>`;
} else {
  // Creamos cada producto destacado como tarjeta
  destacados.forEach(prod => {
    const item = document.createElement("div");
    item.className = "slider-item";
    item.innerHTML = `
      <div class="card producto-tarjeta h-100" data-id="${prod.id}">
        <img src="${prod.imagen}" class="card-img-top" alt="${prod.nombre}" style="height:260px; object-fit:cover;">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${prod.nombre}</h5>
          <p class="card-text mb-3">$${prod.precio.toFixed(2)}</p>
          <button class="btn btn-success add-cart mt-auto" data-id="${prod.id}">Añadir al carrito</button>
        </div>
      </div>
    `;
    sliderTrack.appendChild(item);
  });
}

// =====================
// 5) FUNCIONALIDAD DEL SLIDER
// =====================
let currentIndex = 0;

// Actualiza la posición del slider
function updateSlider() {
  sliderTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
}

// Ir al siguiente producto
function goNext() {
  if (destacados.length === 0) return;
  currentIndex = (currentIndex + 1) % destacados.length;
  updateSlider();
}

// Ir al producto anterior
function goPrev() {
  if (destacados.length === 0) return;
  currentIndex = (currentIndex - 1 + destacados.length) % destacados.length;
  updateSlider();
}

// Eventos de los botones
slideRightBtn.addEventListener("click", goNext);
slideLeftBtn.addEventListener("click", goPrev);

// =====================
// 6) CLICK EN PRODUCTOS
// =====================
document.addEventListener("click", (e) => {
  // Añadir al carrito
  if (e.target.classList.contains("add-cart")) {
    e.stopPropagation();
    const id = parseInt(e.target.dataset.id);
    const producto = tienda.productos.find(p => p.id === id);
    if (!producto) return;

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert(`${producto.nombre} añadido al carrito`);
    return;
  }

  // Click en tarjeta para ver detalle
  const tarjeta = e.target.closest(".producto-tarjeta");
  if (tarjeta) {
    const id = parseInt(tarjeta.dataset.id);
    localStorage.setItem("productoSeleccionado", id);
    window.location.href = "product.html";
  }
});

// =====================
// 7) PRODUCTOS RECOMENDADOS
// =====================
const recomendados = tienda.productos.filter(p => !p.destacado).slice(0, 4);

// Si hay pocos, rellenamos con otros productos
if (recomendados.length < 4) {
  const extras = tienda.productos.slice(0, 4 - recomendados.length).filter(p => !recomendados.includes(p));
  extras.forEach(e => recomendados.push(e));
}

// Creamos cada tarjeta de producto recomendado
recomendados.forEach(prod => {
  const col = document.createElement("div");
  col.className = "col-12 col-md-4 col-lg-3 mb-3";
  col.innerHTML = `
    <div class="card h-100 producto-tarjeta" data-id="${prod.id}" style="cursor:pointer;">
      <img src="${prod.imagen}" class="card-img-top" alt="${prod.nombre}" style="height:180px; object-fit:cover;">
      <div class="card-body d-flex flex-column">
        <h5 class="card-title">${prod.nombre}</h5>
        <p class="card-text mb-3">$${prod.precio.toFixed(2)}</p>
        <button class="btn btn-success add-cart mt-auto" data-id="${prod.id}">Añadir al carrito</button>
      </div>
    </div>
  `;
  recomendadosContainer.appendChild(col);
});

// =====================
// 8) CATEGORÍAS
// =====================
const categImgs = [
  { file: 'perifericos.jpg', name: 'Periféricos' },
  { file: 'monitores.jpg', name: 'Monitores' },
  { file: 'componentes.jpg', name: 'Componentes' },
  { file: 'audio.jpg', name: 'Audio' },
  { file: 'almacenamiento.jpg', name: 'Almacenamiento' }
];

categImgs.forEach(ci => {
  const col = document.createElement('div');
  col.className = 'col-12 col-sm-6 col-md-4 col-lg-3';
  col.innerHTML = `
    <div class="card category-card h-100 text-center" data-name="${ci.name}" style="cursor:pointer;">
      <img src="img/${ci.file}" class="card-img-top" alt="${ci.name}" style="height:180px; object-fit:cover;">
      <div class="card-body p-2">
        <p class="mb-0 fw-semibold">${ci.name}</p>
      </div>
    </div>
  `;
  categoriasImgContainer.appendChild(col);
});

// Click en categoría
document.addEventListener('click', (e) => {
  const catCard = e.target.closest('.category-card');
  if (!catCard) return;

  const catName = catCard.dataset.name;
  const catId = findCategoryIdByName(catName);

  if (catId !== null) {
    localStorage.setItem('selectedCategory', catId);
  } else {
    localStorage.setItem('selectedCategoryName', catName);
  }

  // Redirige a página de categorías
  window.location.href = 'categorias.html';
});

// =====================
// 9) LOGOUT
// =====================
document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.clear(); // Limpia sesión
  window.location.href = "login.html"; // Redirige al login
});
