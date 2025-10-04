// src/server.ts

// Carrega as variáveis de ambiente.
// O "import 'dotenv/config';" é a forma mais moderna de fazer isso.
import 'dotenv/config';

// Importa o Express e outros módulos
import express, { type Request, type Response } from 'express';
import { iniciarSimulacao } from './simulacao.js';
// Cria uma instância do aplicativo Express
const app = express();

// Acessa a variável de ambiente PORT. O `|| 3000` é um fallback caso a variável não esteja definida.
const PORT = process.env.PORT || 3000;

// Middleware para analisar o corpo das requisições JSON
app.use(express.json());

// Rota de teste. Usamos os tipos `Request` e `Response` do Express
// para ter autocompletar e validação de tipos.
app.get('/', (req: Request, res: Response) => {
  iniciarSimulacao();
});

// Inicia o servidor e escuta na porta definida
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});