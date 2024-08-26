/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: fruit catch
@author: Sreekar617
@tags: [beginner]
@addedOn: 2024-00-00
*/

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// Move apples dowm
async function scroll() {
  await sleep(250) // Change this number to change difficulity!
  for (i = 0; i < getAll(apple).length; i++) {
    getAll(apple)[i].y += 1
  }
}

const player = "p"
const wall = "w"
const bg = "b"
const apple = "a"
const person = "e"
const lava = "l"
var points = 0

setLegend(
  [player, bitmap`
......3333......
....33333333....
...333333333....
...333333333....
.77777733333....
.7227773333333..
.7777773333333..
...33300000333..
...33303333333..
...33330333333..
...333330333....
...333303333....
...333033333....
...333000003....
....33....33....
....33....33....`],
  [wall, bitmap`
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH`],
  [bg, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],
  [apple, bitmap`
................
.........C......
........CC......
........C.......
.....333333.....
...3333333333...
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
...3333333333...
...3333333333...
....33333333....
.....333333.....
................`],
  [person, bitmap`
................
................
................
.333..222222....
3...3.2.....22..
3.....2.2..2.22.
.333..2.......2.
....3.2.......2.
3...3.22.....22.
.333...2222222..
..........22....
..........22....
.......2222222..
.....222..22..22
.....2....22....
................`],
  [lava, bitmap`
................
................
................
................
................
................
................
................
................
................
................
................
................
................
................
9999999999999999`]

)

setSolids([])

let level = 0
const levels = [
  map`
w.a..w
w....w
w....w
w....w
w....w
w....w
w....w
wp...w
wllllw`,
  map`
e`
]
setBackground(bg)

setMap(levels[level])

setPushables({
  [player]: []
})
async function main() {
  let a = Math.floor(Math.random() * 10) + 1 // Generate a random number from 1 to 10
  if (getAll(apple).length < 8) {
    addSprite(Math.floor(Math.random() * 4) + 1, 0, apple) // Add new apple if there aren't already too many onscreen
  }

  await scroll()

  onInput("s", () => {
    getFirst(player).x = 1
  })

  onInput("d", () => {
    getFirst(player).x = 2
  })

  onInput("k", () => {
    getFirst(player).x = 3
  })

  onInput("l", () => {
    getFirst(player).x = 4
  })

  afterInput(() => {
    console.log(points)
  })

  if (tilesWith(player, apple).length > 0) {
    points += 1
    console.log(points)
  }

  // Unnecessarily complex code resets apples once they hit the bottom
  for (i = 0; i < getAll(apple).length; i++) {
    console.log(i)
    let appleInstance = getAll(apple)[i]
    if (appleInstance && appleInstance.y == 8) {
      appleInstance.y = 0
      appleInstance.x = Math.floor(Math.random() * 4) + 1
      points -= 1
    }
  }
  console.log('sigma')
}

// if (getFirst(apple).y == 7) {
//   await scroll()
//   getFirst(apple).y = 0
//   addSprite(1, 1, apple)
// }


async function start() {
  for (let i = 0; i < 500; i++) {
    await main()
  }
  setMap(levels[1])
  addText(`you win!\nscore: ${points}`, {
    x: 4,
    y: 0,
    color: color`1`
  })
}

start()
