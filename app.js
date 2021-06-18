const startBtn = document.querySelector(".start")
const screens = document.querySelectorAll(".screen")
const selectIntervalBtn = document.querySelector(".time-list")
const timeElement = document.querySelector("#time")
const board = document.querySelector("#board")
const colorSet = [
  "#df1d0f",
  "#ffff00",
  "#e6a605",
  "#17c717",
  "#ff00ff",
  "#5e005e",
  "#1f7bc7",
  "#8c2ae7",
]
// const urlZero =
//   "https://media.tenor.com/images/feaf12766729203102baa2feb79c87db/tenor.gif"
// const urlWin =
//   "https://media.tenor.com/images/7cbc1f2cf5f3ba7b9ca161bc6d9cd967/tenor.gif"

let timeInterval = 0
let score = 0

startBtn.addEventListener("click", (event) => {
  event.preventDefault()
  screens[0].classList.add("up")
})

selectIntervalBtn.addEventListener("click", (event) => {
  if (event.target.classList.contains("time-btn")) {
    timeInterval = +event.target.getAttribute("data-time")
    screens[1].classList.add("up")
    startGame()
  }
})

board.addEventListener("click", (event) => {
  if (event.target.classList.contains("point")) {
    score += 1
    event.target.remove()
    createRandomPoint()
  }
})

function startGame() {
  board.innerHTML = ""
  setInterval(decreaseTime, 1000)
  createRandomPoint()
  setTime(timeInterval)
}

function setTime(value) {
  timeElement.innerHTML = `00:${value < 10 ? '0' + value : value}`
}

function decreaseTime() {
  if (timeInterval !== 0) {
    let current = --timeInterval
    setTime(current)
  } else {
    stopGame()
  }
}


function getColor() {
  const color = Math.floor(Math.random() * colorSet.length)
  return colorSet[color]
}

function setColor() {
  return getColor()
}

function createRandomPoint() {
  const point = document.createElement("div")
  const size = setRandomSize(10, 55)
  const { width, height } = board.getBoundingClientRect()
  const x = setRandomSize(10, width - size)
  const y = setRandomSize(10, height - size)

  point.classList.add("point")
  point.style.width = `${size}px`
  point.style.height = `${size}px`
  point.style.left = `${x}px`
  point.style.top = `${y}px`
  point.style.background = setColor()

  board.append(point)
}

function setRandomSize(min, max) {
  return Math.round(Math.random() * (max - min) + min)
}

function stopGame() {
  timeElement.parentNode.classList.add("hide")
  score !== 0
  ? board.innerHTML = `<div class="result-win"><h1>score: <span class='primary'>${score}</span></h1>
  <button class="reload">play again</button></div>`
  : board.innerHTML = `<div class="result-zero"><h1>score: <span class='primary'>${score}</span></h1>
  <button class="reload">play again</button></div>`

  const reloadGame = document.querySelector(".reload")

  reloadGame.addEventListener("click", () => {
    document.location.reload()
  })
}


//hack-трюк от Vladilen

function winTheGame() {
  function kill() {
    const point = document.querySelector('.point')
   if (point) {
     point.click()
   }
  }
  setInterval(kill, 50)
}
