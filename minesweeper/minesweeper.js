export const TILES_STATUS = {
  HIDDEN: "hidden",
  MINE: "mine",
  NUMBER: "number",
  MARKED: "marked",
};

export const createBoard = (boardSize, numberOfMines) => {
  const board = [];
  const minePositions = getMinePositions(boardSize, numberOfMines);

  for (let x = 0; x < boardSize; x++) {
    const row = [];
    for (let y = 0; y < boardSize; y++) {
      const element = document.createElement("div");
      element.dataset.status = TILES_STATUS.HIDDEN;
      const tiles = {
        x,
        y,
        element,
        isMine: minePositions.some(positionMatches.bind(null, { x, y })),
        get status() {
          return this.element.dataset.status;
        },
        set status(value) {
          this.element.dataset.status = value;
        },
      };
      row.push(tiles);
    }
    board.push(row);
  }
  return board;
};

export const markTile = (tile) => {
  if (
    tile.status !== TILES_STATUS.HIDDEN &&
    tile.status !== TILES_STATUS.MARKED
  )
    return;
  if (tile.status === TILES_STATUS.MARKED) {
    tile.status = TILES_STATUS.HIDDEN;
  } else {
    tile.status = TILES_STATUS.MARKED;
  }
};

export const revealTile = (board, tile) => {
  if (tile.status === TILES_STATUS.HIDDEN) {
    if (tile.isMine) {
      tile.status = TILES_STATUS.MINE;
    } else {
      tile.status = TILES_STATUS.NUMBER;
      const surroundingMines = getSurroundingMines(board, tile);
      const mineTiles = surroundingMines.filter((tile) => tile.isMine);

      if (mineTiles.length === 0) {
        surroundingMines.forEach(revealTile.bind(null, board));
      } else {
        tile.element.textContent = mineTiles.length;
      }
    }
  }
};

export const checkForWin = (board) => {
  return board.every((row) => {
    return row.every((tile) => {
      return (
        tile.status === TILES_STATUS.NUMBER ||
        (tile.isMine &&
          (tile.status === TILES_STATUS.MARKED ||
            tile.status === TILES_STATUS.HIDDEN))
      );
    });
  });
};

export const checkForLose = (board) => {
  return board.some((row) => {
    return row.some((tile) => {
      return tile.status === TILES_STATUS.MINE;
    });
  });
};

const getMinePositions = (boardSize, numberOfMines) => {
  const positions = [];
  while (positions.length < numberOfMines) {
    const position = {
      x: randomPosition(boardSize),
      y: randomPosition(boardSize),
    };

    if (!positions.some(positionMatches.bind(null, position))) {
      positions.push(position);
    }
  }
  return positions;
};

const positionMatches = (p1, p2) => {
  return p1.x === p2.x && p1.y === p2.y;
};

const randomPosition = (size) => {
  return Math.floor(Math.random() * size);
};

const getSurroundingMines = (board, { x, y }) => {
  const tiles = [];

  for (let xOffset = -1; xOffset <= 1; xOffset++) {
    for (let yOffset = -1; yOffset <= 1; yOffset++) {
      const tile = board[x + xOffset]?.[y + yOffset];
      if (tile) {
        tiles.push(tile);
      }
    }
  }
  return tiles;
};
