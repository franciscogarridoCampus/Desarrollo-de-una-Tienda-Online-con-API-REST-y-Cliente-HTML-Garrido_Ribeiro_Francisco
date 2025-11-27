const loginForm = document.getElementById("loginForm");
const errorDiv = document.getElementById("error");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const usuario = document.getElementById("usuario").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch("http://localhost:3000/clientes/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usuario, password })
    });
    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("tienda", JSON.stringify(data.tienda));
      window.location.href = "dashboard.html";
    } else {
      errorDiv.textContent = data.mensaje;
    }
  } catch(err) {
    console.error(err);
    errorDiv.textContent = "Error de conexión";
  }
});