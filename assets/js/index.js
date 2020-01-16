// Selecionando elementos do cadastro
const cadastro = document.querySelector(".cadastro");
const nome = cadastro.querySelector(".nome")
const sobrenome = cadastro.querySelector(".sobrenome")
const email = cadastro.querySelector(".email")
const idade = cadastro.querySelector(".idade")
const button = cadastro.querySelector(".enviar")
const inputs = document.querySelectorAll(".cadastro_inputs")

// Array para guardar os valores dos inputs
const dados = []

// Selecionando elementos da lista
const lista = document.querySelector(".lista");
const usuarios = lista.querySelector(".usuarios");

function criarDiv() {
    const div = document.createElement("div");
    return div;
}

function criarParagrafo() {
    const paragrafo = document.createElement("p");
    return paragrafo;
}

function criarBotao() {
    const button = document.createElement("button");
    button.innerText = "Excluir"
    return button;
}

function limparInput() {
    nome.value = "";
    sobrenome.value = "";
    email.value = "";
    idade.value = "";
}

function pegarData() {
    const date = new Date();
    return date;
}

function zeroAEsquerda(num) {
    return num >= 10 ? num : `0${num}`;
}

function erro(mensagem) {
    const textoErro = criarDiv();
    const erros = document.querySelector(".erros");
    textoErro.setAttribute("class", "erro");
    textoErro.innerText = mensagem;
    erros.appendChild(textoErro)
    return textoErro;
}

function salvarUsuario() {

    const divsUsuario = usuarios.querySelectorAll("div")
    const listaDeUsuarios = []

    for (let usuario of divsUsuario) {
        let usuarioTexto = usuario.innerText;
        usuarioTexto = usuarioTexto.replace("Excluir", "");
        listaDeUsuarios.push(usuarioTexto);
    }
    const usuariosJSON = JSON.stringify(listaDeUsuarios)
    localStorage.setItem("usuarios", usuariosJSON)
}

function lerUsuariosLocalStorage() {

    const usuariosLocalStorage = localStorage.getItem("usuarios")
    const listaDeUsuarios = JSON.parse(usuariosLocalStorage)

    for (let usuario of listaDeUsuarios) {

        const divUsuario = document.createElement("div")
        divUsuario.setAttribute("class", "usuario")
        divUsuario.innerHTML = usuario
            // Criando um botão de excluir dentro da divUsuario
        divUsuario.innerHTML += `<button class='excluir'>Excluir</button>`
        usuarios.appendChild(divUsuario);
    }

}

function refresh() {
    window.location.reload();
}

function criarUsuario(dados) {
    // Limpando a div
    document.querySelector(".erros").innerHTML = "";

    // Verificando os inputs
    if (nome.value === "") {
        erro("Digite o nome...");
        return;
    }

    if (sobrenome.value === "") {
        erro("Digite o sobrenome...");
        return;
    }

    if (email.value === "") {
        erro("Digite o email...");
        return
    }
    if (idade.value === "") {
        erro("Digite a idade...");
        return
    }

    const div = criarDiv();
    const p = criarParagrafo();
    const button = criarBotao();

    // Data e horas
    const data = pegarData();
    const dia = data.getDate()
    const mes = data.getMonth() + 1;
    const ano = data.getFullYear();
    const hora = data.getHours();
    const minutos = data.getMinutes();

    // Adicionando uma classe na div e no botão
    div.setAttribute("class", "usuario")
    button.setAttribute("class", "excluir")

    // Armazenando os dados dos inputs no Array
    dados.push(nome.value + " " + "" + sobrenome.value + ", " + email.value + ", " + idade.value)

    p.innerText = dados + ` Data de registro: ${zeroAEsquerda(dia)}/${zeroAEsquerda(mes)}/${zeroAEsquerda(ano)} - ${zeroAEsquerda(hora)}:${zeroAEsquerda(minutos)}`;

    div.appendChild(p)
    div.appendChild(button)
    usuarios.appendChild(div)

    limparInput();
    salvarUsuario();
    refresh();
}

// Função de excluir usuário
document.addEventListener("click", function(evento) {
    // Pegando o evento de click
    const click = evento.target;

    // Se o evento de click conter a classe "excluir", remova o pai do elemento
    if (click.classList.contains("excluir")) {
        click.parentElement.remove();
        salvarUsuario();
    }

});

button.addEventListener("click", function() {
    criarUsuario(dados)
});

lerUsuariosLocalStorage();