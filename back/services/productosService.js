const fs = require("fs");
const path = require("path");
const ruta = path.join(__dirname, "../data/tienda.json");

function leerJSON(ruta) {
  return JSON.parse(fs.readFileSync(ruta, "utf-8"));
}

function guardarJSON(datos) {
  fs.writeFileSync(ruta, JSON.stringify(datos, null, 2));
}

exports.listar = () => leerJSON(ruta).productos;

exports.buscarPorId = (id) => leerJSON(ruta).productos.find(p => p.id === id);

exports.crear = (nuevo) => {
  const tienda = leerJSON(ruta);
  const productos = tienda.productos;
  nuevo.id = productos.length ? Math.max(...productos.map(p => p.id)) + 1 : 1;
  productos.push(nuevo);
  guardarJSON(tienda);
  return nuevo;
};

exports.actualizar = (id, cambios) => {
  const tienda = leerJSON(ruta);
  const productos = tienda.productos;
  const index = productos.findIndex(p => p.id === id);
  if (index === -1) return null;
  productos[index] = { ...productos[index], ...cambios };
  guardarJSON(tienda);
  return productos[index];
};

exports.eliminar = (id) => {
  const tienda = leerJSON(ruta);
  const productos = tienda.productos;
  const index = productos.findIndex(p => p.id === id);
  if (index === -1) return null;
  const eliminado = productos.splice(index, 1);
  guardarJSON(tienda);
  return eliminado[0];
};
