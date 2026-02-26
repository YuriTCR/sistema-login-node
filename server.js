const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");


const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes);

app.use(express.static("public"));


app.post("/auth", (req, res) => {
    console.log(req.body);
    res.json({ mensagem: "Recebi os dados!"});
});

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});