const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = new sqlite3.Database("database.db");

db.run(`
  CREATE TABLE IF NOT EXISTS score (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    pontos INTEGER
  )
`);

app.get("/score", (req, res) => {
  db.get("SELECT MAX(pontos) as recorde FROM score", (err, row) => {
    res.json({ recorde: row.recorde || 0 });
  });
});

app.post("/score", (req, res) => {
  const { pontos } = req.body;
  db.run("INSERT INTO score (pontos) VALUES (?)", [pontos]);
  res.json({ ok: true });
});

app.listen(3000, () =>
  console.log("Servidor rodando em http://localhost:3000")
);
