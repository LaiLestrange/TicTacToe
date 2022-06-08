'use strict'
let cells = ''
let btnRst = ''

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.btnChoice').forEach(playerChosen => {
    playerChosen.addEventListener('click', triggerChoice)
  })

  btnRst = document.querySelector('.btnRst')
  btnRst.addEventListener('click', triggerRst)

  cells = document.querySelectorAll('.cell')
  cells.forEach(cellClicked => {
    cellClicked.addEventListener('click', triggerMove)
  })
})

function triggerChoice(event) {
  playerChoice(document.getElementById(event.target.id))
}

function gameBegins(symbol) {
  document.querySelector('.choice').classList.add('noDisplay')
  document.querySelector('.theGame').classList.remove('noDisplay')
  document.getElementById('turnSymbol').innerHTML = `${symbol}`
}

function triggerMove(event) {
  move(document.getElementById(event.target.id))
}

function updateCells(cellChanged) {
  let updateCell = document.getElementById(
    String(cellChanged.i) + String(cellChanged.j)
  )

  if (cellChanged.val != '') {
    updateCell.innerHTML = `<div class="${cellChanged.val}"></div>`
    updateCell.classList.remove('hover')
  } else {
    updateCell.innerHTML = ''
  }
}

function triggerRst(event) {
  rstGame()

  // volta o html para suas condições iniciais
  document
    .querySelectorAll('.winner')
    .forEach(clear => clear.classList.remove('winner'))
  document.querySelector('.choice').classList.remove('noDisplay')
  document.querySelector('.theGame').classList.add('noDisplay')
  cells.forEach(cell => cell.classList.add('hover'))
}
function updateDashboard() {
  document.getElementById('turnNumber').innerHTML = `${turn}`
  document.getElementById('turnSymbol').innerHTML = `${symbols[playerTurn]}`
}

function showWinner(positions) {
  positions.forEach(id => document.getElementById(id).classList.add('winner'))
  cells.forEach(cell => cell.classList.remove('hover'))
  btnRst.classList.add('winner')
}
