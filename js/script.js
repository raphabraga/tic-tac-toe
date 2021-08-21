const symbol = { circle: "&#11093", cross: "&#10060" };
const squares = document.querySelectorAll(".square");
const playerDiv = document.querySelector(".player");
const winnerDiv = document.querySelector(".winner");
let playersMoves = { circle: [], cross: [] };

let player = "circle";
const startGame = () => {
  squares.forEach((square) => square.addEventListener("click", handleClick));
  playerDiv.innerHTML = `Player: ${symbol[player]}`;
};

const checkAssertion = (player, assert) => {
  const matches = playersMoves[player].join(" ").match(assert);
  if (matches?.length >= 3) return matches;
  else return false;
};

const checkLines = (player) => {
  for (let i = 1; i < 4; i++) {
    let regxLin = new RegExp(`\\b${i}\\d`, "g");
    let matches = checkAssertion(player, regxLin);
    if (matches) return matches;
  }
  return false;
};

const checkCols = (player) => {
  for (let i = 1; i < 4; i++) {
    let regxCol = new RegExp(`\\b\\d${i}`, "g");
    let matches = checkAssertion(player, regxCol);
    if (matches) return matches;
  }
  return false;
};

const checkMainDiag = (player) => {
  let regxMainDiag = new RegExp(`\\b(\\d)\\1`, "g");
  let matches = checkAssertion(player, regxMainDiag);
  if (matches) return matches;
  else return false;
};

const checkSecDiag = (player) => {
  let numMatches = playersMoves[player].reduce((acc, el) => {
    return 1 * el[0] + 1 * el[1] === 4 ? acc + 1 : acc;
  }, 0);
  if (numMatches >= 3) {
    return ["13", "22", "31"];
  } else return false;
};

const checkForWinner = (player) => {
  return (
    checkLines(player) ||
    checkCols(player) ||
    checkMainDiag(player) ||
    checkSecDiag(player)
  );
};

const gameOver = (game) => {
  game
    .map((el) => `sq${el}`)
    .forEach((el) => {
      document.getElementById(el).style.backgroundColor = "black";
    });
  squares.forEach((square) => resetSquare(square));
  winnerDiv.innerHTML = `Winner: ${symbol[player]}`;
  winnerDiv.style.display = "block";
};

const handleClick = (event) => {
  event.target.innerHTML = symbol[player];
  playersMoves[player].push(event.target.id.slice(2));
  let winnerGame = checkForWinner(player);
  if (winnerGame) {
    gameOver(winnerGame);
    return;
  }
  setNewPlayer();
  resetSquare(event.target);
};

const setNewPlayer = () => {
  player = player === "circle" ? "cross" : "circle";
  playerDiv.innerHTML = `Player: ${symbol[player]}`;
};

const resetSquare = (square) => {
  square.removeEventListener("click", handleClick);
  square.style.cursor = "default";
  square.classList.remove("selected");
};

const restartGame = () => {
  playersMoves = { circle: [], cross: [] };
  player = "circle";
  squares.forEach((el) => {
    el.innerHTML = "";
    el.style.backgroundColor = "rgba(220, 225, 240, 1)";
    el.style.cursor = "pointer";
    el.classList.add("selected");
  });
  startGame();
};

startGame();
