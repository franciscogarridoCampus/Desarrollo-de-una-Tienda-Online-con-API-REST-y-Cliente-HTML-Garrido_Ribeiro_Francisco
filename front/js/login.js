// js/login.js

// =====================
// 1) ELEMENTOS DEL DOM
// =====================
// Formulario de login y div donde se mostrarán errores
const loginForm = document.getElementById("loginForm");
const errorDiv = document.getElementById("error");

// =====================
// 2) EVENTO DE ENVÍO DEL FORMULARIO
// =====================
// Escuchamos cuando el usuario envía el formulario
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault(); // Evita que la página se recargue

  // Obtenemos los valores de usuario y contraseña
  const usuario = document.getElementById("usuario").value;
  const password = document.getElementById("password").value;

  try {
    // =====================
    // 3) ENVÍO DE DATOS AL SERVIDOR
    // =====================
    // Se hace una petición POST al endpoint de login
    const res = await fetch("http://localhost:3000/clientes/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usuario, password }) // Se envían usuario y contraseña
    });

    const data = await res.json(); // Se obtiene la respuesta en formato JSON

    // =====================
    // 4) GESTIÓN DE RESPUESTA
    // =====================
    if (res.ok) {
      // Login correcto: guardamos token y datos de la tienda en localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("tienda", JSON.stringify(data.tienda));

      // Redirigimos al dashboard
      window.location.href = "dashboard.html";
    } else {
      // Login incorrecto: mostramos mensaje de error
      errorDiv.textContent = data.mensaje;
    }

  } catch(err) {
    // Error de conexión o de fetch
    console.error(err);
    errorDiv.textContent = "Error de conexión";
  }
});
