/* Gameboard */
function Gameboard() {
  let gameboard = Array(9).fill(null);

  const getBoard = () => gameboard;

  const resetBoard = () => {
    gameboard = Array(9).fill(null);
  };

  const markCell = (cell, marker) => {
    gameboard[cell] = marker;
  };

  return {
    getBoard,
    resetBoard,
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

  const isDraw = () => isEnd() && !isWin();

  const isEnd = () => gameboard.getBoard().every((cell) => cell !== null);

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
    resetBoard: gameboard.resetBoard,
  };
}

/* GameController */
function GameController() {
  const game = Game();

  const dispalyBoard = () => {
    const board = game.getBoard();
    console.log(`
    ${board[0] || " "} | ${board[1] || " "} | ${board[2] || " "}
    ----------
    ${board[3] || " "} | ${board[4] || " "} | ${board[5] || " "}
    ----------
    ${board[6] || " "} | ${board[7] || " "} | ${board[8] || " "}
  `);
  };

  const isGameOver = () => {
    if (game.isDraw() || game.isWin()) return true;
    return false;
  };

  const getGameResult = () => {
    if (game.isWin()) return `${game.getActivePlayer().name} Win`;
    else if (game.isDraw()) return "Game Draw";
  };

  const playRound = (cell) => {
    if (isGameOver()) return console.log(getGameResult());

    if (!game.isValid(cell)) return console.log("Cell already marked!");

    game.placeMarker(cell);
    dispalyBoard();

    if (isGameOver()) {
      console.log(getGameResult());
    } else {
      game.switchActivePlayer();
      console.log(`${game.getActivePlayer().name}'s turn`);
    }
  };

  dispalyBoard();
  console.log(`${game.getActivePlayer().name}'s turn`);

  const resetGame = () => {
    game.resetBoard();
    dispalyBoard();
    console.log(`${game.getActivePlayer().name}'s turn`);
  };

  return {
    playRound,
    resetGame,
  };
}
