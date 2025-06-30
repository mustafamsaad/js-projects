import {
  createBoard,
  markTile,
  revealTile,
  checkForWin,
  checkForLose,
  TILES_STATUS,
} from "./minesweeper.js";

const BOARD_SIZE = 10;
const NUMBER_OF_MINES = 10;
const board = createBoard(BOARD_SIZE, NUMBER_OF_MINES);

const boardElement = document.querySelector(".board");
boardElement.style.setProperty("--size", BOARD_SIZE);
const subText = document.querySelector(".subtext");

board.forEach((row) => {
  row.forEach((tile) => {
    boardElement.append(tile.element);

    // Desktop click events
    tile.element.addEventListener("click", () => {
      revealTile(board, tile);
      checkGameOver(checkForWin, checkForLose);
    });

    tile.element.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      markTile(tile);
      calcMarkedTiles();
    });

    // Mobile touch events
    let touchTimer = null;
    let touchStarted = false;

    tile.element.addEventListener("touchstart", (e) => {
      e.preventDefault();
      touchStarted = true;

      // Long press for flagging (mobile equivalent of right-click)
      touchTimer = setTimeout(() => {
        if (touchStarted) {
          markTile(tile);
          calcMarkedTiles();
          // Add slight vibration feedback if available
          if (navigator.vibrate) {
            navigator.vibrate(50);
          }
        }
      }, 500); // 500ms long press
    });

    tile.element.addEventListener("touchend", (e) => {
      e.preventDefault();
      if (touchTimer) {
        clearTimeout(touchTimer);
      }

      // If it was a quick tap (not long press), reveal tile
      if (touchStarted) {
        setTimeout(() => {
          revealTile(board, tile);
          checkGameOver(checkForWin, checkForLose);
        }, 50);
      }

      touchStarted = false;
    });

    tile.element.addEventListener("touchmove", () => {
      // Cancel long press if user moves finger
      if (touchTimer) {
        clearTimeout(touchTimer);
      }
      touchStarted = false;
    });
  });
});

const mineCount = document.querySelector("[data-mine-count]");
mineCount.textContent = NUMBER_OF_MINES;

const calcMarkedTiles = () => {
  const markedTiles = board.reduce((count, row) => {
    return (
      count + row.filter((tile) => tile.status === TILES_STATUS.MARKED).length
    );
  }, 0);

  mineCount.textContent = NUMBER_OF_MINES - markedTiles;
};

const checkGameOver = (checkForWin, checkForLose) => {
  const win = checkForWin(board);
  const lose = checkForLose(board);

  if (win || lose) {
    boardElement.addEventListener("click", stopProp, { capture: true });
    boardElement.addEventListener("contextmenu", stopProp, { capture: true });
  }

  win && (subText.textContent = "You Win!");

  if (lose) {
    subText.textContent = "You Lose!";
    board.forEach((row) => {
      row.forEach((tile) => {
        if (tile.isMine) {
          tile.status = TILES_STATUS.MINE;
          revealTile(board, tile);
        }
      });
    });
  }
};

const stopProp = (e) => {
  e.stopPropagation();
};
