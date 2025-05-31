
const apiUrl = "https://localhost:44315"; // Ajuste para a porta da API
const token = sessionStorage.getItem("JwtToken"); // Obtendo o token JWT armazenado

async function fetchUsuarios() {
    try {
        if (!token) {
            alert("Você precisa fazer login primeiro!");
            window.location.href = "/Login"; // Redireciona para login se não houver token
            return;
        }

        const response = await fetch(`${apiUrl}/api/Usuarios`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` // Enviando o token JWT
            }
        });

        if (!response.ok) {
            throw new Error("Erro ao buscar usuários");
        }

        const usuarios = await response.json();
        atualizarListaUsuarios(usuarios); // Chamada da função de atualização

    } catch (error) {
        console.error("Erro:", error);
        alert("Falha ao carregar usuários.");
    }
}

//------Atualiza lista de Usuarios------------------------------------------------------------
/*
function atualizarListaUsuarios(usuarios) {
    const lista = document.getElementById("usuarios-list");
    lista.innerHTML = ""; // Limpa a lista antes de atualizar

    usuarios.forEach(user => {
        const item = document.createElement("li");
        item.innerHTML = `
                <strong>${user.nome}</strong> - Perfil: ${user.perfil}
                <button onclick="editarUsuario(${user.id})">Editar</button>
                <button onclick="excluirUsuario(${user.id})" style="color: red;">Excluir</button>
            `;

        lista.appendChild(item);

    });
}
*/

//------Atualiza lista de Usuarios----ALTERACOES---------------------------------------

function atualizarListaUsuarios(usuarios) {
    const lista = document.getElementById("usuarios-list");
    lista.innerHTML = ""; // Limpa a lista antes de atualizar

    usuarios.forEach(user => {
        const item = document.createElement("li");
        item.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");

        item.innerHTML = `
                <span class="fw-bold">${user.nome}</span>
                <span class="badge bg-primary">${user.perfil}</span>
                <span class="text-muted">ID: ${user.id}</span>
                <div class="d-flex gap-2">
                    <button class="btn btn-warning btn-sm" onclick="editarUsuario(${user.id})">Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="excluirUsuario(${user.id})" style="color: red;">Excluir</button>
                </div>
            `;

        lista.appendChild(item);

    });
}

fetchUsuarios(); // Chama a função ao carregar a página

/*
//------Busca por ID---------------------------------------------------------------------

async function buscarUsuarioPorId() {
    const id = document.getElementById("buscar-usuario-id").value;

    if (!id) {
        alert("Por favor, insira um ID válido!");
        return;
    }

    try {
        const response = await fetch(`${apiUrl}/api/Usuarios/${id}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error("Usuário não encontrado.");
        }

        const usuario = await response.json();
        console.log("Usuário encontrado:", usuario);
        alert(`Usuário: ${ usuario.nome }, Perfil: ${ usuario.perfil }`);

    } catch (error) {
        console.error("Erro ao buscar usuário:", error);
        alert("Usuário não encontrado.");
    }
}

//------Busca por Nome-------------------------------------------------------------------

