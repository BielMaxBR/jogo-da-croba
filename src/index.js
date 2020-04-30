var canvas, ctx, WIDTH, HEIGHT, bpm, tileSize;
var snake, playLabel, frisk
var globalTouch = [], offset = []
var bpmb
window.addEventListener("resize", resizeWindow)

window.addEventListener("keydown", keyDown)

window.addEventListener("touchstart", touchStart)
window.addEventListener("touchMove", touchMove)
window.addEventListener("touchEnd", touchEnd)

function isMobile() {
    return /Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent)
}

function touchMove(e) {
    var touch = e.touches[0]

    offset = [touch.pageX - globalTouch[0], touch.pageY - globalTouch[1]]
}

function touchEnd(e) {
    if (Math.abs(offset[0] > Math.abs(offset[1]))) {
        snake.direction = [offset[0] / Math.abs(offset[0]), 0]
    }
    else {
        snake.direction = [0, offset[1] / Math.abs(offset[1])]
    }
}

function touchStart(e) {
    e.preventDefault()
    
    var touch = e.touches[0]
    globaltouch = [touch.pageX, touch.pageY]
}

function keyDown(e) {
    
    if(e.key == "ArrowUp" || e.key.toLowerCase() == "w") {
            playing = true
        snake.direction = [0, -1]
    }
    if(e.key == "ArrowDown" || e.key.toLowerCase() == "s") {
            playing = true
        snake.direction = [0, 1]
    }
    if(e.key == "ArrowLeft" || e.key.toLowerCase() == "a") {
            playing = true
        snake.direction = [-1, 0]
    }
    if(e.key == "ArrowRight" || e.key.toLowerCase() == "d") {
            playing = true
        snake.direction = [1, 0]
    }
    if (e.key == "Enter") {
        playing = false
    }
    if (e.key.toLowerCase() == "l") {
        snake.body.splice(0,0, snake.body[0])
    }
    if (e.key.toLowerCase() == "c") {
        bpmb = true
    }
    if (e.key.toLowerCase() == "v") {
        bpmb = false
    }
}

function init() {
    canvas = document.createElement("canvas")
    resizeWindow()
    document.body.appendChild(canvas)
    ctx = canvas.getContext("2d");
    
    bpm = 1200

    newGame()
    frisk.update()
    run()
}
function resizeWindow() {
    WIDTH = window.innerWidth
    HEIGHT = window.innerHeight

    canvas.width = 500
    canvas.height = 500

    tileSize = 10
}

function newGame() {
    snake = new Snake()
    playLabel = new PlayLabel()
    frisk = new Frisk()
    playing = false
}

function Frisk() {
    this.color = "#ff0000"
    this.pos = []

    this.update = function() {
        this.pos = [getRandom(500/tileSize-1), getRandom(500/tileSize-1)]
        console.log("frisk")
    }

    this.draw = function() {
        ctx.fillStyle = this.color

        ctx.fillRect(this.pos[0] * tileSize, this.pos[1] * tileSize, tileSize, tileSize)
        // ctx.fillStyle = "ffff00"
        // ctx.strokeRect(this.pos[0] * tileSize, this.pos[1] * tileSize, tileSize, tileSize)
    }
}

function getRandom(max) {
    return Math.floor(Math.random() * max + 1)
}

function PlayLabel() {
    this.text;
    this.color= '#393852'
    this.messages = {
        portrait: "gire a tela pra jogar",
        landscape: "arrasta pra jogar",
        pc: "aperte as setas ou WASD pra jogar"
    }

    if (isMobile()) {

    }
    else {
        this.text = this.messages["pc"]
    }

    this.draw = function() {
        ctx.fillStyle = this.color
        ctx.font = tileSize*2 + "px Comic Sans MS"
        ctx.fillText(this.text, canvas.width/4 - ctx.measureText(this.text).width / tileSize, 500 / 2)
    }
}

function Snake() {
    this.body = [[10,10],[10,11],[10,12]]
    this.color = '#000'
    this.direction = [0, -1]

    this.update = function() {
        var nextPos = [this.body[0][0] + this.direction[0],this.body[0][1] + this.direction[1]]
        
        if (!playing) {
            if(this.direction[1] == -1 && nextPos[1] <= (500 * 0.1/ tileSize)) {
                this.direction = [1, 0]
            }
            else if(this.direction[0] == 1 && nextPos[0] >= (500 * 0.9/ tileSize)) {
                this.direction = [0, 1]
            }
            else if(this.direction[1] == 1 && nextPos[1] >= (500 * 0.9/ tileSize)) {
                this.direction = [-1, 0]
            }
            else if(this.direction[0] == -1 && nextPos[0] <= (500 * 0.1/ tileSize)) {
                this.direction = [0, -1]
            }
        }

        if (nextPos[0] == this.body[1][0] && nextPos[1] == this.body[1][1]) {
            this.body.reverse()
            nextPos = [this.body[0][0] + this.direction[0],this.body[0][1] + this.direction[1]]

        }

        if (!bpmb) {
            this.body.pop()
            this.body.splice(0,0, nextPos)
        }
        
        if (this.body[0][0] < 0) {
            snake.body[0][0] = canvas.width/tileSize
        }
        if (this.body[0][0] > canvas.width/tileSize+1) {
            snake.body[0][0] = 0
        }
        if (this.body[0][1] < 0) {
            snake.body[0][1] = canvas.height/tileSize
        }
        if (this.body[0][1] > canvas.height/tileSize+1) {
            snake.body[0][1] = 0
        }
        
    }

    this.draw = function() {
        ctx.fillStyle = this.color
        

        for (var i = 0; i < this.body.length; i++) {
            ctx.fillRect(this.body[i][0] * tileSize+1, this.body[i][1] * tileSize+1, tileSize-2, tileSize-2)
            
        }
    }
}

function collision() {
    // console.log("tentando bater")
    if(snake.body[0].toString() == frisk.pos.toString()) {
        // console.log("bateu")
        frisk.update()
        snake.body.splice(0,0, snake.body[0])
    }
}

function update() {
    snake.update()
    collision()
    
}
 
function run() {
    update()
    draw()
    
    setTimeout(run, (60/bpm)*1000)
}

function draw() {
    ctx.clearRect(0 ,0 ,500, 500)
    
    if (playing) {
        frisk.draw()
    }
    snake.draw();
    if (!playing) {
        playLabel.draw()
    }
}
 
init()