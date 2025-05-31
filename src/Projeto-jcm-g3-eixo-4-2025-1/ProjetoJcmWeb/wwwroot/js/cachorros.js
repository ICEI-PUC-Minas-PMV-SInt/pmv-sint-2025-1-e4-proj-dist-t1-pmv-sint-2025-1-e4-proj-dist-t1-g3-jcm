const apiUrl = "https://localhost:44315";
const token = sessionStorage.getItem("JwtToken");

// Buscar todos os cachorros
async function fetchCachorros() {
    try {
        if (!token) {
            alert("Você precisa fazer login primeiro!");
            window.location.href = "/Login";
            return;
        }

        const response = await fetch(`${apiUrl}/api/Cachorros`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error("Erro ao buscar cachorros");
        }

        const cachorros = await response.json();
        console.log("Cachorros carregados:", cachorros); //msg de teste

        atualizarListaCachorros(cachorros);
        return cachorros; //este retorno nao existia

    } catch (error) {
        console.error("Erro:", error);
        alert("Falha ao carregar cachorros.");
    }
}

// Atualizar lista de cachorros----------------------------------------------------------
function atualizarListaCachorros(cachorros) {
    const lista = document.getElementById("cachorros-list");
    lista.innerHTML = "";

    cachorros.forEach(cachorro => {
        const item = document.createElement("li");
        item.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");

        item.innerHTML = `
            <span class="fw-bold">${cachorro.nome}</span>
            <span class="badge bg-primary">${cachorro.raca}</span>
            <span class="text-muted">Nascimento: ${cachorro.nascimento}</span>
            <div class="d-flex gap-2">
                <button class="btn btn-warning btn-sm" onclick="editarCachorro(${cachorro.id})">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="excluirCachorro(${cachorro.id})">Excluir</button>
            </div>
        `;

        lista.appendChild(item);
    });
}

// Executa busca ao carregar a página
fetchCachorros();

//------Busca por ID ou Nome-------------------------------------------------------------

async function buscarCachorro() {
    const termoBusca = document.getElementById("campo-busca").value.trim();

    if (!termoBusca) {
        alert("Por favor, insira um ID ou nome válido!");
        return;
    }

    const isNumero = !isNaN(termoBusca);

    const url = isNumero
        ? `${apiUrl}/api/Cachorros/${termoBusca}`
        : `${apiUrl}/api/Cachorros?nome=${encodeURIComponent(termoBusca)}`;

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}` // Adiciona o token de autenticação
            }
        });

        console.log("Status da resposta:", response.status);

        if (!response.ok) {
            throw new Error("Cachorro não encontrado.");
        }

        const resultado = await response.json();
        console.log("Resultado JSON:", resultado);

        if (isNumero) {
            alert(`Cachorro: ${resultado.nome}, 
                       Raça: ${resultado.raca}, 
                 Nascimento: ${resultado.nascimento}`);
        }
        else {
            atualizarListaCachorros(resultado); //Atualiza lista em busca por nome
        }

        if (Array.isArray(resultado)) {
            atualizarListaCachorros(resultado);
        } else if (resultado && typeof resultado === "object") {
            atualizarListaCachorros([resultado]); // Transforma objeto único em array
        } else {
            console.error("Formato inesperado de resposta da API:", resultado);
        }

    }
    catch (error) {
        console.error("Erro ao buscar cachorro:", error);
        alert("Cachorro não encontrado.");
    }
}

// Cadastrar cachorro (Botão)
//function abrirFormularioCachorro() {
//    document.getElementById("formulario-cadastro-cachorro").style.display = "block";
//}

function abrirFormularioCachorro() {
    document.getElementById("formulario-cadastro-cachorro").style.display = "block";

    // Resetando os valores do formulário para cadastro
    document.getElementById("id-cachorro").value = "";
    document.getElementById("nome-cachorro").value = "";
    document.getElementById("raca-cachorro").value = "";
    document.getElementById("nascimento-cachorro").value = "";

    // Restaurar o botão para cadastrarCachorro()
    const botaoSalvar = document.getElementById("botao-salvar");
    botaoSalvar.textContent = "Cadastrar";
    botaoSalvar.setAttribute("onclick", "cadastrarCachorro()");
}

function fecharFormularioCachorro() {
    document.getElementById("formulario-cadastro-cachorro").style.display = "none";
}

// Cadastro de novo cachorro
async function cadastrarCachorro() {
    const nome = document.getElementById("nome-cachorro").value;
    const raca = document.getElementById("raca-cachorro").value;
    const nascimento = document.getElementById("nascimento-cachorro").value;

    if (!nome || !raca || nascimento <= 0) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    try {
        const response = await fetch(`${apiUrl}/api/Cachorros`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ nome, raca, nascimento })
        });

        if (!response.ok) {
            throw new Error("Erro ao cadastrar cachorro.");
        }

        alert("Cachorro cadastrado com sucesso!");
        fetchCachorros(); // Atualiza a lista

    } catch (error) {
        console.error("Erro ao cadastrar cachorro:", error);
        alert("Falha ao salvar.");
    }
}

async function editarCachorro(id) {
    try {
        console.log("Iniciando edicao do cachorro ID:", id);

        const response = await fetch(`${apiUrl}/api/Cachorros/${id}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error("Erro ao buscar dados do cachorro.");
        }

        const cachorro = await response.json();

        console.log("Dados do cachorro recebidos:", cachorro);

        document.getElementById("edit-id-cachorro").value = cachorro.id;
        document.getElementById("edit-nome-cachorro").value = cachorro.nome;
        document.getElementById("edit-raca-cachorro").value = cachorro.raca;
        document.getElementById("edit-nascimento-cachorro").value = cachorro.nascimento;

        console.log("ID definido corretamente:", cachorro.id);

        document.getElementById("formulario-edicao-cachorro").style.display = "block";

    } catch (error) {
        console.error("Erro ao editar cachorro:", error);
        alert("Falha ao carregar dados para edição.");
    }
}

async function salvarEdicaoCachorro() {
    const id = document.getElementById("edit-id-cachorro").value;
    const nome = document.getElementById("edit-nome-cachorro").value;
    const raca = document.getElementById("edit-raca-cachorro").value;
    const nascimento = document.getElementById("edit-nascimento-cachorro").value;

    if (!id || !nome || !raca || !nascimento === undefined) {
        alert("Todos os campos devem estar preenchidos corretamente!");
        return;
    }

    try {
        const response = await fetch(`${apiUrl}/api/Cachorros/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ id, nome, nascimento, raca })
        });

        if (!response.ok) {
            throw new Error("Erro ao salvar alterações.");
        }

        alert("Cachorro atualizado com sucesso!");
        fecharFormularioEdicaoCachorro();
        fetchCachorros();

    } catch (error) {
         console.error("Erro ao atualizar cachorro:", error);
         alert("Falha na conexão com o servidor.");
    }

}

function fecharFormularioEdicaoCachorro() {
    document.getElementById("formulario-edicao-cachorro").style.display = "none";
}

//------Excluir Cachorro-------------------------------------------------------------------

async function excluirCachorro(id) {
    if (!confirm("Tem certeza que deseja excluir este cachorro?")) {
        return; // Cancela a exclusão em caso de não confirmação
    }

    try {
        const response = await fetch(`${apiUrl}/api/Cachorros/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error("Erro ao excluir cachorro.");
        }

        alert("Cachorro excluído com sucesso!");
        fetchCachorros(); // Atualiza a lista automaticamente

    } catch (error) {
        console.error("Erro ao excluir cachorro:", error);
        alert("Falha na conexão com o servidor.");
    }
}