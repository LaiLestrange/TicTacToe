'use strict'
let symbols = ['o', 'x']
let gameOver = false
let playerTurn = 0
let turn = 1
let xPos = []
let oPos = []
let winnerPositions = []
let winnerSymbol = ''

function Cell(i, j, val) {
  return { i, j, val }
}

let board = [
  Cell(0, 0, ''),
  Cell(0, 1, ''),
  Cell(0, 2, ''),
  Cell(1, 0, ''),
  Cell(1, 1, ''),
  Cell(1, 2, ''),
  Cell(2, 0, ''),
  Cell(2, 1, ''),
  Cell(2, 2, '')
]

let winStates = [
  ['00', '01', '02'],
  ['10', '11', '12'],
  ['20', '21', '22'],
  ['00', '10', '20'],
  ['01', '11', '21'],
  ['02', '12', '22'],
  ['00', '11', '22'],
  ['02', '11', '20']
].sort()

function playerChoice(choice) {
  let symbol = ''
  let symbolChosen = choice.id
  if (symbolChosen == 'btnx') {
    playerTurn = 1
    symbol = 'x'
  } else {
    playerTurn = 0
    symbol = 'o'
  }

  gameBegins(symbol)
}

function move(target) {
  let iofCell = target.dataset.i
  let jofCell = target.dataset.j

  if (gameOver) {
    return
  }

  board.forEach(item => {
    if (item.i == iofCell) {
      if (item.j == jofCell) {
        if (item.val == '') {
          item.val = symbols[playerTurn]
          updateCells(item)
          gameOver = isWin()
          if (gameOver) {
            showWinner(winnerPositions)
          } else {
            changeTurn()
          }
        }
      }
    }
  })
}

function isWin() {
  board
    .filter(item => {
      if (item.val == 'x') {
        return item
      }
    })
    .forEach(x => {
      let resp = String(x.i) + String(x.j)
      if (!xPos.includes(resp)) {
        xPos.push(resp)
      }
    })

  board
    .filter(item => {
      if (item.val == 'o') {
        return item
      }
    })
    .forEach(o => {
      let resp = String(o.i) + String(o.j)
      if (!oPos.includes(resp)) {
        oPos.push(resp)
      }
    })

  let isGameOver = false

  winStates.forEach(ws => {
    let xWin = []
    let oWin = []
    ws.forEach(check => {
      if (xPos.includes(check)) {
        xWin.push(check)
      }
      if (oPos.includes(check)) {
        oWin.push(check)
      }

      if (xWin.length == 3 || oWin.length == 3) {
        if (xWin.length == 3) {
          winnerPositions = [...xWin]
          winnerSymbol = 'x'
        }
        if (oWin.length == 3) {
          winnerPositions = [...oWin]
          winnerSymbol = 'o'
        }

        isGameOver = true
      }
    })
  })

  return isGameOver
}

function changeTurn() {
  playerTurn = playerTurn == 0 ? 1 : 0
  turn++
  updateDashboard()
}

function rstGame() {
  // limpa todas as celulas
  board.forEach(clearMoves => {
    if (clearMoves.val != '') {
      clearMoves.val = ''
      updateCells(clearMoves)
    }
  })

  // reseta as variáveis para suas condições iniciais
  turn = 1
  playerTurn = 0
  gameOver = false
  updateDashboard()

  // elimina o registro do vencedor
  xPos = []
  oPos = []
  winnerPositions = []
  winnerSymbol = ''
}
