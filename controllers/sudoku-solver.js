class SudokuSolver {
  validate(puzzleString) {
    if (!puzzleString) return 'Required field missing';
    if (puzzleString.length !== 81) return 'Expected puzzle to be 81 characters long';
    if (/[^1-9.]/.test(puzzleString)) return 'Invalid characters in puzzle';
    return null;
  }

  convertInput(row, column) {
    row = row.toUpperCase().charCodeAt(0) - "A".charCodeAt(0);
    column = parseInt(column) - 1;
    return { row, column };
  }

  checkStr(str, index, value) {
    if (str[index] === '.') return !str.includes(value);
    return str[index] === value;
  }

  getRow(puzzleString, row) {
    return puzzleString.slice(row * 9, (row + 1) * 9);
  }

  getCol(puzzleString, column) {
    let colStr = '';

    for (let i = 0; i < 9; i ++) {
      colStr += puzzleString[column + i * 9];
    }

    return colStr;
  }

  getRegion(puzzleString, row, column) {
    let regionStr = '';
    let regionRowStart = Math.floor(row / 3) * 3;
    let regionColStart = Math.floor(column / 3) * 3;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        regionStr += puzzleString[(regionRowStart + i) * 9 + (regionColStart + j)];
      }
    }
    return [regionStr, regionRowStart, regionColStart];
  }

  checkRowPlacement(puzzleString, row, column, value) {
    ({ row, column } = this.convertInput(row, column));

    let rowStr = this.getRow(puzzleString, row);
    return this.checkStr(rowStr, column, value);
  }

  checkColPlacement(puzzleString, row, column, value) {
    ({ row, column } = this.convertInput(row, column));

    let colStr = this.getCol(puzzleString, column);
    return this.checkStr(colStr, row, value)
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    ({ row, column } = this.convertInput(row, column));

    let [regionStr, regionRowStart, regionColStart] = this.getRegion(puzzleString, row, column);
    let regionIndex = (row - regionRowStart) * 3 + (column - regionColStart);

    return this.checkStr(regionStr, regionIndex, value);
  }

  solve(puzzleString) {
    
  }
}

module.exports = SudokuSolver;

