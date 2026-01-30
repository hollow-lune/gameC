const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// ================= Canvas Helpers =================
function getWidth() { return canvas.width; }
function getHeight() { return canvas.height; }

// ================= Scene Graph =================
let objects = [];

function add(obj) {
    objects.push(obj);
}

function remove(obj) {
    let i = objects.indexOf(obj);
    if (i !== -1) objects.splice(i, 1);
}

// ================= Timer =================
let timers = {};

function setTimer(fn, ms) {
    let id = setInterval(fn, ms);
    timers[fn] = id;
    return id;
}

function stopTimer(fn) {
    clearInterval(timers[fn]);
    delete timers[fn];
}

// ================= Randomizer =================
const Randomizer = {
    nextInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    nextColor() {
        return `rgb(${this.nextInt(0,255)},${this.nextInt(0,255)},${this.nextInt(0,255)})`;
    }
};
class Rectangle {
    constructor(w, h) {
        this.w = w;
        this.h = h;
        this.x = 0;
        this.y = 0;
        this.color = "black";
    }
    setPosition(x, y) { this.x = x; this.y = y; }
    setColor(c) { this.color = c; }
    move(dx, dy) { this.x += dx; this.y += dy; }
    getX() { return this.x; }
    getY() { return this.y; }
    getWidth() { return this.w; }
    getHeight() { return this.h; }
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
}

class Circle {
    constructor(r) {
        this.r = r;
        this.x = 0;
        this.y = 0;
        this.color = "black";
    }
    setPosition(x, y) { this.x = x; this.y = y; }
    setColor(c) { this.color = c; }
    move(dx, dy) { this.x += dx; this.y += dy; }
    getX() { return this.x; }
    getY() { return this.y; }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

class Line {
    constructor(x1, y1, x2, y2) {
        this.x1 = x1; this.y1 = y1;
        this.x2 = x2; this.y2 = y2;
        this.color = "black";
        this.width = 1;
    }
    setColor(c) { this.color = c; }
    setLineWidth(w) { this.width = w; }
    draw() {
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.width;
        ctx.beginPath();
        ctx.moveTo(this.x1, this.y1);
        ctx.lineTo(this.x2, this.y2);
        ctx.stroke();
    }
}

class Text {
    constructor(text, font) {
        this.text = text;
        this.font = font;
        this.x = 0;
        this.y = 0;
        this.color = "black";
    }
    setPosition(x, y) { this.x = x; this.y = y; }
    setColor(c) { this.color = c; }
    getWidth() {
        ctx.font = this.font;
        return ctx.measureText(this.text).width;
    }
    getHeight() {
        return parseInt(this.font);
    }
    draw() {
        ctx.font = this.font;
        ctx.fillStyle = this.color;
        ctx.fillText(this.text, this.x, this.y);
    }
}








function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let obj of objects) {
        if (obj.draw) obj.draw();
    }

    requestAnimationFrame(render);
}

render();

let test = new Rectangle(10, 10);
test.setPosition(getWidth()/2 - 5, getHeight()/2 - 5);
add(test);