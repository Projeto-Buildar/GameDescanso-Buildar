import {
  setCustomProperty,
  incrementCustomProperty,
  getCustomProperty,
} from "./updateCustomProperty.js"

const SPEED = 0.05 // Velocidade do movimento do cacto
const CACTUS_INTERVAL_MIN = 650 // Intervalo mínimo para a aparição de novos cactos
const CACTUS_INTERVAL_MAX = 2000 // Intervalo máximo para a aparição de novos cactos
const worldElem = document.querySelector("[data-world]") // Seleciona o elemento que representa o mundo do jogo

let nextCactusTime // Variável para controlar o tempo de aparição dos cactos

// Função para configurar os cactos no início do jogo
export function setupCactus() {
  nextCactusTime = CACTUS_INTERVAL_MIN // Define o tempo inicial para o próximo cacto
  // Remove todos os cactos existentes
  document.querySelectorAll("[data-cactus]").forEach(cactus => {
    cactus.remove()
  })
}

// Função para atualizar a posição dos cactos
export function updateCactus(delta, speedScale) {
  // Move os cactos existentes
  document.querySelectorAll("[data-cactus]").forEach(cactus => {
    incrementCustomProperty(cactus, "--left", delta * speedScale * SPEED * -1)
    if (getCustomProperty(cactus, "--left") <= -100) {
      cactus.remove() // Remove o cacto quando ele sai da tela
    }
  })

  // Cria um novo cacto quando o tempo chegar a zero
  if (nextCactusTime <= 0) {
    createCactus()
    nextCactusTime = randomNumberBetween(CACTUS_INTERVAL_MIN, CACTUS_INTERVAL_MAX) / speedScale
  }
  nextCactusTime -= delta
}

// Função para obter os retângulos de colisão dos cactos
export function getCactusRects() {
  return [...document.querySelectorAll("[data-cactus]")].map(cactus => {
    return cactus.getBoundingClientRect()
  })
}

// Função para criar um novo cacto
function createCactus() {

  let numeroRandom = parseInt(Math.random() * 3 + 1);
  let imagem = "";
  if(numeroRandom === 1){
    imagem = "_1";
  } else if(numeroRandom === 2) {
    imagem = "_2";
  } else {
    imagem = "";
  }
  const cactus = document.createElement("img")
  cactus.dataset.cactus = true
  cactus.src = `imgs/obstaculo${imagem}.png` // Fonte da imagem do cacto
  cactus.classList.add("cactus")
  setCustomProperty(cactus, "--left", 100) // Define a posição inicial do cacto
  worldElem.append(cactus) // Adiciona o cacto ao mundo do jogo
}

// Função para gerar um número aleatório entre um mínimo e um máximo
function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
