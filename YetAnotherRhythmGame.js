/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: osu
@author: Sreekar617
@tags: [beginner]
@addedOn: 2024-00-00
*/

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function scroll() {
  await sleep(500)
  for (i = 0; i < getAll(apple).length; i++) {
    getAll(apple)[i].y += 1
  }
}

const player = "p"
const wall = "w"
const bg = "b"
const apple = "a"
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
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333`]
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
wp...w`
]
setBackground(bg)

setMap(levels[level])

setPushables({
  [player]: []
})
async function main() {
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
    if (tilesWith(player, apple).length > 0) {
      points += 1
      console.log(points)
    }
  })

  for (i = 0; i < getAll(apple).length; i++) {
    let appleInstance = getAll(apple)[i];
    if (appleInstance && appleInstance.y == 7) {
      await scroll();
      appleInstance.y = 0;
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
  for (let i = 0; i < 1000; i++) {
    await main()
  }
}

start()
