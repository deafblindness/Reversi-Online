'use strict';

const Game = require('./game.js');
const socket = io();
const canvas = document.getElementById('board');
const context = canvas.getContext('2d');

let game = null;

function start() {
  if (game == null) {
    socket.emit('start');
  }
}

function onClick(e) {
  let rect = e.target.getBoundingClientRect();
  let x = e.clientX - rect.left;
  let y = e.clientY - rect.top;

  let pos = {x: 0, y: 0};
  pos[x] = floor(canvas.width / x);
  pos[y] = floor(canvas.height / y);

  socket.emit('put', pos);
}

socket.on('put', data => {
  console.log('your put was accepted');
  console.log(data);
});

document.getElementById('start_button', start);
canvas.addEventListener('click', onClick, false);
