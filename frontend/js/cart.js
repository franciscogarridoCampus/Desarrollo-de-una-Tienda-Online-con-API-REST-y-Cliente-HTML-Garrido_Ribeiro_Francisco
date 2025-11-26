// cart.js - Funcionalidad del carrito de compras
import { getCarrito, saveCarrito, getToken } from './store.js';

export async function realizarCompra() {
    const carrito = getCarrito();
    if(carrito.length === 0){
        alert('El carrito está vacío');
        return;
    }

    const token = getToken();
    try {
        const response = await fetch('../backend/carrito.php', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({token, carrito})
        });
        const data = await response.json();
        alert(data.message);
        if(data.success){
            saveCarrito([]);
            window.location.href = 'dashboard.html';
        }
    } catch(err) {
        console.error('Error al procesar la compra', err);
        alert('Error al procesar la compra');
    }
}
