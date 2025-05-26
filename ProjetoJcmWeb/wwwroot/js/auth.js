function logout() {
    localStorage.removeItem("token"); // 🔹 Remove o token JWT do navegador
    alert("Logout realizado com sucesso!");
    window.location.href = "/login.html"; // 🔹 Redireciona para a tela de login
}