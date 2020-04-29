var canvas, ctx, WIDTH, HEIGHT, bpm, tileSize;

window.addEventListener("resize", resizeWindow)

function init() {
    canvas = document.createElement("canvas")
    resizeWindow()
    document.body.appendChild(canvas)
    ctx = canvas.getContext("2d");
    
    bpm = 120

    run()
}
function resizeWindow() {
    WIDTH = window.innerWidth
    HEIGHT = window.innerHeight

    canvas.width = WIDTH
    canvas.height = HEIGHT

    tileSize = Math.max(Math.floor(WIDTH / 60), Math.floor(HEIGHT / 60))
}

function update() {
    console.log('pum')
 
}
 
function run() {
    update()
    draw()
    setTimeout(run, 60/bpm*1000)
}

function draw() {}

init()