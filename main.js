let livros = []
const endpointDaAPI = 'https://guilhermeonrails.github.io/casadocodigo/livros.json'
getBuscarLivrosDaAPI();

async function getBuscarLivrosDaAPI() {
    const res = await fetch(endpointDaAPI)
    livros = await res.json()
    let livrosComDesconto = aplicarDesconto(livros)
    exibirOsLivrosNaTela(livrosComDesconto)
};

//filter
const botoes = document.querySelectorAll(".btn");
    botoes.forEach(btn => btn.addEventListener('click', filtrarLivros));

    function filtrarLivros () {

      const elementoBtn = document.getElementById(this.id)
      const botao = elementoBtn.value;
      

      let livrosFiltrados = botao == 'disponivel' ? LivrosDisp() : LivrosCategoria(botao);
      exibirOsLivrosNaTela(livrosFiltrados)
      if (botao == 'disponivel') {
        const ValorTotal = calcularValorTotalDisp(livrosFiltrados);
        exibirvalorTotalDosLivrosDisp(ValorTotal)
      }
}

function LivrosDisp() {
  return livros.filter(livro => livro.quantidade > 0);
}

function LivrosCategoria(da) {
  return livros.filter(livro => livro.categoria == da);
}

function exibirvalorTotalDosLivrosDisp (asd) {
  elementoValorTotalLivrosDisponivel.innerHTML = 
`<div class="livros__disponiveis">
  <p> Todos os livros disponiveis por R$ <span id="valor">${asd}</span></p>
</div>`
}


//foreach
const elementoParaInserirLivros = document.getElementById('livros')
const elementoValorTotalLivrosDisponivel = document.getElementById('valor_total_livros_disponiveis')


function exibirOsLivrosNaTela(listaDeLivros) {

  elementoValorTotalLivrosDisponivel.innerHTML = ''
  elementoParaInserirLivros.innerHTML = ''
  
    listaDeLivros.forEach(livro => {
        let disponibilidade = livro.quantidade > 0 ? "livro__imagens" : "livro__imagens indisponivel"
        elementoParaInserirLivros.innerHTML += 
      `<div class="livro">
        <img class='${disponibilidade}' src="${livro.imagem}"
            alt="${livro.alt}" />
            <h2 class="livro__titulo">
                ${livro.titulo}
              </h2>
              <p class="livro__descricao">${livro.autor}</p>
              <p class="livro__preco" id="preco">R$${livro.preco.toFixed(2)}</p>
              <div class="tags">
              <span class="tag">${livro.categoria}</span>
          </div>
      </div>
        `
    })
}

//map

function aplicarDesconto(livros) {
    const desconto = 0.9;
    livrosComDesconto = livros.map(livro => {
        return {...livro, preco: livro.preco - (livro.preco * desconto)}
    })
    return livrosComDesconto
}

//reduce

function calcularValorTotalDisp (livros) {
    return livros.reduce((acu,livro)=> acu + livro.preco, 0).toFixed(2)
}

//sort
let btnOrdem = document.getElementById('btnOrdenarPorPreco')
btnOrdem.addEventListener('click', ordenarLivrosPrice)

function  ordenarLivrosPrice() {
 let livrosordenadosp = livros.sort((a,s) => a.preco-s.preco)
 exibirOsLivrosNaTela(livrosordenadosp)
} 