// Pesquisa os Pontos de Coleta.

// Botão de pesquisar.
const buttonSearch = document.querySelector("#page-home main a")

// Botão de fechar.
const close = document.querySelector("#modal .header a")

// Página modal.
const modal = document.querySelector("#modal")

// Se o botão de fechar for clicado, a página modal é fechada.
buttonSearch.addEventListener("click", () => {

    modal.classList.remove("hide")

})

// Se o botão de pesquisar for clicado, a página de search-results é exibida. 
close.addEventListener("click", () => {

    modal.classList.add("hide")

})