const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
const { puzzlesAndSolutions } = require('../controllers/puzzle-strings.js');
let solver = new Solver();

suite('Unit Tests', () => {

  test('Logic handles a valid puzzle string of 81 characters', () => {
    assert.isNull(solver.validate(puzzlesAndSolutions[0][0]));
    assert.isNull(solver.validate(puzzlesAndSolutions[1][0]));
    assert.isNull(solver.validate(puzzlesAndSolutions[2][0]));
    assert.isNull(solver.validate(puzzlesAndSolutions[3][0]));
  });

  test('Logic handles a puzzle string with invalid characters (not 1-9 or .)', () => {
    const invalidPuzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37A';
    assert.equal(solver.validate(invalidPuzzle), 'Invalid characters in puzzle');
  });

  test('Logic handles a puzzle string that is not 81 characters in length', () => {
    const shortPuzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37';
    assert.equal(solver.validate(shortPuzzle), 'Expected puzzle to be 81 characters long', 'Puzzle shorter than 81 characters should return error');

    const longPuzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37...';
    assert.equal(solver.validate(longPuzzle), 'Expected puzzle to be 81 characters long', 'Puzzle longer than 81 characters should return error');
  });

  test('Input conversions work', () => {
    const input = solver.convertInput('A', 1);
    assert.deepEqual(input, { row: 0, column: 0 });

    const input2 = solver.convertInput('B', 2);
    assert.deepEqual(input2, { row: 1, column: 1 });

    const input3 = solver.convertInput('C', 3);
    assert.deepEqual(input3, { row: 2, column: 2 });
  });

  test('Logic handles a valid row placement', () => {
    assert.isTrue(solver.checkRowPlacement(puzzlesAndSolutions[0][0], 'A', '1', '1'));
    assert.isTrue(solver.checkRowPlacement(puzzlesAndSolutions[0][0], 'A', '2', '3'));
  });

  test('Logic handles an invalid row placement', () => {
    assert.isFalse(solver.checkRowPlacement(puzzlesAndSolutions[0][0], 'A', '1', '9'));
    assert.isFalse(solver.checkRowPlacement(puzzlesAndSolutions[0][0], 'A', '4', '5'));
  });

});
