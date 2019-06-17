document.addEventListener('DOMContentLoaded', () => {
    const socket = io();
    let clicked = false;
    const canvas = document.getElementById('cvs');
    const ctx = canvas.getContext('2d');
    const current = {
        color: "#xxxxxx".replace(/x/g, y => (Math.random() * 16 | 0).toString(16)),
        lineWidth: 6
    };

    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    ctx.strokeStyle = current.color;
    ctx.lineWidth = current.lineWidth;
    ctx.lineCap = "round";
    ctx.fillStyle = "#333";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    socket.on('drawing', onDrawingEvent);

    document.addEventListener('mouseup', (e) => {
        clicked = false;
        drawLine(current.x, current.y, e.clientX, e.clientY, current.color, current.lineWidth, true);
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
        drawLine(current.x, current.y, e.clientX, e.clientY, current.color, current.lineWidth, true);
        current.x = e.clientX;
        current.y = e.clientY;
    });

    canvas.addEventListener('mousedown', (e) => {
        clicked = true;
        current.x = e.clientX;
        current.y = e.clientY;
    });

    document.addEventListener('touchstart', (e) => {
        clicked = true;
        current.x = e.touches[0].clientX;
        current.y = e.touches[0].clientY;
    });

    window.addEventListener('wheel', (e) => {
        const delta = Math.sign(e.deltaY);
        let multiplier = e.shiftKey ? 10 : 1;

        if (delta > 0) {
            current.lineWidth -= 1 * multiplier;
        } else {
            current.lineWidth += 1  * multiplier;
        }

        if(current.lineWidth <= 0) {
            current.lineWidth = 1;
        }
    });

    canvas.addEventListener('touchmove', (e) => {
        if (!clicked) {
            return;
        }
        drawLine(current.x, current.y, e.touches[0].clientX, e.touches[0].clientY, current.color, current.lineWidth, true);
        current.x = e.touches[0].clientX;
        current.y = e.touches[0].clientY;
    });

    document.addEventListener('touchend', (e) => {
        clicked = false;
        if (e.touches.length) {
            drawLine(current.x, current.y, e.touches[0].clientX, e.touches[0].clientY, current.color, current.lineWidth, true);
        }
    });

    function onDrawingEvent(data) {
        drawLine(data.x0, data.y0, data.x1, data.y1, data.color, data.lineWidth);
    }

    function drawLine(x0, y0, x1, y1, color, lineWidth, emit) {
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
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
            color,
            lineWidth
        });
    }
});