/* Gameboard */
function Gameboard() {
  let gameboard = Array(9).fill(null);

  const getBoard = () => gameboard;

  const markCell = (cell, marker) => {
    gameboard[cell] = marker;
  };

  return {
    getBoard,
    markCell,
  };
}

/* Game */
function Game() {
  const winningCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const gameboard = Gameboard();

  const players = [
    { name: "Player 1", marker: "X" },
    { name: "Player 2", marker: "O" },
  ];

  let activePlayer = players[0];

  const getActivePlayer = () => activePlayer;

  const switchActivePlayer = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const isWin = () => {
    const board = gameboard.getBoard();
    return winningCombination.some(
      ([x, y, z]) => board[x] && board[x] === board[y] && board[y] === board[z]
    );
  };

  const isEnd = () => gameboard.getBoard().every((cell) => cell !== null);

  const isDraw = () => isEnd() && !isWin();

  const isValid = (cell) => gameboard.getBoard()[cell] === null;

  const placeMarker = (cell) => {
    gameboard.markCell(cell, activePlayer.marker);
  };

  return {
    getActivePlayer,
    switchActivePlayer,
    isWin,
    isDraw,
    isEnd,
    isValid,
    placeMarker,
    getBoard: gameboard.getBoard,
  };
}

/* GameController */
function GameController() {
  let game = Game();

  const isGameOver = () => {
    if (game.isDraw() || game.isWin()) return true;
    return false;
  };

  const getGameStatus = () => {
    if (game.isWin()) return `${game.getActivePlayer().name} wins the game!`;
    else if (game.isDraw()) return "It's a draw!";
    else return `${game.getActivePlayer().name}'s turn.`;
  };

  const renderGameboard = () => {
    game.getBoard().forEach((cell, index) => {
      const cellDiv = document.getElementById("cell-" + index);
      cellDiv.textContent = cell;
    });
  };

  const renderLabel = () => {
    document.getElementsByClassName("label")[0].textContent = getGameStatus();
  };

  const startNewGame = () => {
    game = Game();
    renderLabel();
    renderGameboard();
    document.getElementsByClassName("gameboard")[0].style.display = "grid";
  };

  const playRound = (cell) => {
    if (!game.isValid(cell)) return;
    if (isGameOver()) return renderLabel();

    game.placeMarker(cell);
    renderGameboard();

    if (!isGameOver()) {
      game.switchActivePlayer();
    }

    renderLabel();
  };

  document.getElementById("start-btn").addEventListener("click", startNewGame);

  document.querySelectorAll(".cell").forEach((cell) => {
    cell.addEventListener("click", (e) => {
      playRound(parseInt(e.target.id.split("-")[1]));
    });
  });
}

GameController();
