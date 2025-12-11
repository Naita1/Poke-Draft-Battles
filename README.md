<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=F48FB1,FFF59D,81D4FA&height=250&section=header&text=PokeDraft%20Battles&fontSize=50&fontColor=ffffff&fontAlignY=40&animation=fadeIn"/>
</div>

<div align="center">
  <img src="https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow?style=for-the-badge&logo=tools&logoColor=white&color=FBC02D" alt="Status Em Desenvolvimento"/>
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white&color=F48FB1" alt="JavaScript"/>
  <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white&color=81D4FA" alt="Axios"/>
</div>

<p align="center">
  Um jogo de batalha Pokémon baseado em sorte e estratégia de escolha (Draft), consumindo dados reais da <a href="https://pokeapi.co/" target="_blank">PokeAPI</a>.
</p>

<br>

## 💻 Sobre o Projeto

O **PokeDraft Battles** é um desafio de lógica e manipulação de arrays. Diferente de uma batalha comum, aqui o jogador precisa tomar decisões estratégicas com recursos limitados. O sistema gera cenários aleatórios onde você deve montar a melhor equipe possível a partir de opções pré-definidas.

### ✨ Mecânica do Jogo

- [x] **Inimigo Oculto:** O sistema gera 3 Pokémons aleatórios para a CPU.
- [x] **O Draft (Sua Vez):** Você recebe 5 Pokémons aleatórios.
- [x] **Seleção Estratégica:** Desses 5, você deve escolher os 3 melhores para batalhar.
- [ ] **Cálculo de Poder:** O sistema soma os atributos (Stats) para definir o vencedor.
- [x] **Requisições Otimizadas:** Uso de `Promise.all` com **Axios** para carregar múltiplos Pokémons simultaneamente.

---

## 🛠 Tech Stack

As tecnologias utilizadas para dar vida a este projeto:

* **Linguagem:** JavaScript (ES6+).
* **Requisições HTTP:** Biblioteca Axios.
* **Dados:** PokeAPI (RESTful API).
* **Front-end:** HTML5 e CSS3 (Design Responsivo).

---

## 🚀 Como Executar Localmente

Siga os passos abaixo para rodar a aplicação na sua máquina:

### 1. Clone o repositório
```bash
git clone [https://github.com/Naita1/pokedraft-battles.git](https://github.com/Naita1/pokedraft-battles.git)
cd pokedraft-battles
```

### 2\. Instale as dependências

```bash
npm install
```

### 3\. Inicie o Servidor

```bash
node app.js
```

O terminal exibirá: `Servidor rodando em http://localhost:3000`

### 4\. Acesse

Abra seu navegador e vá para: `http://localhost:3000`

-----
<div align="center"> <h3>🦸 Autora</h3> <a href="https://github.com/Naita1">  </a>


<sub><b>Tainá Ribeiro</b></sub>



<a href="https://www.linkedin.com/in/taina-cl-ribeiro" target="_blank"> <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white&color=81D4FA" /> </a> <a href="mailto:tainaribeir1930@gmail.com"> <img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white&color=F48FB1" /> </a> </div>

<div align="center"> <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=81D4FA,FFF59D,F48FB1&height=100&section=footer"/> </div>
