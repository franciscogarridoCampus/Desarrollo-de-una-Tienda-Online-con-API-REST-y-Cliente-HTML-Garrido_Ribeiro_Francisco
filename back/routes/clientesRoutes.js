const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientesController');

router.post('/login', clientesController.login);

module.exports = router;
