function carregarData() {
    let data = localStorage.getItem("dataCadastro");
    if (data) {
        document.getElementById("dataCadastro").value = data; // Mantém a data no input
    }
}

function salvarData() {
    let data = document.getElementById("dataCadastro").value;
    if (data) {
        localStorage.setItem("dataCadastro", data);
    }
}

// Garante que a data será carregada ao abrir a página
document.addEventListener("DOMContentLoaded", carregarData);


function apagarData() {
    localStorage.removeItem("dataCadastro");
    document.getElementById("dataCadastro").value = "";
    document.getElementById("dataExibida").textContent = "";
}

function formatarData(data) {
    let partes = data.split("-");
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
}


function salvarCarros(carros) {
    localStorage.setItem("estoqueCarros", JSON.stringify(carros));
}

function carregarCarros() {
    let carros = JSON.parse(localStorage.getItem("estoqueCarros")) || [];
    let tabela = document.getElementById("lista-carros");
    tabela.innerHTML = "";

    // Agrupando os carros por marca
    let carrosPorMarca = carros.reduce((acc, carro) => {
        acc[carro.marca] = acc[carro.marca] || [];
        acc[carro.marca].push(carro);
        return acc;
    }, {});

    // Exibindo os carros por marca
    Object.keys(carrosPorMarca).forEach(marca => {
        let tituloMarca = document.createElement("tr");
        tituloMarca.innerHTML = `<th colspan="8">${marca}</th>`;
        tabela.appendChild(tituloMarca);

        carrosPorMarca[marca].forEach((carro, index) => {
            adicionarLinhaCarro(carro, index);
        });
    });

    let linkFoto = document.createElement("a");
    linkFoto.href = carro.foto;
    linkFoto.target = "_blank";
    linkFoto.textContent = "Ver Foto";
    linha.insertCell(5).appendChild(linkFoto);

    let cellAcoes = linha.insertCell(6);
    let btnEditar = document.createElement("button");
    btnEditar.textContent = "Editar";
    btnEditar.onclick = function () { editarCarro(index); };
    cellAcoes.appendChild(btnEditar);

    let btnExcluir = document.createElement("button");
    btnExcluir.textContent = "Apagar";
    btnExcluir.onclick = function () { excluirCarro(index); };
    cellAcoes.appendChild(btnExcluir);
}

let editIndex = null; // Variável global para armazenar o índice do carro a ser editado

function adicionarCarro() {
    let nome = document.getElementById("nome").value || "Não Informado";
    let ano = document.getElementById("ano").value || "Não Informado";
    let placa = document.getElementById("placa").value || "Não Informado";
    let cor = document.getElementById("cor").value || "Não Informado";
    let foto = document.getElementById("foto").value || "Não Informado";
    let marca = document.getElementById("marca").value || "Não Informado"; // Adiciona valor padrão se não for informado

    let carros = JSON.parse(localStorage.getItem("estoqueCarros")) || [];
    let novoCarro = { nome, ano, placa, cor, foto, marca, status: "" };

    if (editIndex === null) {
        carros.push({ nome, ano, placa, cor, foto, marca, status: "branco" });
    } else {
        carros[editIndex] = { nome, ano, placa, cor, foto, marca, status: carros[editIndex].status };
        document.getElementById("btnAdicionar").textContent = "Adicionar Carro";
        editIndex = null;
    }

    salvarCarros(carros);
    carregarCarros();
    limparCampos();
}

function editarCarro(index) {
    let carros = JSON.parse(localStorage.getItem("estoqueCarros"));
    let carro = carros[index];

    document.getElementById("nome").value = carro.nome;
    document.getElementById("ano").value = carro.ano;
    document.getElementById("placa").value = carro.placa;
    document.getElementById("cor").value = carro.cor;
    document.getElementById("foto").value = carro.foto;
    document.getElementById("marca").value = carro.marca;

    document.getElementById("btnAdicionar").textContent = "Salvar Alteração";
    editIndex = index;
}



function adicionarLinhaCarro(carro, index) {
    let tabela = document.getElementById("lista-carros");
    let linha = tabela.insertRow();
    linha.insertCell(0).textContent = carro.nome;
    linha.insertCell(1).textContent = carro.ano;
    linha.insertCell(2).textContent = carro.placa;
    linha.insertCell(3).textContent = carro.cor;
    linha.insertCell(4).textContent = carro.marca; // Exibindo a marca
    linha.className = carro.status;

    let linkFoto = document.createElement("a");
    linkFoto.href = carro.foto;
    linkFoto.target = "_blank";
    linkFoto.textContent = "Ver Foto";
    linkFoto.style.display = "block";
    linkFoto.style.fontWeight = "bold";  // Estilo para deixar o texto em negrito
    linkFoto.style.color = "black";  // Estilo para deixar a cor do texto preta
    linha.insertCell(5).appendChild(linkFoto);


    let select = document.createElement("select");
    let opcoes = ["--", "Post e foto", "Sem Foto", "Não terá foto", "Vendido"];
    let cores = ["branco", "verde", "rosa", "vermelho", "azul"];

    opcoes.forEach((opcao, i) => {
        let option = document.createElement("option");
        option.value = cores[i];
        option.textContent = opcao;
        if (cores[i] === carro.status) {
            option.selected = true;
        }
        select.appendChild(option);
    });

    select.onchange = function () {
        linha.className = this.value;
        let carros = JSON.parse(localStorage.getItem("estoqueCarros"));
        carros[index].status = this.value;
        salvarCarros(carros);
    };

    linha.insertCell(6).appendChild(select);

    // Adicionando botão Editar
    let cellAcoes = linha.insertCell(7);

    let btnEditar = document.createElement("button");
    btnEditar.textContent = "Editar";
    btnEditar.classList.add("btn", "btn-secondary", "me-2"); // Adicionando classes Bootstrap
    btnEditar.onclick = function () { editarCarro(index); };
    cellAcoes.appendChild(btnEditar);

    let btnExcluir = document.createElement("button");
    btnExcluir.textContent = "Apagar";
    btnExcluir.classList.add("btn", "btn-danger");
    btnExcluir.onclick = function () {
        let carros = JSON.parse(localStorage.getItem("estoqueCarros"));
        carros.splice(index, 1);
        salvarCarros(carros);
        carregarCarros();
    };
    cellAcoes.appendChild(btnExcluir);
}


function carregarData() {
    let data = localStorage.getItem("dataCadastro");
    if (data) {
        document.getElementById("dataCadastro").value = data;
        document.getElementById("dataExibida").textContent = "Data cadastrada: " + formatarData(data);
    } else {
        document.getElementById("dataExibida").textContent = "Nenhuma data cadastrada.";
    }
}

function salvarData() {
    let data = document.getElementById("dataCadastro").value;
    if (data) {
        localStorage.setItem("dataCadastro", data);
        carregarData();
    }
}

function formatarData(data) {
    let partes = data.split("-");
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
}
