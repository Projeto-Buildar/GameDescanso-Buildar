import {
  incrementCustomProperty,
  setCustomProperty,
  getCustomProperty,
} from "./updateCustomProperty.js"

const dinoElem = document.querySelector("[data-dino]") // Seleciona o elemento do dinossauro
const JUMP_SPEED = 0.45 // Velocidade do salto
const GRAVITY = 0.0015 // Gravidade que puxa o dinossauro para baixo
const DINO_FRAME_COUNT = 10 // Número de frames para a animação de corrida
const FRAME_TIME =  54// Tempo de cada frame da animação

let isJumping // Variável para verificar se o dinossauro está pulando
let dinoFrame // Frame atual da animação de corrida
let currentFrameTime // Tempo acumulado para troca de frames
let yVelocity // Velocidade vertical do dinossauro

// Função para configurar o dinossauro no início do jogo
export function setupDino() {
  isJumping = false
  dinoFrame = 0
  currentFrameTime = 0
  yVelocity = 0
  setCustomProperty(dinoElem, "--bottom", 0) // Define a posição inicial do dinossauro
  document.removeEventListener("keydown", onJump)
  document.addEventListener("keydown", onJump) // Adiciona o evento de salto ao pressionar a tecla
}

// Função para atualizar a posição e animação do dinossauro
export function updateDino(delta, speedScale) {
  handleRun(delta, speedScale)
  handleJump(delta)
}

// Função para obter o retângulo de colisão do dinossauro
export function getDinoRect() {
  return dinoElem.getBoundingClientRect()
}

// Função para definir a imagem do dinossauro quando ele perde
export function setDinoLose() {
  dinoElem.src = "imgs/viviTriste.png"
}

// Função para controlar a animação de corrida
function handleRun(delta, speedScale) {
  if (isJumping) {
    dinoElem.src = `imgs/viviJump.png`
    return
  }

  if (currentFrameTime >= FRAME_TIME) {
    dinoFrame = (dinoFrame + 1) % DINO_FRAME_COUNT
    dinoElem.src = `imgs/sprite_0${dinoFrame}.png`
    currentFrameTime -= FRAME_TIME
  }
  currentFrameTime += delta * speedScale
}

// Função para controlar o salto
function handleJump(delta) {
  if (!isJumping) return

  incrementCustomProperty(dinoElem, "--bottom", yVelocity * delta)

  if (getCustomProperty(dinoElem, "--bottom") <= 0) {
    setCustomProperty(dinoElem, "--bottom", 0)
    isJumping = false
  }

  yVelocity -= GRAVITY * delta
}

// Função para iniciar o salto ao pressionar a barra de espaço
function onJump(e) {
  if (e.code !== "Space" || isJumping) return

  yVelocity = JUMP_SPEED
  isJumping = true
}
