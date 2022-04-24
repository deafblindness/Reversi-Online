'use strict';

class Player {
  constructor(socket) {
    this._socket = socket;
    this._game = null;
    this._side = null;
  }

  get socket() {
    return this._socket;
  }

  start_game(game, side) {
    this._game = game;
    this._side = side;
  }

  end_game() {
    this._game = null;
    this._side = null;
  }

  move(x, y) {
    if (this._game != null) {
      return this._game.move(pos.x, pos.y, side);
    }
    return false;
  }
};

module.exports = Player;
