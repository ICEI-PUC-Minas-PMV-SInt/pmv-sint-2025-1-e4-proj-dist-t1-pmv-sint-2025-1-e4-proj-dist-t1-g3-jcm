// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

    document.addEventListener("DOMContentLoaded", function () {
    const token = sessionStorage.getItem("JwtToken");
    const usuarioNome = sessionStorage.getItem("UsuarioNome");
    const loginItem = document.getElementById("loginItem");
    const usuarioItem = document.getElementById("usuarioItem");
    const logoutItem = document.getElementById("logoutItem");

    if (token && usuarioNome) {
        loginItem.style.display = "none"; // Oculta login
        usuarioItem.innerHTML = `<a class="nav-link text-dark" href="#">Bem-vindo, ${usuarioNome}</a>`;
        logoutItem.style.display = "block"; // Exibe o botão de logout
    }
    else {
        usuarioItem.innerHTML = "";         // Remove o nome do usuário
        usuarioItem.style.display = "none"; // Oculta nome do usuário
        logoutItem.style.display = "none";  // Oculta logout antes do login
        loginItem.style.display = "block";  // Exibe login novamente
        }
    });