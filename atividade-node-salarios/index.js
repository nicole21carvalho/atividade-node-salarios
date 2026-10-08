const express = require('express');
const path = require('path');
const { lerSalarios, formatarReais, montarRelatorio } = require('./salarios');

const app = express();
const PORT = process.env.PORT || 3000;

// Permite receber dados enviados pelo formulário
app.use(express.urlencoded({ extended: true }));

// Arquivos estáticos: HTML, CSS e JavaScript do front-end
app.use(express.static(path.join(__dirname, 'public')));

// Escapa o texto antes de colocar no HTML, para que nada digitado vire código
function escaparHtml(texto) {
  return String(texto).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}

function pagina(titulo, conteudo) {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${titulo}</title>
  <link rel="stylesheet" href="/style.css">
</head>
<body>
  <main class="container">
    <section class="card">
      ${conteudo}
    </section>
  </main>
</body>
</html>`;
}

function paginaDeErro(mensagem) {
  return pagina('Erro', `
      <h1>Erro</h1>
      <p>${mensagem}</p>
      <div class="botoes"><a class="botao" href="/">Voltar</a></div>`);
}

// Rota que recebe os salários e calcula o maior salário
app.post('/calcular', (req, res) => {
  const entrada = req.body.salarios || '';

  if (entrada.trim() === '') {
    return res.status(400).send(paginaDeErro('Nenhum salário foi informado.'));
  }

  const { validos, invalidos } = lerSalarios(entrada);

  if (validos.length === 0) {
    return res.status(400).send(paginaDeErro('Informe salários válidos, como 1500 ou 1.500,50.'));
  }

  const maiorSalario = Math.max(...validos);
  const listaHtml = validos.map((salario) => `<li>${formatarReais(salario)}</li>`).join('');
  const avisoInvalidos = invalidos.length
    ? `<p class="ajuda">Ignorados por não serem números: ${invalidos.map(escaparHtml).join(', ')}</p>`
    : '';

  res.send(pagina('Resultado dos Salários', `
      <h1>Resultado</h1>

      <h2>Maior salário</h2>
      <p class="maior-salario">${formatarReais(maiorSalario)}</p>

      <h2>Lista de salários</h2>
      <ul class="lista-salarios">${listaHtml}</ul>
      ${avisoInvalidos}

      <div class="botoes">
        <form action="/download" method="POST">
          <input type="hidden" name="salarios" value="${escaparHtml(validos.join('\n'))}">
          <button class="botao" type="submit">Baixar resultado em TXT</button>
        </form>
        <a class="botao secundario" href="/">Voltar</a>
      </div>`));
});

// Gera o TXT na hora, com os salários desta pessoa. Antes o resultado ficava num
// arquivo único no servidor, e quem baixasse podia receber o resultado de outra pessoa.
app.post('/download', (req, res) => {
  const { validos } = lerSalarios(req.body.salarios || '');

  if (validos.length === 0) {
    return res.status(400).send(paginaDeErro('Nenhum resultado para baixar. Volte e calcule os salários primeiro.'));
  }

  res.attachment('resultado.txt');
  res.type('text/plain; charset=utf-8');
  res.send(montarRelatorio(validos));
});

// Iniciando o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Acesse: http://localhost:${PORT}`);
});
