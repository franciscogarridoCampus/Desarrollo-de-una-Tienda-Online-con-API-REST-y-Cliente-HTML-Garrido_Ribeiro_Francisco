//esta clase os la doy completa. Es la encargada de asignar la ruta al controlador, de esta

const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientesController');
router.get('/', clientesController.obtenerTodos);
router.get('/:id', clientesController.obtenerPorId);
router.post('/', clientesController.crear);
router.put('/:id', clientesController.actualizar);
router.delete('/:id', clientesController.eliminar);
module.exports = router;
//Las demás rutas (categoriasRoutes.js, clientesRoutes.js, etc.) tendrán la
