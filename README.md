Mi tienda Online sobre componentes PC
Backend

La información de usuarios se encuentra en usuarios.json.
Estos usuarios pueden iniciar sesión en la aplicación.

La información de la tienda (categorías y productos) está en tienda.json.

Se utiliza Node.js con Express para el servidor (server.js):

Configura rutas separadas para productos, clientes y carritos.

Permite servir imágenes estáticas desde front/img.

Habilita CORS para poder acceder desde el frontend.

Tiene un token global simulado para manejar la autenticación.

Frontend

El frontend está hecho con HTML, SCSS y JS puro, usando Bootstrap 5.

Cada HTML tiene su archivo SCSS correspondiente:

_login.scss → estilos de login, tarjeta azul con letras blancas y centrado.

_dashboard.scss → estilos para destacados, recomendados y categorías; header verde.

_categorias.scss → estilos de listado de productos filtrables.

_product.scss → detalle de producto con imagen y botón de añadir al carrito.

_cart.scss → estilos del carrito de compras y botones de acción.

Funcionalidades principales

Login: valida el usuario y contraseña contra usuarios.json. Guarda token y tienda en localStorage.

Dashboard:

Muestra productos destacados en un slider.

Productos recomendados y categorías en formato de imágenes clicables.

Los botones de añadir al carrito guardan los productos en localStorage.

Categorías: permite filtrar productos por categoría.

Detalle de producto: muestra información detallada y botón para añadir al carrito.

Carrito:

Muestra los productos añadidos.

Permite vaciar o comprar los productos, enviando datos al backend.

Logout: borra localStorage y redirige al login.
