var canvas, ctx, WIDTH, HEIGHT, bpm, tileSize;

window.addEventListener("resize", resizeWindow)

window.addEventListener("keydown", keyDown)

function keyDown(e) {
    console.log(e)
    if(e.key == "ArrowUp" && snake.direction != [0, 1]) {
            playing = true
        snake.direction = [0, -1]
    }
    if(e.key == "ArrowDown" && snake.direction != [0, -1]) {
            playing = true
        snake.direction = [0, 1]
    }
    if(e.key == "ArrowLeft" && snake.direction != [1, 0]) {
            playing = true
        snake.direction = [-1, 0]
    }
    if(e.key == "ArrowRight" && snake.direction != [-1, 0]) {
            playing = true
        snake.direction = [1, 0]
    }
    if (e.key == "Enter") {
        playing = false
    }
}

function init() {
    canvas = document.createElement("canvas")
    resizeWindow()
    document.body.appendChild(canvas)
    ctx = canvas.getContext("2d");
    
    bpm = 1200

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

    playing = false
}

function Snake() {
    this.body = [[10,10],[10,11],[10,12]]
    this.color = '#393852'
    this.direction = [0, -1]

    this.update = function() {
        var nextPos = [this.body[0][0] + this.direction[0],this.body[0][1] + this.direction[1]]
        
        if (!playing) {
            if(this.direction[1] == -1 && nextPos[1] <= (HEIGHT * 0.1/ tileSize)) {
                this.direction = [1, 0]
            }
            else if(this.direction[0] == 1 && nextPos[0] >= (WIDTH * 0.9/ tileSize)) {
                this.direction = [0, 1]
            }
            else if(this.direction[1] == 1 && nextPos[1] >= (HEIGHT * 0.9/ tileSize)) {
                this.direction = [-1, 0]
            }
            else if(this.direction[0] == -1 && nextPos[0] <= (WIDTH * 0.1/ tileSize)) {
                this.direction = [0, -1]
            }
        }


        this.body.pop()
        this.body.splice(0,0, nextPos)
    }

    this.draw = function() {
        ctx.fillStyle = this.color

        for (var i = 0; i < this.body.length; i++) {
            ctx.fillRect(this.body[i][0] * tileSize, this.body[i][1] * tileSize, tileSize, tileSize)
        }
    }
}

function update() {
    snake.update()
 
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