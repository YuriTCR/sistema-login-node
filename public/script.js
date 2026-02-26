async function cadastrar() {
    const email = document.getElementById("emailCadastro").value;
    const senha = document.getElementById("senhaCadastro").value;

    const resposta = await fetch("/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, senha })
    });

    const dados = await resposta.json();

    document.getElementById("mensagem").innerText =
        dados.mensagem || dados.erro;
}

async function logar() {
    const email = document.getElementById("emailLogin").value;
    const senha = document.getElementById("senhaLogin").value;

    const resposta = await fetch("/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, senha })
    });

    const dados = await resposta.json();

    document.getElementById("mensagem").innerText =
        dados.mensagem || dados.erro;
}