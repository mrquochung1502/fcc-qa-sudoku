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

  checkValue(str, index, value) {
    if (str[index] === '.') return !str.includes(value);
    return str[index] === value;
  }

  checkRowPlacement(puzzleString, row, column, value) {
    ({ row, column } = this.convertInput(row, column));
    
    let rowStr = puzzleString.slice(row * 9, (row + 1) * 9);
    return this.checkValue(rowStr, column, value);
  }

  checkColPlacement(puzzleString, row, column, value) {
    ({ row, column } = this.convertInput(row, column));

    let colStr = '';
    for (let i = 0; i < 9; i ++) {
      colStr += puzzleString[column + i * 9];
    }
    return this.checkValue(colStr, row, value)
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    ({ row, column } = this.convertInput(row, column));

    let regionStr = '';
    let regionRowStart = Math.floor(row / 3) * 3;
    let regionColStart = Math.floor(column / 3) * 3;

    for (let i = regionRowStart; i < regionRowStart + 3; i++) {
      for (let j = regionColStart; j < regionColStart + 3; j++) {
        regionStr += puzzleString[(regionRowStart + i) * 9 + (regionColStart + j)];
      }
    }
    return this.checkValue(regionStr, (row % 3 * 3) + (column % 3), value);
  }

  solve(puzzleString) {
    
  }
}

module.exports = SudokuSolver;

