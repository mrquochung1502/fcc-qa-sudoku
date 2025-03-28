class SudokuSolver {
  validate(puzzleString) {
    if (!puzzleString) return 1;
    if (puzzleString.length !== 81) return 3;
    if (/[^1-9.]/.test(puzzleString)) return 4;
  
    for (let i = 0; i < 9; i++) {
      if (!this.checkPuzzleString(this.getRow(puzzleString, i)) ||
          !this.checkPuzzleString(this.getCol(puzzleString, i)) ||
          !this.checkPuzzleString(this.getRegion(puzzleString, Math.floor(i / 3) * 3, (i % 3) * 3)[0])) {
        return 7;
      }
    }
    return 0;
  }

  checkPuzzleString(str) {
    let numSet = new Set();
    let sum = 0;
  
    for (let char of str) {
      if (char !== '.') {
        let num = parseInt(char);
        if (numSet.has(num)) return false; 
        numSet.add(num);
        sum += num;
      }
    }
  
    return str.includes('.') || sum === 45; 
  }

  convertInput(row, column) {
    row = row.toUpperCase().charCodeAt(0) - "A".charCodeAt(0);
    column = parseInt(column) - 1;

    return [row, column];
  }

  checkStr(str, index, value) {
    return str.includes(value) ? str[index] === value : true;
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
    [row, column] = this.convertInput(row, column);

    let rowStr = this.getRow(puzzleString, row);

    return this.checkStr(rowStr, column, value);
  }

  checkColPlacement(puzzleString, row, column, value) {
    [row, column] = this.convertInput(row, column);

    let colStr = this.getCol(puzzleString, column);

    return this.checkStr(colStr, row, value)
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    [row, column] = this.convertInput(row, column);

    let [regionStr, regionRowStart, regionColStart] = this.getRegion(puzzleString, row, column);
    let regionIndex = (row - regionRowStart) * 3 + (column - regionColStart);

    return this.checkStr(regionStr, regionIndex, value);
  }

  getRemainingNumbers(puzzleString) {
    let remaining = Array(10).fill(9);
    for (let char of puzzleString) {
      if (char !== '.') remaining[parseInt(char)]--;
    }
    return remaining;
  }

  getActions(puzzleString) {
    let possibilities = {};
    let remainingNumbers = this.getRemainingNumbers(puzzleString);

    for (let i = 0; i < 81; i++) {
      if (puzzleString[i] === '.') {
        let row = Math.floor(i / 9);
        let col = i % 9;
        let rowStr = this.getRow(puzzleString, row);
        let colStr = this.getCol(puzzleString, col);
        let regionStr = this.getRegion(puzzleString, row, col)[0];

        let possibleValues = [];
        for (let num = 1; num <= 9; num++) {
          if (!rowStr.includes(num) && !colStr.includes(num) && !regionStr.includes(num)) {
            possibleValues.push({ num, remaining: remainingNumbers[num] });
          }
        }

        possibleValues.sort((a, b) => a.remaining - b.remaining); 
        possibilities[i] = possibleValues.map(x => x.num);
      }
    }

    return possibilities;
  }

  solve(puzzleString) {
    if (this.validate(puzzleString)) return this.validate(puzzleString);
    if (!puzzleString.includes('.')) return puzzleString;

    let possibilities = this.getActions(puzzleString);
    let frontier = Object.entries(possibilities)
      .map(([index, values]) => ({ index: parseInt(index), values }))
      .sort((a, b) => a.values.length - b.values.length);

    return this.backtrack(puzzleString, frontier);
  }

  backtrack(puzzleString, frontier) {
    if (!frontier.length) {
      return puzzleString.includes('.') ? 7 : puzzleString; 
    }
  
    let { index, values } = frontier.shift();
  
    for (let value of values) {
      let state = puzzleString.substring(0, index) + value + puzzleString.substring(index + 1);
      let actions = this.getActions(state);
      let newFrontier = Object.entries(actions)
        .map(([i, v]) => ({ index: parseInt(i), values: v }))
        .sort((a, b) => a.values.length - b.values.length);
  
      let result = this.backtrack(state, newFrontier);
      if (result !== 7) return result; 
    }
  
    return 7; 
  }
}

module.exports = SudokuSolver;

