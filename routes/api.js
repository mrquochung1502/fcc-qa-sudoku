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

  const parseCoord = coord => {
    if (!/^[a-iA-I][1-9]$/.test(coord)) return null;
    return coord.split('');
  }

  app.route('/api/check')
    .post((req, res) => {
      const { puzzle, coordinate, value } = req.body;
      if (!puzzle || !coordinate || !value ) return res.json({ error: errorMsg[2] });
      if (solver.validate(puzzle)) return res.json({ error: errorMsg[solver.validate(puzzle)] });
      if (!parseCoord(coordinate)) return res.json({ error: errorMsg[5] });
      if (!/^[1-9]$/.test(value)) return res.json({ error: errorMsg[6] });

      const [row, column] = parseCoord(coordinate);
      let conflict = [];
      if (!solver.checkRowPlacement(puzzle, row, column, value)) conflict.push('row');
      if (!solver.checkColPlacement(puzzle, row, column, value)) conflict.push('column');
      if (!solver.checkRegionPlacement(puzzle, row, column, value)) conflict.push('region');

      if (conflict.length === 0) return res.json({ valid: "true" });
      return res.json({ valid: "false", conflict: conflict });
    });
    
    app.route('/api/solve')
    .post((req, res) => {
      const puzzleString = req.body.puzzle;
      const result = solver.solve(puzzleString);
      
      if (typeof result === 'number') return res.json({ error: errorMsg[result] });
      return res.json({ solution: result });
    });
};
