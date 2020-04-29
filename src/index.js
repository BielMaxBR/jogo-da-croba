var canvas, ctx, WIDTH, HEIGHT, bpm, tileSize;

window.addEventListener("resize", resizeWindow)

function init() {
    canvas = document.createElement("canvas")
    resizeWindow()
    document.body.appendChild(canvas)
    ctx = canvas.getContext("2d");
    
    bpm = 120

    newGame()
    run()
}
function resizeWindow() {
    WIDTH = window.innerWidth
    HEIGHT = window.innerHeight

    canvas.width = WIDTH
    canvas.height = HEIGHT

    tileSize = Math.max(Math.floor(WIDTH / 60), Math.floor(HEIGHT / 60))
}

function newGame() {
    snake = new Snake()
}

function Snake() {
    this.body = [[10,10],[10,11],[10,12]]
    this.color = '#000'

    this.draw = function() {
        ctx.fillStyle = this.color

        for (var i = 0; i < this.body.length; i++) {
            ctx.fillRect(this.body[i][0] * tileSize, this.body[i][1] * tileSize, tileSize, tileSize)
        }
    }
}

function update() {
    console.log('pum')
 
}
 
function run() {
    update()
    draw()
    setTimeout(run, 60/bpm*1000)
}

function draw() {
    ctx.clearRect(0 ,0 ,WIDTH, HEIGHT)

    snake.draw()
}
 
init()