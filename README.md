# 💰 Atividade Node.js e JavaScript - Salários

Esta atividade foi desenvolvida com Node.js e Express.

## 🎯 Objetivo

Criar um programa que receba vários salários como dados de entrada e mostre:

- Qual é o maior salário;
- A lista de salários;
- O resultado em formato `.txt`.

## 💻 Como abrir no VS Code

1. Extraia o arquivo ZIP.
2. Abra o VS Code.
3. Clique em `File > Open Folder`.
4. Selecione a pasta `atividade-node-salarios`.

## 🚀 Como executar

No terminal do VS Code, execute:

```bash
npm install
```

Depois execute:

```bash
npm start
```

Ou:

```bash
node index.js
```

Depois abra no navegador:

```text
http://localhost:3000
```

## 📖 Como usar

1. Digite vários salários no campo do formulário.
2. Os salários podem ser separados por:
   - linha;
   - espaço;
   - vírgula;
   - ponto e vírgula.

Exemplo:

```text
1500
2300
1800
3200
```

3. Clique em `Calcular maior salário`.
4. O sistema mostrará:
   - o maior salário;
   - a lista de salários;
   - um botão para baixar o resultado em TXT.

## 📁 Arquivos principais

- `index.js`: servidor Node.js com Express.
- `verifica.js`: arquivo simples para testar se o servidor está ativo.
- `public/index.html`: formulário da aplicação.
- `public/style.css`: estilização da página.
- `resultado.txt`: arquivo gerado/atualizado com o resultado.
