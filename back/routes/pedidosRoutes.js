//esta clase os la doy completa. Es la encargada de asignar la ruta al controlador, de esta

const express = require('express');
const router = express.Router();
const pedidosController = require('../controllers/pedidosController');
router.get('/', pedidosController.obtenerTodos);
router.get('/:id', pedidosController.obtenerPorId);
router.post('/', pedidosController.crear);
router.put('/:id', pedidosController.actualizar);
router.delete('/:id', pedidosController.eliminar);
module.exports = router;
//Las demás rutas (categoriasRoutes.js, clientesRoutes.js, etc.) tendrán la
