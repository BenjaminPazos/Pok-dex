// FUNCOES
function buscarPokemon(nome) {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${nome}`)
        .then(resposta => {
            if (!resposta.ok) {
                throw new Error("Pokémon não encontrado");
            }
            return resposta.json();
        });
}
function mostrarPokemon(pokemon) {
    input.placeholder = "Digite o nome do Pokémon"
    carta.querySelector("h1").textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    carta.querySelector(".numero").textContent = "Nº " + pokemon.id
    carta.querySelector(".altura").textContent = "Altura: " + pokemon.height / 10 + " m"
    carta.querySelector(".peso").textContent = "Peso: " + pokemon.weight / 10 + " kg"
    carta.querySelector(".HP").textContent = "HP: " + pokemon.stats[0].base_stat
    carta.querySelector(".ataque").textContent = "Ataque: " + pokemon.stats[1].base_stat
    carta.querySelector(".defesa").textContent = "Defesa: " + pokemon.stats[2].base_stat
    carta.querySelector(".velocidade").textContent = "Velocidade: " + pokemon.stats[5].base_stat
    let imagem = carta.querySelector(".pokemon")
    imagem.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`
    let tipo = carta.querySelector(".tipoCarta")

    if (tipos[pokemon.types[0].type.name] == "dark") {
        carta.classList.add("textoBranco")
    }
    else {
        carta.classList.remove("textoBranco");
    }
    tipo.src = `assets/imagens/Tipo${tipos[pokemon.types[0].type.name]}.png`;
}
// FIM DAS FUNCOES

// VARIAVEIS
let imagem = document.querySelector(".pokemon")
let formulario = document.querySelector(".formulario")
let proximo = document.querySelector(".proximo")
let anterior = document.querySelector(".anterior")
let carta = document.querySelector(".carta")
let input = document.querySelector("input")
let tipos = {
    normal: "normal",
    fire: "fire",
    water: "water",
    electric: "electric",
    grass: "grass",
    ice: "water",
    fighting: "fighting",
    poison: "dark",
    ground: "fighting",
    flying: "normal",
    psychic: "psychic",
    bug: "grass",
    rock: "fighting",
    ghost: "psychic",
    dragon: "dragon",
    dark: "dark",
    steel: "steel",
    fairy: "psychic"
};
let pokemonAtual = 0
let shiny = false
// FIM DAS VARIAVEIS

// PESQUISA
formulario.addEventListener("submit", (event) => {
    event.preventDefault()

    if (input.value.trim() == "") {
        input.placeholder = "Campo está vazio"
    } else {
        let resultado = input.value.trim().toLowerCase()
        input.value = ""
        buscarPokemon(resultado)

            .then(pokemon => {
                pokemonAtual = pokemon.id;
                mostrarPokemon(pokemon)
            })
            .catch(erro => {
                console.log(erro.message);
                input.placeholder = "Pokemon não encontrado"
            });
    }
})

// BOTAO DE PROXIMO
proximo.addEventListener("click", (event) => {
    event.preventDefault();

    let resultado = pokemonAtual + 1;

    buscarPokemon(resultado)
        .then(pokemon => {
            pokemonAtual = pokemon.id;
            mostrarPokemon(pokemon);
        });
});

// BOTAO DE VOLTAR
anterior.addEventListener("click", (event) => {
    event.preventDefault();

    let resultado = pokemonAtual - 1;

    buscarPokemon(resultado)
        .then(pokemon => {
            pokemonAtual = pokemon.id;
            mostrarPokemon(pokemon);
        });
});

// VIRAR SHINY
imagem.addEventListener("click", () => {
    if (!shiny){
        imagem.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${pokemonAtual}.png`;
        shiny = true
    }else if (shiny){
        imagem.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonAtual}.png`;
        shiny = false
    }
});








