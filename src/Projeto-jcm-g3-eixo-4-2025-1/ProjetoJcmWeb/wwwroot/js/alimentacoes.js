const apiUrl = "https://localhost:44315";
const token = sessionStorage.getItem("JwtToken");


// Buscar todas as alimentacoes
async function fetchAlimentacoes() {
    try {
        if (!token) {
            alert("Você precisa fazer login primeiro!");
            window.location.href = "/Login"; // Redireciona para login se não houver token
            return;
        }

        const response = await fetch(`${apiUrl}/api/Alimentacoes/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error("Erro ao buscar alimentações");
        }

        const alimentacoes = await response.json();
        console.log("Alimentações carregadas:", alimentacoes);

        atualizarListaAlimentacoes(alimentacoes);

    } catch (error) {
        console.error("Erro ao buscar alimentações:", error);
        alert("Falha ao carregar as alimentações.");
    }
}

// Atualizar lista de alimentacoes
function atualizarListaAlimentacoes(alimentacoes) {
    console.log("Recebido para exibir na interface:", alimentacoes);

    const lista = document.getElementById("alimentacoes-list");
    lista.innerHTML = "";

    const tiposAlimentacao = ["Ração Seca", "Ração Úmida", "Alimento Caseiro", "Petisco", "Alimento Cru"];
    const unidadesMedida = ["Copo", "Gramas", "Scoop", "Vasilhame"];

    alimentacoes.forEach(alimentacao => {
        const tipoTexto = tiposAlimentacao[alimentacao.tipo] || "Desconhecido";
        const medidaTexto = unidadesMedida[alimentacao.medida] || "Desconhecido";
        const dataFormatada = alimentacao.hora ? new Date(alimentacao.hora).toLocaleString("pt-BR") : "Data inválida";

        // 🔹 Adiciona o nome do cachorro
        const nomeCachorro = alimentacao.cachorro?.nome || "Cachorro desconhecido";

        const item = document.createElement("li");
        item.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");

        item.innerHTML = `
            <span class="fw-bold">Cachorro: ${nomeCachorro}</span>
            <span>Tipo: ${tipoTexto}</span>
            <span class="badge bg-primary">Quantidade: ${alimentacao.quantidade} (${medidaTexto})</span>
            <span class="text-muted">Hora: ${dataFormatada}</span>
            <button class="btn btn-warning btn-sm" onclick="editarAlimentacao(${alimentacao.id})">Editar</button>
            <button class="btn btn-danger btn-sm" onclick="excluirAlimentacao(${alimentacao.id})">Excluir</button>
        `;



        lista.appendChild(item);
    });
}

fetchAlimentacoes();

async function buscarAlimentacoes() {
    const nomeCachorro = document.getElementById("campo-busca-nome").value.trim();

    let url = `${apiUrl}/api/Alimentacoes/buscar?`;

    if (nomeCachorro) url += `nomeCachorro=${encodeURIComponent(nomeCachorro)}&`;

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error("Nenhuma alimentação encontrada.");
        }

        const alimentacoes = await response.json();
        console.log("Resultados da busca:", alimentacoes);

        atualizarListaAlimentacoes(alimentacoes); // Exibe os resultados na tela

    } catch (error) {
        console.error("Erro ao buscar alimentações:", error);
        alert("Nenhum registro encontrado.");
    }
}

async function carregarListaCachorros() {
    try {
        const response = await fetch(`${apiUrl}/api/Cachorros`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error("Erro ao carregar lista de cachorros.");
        }

        const cachorros = await response.json();
        console.log("Lista de cachorros carregada:", cachorros);

        const select = document.getElementById("alimentacao-cachorro-id");

        // Confirma que o select foi encontrado
        if (!select) {
            console.error("Erro: Elemento 'alimentacao-cachorro-id' não encontrado no HTML.");
            return;
        }

        // Limpa o select antes de adicionar os novos cachorros
        select.innerHTML = '<option value="">Selecione um cachorro</option>';

        cachorros.forEach(cachorro => {
            const option = document.createElement("option");
            option.value = cachorro.id;
            option.textContent = cachorro.nome;
            select.appendChild(option);
        });

    } catch (error) {
        console.error("Erro ao carregar lista de cachorros:", error);
    }
}

function abrirFormularioAlimentacao() {
    const formulario = document.getElementById("formulario-alimentacao");
    formulario.style.display = "block"; // Exibe o formulário
    carregarListaCachorros(); // Carrega os cachorros no dropdown
}

async function salvarAlimentacao() {
    const cachorroId = document.getElementById("alimentacao-cachorro-id").value;
    const tipo = document.getElementById("tipo-alimentacao").value;
    const quantidade = document.getElementById("quantidade-alimentacao").value;
    const medida = document.getElementById("unidade-medida").value;
    const hora = new Date().toISOString();

    if (!cachorroId || !tipo || !quantidade || !medida) {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    const novaAlimentacao = {
        cachorroId: parseInt(cachorroId),
        tipo: parseInt(tipo),
        quantidade: parseFloat(quantidade),
        medida: parseInt(medida),
        hora: hora
    };

    try {
        const response = await fetch(`${apiUrl}/api/Alimentacoes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(novaAlimentacao)
        });

        if (!response.ok) {
            throw new Error("Erro ao registrar alimentação.");
        }

        alert("Alimentação registrada com sucesso!");
        fetchAlimentacoes(); // Atualiza a lista após o cadastro
        fecharFormularioAlimentacao(); // Fecha o formulário

    } catch (error) {
        console.error("Erro ao registrar alimentação:", error);
        alert("Falha ao registrar alimentação.");
    }
}

