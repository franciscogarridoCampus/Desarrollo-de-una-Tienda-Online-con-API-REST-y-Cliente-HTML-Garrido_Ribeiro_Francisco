const { leerJSON } = require('../services/clientesService');
const path = require('path');
const rutaUsuarios = path.join(__dirname, '../data/usuarios.json');
const rutaTienda = path.join(__dirname, '../data/tienda.json');
const rutaClientes = path.join(__dirname, '../data/clientes.json');

exports.login = (req, res) => {
  const { usuario, password } = req.body;
  const usuarios = leerJSON(rutaUsuarios);

  const encontrado = usuarios.find(u => u.usuario === usuario && u.password === password);

  if (encontrado) {
    const tienda = leerJSON(rutaTienda);
    const clientes = leerJSON(rutaClientes);
    res.json({
      token: global.TOKEN,
      tienda,
      clientes
    });
  } else {
    res.status(401).json({ mensaje: 'Credenciales incorrectas' });
  }
};
