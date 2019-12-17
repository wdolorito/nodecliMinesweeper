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

const createsolution = (rows, cols, mines) => {
  const len = rows * cols
  const sol = initgame(rows, cols, mines)
  for(let count = 0; count < mines; count++) {
    let mine = Math.floor(Math.random() * Math.floor(len))
    if(sol[mine] == '.') {
      sol[mine] = 'X'
    } else {
      count--
    }
  }
  return sol
}

const initgame = (rows, cols, mines) => {
  const len = rows * cols
  const game = new Array(len)
  game.fill('.', 0, len)
  return game
}

const game = (newtype, newmines, newrows, newcols) => {
  return { name: newtype,
           mines: newmines,
           rows: newrows,
           cols: newcols,
           solution: createsolution(newrows, newcols, newmines),
           running: initgame(newrows, newcols, newmines)
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

  for(let rows = 0; rows < r; rows++) {
    row = rows
    for(let cols = 0; cols < c; cols++) {
      row += '\t' + game[(rows * c) + cols]
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
  console.log('Quitting')
  process.exit(0)
})

// rl.question('What is this? ', q => {
//   console.log(q)
//   console.time('draw board')
//   drawBoard(intermediate)
//   console.timeEnd('draw board')
//   rl.close()
// })
