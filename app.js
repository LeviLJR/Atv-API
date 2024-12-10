const express = require("express");
const path = require("path");
const tasksRouter = require("./routes/tasks");

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/tasks", tasksRouter);

// Rota raiz para teste
app.get("/", (req, res) => {
  res.send("Bem-vindo à API de Gerenciamento de Tarefas!");
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

module.exports = app;
