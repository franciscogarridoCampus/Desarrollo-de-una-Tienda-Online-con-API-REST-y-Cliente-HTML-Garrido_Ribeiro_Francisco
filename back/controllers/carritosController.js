const { leerJSON } = require('../services/carritosService');
const path = require('path');
const rutaTienda = path.join(__dirname, '../data/tienda.json');

exports.validarCarrito = (req, res) => {
  const token = req.headers['authorization'];
  if (token !== global.TOKEN) {
    return res.status(401).json({ mensaje: 'Token inválido' });
  }

  const carritoCliente = req.body.carrito; // cliente envía { carrito: [...] }
  const tienda = leerJSON(rutaTienda);

  let total = 0;

  for (let item of carritoCliente) {
    const productoReal = tienda.productos.find(p => p.id === item.id);
    if (!productoReal) {
      return res.status(400).json({ mensaje: `Producto ${item.nombre || item.id} no existe` });
    }
    total += productoReal.precio; // usar precio real del servidor
  }

  res.json({ mensaje: 'Compra validada', total });
};
