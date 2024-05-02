export const createBoard = (height, width, random = false) => {
  // Init empty array
  const boardState = []

  // Populate array with empty cells
  for (let rowIndex = 0; rowIndex < height; rowIndex++) {
    boardState.push([])
    for (let columnIndex = 0; columnIndex < width; columnIndex++) {
      if (random) {
        boardState[rowIndex][columnIndex] = Math.random() < 0.3
      } else {
        boardState[rowIndex][columnIndex] = false
      }
    }
  }

  return boardState
}

export const drawBoard = (boardState) => {
  const tableElement = document.createElement("table")
  for (let rowIndex = 0; rowIndex < boardState.length; rowIndex++) {
    const rowElement = document.createElement("tr")
    for (let columnIndex = 0; columnIndex < boardState[rowIndex].length; columnIndex++) {
      const cell = document.createElement("td")
      cell.id = `cell-${rowIndex + 1}-${columnIndex +1}`
      cell.className = boardState[rowIndex][columnIndex] ? 'alive' : ''
      rowElement.appendChild(cell)
    }
    tableElement.appendChild(rowElement)
  }
  return tableElement
}

export const updateBoard = (currentGeneration) => {
  // Copy current state
  const nextGeneration = JSON.parse(JSON.stringify(currentGeneration))

  // Itterate over previous generation
  for (let rowIndex = 0; rowIndex < currentGeneration.length; rowIndex++) {
    // Itterate over each cell and using logic, decide on state (dead/alive -> false/true)
    for (let columnIndex = 0; columnIndex < currentGeneration[rowIndex].length; columnIndex++) {
      // create function that counts ammount of neighbors
      const state = currentGeneration[rowIndex][columnIndex]
      const neighbors = countNeighbors(currentGeneration, rowIndex, columnIndex)

      // Attempt: 1
      /* if (state && (neighbors < 2 || neighbors > 3)) {
        nextGeneration[rowIndex][columnIndex] = false
      } else if (state && (neighbors === 2 || neighbors === 3)) {
        nextGeneration[rowIndex][columnIndex] = true
      } else if (!state && (neighbors === 3)) {
        nextGeneration[rowIndex][columnIndex] = true
      } */


      // Attempt: 2
      /* if (state && (neighbors > 2 || neighbors < 3)) {
        nextGeneration[rowIndex][columnIndex] = false
      } else if (state && (neighbors === 2 || neighbors === 3)) {
        nextGeneration[rowIndex][columnIndex] = true
      } else if (!state && (neighbors === 3)) {
        nextGeneration[rowIndex][columnIndex] = true
      } else {
        nextGeneration[rowIndex][columnIndex] = false
      } */

      // Attempt: 3
      if (state) {
        if (neighbors < 2 || neighbors > 3) nextGeneration[rowIndex][columnIndex] = false
        if (neighbors === 2 || neighbors === 3) nextGeneration[rowIndex][columnIndex] = true
      } else {
        if (neighbors === 3) nextGeneration[rowIndex][columnIndex] = true
      }

      // Verify rules
      if (neighbors === 2 || neighbors === 3) {
        // console.log(`X:${rowIndex} Y:${columnIndex} State:${state ? 'alive' : 'dead'} Neighbors:${neighbors} Next: ${nextGeneration[rowIndex][columnIndex] ? 'live' : 'die'}`)
      }
    }
  }

  // Return newly created array
  return nextGeneration
}

const countNeighbors = (boardstate, x, y, wrap = false) => {
  let neighbors = 0;

  if (wrap) {
    // I'll implement wrapping later
  } else {
    // Iterate 3 times in two dimensions
    for (let row = -1; row < 2; row++) {
      for (let column = -1; column < 2; column++) {
        if (row !== 0 && column !== 0) {
          if (((row + x) >= 0 && (row + x) < boardstate.length) && ((column + y) >= 0 && (column + y) < boardstate[x].length)) {
            if (boardstate[row + x][column + y]) neighbors ++
          }
        }
      }
    }
  }

  console.log(`Row: ${x} Collumn: ${y} Neighbors: ${neighbors}`)

  return neighbors
}