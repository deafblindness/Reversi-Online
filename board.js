'use strict';

class Board {
  constructor() {
    this.cell = []
    for (let i = 0; i < 8; ++i) {
      for (let j = 0; j < 8; ++j) {
        this.cell[i][j] = 0;
      }
    }
  }

  is_valid_move(x, y, side) {
    if (x >= 0 && x < 8 && y >= 0 && y < 8) {
      return true;
    }
    return false;
  }

  move(x, y, side) {
    if (is_valid_move(x, y, side)) {
      this.cell[x][y] = side;
      return true;
    }
    return false;
  }

  is_mate() {
    let flag = true;
    for (let i = 0; i < 8; ++i) {
      for (let j = 0; j < 8; ++j) {
        if (this.cell[i][j] == 0) {
          flag = false;
          break;
        }
      }
    }
    return flag;
  }

  win_side() {
    nums = {};
    for (let i = 0; i < 8; ++i) {
      for (let j = 0; j < 8; ++j) {
        nums[this.cell[i][j]] += 1;
      }
    }
    if (nums[-1] > nums[1]) {
      return -1;
    } else {
      return 1;
    }
  }
};

module.exports = Board;
