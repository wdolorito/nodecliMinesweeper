const drawBoard = (board, sol) => {
  const r = board.rows
  const c = board.cols
  let game = board.running.board
  if(sol) game = board.solution

  let row = ''
  for(let count = 0; count < c; count++) {
    row += '\t' + count
  }
  console.log(`${row}\n\n`)

  for(let rows = 0; rows < r; rows++) {
    row = rows
    let pos
    let val
    for(let cols = 0; cols < c; cols++) {
      pos = (rows * c) + cols
      val = game[pos]
      row += '\t' + val
    }
    console.log(row)
  }
}

const testpos = (row, col) => {
  const board = currentgame.running.board
  const specials = currentgame.specials
  const checked = currentgame.running.checked
  const sol = currentgame.solution
  const len = currentgame.len
  const pos = getpos(row, col, currentgame.rows, currentgame.cols)
  if(pos >= 0) {
    const solval = sol[pos]
    board[pos] = solval
    if(solval == 'X') {
      endgame()
    } else {
      if(checked[pos] == '.') {
        checked[pos] = 'x'
        if(solval == 0) {
          const gettests = checkspecials(pos, specials)

          // check top left
          if(gettests.tl) testpos(row - 1, col - 1)

          // check top
          if(gettests.t) testpos(row - 1, col)

          // check top right
          if(gettests.r) testpos(row - 1, col + 1)

          // check left
          if(gettests.l) testpos(row, col - 1)

          // check right
          if(gettests.r) testpos(row, col + 1)

          // check bottom left
          if(gettests.bl) testpos(row + 1, col - 1)

          // check bottom
          if(gettests.b) testpos(row + 1, col)

          // check bottom right
          if(gettests.br) testpos(row + 1, col + 1)
        }
      }
    }
  }
}

const checkgame = () => {
  const len = currentgame.len
  const checked = currentgame.running.checked
  const mines = currentgame.mines
  let counter = 0
  for(let count = 0; count < len; count++) {
    if(checked[count] == '.') counter++
  }
  if(counter == mines) endgame(true)
}

const startgame = () => {
  gamerunning = true
  console.time('\ngame timer')
}

const endgame = win => {
  gamerunning = false
  console.log()
  drawBoard(currentgame, !win)
  console.timeEnd('\ngame timer')
  if(win) {
    console.log('\nYou won :)')
  } else {
    console.log('\nYou lost :(')
  }

  rl.close()
}

const badresp = resp => {
  console.log(`\n  ${resp} is not a valid entry\n`)
  drawBoard(currentgame)
  rl.prompt()
}

class Minesweeper {
  #pickgame = 'What game do you want to play?\n\t(N)ovice\n\t(I)ntermediate\n\t(E)xpert\n\t(Q)uit\n'
  #dprompt = 'pick a (row, column) or (Q)uit: '
  #ngame = '\nNovice game> ' + this.#dprompt
  #igame = '\nIntermediate game> ' + this.#dprompt
  #egame = '\nExpert game> ' + this.dprompt
  #currentgame = {}
  #gamerunning = false

  constructor() {
  }

  get pick() {
    return this.#pickgame
  }

  get nprompt() {
    return this.#ngame
  }

  get iprompt() {
    return this.#igame
  }

  get eprompt() {
    return this.#egame
  }

  setcurrentgame(type) {
    let game = game('novice', 10, 9, 9)
    switch(type) {
      case 'novice':
        break
      case 'intermediate':
        game = game(type, 40, 16, 16)
        break
      case 'expert':
        game = game(type, 99, 16, 30)
        break
      default:
    }
    this.currentgame = game
  }

  getboard() {
    return this.#currentgame
  }

  isrunning() {
    return this.#gamerunning
  }
}

const game = (newtype, newmines, newrows, newcols) => {
  const len = newrows * newcols
  const specials = getspecials(newrows, newcols, len)

  const running = {
                    board: initboard(newrows, newcols, len),
                    checked: initboard(newrows, newcols, len)
                  }

  return {
           name: newtype,
           mines: newmines,
           rows: newrows,
           cols: newcols,
           len: len,
           solution: createsolution(newrows, newcols, newmines, specials, len),
           running: running,
           specials: specials
         }
}

