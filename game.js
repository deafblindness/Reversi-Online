'use strict';

const Board = require('./board.js');

class Game {
  constructor() {
    this._board = new Board();
    this._side = 1;
  }

  move(x, y, side) {
    if (this._side == side) {
      return this._board.move(x, y, side);
    }
    return false;
  }
};

module.exports = Game;
