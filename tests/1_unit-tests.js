const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
const { puzzlesAndSolutions } = require('../controllers/puzzle-strings.js');
let solver = new Solver();

suite('Unit Tests', () => {

  test('Logic handles a valid puzzle string of 81 characters', () => {
    assert.deepEqual(solver.validate(puzzlesAndSolutions[0][0]), 0);
    assert.deepEqual(solver.validate(puzzlesAndSolutions[1][0]), 0);
    assert.deepEqual(solver.validate(puzzlesAndSolutions[2][0]), 0);
    assert.deepEqual(solver.validate(puzzlesAndSolutions[3][0]), 0);
  });

  test('Logic handles a puzzle string with invalid characters (not 1-9 or .)', () => {
    const invalidPuzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37A';
    assert.deepEqual(solver.validate(invalidPuzzle), 4);
  });

  test('Logic handles a puzzle string that is not 81 characters in length', () => {
    const shortPuzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37';
    assert.deepEqual(solver.validate(shortPuzzle), 3);

    const longPuzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37...';
    assert.deepEqual(solver.validate(longPuzzle), 3);
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

  test('Valid puzzle strings pass the solver', () => {
    assert.typeOf(solver.solve(puzzlesAndSolutions[0][0]), 'string');
    assert.typeOf(solver.solve(puzzlesAndSolutions[1][0]), 'string');
    assert.typeOf(solver.solve(puzzlesAndSolutions[2][0]), 'string');
    assert.typeOf(solver.solve(puzzlesAndSolutions[3][0]), 'string');
  });

  test('Invalid puzzle strings fail the solver', () => {
    assert.deepEqual(solver.solve('115..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'), 7);    
    assert.deepEqual(solver.solve('1.5..2.841.63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'), 7);    
    assert.deepEqual(solver.solve('1.5..2.841.63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..11.16....926914.37.'), 7);    
    assert.deepEqual(solver.solve('135562984946381257728359613694517832812936745657824196473298561581673421269145378'), 7);    
    assert.deepEqual(solver.solve('634617429469746129837467983467893461278346238974638746312978463147861492734637826'), 7);    
  });

  test('Solver returns the expected solution for an incomplete puzzle', () => {
    assert.deepEqual(solver.solve(puzzlesAndSolutions[0][0]), puzzlesAndSolutions[0][1]);
    assert.deepEqual(solver.solve(puzzlesAndSolutions[1][0]), puzzlesAndSolutions[1][1]);
    assert.deepEqual(solver.solve(puzzlesAndSolutions[2][0]), puzzlesAndSolutions[2][1]);
    assert.deepEqual(solver.solve(puzzlesAndSolutions[3][0]), puzzlesAndSolutions[3][1]);
  });

});
