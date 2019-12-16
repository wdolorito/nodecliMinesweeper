const readline = require('readline')

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

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.question('What is this? ', q => {
  console.log(q)
  console.log(novice.name)
  console.log(novice.mines)
  console.log(novice.rows)
  console.log(novice.cols)
  console.log(intermediate)
  console.log(expert)
  rl.close()
})
