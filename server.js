'use strict';

const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');
const Player = require('./player.js')
const Game = require('./game.js');
const Board = require('./board.js')
const app = express();
const server = http.Server(app);
const io = socketIO(server);

class ServerGame extends Game {
  constructor(player1, player2) {
    super();
    this._player[0] = player1;
    this._player[1] = player2;
  }

  get player() {
    return this._player;
  }

  move(x, y, side) {
    if (side == this._side && super.move()) {
      this._side = this._side * -1;
      this._player.forEach(player => {
        player.socket.emit('put', {x: x, y: y, side: side});
      });
    }
    if (this.board.is_mate()) {
      let win = this.board.win_side();
      this.player.forEach(player => {
        player.socket.emit('end', win);
      });
    }
  }
};

io.on('connection', socket => {
  let player = null;

  socket.on('start', () => {
    if (player == null) {
      player = new Player(socket);
      queue.put(player);
    }
  });

  socket.on('put', pos => {
    socket.emit('put_result', player.move(pos.x, pos.y));
  });
});

app.use('/static', express.static(__dirname + '/static'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/static/index.html'));
});

app.listen(3000, () => {
  console.log("starting server on port 3000");
});