const getspecials = (rows, cols, len) => {
  const collim = cols - 2
  const rowlim = rows - 2
  const tearr = new Array(collim)
  const bearr = new Array(collim)
  const learr = new Array(rowlim)
  const rearr = new Array(rowlim)

  for(let count = 0; count < collim; count++) {
    tearr[count] = count + 1
    bearr[count] = len - tearr[count] - 1
  }

  for(let count = 0; count < rowlim; count++) {
    learr[count] = (count + 1) * rows
    rearr[count] = learr[count] + cols - 1
  }

  return {
           tlc: 0,
           trc: cols - 1,
           blc: len - cols - 1,
           brc: len - 1,
           te: tearr,
           be: bearr,
           le: learr,
           re: rearr
         }
}

const initboard = (rows, cols, len) => {
  const board = new Array(len)
  board.fill('.', 0, len)
  return board
}

const createsolution = (rows, cols, mines, specials, len) => {
  let sol = initboard(rows, cols, len)
  for(let count = 0; count < mines; count++) {
    const mine = Math.floor(Math.random() * Math.floor(len))
    if(sol[mine] == '.') {
      sol[mine] = 'X'
    } else {
      count--
    }
  }
  sol = populatenumbers(rows, cols, sol, specials, len)
  return sol
}

const populatenumbers = (rows, cols, board, specials, len) => {
  for(let count = 0; count < len; count++) {
    if(board[count] == '.') board[count] = getminecount(count, rows, cols, board, specials, len)
  }
  return board
}

const getminecount = (position, rows, cols, board, specials, len) => {
  let counter = 0
  const xy = getrowcol(position, cols)
  const row = xy.y
  const col = xy.x
  let pos = 0
  const gettests = checkspecials(position, specials)

  // check top left
  if(gettests.tl) {
    pos = getpos(row - 1, col - 1, rows, cols)
    if(checkpos(board[pos])) counter++
  }

  // check top
  if(gettests.t) {
    pos = getpos(row - 1, col, rows, cols)
    if(checkpos(board[pos])) counter++
  }

  // check top right
  if(gettests.r) {
    pos = getpos(row - 1, col + 1, rows, cols)
    if(checkpos(board[pos])) counter++
  }

  // check left
  if(gettests.l) {
    pos = getpos(row, col - 1, rows, cols)
    if(checkpos(board[pos])) counter++
  }

  // check right
  if(gettests.r) {
    pos = getpos(row, col + 1, rows, cols)
    if(checkpos(board[pos])) counter++
  }

  // check bottom left
  if(gettests.bl) {
    pos = getpos(row + 1, col - 1, rows, cols)
    if(checkpos(board[pos])) counter++
  }

  // check bottom
  if(gettests.b) {
    pos = getpos(row + 1, col, rows, cols)
    if(checkpos(board[pos])) counter++
  }

  // check bottom right
  if(gettests.br) {
    pos = getpos(row + 1, col + 1, rows, cols)
    if(checkpos(board[pos])) counter++
  }

  return counter
}

const getrowcol = (pos, cols) => {
  let xy = {}
  xy.x = pos % cols
  xy.y = Math.floor(pos / cols)
  return xy
}

const checkspecials = (pos, specials) => {
  let tl = true
  let t = true
  let tr = true
  let l = true
  let r = true
  let bl = true
  let b = true
  let br = true

  const istlc = pos == specials.tlc
  const istrc = pos == specials.trc
  const isblc = pos == specials.blc
  const isbrc = pos == specials.brc
  const iste = specials.te.includes(pos)
  const isbe = specials.be.includes(pos)
  const isle = specials.le.includes(pos)
  const isre = specials.re.includes(pos)

  if(istlc) {
    tl = false
    t = false
    tr = false
    l = false
    bl = false
  }
  if(istrc) {
    tl = false
    t = false
    tr = false
    r = false
    br = false
  }
  if(isblc) {
    tl = false
    l = false
    bl = false
    b = false
    br = false
  }
  if(isbrc) {
    tr = false
    r = false
    bl = false
    b = false
    br = false
  }
  if(iste) {
    tl = false
    t = false
    tr = false
  }
  if(isbe) {
    bl = false
    b = false
    br = false
  }
  if(isle) {
    tl = false
    l = false
    bl = false
  }
  if(isre) {
    tr = false
    r = false
    br = false
  }

  return {
           tl: tl,
           t: t,
           tr: tr,
           l: l,
           r: r,
           bl: bl,
           b: b,
           br: br
         }
}

const getpos = (row, col, rows, cols) => {
  let toreturn = -1
  let pos
  if(row <= rows && col <= cols) toreturn = (row * cols) + col
  return toreturn
}

const checkpos = (val) => {
  let toreturn = false
  if(val == 'X') toreturn = true
  return toreturn
}

module.exports = Minesweeper
