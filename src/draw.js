document.addEventListener('DOMContentLoaded', () => {
    let socket = io();
    let clicked = false;
    let canvas = document.getElementById('cvs');
    let ctx = canvas.getContext('2d');
    let current = {
        color: "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16))
    };

    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    ctx.strokeStyle = current.color;
    ctx.lineWidth = 6;
    ctx.lineCap = "round";
    ctx.fillStyle = "#333";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    socket.on('drawing', onDrawingEvent);

    document.addEventListener('mouseup', (e) => {
        clicked = false;
        drawLine(current.x, current.y, e.clientX, e.clientY, current.color, true);
    });

    document.addEventListener('click', (e) => {
        if (!clicked) { 
            return;
        }
        clicked = false;
    })

    canvas.addEventListener('mousemove', (e) => {
        if (!clicked) {
            return;
        }
        drawLine(current.x, current.y, e.clientX, e.clientY, current.color, true);
        current.x = e.clientX;
        current.y = e.clientY;
    });

    canvas.addEventListener('mousedown', (e) => {
        clicked = true;
        current.x = e.clientX;
        current.y = e.clientY;
    });

    function onDrawingEvent(data) {
        console.log(data.color);
        drawLine(data.x0, data.y0, data.x1, data.y1, data.color);
    }

    function drawLine(x0, y0, x1, y1, color, emit) {
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(x1, y1);
        ctx.stroke();
        ctx.closePath();

        if (!emit) {
            return;
        }

        socket.emit('drawing', {
            x0,
            y0,
            x1,
            y1,
            color
        });
    }
});