function fecharFormularioAlimentacao() {
    const formulario = document.getElementById("formulario-alimentacao");
    formulario.style.display = "none"; // Oculta o formulário
}

async function excluirAlimentacao(id) {
    if (!confirm("Tem certeza que deseja excluir esta alimentação?")) return;

    try {
        const response = await fetch(`${apiUrl}/api/Alimentacoes/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error("Erro ao excluir alimentação.");
        }

        alert("Alimentação excluída com sucesso!");
        fetchAlimentacoes(); // 🔹 Atualiza a lista após exclusão

    } catch (error) {
        console.error("Erro ao excluir alimentação:", error);
        alert("Falha ao excluir alimentação.");
    }
}

async function editarAlimentacao(id) {
    try {
        const response = await fetch(`${apiUrl}/api/Alimentacoes/${id}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error("Erro ao carregar dados da alimentação.");
        }

        const alimentacao = await response.json();

        console.log("Alimentação carregada para edição:", alimentacao);

        // 🔹 Exibe o nome do cachorro no formulário de edição

        document.getElementById("edicao-cachorro-nome").textContent = alimentacao.cachorro?.nome || "Cachorro desconhecido";
        document.getElementById("edicao-cachorro-nome").setAttribute("data-cachorro-id", alimentacao.cachorroId || "0"); // 🔹 Agora pega diretamente `alimentacao.cachorroId`

        // 🔹 Preenche os campos restantes do formulário
        document.getElementById("edicao-tipo-alimentacao").value = alimentacao.tipo;
        document.getElementById("edicao-quantidade-alimentacao").value = alimentacao.quantidade;
        document.getElementById("edicao-unidade-medida").value = alimentacao.medida;

        // 🔹 Exibe o formulário de edição
        document.getElementById("formulario-edicao").style.display = "block";

        // 🔹 Ajusta o botão "Atualizar" para salvar a edição
        const botaoAtualizar = document.getElementById("botao-atualizar");
        botaoAtualizar.setAttribute("onclick", `salvarEdicaoAlimentacao(${id})`);
    } catch (error) {
        console.error("Erro ao carregar alimentação para edição:", error);
        alert("Falha ao carregar dados para edição.");
    }
}

async function salvarEdicaoAlimentacao(id) {
    console.log("Enviando edição para ID:", id);

    const tipo = document.getElementById("edicao-tipo-alimentacao").value;
    const quantidade = document.getElementById("edicao-quantidade-alimentacao").value;
    const medida = document.getElementById("edicao-unidade-medida").value;
    const hora = new Date().toISOString();

    // 🔹 Pegamos o `cachorroId` associado à alimentação
    const cachorroId = parseInt(document.getElementById("edicao-cachorro-nome").getAttribute("data-cachorro-id")) || 0;

    const dadosEditados = {
        id: id,
        cachorroId: parseInt(cachorroId), // 🔹 Adiciona o ID do cachorro
        tipo: parseInt(tipo),
        quantidade: parseFloat(quantidade),
        medida: parseInt(medida),
        hora: hora
    };

    console.log("Dados enviados na edição:", dadosEditados); // 🔹 Verifique os dados no console

    try {
        const response = await fetch(`${apiUrl}/api/Alimentacoes/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(dadosEditados)
        });

        if (!response.ok) {
            throw new Error("Erro ao atualizar alimentação.");
        }

        alert("Alimentação editada com sucesso!");
        fetchAlimentacoes();
        fecharFormularioEdicao();
    } catch (error) {
        console.error("Erro ao editar alimentação:", error);
        alert("Falha ao editar alimentação.");
    }
}

function fecharFormularioEdicao() {
    document.getElementById("formulario-edicao").style.display = "none";
}