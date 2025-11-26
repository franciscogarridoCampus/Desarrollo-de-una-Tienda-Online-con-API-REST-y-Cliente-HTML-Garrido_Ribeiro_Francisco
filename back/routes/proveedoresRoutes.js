//esta clase os la doy completa. Es la encargada de asignar la ruta al controlador, de esta

const express = require('express');
const router = express.Router();
const proveedoresController = require('../controllers/proveedoresController');
router.get('/', proveedoresController.obtenerTodos);
router.get('/:id', proveedoresController.obtenerPorId);
router.post('/', proveedoresController.crear);
router.put('/:id', proveedoresController.actualizar);
router.delete('/:id', proveedoresController.eliminar);
module.exports = router;
//Las demás rutas (categoriasRoutes.js, clientesRoutes.js, etc.) tendrán la
