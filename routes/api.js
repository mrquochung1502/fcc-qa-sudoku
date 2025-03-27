'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  const errorMsg = {
    1: 'Required field missing',
    2: 'Required field(s) missing',
    3: 'Expected puzzle to be 81 characters long',
    4: 'Invalid characters in puzzle',
    5: 'Invalid coordinate',
    6: 'Invalid value',
    7: 'Puzzle cannot be solved'
  }

  app.route('/api/check')
    .post((req, res) => {

    });
    
  app.route('/api/solve')
    .post((req, res) => {

    });
};
