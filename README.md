# 💰 Atividade Node.js e JavaScript - Salários

Aplicação web feita com **Node.js e Express** que recebe vários salários e mostra o maior, a lista completa e um arquivo `.txt` com o resultado.

## 🎯 Objetivo

Criar um programa que receba vários salários como dados de entrada e mostre:

- Qual é o maior salário;
- A lista de salários;
- O resultado em formato `.txt`.

## 💻 Como abrir no VS Code

1. Clone ou baixe este repositório.
2. Abra o VS Code.
3. Clique em `File > Open Folder`.
4. Selecione a pasta `atividade-node-salarios`.

## 🚀 Como executar

No terminal do VS Code, dentro da pasta `atividade-node-salarios`, execute:

```bash
npm install
npm start
```

Depois abra no navegador:

```text
http://localhost:3000
```

Para rodar os testes:

```bash
npm test
```

## 📖 Como usar

1. Digite vários salários no campo do formulário, separados por **linha**, **espaço** ou **ponto e vírgula**.
2. Use a **vírgula para os centavos**, como no Brasil. O ponto de milhar e o `R$` são opcionais.

```text
1500
2.300,50
R$ 1.800
3200
```

3. Clique em `Calcular maior salário`.
4. O sistema mostra o maior salário, a lista e um botão para baixar o resultado em TXT. O que não for número é ignorado, com um aviso.

## 🔧 O que foi corrigido

- **Vírgula decimal:** a vírgula também era usada para separar salários, então `1500,50` virava dois salários (R$ 1.500 e R$ 50). Agora ela é só o separador dos centavos, e `1.500,50` também é entendido.
- **Resultado misturado entre pessoas:** o resultado era gravado num único `resultado.txt` no servidor. Se duas pessoas usassem ao mesmo tempo, uma podia baixar o resultado da outra. Agora o TXT é gerado na hora, com os salários de quem pediu.
- **Texto digitado virando HTML:** o que não é número é mostrado como texto, sem executar código.
- Arquivos que sobravam (`verifica.js`, `resultado.txt`, um `package-lock.json` vazio na raiz e um README duplicado) foram removidos.

## 📁 Arquivos principais

- `index.js`: servidor Node.js com Express (rotas `/calcular` e `/download`).
- `salarios.js`: leitura dos salários e montagem do relatório, separada do servidor.
- `salarios.test.js`: testes da leitura dos salários.
- `public/index.html`: formulário da aplicação.
- `public/style.css`: estilização da página.
