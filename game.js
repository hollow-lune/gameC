const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

function getWidth() {
    return canvas.width;
}

function getHeight() {
    return canvas.height;
}

function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// test draw
ctx.fillStyle = "black";
ctx.fillRect(getWidth()/2 - 5, getHeight()/2 - 5, 10, 10);
