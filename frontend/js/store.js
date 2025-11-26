// store.js - Manejo de LocalStorage

// Token
export function saveToken(token) {
    localStorage.setItem('token', token);
}
export function getToken() {
    return localStorage.getItem('token');
}

// Tienda (productos y categorías)
export function saveTienda(tienda) {
    localStorage.setItem('tienda', JSON.stringify(tienda));
}
export function getTienda() {
    return JSON.parse(localStorage.getItem('tienda') || '{}');
}

// Carrito
export function saveCarrito(carrito) {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}
export function getCarrito() {
    return JSON.parse(localStorage.getItem('carrito') || '[]');
}

// Productos vistos recientemente
export function saveVistos(productos) {
    localStorage.setItem('productos_vistos', JSON.stringify(productos));
}
export function getVistos() {
    return JSON.parse(localStorage.getItem('productos_vistos') || '[]');
}
