// Criação dos Pontos de Coleta.

// Função que exibe a lista de Estados do Brasil.
function populateUFs() {

    // Pega o seletor com nome "uf".
    const ufSelect = document.querySelector("select[name = uf]")

    // API IBGE.
    const url = "https://servicodados.ibge.gov.br/api/v1/localidades/estados"

    fetch(url)
    .then(answer => answer.json())
    .then(states => {

        // Para cada Estado armazenado em Estados.
        for (const state of states) {

            // Acrescenta cada Estado ao select.
            ufSelect.innerHTML += `<option value = "${state.id}">${state.nome}</option>`

        }
    })

}

// Chama a função.
populateUFs()

// Pega as cidades existentes no Estado selecionado.
function getCities(event){

    // Pega o seletor com nome "city".
    const citySelect = document.querySelector("[name = city")

    // Pega o seletor com nome "state".
    const stateInput = document.querySelector("[name = state")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
        
    stateInput.value = event.target.options[indexOfSelectedState].text

    // API IBGE.
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value> Selecione a Cidade </option>"

    citySelect.disabled = true

    fetch(url)
    .then(answer => answer.json())
    .then(cities => {

        // Para cada Cidade contida em Cidades.
        for (const city of cities) {

            // Acrescenta cada Cidade ao select.
            citySelect.innerHTML += `<option value = "${city.nome}">${city.nome}</option>`

        }

        citySelect.disabled = false

    })

}

document

    // Pega o select UF (Estados).
    .querySelector("select[name = uf]")

    // "Ouvidor" de evento e executa a função getCities, caso detecte um evento.
    .addEventListener("change", getCities)
        
// Grade de itens de coleta.
const itemsToCollect = document.querySelectorAll(".items-grid li")

// Para cada item contido em itens.
for (const item of itemsToCollect) {

    item.addEventListener("click", handleSelectedItem)

}

// Armazena os campos selecionados.
const collectedItems = document.querySelector("input[name = items]")

let selectedItems = []

function handleSelectedItem(event) {

    const itemLi = event.target

    // Adiciona ou remove uma classe.
    itemLi.classList.toggle("selected")

    const itemId = event.target.dataset.id

    const alreadySelected = selectedItems.findIndex(function(item) {

        // == -> Compara o valor de item com itemId.
        const itemFound = item == itemId

        return itemFound

    })

    // Verifica se o item já foi selecionado, caso sim, o retira.
    if (alreadySelected >= 0) {
    
        // Tira da Seleção.
        const fielteredItems = selectedItems.filter(item => {

            const itemfIsDifferent = item != itemId

            return itemfIsDifferent

        })

        selectedItems = fielteredItems

    // Caso não, o adiciona.
    } else {

        selectedItems.push(itemId)

    }

    // Atualiza o campo escondido com os itens selecionados.
    collectedItems.value = selectedItems

}




