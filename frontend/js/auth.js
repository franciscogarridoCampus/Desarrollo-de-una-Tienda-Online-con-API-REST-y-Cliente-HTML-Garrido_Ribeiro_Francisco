// auth.js - Maneja autenticación y token
export function checkAuth() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

export function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('tienda');
    localStorage.removeItem('carrito');
    localStorage.removeItem('productos_vistos');
    window.location.href = 'login.html';
}