async function buscarUsuariosPorNome() {
    const termoBusca = document.getElementById("busca-usuario").value.trim();

    try {
        const response = await fetch(`${apiUrl}/api/Usuarios?nome=${encodeURIComponent(termoBusca)}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error("Erro ao buscar usuários.");
        }

        const usuarios = await response.json();
        atualizarListaUsuarios(usuarios); // Atualiza a lista com os resultados filtrados

    } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        alert("Falha ao buscar usuários.");
    }
}
*/

//------Busca por ID ou Nome-------------------------------------------------------------

async function buscarUsuario() {
    const termoBusca = document.getElementById("campo-busca").value.trim();

    if (!termoBusca) {
        alert("Por favor, insira um ID ou nome válido!");
        return;
    }

    const isNumero = !isNaN(termoBusca); // Verifica se o que foi digitado é um número

    const url = isNumero
        ? `${apiUrl}/api/Usuarios/${termoBusca}` // Busca por ID
        : `${apiUrl}/api/Usuarios?nome=${encodeURIComponent(termoBusca)}`; // Busca por nome

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error("Usuário não encontrado.");
        }

        const resultado = await response.json();

        if (isNumero) {
            alert(`Usuário: ${resultado.nome}, Perfil: ${resultado.perfil}`);
        } else {
            atualizarListaUsuarios(resultado); // 🔹 Atualiza a lista se a busca for por nome
        }

    } catch (error) {
        console.error("Erro ao buscar usuário:", error);
        alert("Usuário não encontrado.");
    }
}

//------Cadastro de Usuário----(Botão)---------------------------------------------------

function abrirFormulario() {
    document.getElementById("formulario-cadastro").style.display = "block";
}

function fecharFormulario() {
    document.getElementById("formulario-cadastro").style.display = "none";
}

//------Cadastro de Usuário----(Função)----------------------------------------------------

async function cadastrarUsuario() {
    const nome = document.getElementById("nome-usuario").value;
    const password = document.getElementById("password-usuario").value;
    const perfilTexto = document.getElementById("perfil-usuario").value;
    const token = sessionStorage.getItem("JwtToken");

    if (!token) {
        alert("Você precisa fazer login primeiro!");
        window.location.href = "/Login";
        return;
    }

    if (!nome || !password || !perfilTexto) {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    // Conversão de "Administrador" e "Usuario" para 0 e 1
    const perfil = perfilTexto === "Administrador" ? 0 : 1;

    try {
        const response = await fetch(`${apiUrl}/api/Usuarios`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ nome, password, perfil }) // Envio do perfil como número
        });

        console.log("Status da resposta:", response.status);

        if (!response.ok) {
            throw new Error("Erro ao cadastrar usuário.");
        }

        alert("Usuário cadastrado com sucesso!");
        fecharFormulario();
        fetchUsuarios();

    } catch (error) {
        console.error("Erro ao cadastrar usuário:", error);
        alert("Falha na conexão com o servidor.");
    }
}

//------Editar Usuario-------------------------------------------------------------------

async function editarUsuario(id) {
    try {
        const response = await fetch(`${apiUrl}/api/Usuarios/${id}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error("Erro ao buscar dados do usuário.");
        }

        const usuario = await response.json();

        // Preenche o formulário de edição com os dados do usuário
        document.getElementById("nome-edicao").value = usuario.nome;
        document.getElementById("perfil-edicao").value = usuario.perfil;
        document.getElementById("id-edicao").value = usuario.id;

        document.getElementById("formulario-edicao").style.display = "block";

    } catch (error) {
        console.error("Erro ao buscar usuário:", error);
        alert("Falha ao carregar dados para edição.");
    }
}

//------Salvar a Edição/Alteração--------------------------------------------------------

async function salvarEdicaoUsuario() {
    const id = document.getElementById("id-edicao").value;
    const nome = document.getElementById("nome-edicao").value;
    const password = document.getElementById("senha-edicao").value;
    let perfil = document.getElementById("perfil-edicao").value;

    // Conversão para 0 e 1
    perfil = perfil === "Administrador" ? 0 : 1;

    if (!id || !nome || perfil === undefined) {
        alert("Todos os campos devem estar preenchidos corretamente!");
        return;
    }

    let usuarioAtualizado = { id, nome, perfil };

    if (password.trim() !== "") {
        usuarioAtualizado.password = password;
    }

    try {
        const response = await fetch(`${apiUrl}/api/Usuarios/${id}`, { // O ID continua no URL
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(usuarioAtualizado) // Agora a senha só vai se for preenchida
        });

        if (!response.ok) {
            throw new Error("Erro ao salvar alterações.");
        }

        alert("Usuário atualizado com sucesso!");
        fecharFormularioEdicao();
        fetchUsuarios(); // Atualiza a lista automaticamente

    } catch (error) {
        console.error("Erro ao atualizar usuário:", error);
        alert("Falha na conexão com o servidor.");
    }
}

function fecharFormularioEdicao() {
    document.getElementById("formulario-edicao").style.display = "none";
}


//------Excluir Usuario-------------------------------------------------------------------

async function excluirUsuario(id) {
    if (!confirm("Tem certeza que deseja excluir este usuário?")) {
        return; // Cancela a exclusão em caso de não confirmação
    }

    try {
        const response = await fetch(`${apiUrl}/api/Usuarios/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error("Erro ao excluir usuário.");
        }

        alert("Usuário excluído com sucesso!");
        fetchUsuarios(); // Atualiza a lista automaticamente

    } catch (error) {
        console.error("Erro ao excluir usuário:", error);
        alert("Falha na conexão com o servidor.");
    }
}
