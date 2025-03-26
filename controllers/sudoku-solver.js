class SudokuSolver {
  validate(puzzleString) {
    if (!puzzleString) return 'Required field missing';
    if (puzzleString.length !== 81) return 'Expected puzzle to be 81 characters long';
    if (/[^1-9.]/.test(puzzleString)) return 'Invalid characters in puzzle';
    return null;
  }

  convertInput(row, column, value) {
    row = row.toUpperCase().charCodeAt(0) - "A".charCodeAt(0);
    column = parseInt(column) - 1;
    return { row, column };
  }

  checkRowPlacement(puzzleString, row, column, value) {
    ({ row, column } = this.convertInput(row, column));
    let rowStr = puzzleString.slice(row * 9, (row + 1) * 9);
    console.log(rowStr, column, value)
    if (rowStr[column] === '.') {
      return !rowStr.includes(value);
    } else {
      return rowStr[column] === value;
    }
  }

  checkColPlacement(puzzleString, row, column, value) {
    ({ row, column } = this.convertInput(row, column));
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    ({ row, column } = this.convertInput(row, column));
  }

  solve(puzzleString) {
    
  }
}

module.exports = SudokuSolver;

