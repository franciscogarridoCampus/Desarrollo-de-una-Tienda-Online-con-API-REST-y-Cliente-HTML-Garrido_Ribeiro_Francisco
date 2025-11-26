//esta clase os la doy completa. Es la encargada de asignar la ruta al controlador, de esta

const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productosController');
router.get('/', productosController.obtenerTodos);
router.get('/:id', productosController.obtenerPorId);
router.post('/', productosController.crear);
router.put('/:id', productosController.actualizar);
router.delete('/:id', productosController.eliminar);
module.exports = router;
//Las demás rutas (categoriasRoutes.js, clientesRoutes.js, etc.) tendrán la
