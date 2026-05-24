const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Permite receber dados enviados pelo formulário
app.use(express.urlencoded({ extended: true }));

// Arquivos estáticos: HTML, CSS e JavaScript do front-end
app.use(express.static(path.join(__dirname, 'public')));

// Rota principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota que recebe os salários e calcula o maior salário
app.post('/calcular', (req, res) => {
  const entradaSalarios = req.body.salarios;

  if (!entradaSalarios || entradaSalarios.trim() === '') {
    return res.send(`
      <h1>Erro</h1>
      <p>Nenhum salário foi informado.</p>
      <a href="/">Voltar</a>
    `);
  }

  // Aceita salários separados por vírgula, ponto e vírgula, espaço ou quebra de linha
  const salarios = entradaSalarios
    .split(/[\n,; ]+/)
    .map(valor => valor.replace(',', '.'))
    .map(valor => parseFloat(valor))
    .filter(valor => !isNaN(valor) && valor >= 0);

  if (salarios.length === 0) {
    return res.send(`
      <h1>Erro</h1>
      <p>Informe salários válidos.</p>
      <a href="/">Voltar</a>
    `);
  }

  const maiorSalario = Math.max(...salarios);

  const listaFormatada = salarios
    .map((salario, index) => `${index + 1}. R$ ${salario.toFixed(2)}`)
    .join('\n');

  const conteudoTxt = 
`Resultado da Atividade - Node.js e JavaScript

Lista de salários:
${listaFormatada}

Maior salário:
R$ ${maiorSalario.toFixed(2)}
`;

  // Salva o resultado em um arquivo TXT
  fs.writeFileSync(path.join(__dirname, 'resultado.txt'), conteudoTxt, 'utf8');

  const listaHtml = salarios
    .map(salario => `<li>R$ ${salario.toFixed(2)}</li>`)
    .join('');

  res.send(`
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Resultado dos Salários</title>
      <link rel="stylesheet" href="/style.css">
    </head>
    <body>
      <main class="container">
        <section class="card">
          <h1>Resultado</h1>

          <h2>Maior salário</h2>
          <p class="maior-salario">R$ ${maiorSalario.toFixed(2)}</p>

          <h2>Lista de salários</h2>
          <ul class="lista-salarios">
            ${listaHtml}
          </ul>

          <div class="botoes">
            <a class="botao" href="/download">Baixar resultado em TXT</a>
            <a class="botao secundario" href="/">Voltar</a>
          </div>
        </section>
      </main>
    </body>
    </html>
  `);
});

// Rota para baixar o TXT
app.get('/download', (req, res) => {
  const arquivo = path.join(__dirname, 'resultado.txt');

  if (fs.existsSync(arquivo)) {
    res.download(arquivo);
  } else {
    res.send('Nenhum resultado foi gerado ainda. Volte e calcule os salários primeiro.');
  }
});

// Iniciando o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Acesse: http://localhost:${PORT}`);
});
