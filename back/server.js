const express = require('express');
const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors());
// Token global
global.TOKEN = "123456789"; 

// Rutas
app.use('/productos', require('./routes/productosRoutes'));
app.use('/clientes', require('./routes/clientesRoutes'));
app.use('/carritos', require('./routes/carritosRoutes'));

// Servidor
app.listen(3000, () => console.log('Servidor escuchando en http://localhost:3000'));
