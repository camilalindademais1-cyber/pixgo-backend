import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/criar-pix", (req, res) => {
  const { valor } = req.body;

  if (!valor) {
    return res.status(400).json({ erro: "Valor não enviado" });
  }

  res.json({
    sucesso: true,
    mensagem: "PIX gerado com sucesso",
    valor: valor,
    pixCopiaCola: "000201PIXFAKE123456"
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Servidor rodando na porta " + PORT);
});
