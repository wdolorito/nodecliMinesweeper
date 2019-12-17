const readline = require('readline')
let pickgame  = 'What game do you want to play?\n'
    pickgame += '\t(N)ovice\n'
    pickgame += '\t(I)ntermediate\n'
    pickgame += '\t(E)xpert\n'
    pickgame += '\t(Q)uit\n'


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: pickgame
})

rl.prompt()

const game = (newtype, newmines, newrows, newcols) => {
  return { name: newtype,
           mines: newmines,
           rows: newrows,
           cols: newcols
         }
}

const novice = game('novice', 10, 9, 9)
const intermediate = game('intermediate', 40, 16, 16)
const expert = game('expert', 99, 16, 30)

const drawBoard = (board) => {
  let row = ''
  for(let count = 0; count < board.cols; count++) {
    row += '\t' + count
  }
  console.log(row)
  for(let rows = 1; rows < board.rows; rows++) {
    row = rows
    for(let cols = 0; cols < board.cols; cols++) {
      row += '\t' + cols
    }
    console.log(row)
  }
}

rl.on('line', line => {
  switch (line.trim()) {
    case 'N':
    case 'n':
      drawBoard(novice)
      rl.setPrompt('Novice Game ')
      break;
    case 'I':
    case 'i':
      drawBoard(intermediate)
      rl.setPrompt('Intermediate Game ')
      break;
    case 'E':
    case 'e':
      drawBoard(expert)
      rl.setPrompt('Expert Game ')
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
