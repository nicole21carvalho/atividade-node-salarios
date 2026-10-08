// Regras da atividade, separadas do servidor para poderem ser testadas (salarios.test.js).

/**
 * Converte um valor digitado em número. Aceita o formato brasileiro:
 *   "1500"  "1500,50"  "1.500,50"  "R$ 2.300"  e também "1500.50"
 */
function lerValor(texto) {
  let valor = texto.replace(/R\$/gi, '').trim();

  if (valor.includes(',')) {
    // Com vírgula, o ponto é separador de milhar: "1.500,50" → "1500.50"
    valor = valor.replace(/\./g, '').replace(',', '.');
  } else if (/^\d{1,3}(\.\d{3})+$/.test(valor)) {
    // Só pontos em grupos de 3 dígitos: "1.500" ou "12.000" são milhares
    valor = valor.replace(/\./g, '');
  }

  if (!/^\d+(\.\d+)?$/.test(valor)) return NaN;
  return Number(valor);
}

/**
 * Lê vários salários de um texto. Os salários podem ser separados por
 * quebra de linha, ponto e vírgula ou espaço. A vírgula fica livre para
 * ser usada como separador decimal (1500,50).
 */
function lerSalarios(texto) {
  const partes = String(texto)
    .replace(/R\$\s*/gi, '')          // "R$ 2.300" não vira "R$" + "2.300"
    .split(/[\n;\s]+/)
    .map((parte) => parte.replace(/,$/, '').trim())
    .filter(Boolean);

  const validos = [];
  const invalidos = [];
  partes.forEach((parte) => {
    const valor = lerValor(parte);
    if (Number.isFinite(valor) && valor >= 0) validos.push(valor);
    else invalidos.push(parte);
  });
  return { validos, invalidos };
}

function formatarReais(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }).replace(/ /g, ' ');
}

function montarRelatorio(salarios) {
  const lista = salarios.map((salario, i) => `${i + 1}. ${formatarReais(salario)}`).join('\n');
  return [
    'Resultado da Atividade - Node.js e JavaScript',
    '',
    'Lista de salários:',
    lista,
    '',
    'Maior salário:',
    formatarReais(Math.max(...salarios)),
    '',
  ].join('\n');
}

module.exports = { lerValor, lerSalarios, formatarReais, montarRelatorio };
