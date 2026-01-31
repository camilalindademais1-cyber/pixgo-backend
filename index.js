const express = require("express");
const fetch = require("node-fetch");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("PixGo Backend ONLINE ✅");
});

const API_KEY = process.env.PIXGO_API_KEY;

app.post("/criar-pix", async (req, res) => {
  const { valor } = req.body;

  if (!valor || valor <= 0) {
    return res.json({ error: "Valor inválido" });
  }

  try {
    const response = await fetch("https://api.pixgo.com.br/v1/pix", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        amount: valor,
        description: "Depósito PIX"
      })
    });

    const data = await response.json();
    res.json(data);

  } catch (e) {
    res.json({ error: "Erro ao criar PIX", detalhe: e.message });
  }
});

app.listen(3000, () => {
  console.log("Servidor rodando");
});
