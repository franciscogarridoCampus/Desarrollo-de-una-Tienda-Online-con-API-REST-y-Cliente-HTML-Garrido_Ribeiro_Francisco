const { leerJSON } = require('../services/carritosService');
const path = require('path');
const rutaTienda = path.join(__dirname, '../data/tienda.json');

exports.validarCarrito = (req, res) => {
  const token = req.headers['authorization'];
  if (token !== global.TOKEN) {
    return res.status(401).json({ mensaje: 'Token inválido' });
  }

  const carrito = req.body;
  const tienda = leerJSON(rutaTienda);
  let valido = true;

  carrito.forEach(item => {
    const producto = tienda.productos.find(p => p.id === item.id);
    if (!producto || producto.precio !== item.precio) {
      valido = false;
    }
  });

  if (valido) {
    res.json({ mensaje: 'Carrito válido' });
  } else {
    res.status(400).json({ mensaje: 'Precios manipulados' });
  }
};
