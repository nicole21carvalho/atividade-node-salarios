// Rode com: npm test
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { lerValor, lerSalarios, formatarReais, montarRelatorio } = require('./salarios');

test('entende valores no formato brasileiro', () => {
  assert.equal(lerValor('1500'), 1500);
  assert.equal(lerValor('1500,50'), 1500.5);
  assert.equal(lerValor('1.500,50'), 1500.5);
  assert.equal(lerValor('1.500'), 1500);
  assert.equal(lerValor('R$ 2.300'), 2300);
  assert.equal(lerValor('1500.50'), 1500.5);
  assert.ok(Number.isNaN(lerValor('abc')));
});

test('a vírgula decimal não separa um salário em dois', () => {
  // Antes, "1500,50" virava dois salários: R$ 1.500 e R$ 50
  assert.deepEqual(lerSalarios('1500,50').validos, [1500.5]);
});

test('separa por linha, ponto e vírgula ou espaço', () => {
  assert.deepEqual(lerSalarios('1500\n2300;1800 3200').validos, [1500, 2300, 1800, 3200]);
  assert.deepEqual(lerSalarios('1.500,00; 2.300,50').validos, [1500, 2300.5]);
});

test('aceita vírgula seguida de espaço como separador', () => {
  assert.deepEqual(lerSalarios('1500, 2300, 1800').validos, [1500, 2300, 1800]);
});

test('aceita o símbolo R$ e salários de 3 dígitos', () => {
  assert.deepEqual(lerSalarios('R$ 2.300\nR$1.500,00').validos, [2300, 1500]);
  assert.deepEqual(lerSalarios('200 300 450').validos, [200, 300, 450]);
});

test('aponta o que não é um salário válido', () => {
  const { validos, invalidos } = lerSalarios('1500\nmil reais\n-200\n2000');
  assert.deepEqual(validos, [1500, 2000]);
  assert.deepEqual(invalidos, ['mil', 'reais', '-200']);
});

test('monta o relatório com a lista e o maior salário', () => {
  const relatorio = montarRelatorio([1500, 3200.5, 1800]);
  assert.match(relatorio, /2\. R\$ 3\.200,50/);
  assert.match(relatorio, /Maior salário:\nR\$ 3\.200,50/);
  assert.equal(formatarReais(1500), 'R$ 1.500,00');
});
