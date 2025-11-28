const express = require('express'); // Importa Express para crear el servidor
const path = require('path');       // Importa path para manejar rutas de archivos
const app = express();              // Crea la app de Express

app.use(express.json());            // Permite que el servidor reciba JSON en las peticiones

const cors = require('cors');       
app.use(cors());                    // Habilita CORS para permitir peticiones desde otro origen

// Token global para autenticación simulada
global.TOKEN = "123456789"; 

// Rutas de la API
app.use('/productos', require('./routes/productosRoutes')); // Rutas de productos
app.use('/clientes', require('./routes/clientesRoutes'));   // Rutas de clientes (login)
app.use('/carritos', require('./routes/carritosRoutes'));   // Rutas de carritos de compra

// Servir imágenes desde la carpeta front/img
app.use('/img', express.static(path.join(__dirname, '/front/img')));

// Inicia el servidor en el puerto 3000
app.listen(3000, () => console.log('Servidor escuchando en http://localhost:3000'));
