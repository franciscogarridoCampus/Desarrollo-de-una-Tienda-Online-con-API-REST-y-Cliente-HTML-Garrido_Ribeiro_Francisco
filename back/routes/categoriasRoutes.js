
//esta clase os la doy completa. Es la encargada de asignar la ruta al controlador, de esta

const express = require('express');
const router = express.Router();
const categoriasController = require('../controllers/categoriasController');
router.get('/', categoriasController.obtenerTodos);
router.get('/:id', categoriasController.obtenerPorId);
router.post('/', categoriasController.crear);
router.put('/:id', categoriasController.actualizar);
router.delete('/:id', categoriasController.eliminar);
module.exports = router;
//Las demás rutas (categoriasRoutes.js, clientesRoutes.js, etc.) tendrán la

