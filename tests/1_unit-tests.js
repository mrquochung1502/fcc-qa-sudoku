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

  test('Logic handles a valid row placement', () => {
    assert.isTrue(solver.checkColPlacement(puzzlesAndSolutions[0][0], 'E', '1', '8'));
    assert.isTrue(solver.checkColPlacement(puzzlesAndSolutions[0][0], 'A', '7', '1'));
    assert.isTrue(solver.checkColPlacement(puzzlesAndSolutions[0][0], 'F', '9', '5'));
  });

  test('Logic handles an invalid column placement', () => {
    assert.isFalse(solver.checkColPlacement(puzzlesAndSolutions[0][0], 'B', '1', '1'));
    assert.isFalse(solver.checkColPlacement(puzzlesAndSolutions[0][0], 'B', '4', '9'));
    assert.isFalse(solver.checkColPlacement(puzzlesAndSolutions[0][0], 'B', '5', '5'));
  });

  test('Logic handles a valid region (3x3 grid) placement', () => {
    assert.isTrue(solver.checkRegionPlacement(puzzlesAndSolutions[0][0], 'A', '1', '1'));
    assert.isTrue(solver.checkRegionPlacement(puzzlesAndSolutions[0][0], 'D', '3', '5'));
    assert.isTrue(solver.checkRegionPlacement(puzzlesAndSolutions[0][0], 'G', '6', '8'));
  });

  test('Logic handles an invalid region (3x3 grid) placement', () => {
    assert.isFalse(solver.checkRegionPlacement(puzzlesAndSolutions[0][0], 'A', '1', '9'));
    assert.isFalse(solver.checkRegionPlacement(puzzlesAndSolutions[0][0], 'E', '3', '9'));
    assert.isFalse(solver.checkRegionPlacement(puzzlesAndSolutions[0][0], 'I', '9', '9'));
  });

});
