function logout() {
    localStorage.removeItem("token");           // Remove o token JWT do navegador
    sessionStorage.removeItem("JwtToken");      // Remove token
    sessionStorage.removeItem("UsuarioNome");   // Remove nome do usuário
    alert("Logout realizado com sucesso!");
    window.location.href = "/login";            // Redireciona para a tela de login
}