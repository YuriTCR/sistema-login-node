const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcrypt");

const router = express.Router();

// Criando banco
const db = new sqlite3.Database("./database.db");

// Criando tabela automaticamente
db.run(`
CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    senha TEXT
)
`);

// Rota de cadastro
router.post("/register", async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ erro: "Preencha todos os campos" });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    db.run(
        "INSERT INTO usuarios (email, senha) VALUES (?, ?)",
        [email, senhaCriptografada],
        function (err) {
            if (err) {
                return res.status(400).json({ erro: "Usuário já existe" });
            }

            res.json({ mensagem: "Usuário criado com sucesso" });
        }
    );
});

// Rota de login
router.post("/login", (req, res) => {
    const { email, senha } = req.body;

    db.get(
        "SELECT * FROM usuarios WHERE email = ?",
        [email],
        async (err, usuario) => {

            if (!usuario) {
                return res.status(400).json({ erro: "Usuário não encontrado" });
            }

            const senhaValida = await bcrypt.compare(senha, usuario.senha);

            if (!senhaValida) {
                return res.status(400).json({ erro: "Senha incorreta" });
            }

            res.json({ mensagem: "Login realizado com sucesso" });
        }
    );
});

module.exports = router;