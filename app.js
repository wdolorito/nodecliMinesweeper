const readline = require('readline')
const Minesweeper = require('./minesweeper')
const minesweeper = new Minesweeper()

// minesweeper.currentgame = 'novice'
// console.log(minesweeper.running)
// minesweeper.startgame()
// console.log(minesweeper.running)
// minesweeper.endgame(true)
// console.log(minesweeper.checkgame())

minesweeper.currentgame = 'intermediate'
minesweeper.startgame()
minesweeper.endgame()
// minesweeper.checkgame()


// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
//   prompt: minesweeper.pick
// })

// console.log(minesweeper.pick)
// console.log(minesweeper.nprompt)
// console.log(minesweeper.iprompt)
// console.log(minesweeper.eprompt)

// minesweeper.currentgame = 'novice'
//
// console.log(minesweeper.running)
//
// minesweeper.currentgame = 'intermediate'
//
// console.log(minesweeper.running)

// minesweeper.currentgame = 'novice'
// minesweeper.drawboard()
// console.log()
// minesweeper.drawsolution()

// rl.prompt()

// rl.on('line', line => {
//   const resp = line.trim()
//   if(minesweeper.isrunning()) {
//     if(resp.length > 1) {
//       const remwhite = resp.replace(/ /g, '')
//       const coordinates = remwhite.split(',')
//       if(coordinates.length == 2) {
//         const row = parseInt(coordinates[0])
//         const col = parseInt(coordinates[1])
//         const rowisi = Number.isInteger(row)
//         const colisi = Number.isInteger(col)
//         const rowinrange = row >= 0 && row < currentgame.rows
//         const colinrange = col >=0 && col < currentgame.cols
//         if(rowisi && colisi && rowinrange && colinrange) {
//           testpos(row, col)
//           checkgame()
//           console.log()
//           drawBoard(currentgame)
//           rl.prompt()
//         } else {
//           badresp(resp)
//         }
//       } else {
//         badresp(resp)
//       }
//     } else {
//       if(resp == 'Q' || resp == 'q') {
//         rl.close()
//       } else {
//         badresp(resp)
//       }
//     }
//   } else {
//     switch (resp) {
//       case 'N':
//       case 'n':
//         minesweeper.setcurrentgame()
//         // drawBoard(currentgame)
//         rl.setPrompt(minesweeper.getnprompt())
//         console.log(minesweeper.getboard())
//         // startgame()
//         break;
//       case 'I':
//       case 'i':
//         minesweeper.setcurrentgame('intermediate')
//         // drawBoard(currentgame)
//         rl.setPrompt(minesweeper.getiprompt())
//         // startgame()
//         break;
//       case 'E':
//       case 'e':
//         minesweeper.setcurrentgame('expert')
//         // drawBoard(currentgame)
//         rl.setPrompt(minesweeper.geteprompt())
//         // startgame()
//         break;
//       case 'Q':
//       case 'q':
//         rl.close()
//         break;
//       default:
//         console.log(`\n  ${resp} is not a valid choice\n`)
//         rl.setPrompt(minesweeper.getpickprompt())
//         break;
//     }
//     rl.prompt()
//   }
// }).on('close', () => {
//   console.log('\nThank you for playing!\n')
//   process.exit(0)
// })
