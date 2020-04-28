var canvas, ctx, WIDTH, HEIGHT, bpm;
function init() {
    canvas = document.createElement("canvas")
    canvas.width = 600
    canvas.height = 600
    bpm = 120

    document.body.appendChild(canvas)
    ctx = canvas.getContext("2d");

    run()
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