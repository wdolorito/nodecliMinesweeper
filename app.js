const readline = require('readline')
const pickgame  = 'What game do you want to play?\n\t(N)ovice\n\t(I)ntermediate\n\t(E)xpert\n\t(Q)uit\n'
const dprompt = 'pick a (row, column): '
const ngame = '\nNovice game> ' + dprompt
const igame = '\nIntermediate game> ' + dprompt
const egame = '\nExpert game> ' + dprompt
let currentgame

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: pickgame
})

const createsolution = (rows, cols, mines, specials) => {
  const len = rows * cols
  let sol = initboard(rows, cols)
  for(let count = 0; count < mines; count++) {
    let mine = Math.floor(Math.random() * Math.floor(len))
    if(sol[mine] == '.') {
      sol[mine] = 'X'
    } else {
      count--
    }
  }
  sol = populatenumbers(rows, cols, sol, specials)
  return sol
}

const populatenumbers = (rows, cols, board, specials) => {
  const len = rows * cols
  for(let count = 0; count < len; count++) {
    if(board[count] == '.') board[count] = getminecount(count, rows, cols, board, specials)
  }
  return board
}

const getminecount = (position, rows, cols, board, specials) => {
  let counter = 0
  const xy = getrowcol(position, cols)
  const row = xy.y
  const col = xy.x
  const len = row * col
  let tester = {}
  let pos = 0
  const gettests = checkspecials(position, specials)

  // check top left
  if(gettests.tl) {
    tester = { x: col - 1, y: row - 1 }
    pos = getpos(tester.y, tester.x, rows, cols, len)
    if(checkpos(board[pos])) counter++
  }

  // check top
  if(gettests.t) {
    tester = { x: col, y: row - 1 }
    pos = getpos(tester.y, tester.x, rows, cols, len)
    if(checkpos(board[pos])) counter++
  }

  // check top right
  if(gettests.r) {
    tester = { x: col + 1, y: row - 1 }
    pos = getpos(tester.y, tester.x, rows, cols, len)
    if(checkpos(board[pos])) counter++
  }

  // check left
  if(gettests.l) {
    tester = { x: col - 1, y: row }
    pos = getpos(tester.y, tester.x, rows, cols, len)
    if(checkpos(board[pos])) counter++
  }

  // check right
  if(gettests.r) {
    tester = { x: col + 1, y: row }
    pos = getpos(tester.y, tester.x, rows, cols, len)
    if(checkpos(board[pos])) counter++
  }

  // check bottom left
  if(gettests.bl) {
    tester = { x: col - 1, y: row + 1 }
    pos = getpos(tester.y, tester.x, rows, cols, len)
    if(checkpos(board[pos])) counter++
  }

  // check bottom
  if(gettests.b) {
    tester = { x: col, y: row + 1}
    pos = getpos(tester.y, tester.x, rows, cols, len)
    if(checkpos(board[pos])) counter++
  }

  // check bottom right
  if(gettests.br) {
    tester = { x: col + 1, y: row + 1 }
    pos = getpos(tester.y, tester.x, rows, cols, len)
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

const getpos = (row, col, rows, cols, len) => {
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

const initboard = (rows, cols) => {
  const len = rows * cols
  const board = new Array(len)
  board.fill('.', 0, len)
  return board
}

const getspecials = (rows, cols) => {
  const len = rows * cols,
        collim = cols - 2,
        rowlim = rows - 2,
        tearr = new Array(collim),
        bearr = new Array(collim),
        learr = new Array(rowlim),
        rearr = new Array(rowlim)

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
           blc: len - cols,
           brc: len - 1,
           te: tearr,
           be: bearr,
           le: learr,
           re: rearr
         }
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

const game = (newtype, newmines, newrows, newcols) => {
  const specials = getspecials(newrows, newcols)

  return {
           name: newtype,
           mines: newmines,
           rows: newrows,
           cols: newcols,
           solution: createsolution(newrows, newcols, newmines, specials),
           running: initboard(newrows, newcols),
           specials: specials
         }
}

const drawBoard = (board) => {
  const r = board.rows
  const c = board.cols
  const game = board.solution

  let row = ''
  for(let count = 0; count < c; count++) {
    row += '\t' + count
  }
  console.log(row)
  console.log()

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

rl.prompt()

rl.on('line', line => {
  switch (line.trim()) {
    case 'N':
    case 'n':
      currentgame = game('novice', 10, 9, 9)
      drawBoard(currentgame)
      rl.setPrompt(ngame)
      console.time('game timer')
      break;
    case 'I':
    case 'i':
      currentgame = game('intermediate', 40, 16, 16)
      drawBoard(currentgame)
      rl.setPrompt(igame)
      console.time('game timer')
      break;
    case 'E':
    case 'e':
      currentgame = game('expert', 99, 16, 30)
      drawBoard(currentgame)
      rl.setPrompt(egame)
      console.time('game timer')
      break;
    case 'Q':
    case 'q':
      rl.close()
      break;
    default:
      console.log(`${line.trim()} is not a valid choice`)
      rl.setPrompt(pickgame)
      break;
  }
  rl.prompt()
}).on('close', () => {
  console.log('\nQuitting')
  process.exit(0)
})
