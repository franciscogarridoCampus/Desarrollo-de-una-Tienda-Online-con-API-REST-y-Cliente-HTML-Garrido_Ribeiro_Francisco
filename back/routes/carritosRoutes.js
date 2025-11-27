const express = require('express');
const router = express.Router();
const carritosController = require('../controllers/carritosController');

router.post('/', carritosController.validarCarrito);

module.exports = router;
