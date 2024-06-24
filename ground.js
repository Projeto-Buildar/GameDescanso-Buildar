import {
  getCustomProperty,
  incrementCustomProperty,
  setCustomProperty,
} from "./updateCustomProperty.js"

const SPEED = 0.05 // Velocidade do movimento do chão
const groundElems = document.querySelectorAll("[data-ground]") // Seleciona os elementos que representam o chão

// Função para configurar a posição inicial do chão
export function setupGround() {
  setCustomProperty(groundElems[0], "--left", 0)
  setCustomProperty(groundElems[1], "--left", 300)
}

// Função para atualizar a posição do chão
export function updateGround(delta, speedScale) {
  groundElems.forEach(ground => {
    incrementCustomProperty(ground, "--left", delta * speedScale * SPEED * -1)

    if (getCustomProperty(ground, "--left") <= -300) {
      incrementCustomProperty(ground, "--left", 600) // Reseta a posição do chão quando ele sai da tela
    }
  })
}
