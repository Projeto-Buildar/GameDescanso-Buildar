// // Importa as funções necessárias dos módulos ground, dino e cactus
// import { updateGround, setupGround } from "./ground.js";
// import { updateDino, setupDino, getDinoRect, setDinoLose } from "./dino.js";
// import { updateCactus, setupCactus, getCactusRects } from "./cactus.js";

// // Define as constantes de largura e altura do mundo do jogo
// const WORLD_WIDTH = 100;
// const WORLD_HEIGHT = 30;
// const SPEED_SCALE_INCREASE = 0.00001; // Aumento constante da escala de velocidade

// // Seleciona os elementos do DOM necessários
// const worldElem = document.querySelector("[data-world]");
// const scoreElem = document.querySelector("[data-score]");
// const highScoreElem = document.querySelector("[data-high-score]");
// const startScreenElem = document.querySelector("[data-start-screen]");

// // Declara variáveis para controlar o estado do jogo
// let lastTime;
// let speedScale;
// let score;
// let highScore = localStorage.getItem("highScore") || 0; // Obtém a maior pontuação do localStorage

// // Atualiza o elemento de maior pontuação com o valor recuperado
// highScoreElem.textContent = `High Score: ${highScore}`;

// function update(time) {
//   if (lastTime == null) {
//     // Inicializa lastTime na primeira execução
//     lastTime = time;
//     window.requestAnimationFrame(update);
//     return;
//   }
//   const delta = time - lastTime;

//   // Atualiza os componentes do jogo
//   updateGround(delta, speedScale);
//   updateDino(delta, speedScale);
//   updateCactus(delta, speedScale);
//   updateSpeedScale(delta);
//   updateScore(delta);

//   // Verifica se o jogador perdeu
//   if (checkLose()) return handleLose();

//   lastTime = time; // Atualiza lastTime para o próximo ciclo
//   window.requestAnimationFrame(update); // Continua a animação
// }

// function checkLose() {
//   // Verifica colisão entre o dinossauro e qualquer cacto
//   const dinoRect = getDinoRect();
//   return getCactusRects().some(rect => isCollision(rect, dinoRect));
// }

// function isCollision(rect1, rect2) {
//   // Verifica se dois retângulos colidem
//   return (
//     rect1.left < rect2.right &&
//     rect1.top < rect2.bottom &&
//     rect1.right > rect2.left &&
//     rect1.bottom > rect2.top
//   );
// }

// function updateSpeedScale(delta) {
//   // Incrementa a escala de velocidade
//   speedScale += delta * SPEED_SCALE_INCREASE;
// }

// function updateScore(delta) {
//   // Atualiza a pontuação com base no tempo decorrido
//   score += delta * 0.01;
//   scoreElem.textContent = Math.floor(score); // Atualiza o elemento de pontuação
// }

// function handleStart() {
//   // Inicializa o estado do jogo ao iniciar
//   lastTime = null;
//   speedScale = 1;
//   score = 0;
//   setupGround();
//   setupDino();
//   setupCactus();
//   startScreenElem.classList.add("hide"); // Esconde a tela inicial
//   window.requestAnimationFrame(update); // Inicia a animação
// }

// function handleLose() {
//   // Executa ações quando o jogador perde
//   setDinoLose(); // Define o estado de perda do dinossauro
//   if (Math.floor(score) > highScore) {
//     // Atualiza a maior pontuação se a pontuação atual for maior
//     highScore = Math.floor(score);
//     localStorage.setItem("highScore", highScore); // Salva a maior pontuação no localStorage
//     highScoreElem.textContent = `High Score: ${highScore}`; // Atualiza o elemento de maior pontuação
//   }
//   setTimeout(() => {
//     // Reexibe a tela inicial e permite reiniciar o jogo
//     document.addEventListener("keydown", handleStart, { once: true });
//     startScreenElem.classList.remove("hide");
//   }, 100);
// }

// function setPixelToWorldScale() {
//   // Ajusta a escala do mundo do jogo com base no tamanho da janela
//   let worldToPixelScale;
//   if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT) {
//     worldToPixelScale = window.innerWidth / WORLD_WIDTH;
//   } else {
//     worldToPixelScale = window.innerHeight / WORLD_HEIGHT;
//   }
//   worldElem.style.width = `${WORLD_WIDTH * worldToPixelScale}px`;
//   worldElem.style.height = `${WORLD_HEIGHT * worldToPixelScale}px`;
// }

// // Ajusta a escala do mundo do jogo ao carregar a página e ao redimensionar a janela
// setPixelToWorldScale();
// window.addEventListener("resize", setPixelToWorldScale);

// // Inicia o jogo ao pressionar uma tecla
// document.addEventListener("keydown", handleStart, { once: true });
