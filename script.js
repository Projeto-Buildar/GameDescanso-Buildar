import { updateGround, setupGround } from "./ground.js";
import { updateDino, setupDino, getDinoRect, setDinoLose } from "./dino.js";
import { updateCactus, setupCactus, getCactusRects } from "./cactus.js";

const WORLD_WIDTH = 100; // Largura do mundo do jogo
const WORLD_HEIGHT = 30; // Altura do mundo do jogo
const SPEED_SCALE_INCREASE = 0.00001; // Aumento da velocidade com o tempo

const worldElem = document.querySelector("[data-world]"); // Seleciona o elemento que representa o mundo do jogo
const scoreElem = document.querySelector("[data-score]"); // Seleciona o elemento que mostra a pontuação
const highScoreElem = document.querySelector("[data-high-score]"); // Seleciona o elemento que mostra a maior pontuação
const startScreenElem = document.querySelector("[data-start-screen]"); // Seleciona o elemento da tela inicial

setPixelToWorldScale(); // Define a escala inicial do mundo do jogo
window.addEventListener("resize", setPixelToWorldScale); // Redefine a escala do mundo ao redimensionar a janela
document.addEventListener("keydown", handleStart, { once: true }); // Inicia o jogo ao pressionar qualquer tecla

let lastTime; // Armazena o último tempo de atualização
let speedScale; // Escala da velocidade do jogo
let score; // Pontuação do jogador
let highScore = localStorage.getItem("highScore") || 0; // Obtém a maior pontuação do localStorage

highScoreElem.textContent = `High Score: ${highScore}`; // Atualiza a exibição da maior pontuação

// Função principal de atualização do jogo
function update(time) {
  if (lastTime == null) {
    lastTime = time;
    window.requestAnimationFrame(update);
    return;
  }
  const delta = time - lastTime;

  updateGround(delta, speedScale); // Atualiza o chão
  updateDino(delta, speedScale); // Atualiza o dinossauro
  updateCactus(delta, speedScale); // Atualiza os cactos
  updateSpeedScale(delta); // Atualiza a escala de velocidade
  updateScore(delta); // Atualiza a pontuação
  if (checkLose()) return handleLose(); // Verifica se o jogador perdeu

  lastTime = time;
  window.requestAnimationFrame(update);
}

// Função para verificar se o dinossauro colidiu com algum cacto
function checkLose() {
  const dinoRect = getDinoRect();
  return getCactusRects().some(rect => isCollision(rect, dinoRect));
}

// Função para verificar colisão entre dois retângulos
function isCollision(rect1, rect2) {
  return (
    rect1.left < rect2.right &&
    rect1.top < rect2.bottom &&
    rect1.right > rect2.left &&
    rect1.bottom > rect2.top
  );
}

// Função para aumentar a escala de velocidade com o tempo
function updateSpeedScale(delta) {
  speedScale += delta * SPEED_SCALE_INCREASE;
}

// Função para atualizar a pontuação
function updateScore(delta) {
  score += delta * 0.01; // Aumenta a pontuação com o tempo
  scoreElem.textContent = Math.floor(score); // Atualiza a exibição da pontuação

  // Verifica e atualiza a maior pontuação
  if (Math.floor(score) > highScore) {
    highScore = Math.floor(score);
    highScoreElem.textContent = `High Score: ${highScore}`;
    localStorage.setItem("highScore", highScore); // Armazena a maior pontuação no localStorage
  }
}

// Função para iniciar o jogo
function handleStart() {
  lastTime = null; // Reseta o tempo
  speedScale = 1; // Reseta a escala de velocidade
  score = 0; // Reseta a pontuação
  setupGround(); // Configura o chão
  setupDino(); // Configura o dinossauro
  setupCactus(); // Configura os cactos
  startScreenElem.classList.add("hide"); // Esconde a tela inicial
  window.requestAnimationFrame(update); // Inicia o loop de atualização
}

// Função para lidar com a perda do jogo
function handleLose() {
  setDinoLose(); // Define o estado de perda para o dinossauro
  setTimeout(() => {
    document.addEventListener("keydown", handleStart, { once: true }); // Permite reiniciar o jogo ao pressionar uma tecla
    startScreenElem.classList.remove("hide"); // Mostra a tela inicial
  }, 100);
}

// Função para definir a escala do mundo do jogo com base na janela
function setPixelToWorldScale() {
  let worldToPixelScale;
  if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT) {
    worldToPixelScale = window.innerWidth / WORLD_WIDTH;
  } else {
    worldToPixelScale = window.innerHeight / WORLD_HEIGHT;
  }

  worldElem.style.width = `${WORLD_WIDTH * worldToPixelScale}px`;
  worldElem.style.height = `${WORLD_HEIGHT * worldToPixelScale}px`;
}
