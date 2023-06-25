var context;

function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function white2transparent(img) {
    const c = document.createElement('canvas');

    const w = img.width, h = img.height;

    c.width = w;
    c.height = h;

    const ctx = c.getContext('2d');

    ctx.drawImage(img, 0, 0, w, h);
    const imageData = ctx.getImageData(0, 0, w, h);
    const pixel = imageData.data;

    const r = 0, g = 1, b = 2, a = 3;
    for (let p = 0; p < pixel.length; p += 4) {
        if (
            pixel[p + r] === 255 &&
            pixel[p + g] === 255 &&
            pixel[p + b] === 255) {
            pixel[p + a] = 0;
        }
    }

    ctx.putImageData(imageData, 0, 0);

    return c.toDataURL('image/png');
}

if (window.addEventListener) {
    window.addEventListener('load', function () {
        const sidenav = document.querySelector(".sidenav")
        const sidenavOpen = document.querySelector("#openNav");
        const sidenavClose = document.querySelector("#closeNav");

        sidenavOpen.addEventListener("click", () => sidenav.style.width = "513px")
        sidenavClose.addEventListener("click", () => sidenav.style.width = "0px")
        const tools = {};

        let canvas, canvaso, contexto;
        let currColor = 'black';
        let wasEraserUsed = false;
        let tool;
        const tool_default = 'chalk';
        const tool_select = document.getElementById('selector');

        function selectTool(newTool) {
            tool = new tools[newTool]();
            tool_select.value = newTool;
            console.log(currColor)
            console.log(wasEraserUsed)
            if (wasEraserUsed) {
                wasEraserUsed = false;
                context.strokeStyle = currColor;
            }
        }

        function useEraser() {
            currColor = context.strokeStyle;
            console.log(currColor)
            context.strokeStyle = "white";
            wasEraserUsed = true;
        }

        function saveImg() {
            const img = white2transparent(canvaso);
            console.log(img)
            img.replace("image/png", "image/octet-stream");

            const link = document.createElement('a');
            link.href = img;
            link.download = 'Download.jpg';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }

        function init() {
            canvaso = document.getElementById('drawingCanvas');
            contexto = canvaso.getContext('2d');
            const container = canvaso.parentNode;
            canvas = document.createElement('canvas');
            canvas.id = 'tempCanvas';
            canvas.width = canvaso.width;
            canvas.height = canvaso.height;
            insertAfter(container.firstChild.nextSibling.nextSibling, canvas)
            context = canvas.getContext('2d');
            context.strokeStyle = "black";
            context.lineWidth = 1.0;

            context.fillStyle = "white";
            context.fillRect(0, 0, canvaso.width, canvaso.height);

            const penButton = document.getElementById('penButton');
            const eraserButton = document.getElementById('eraserButton');
            const lineButton = document.getElementById('lineButton');
            const squareButton = document.getElementById('squareButton');
            const saveButton = document.getElementById('convertpngbtn');


            tool_select.addEventListener('change', ev_tool_change, false);
            penButton.addEventListener('click', () => selectTool('chalk'), false);
            lineButton.addEventListener('click', () => selectTool('line'))
            squareButton.addEventListener('click', () => selectTool('square'))
            eraserButton.addEventListener('click', () => useEraser(), false);
            saveButton.addEventListener('click', () => saveImg(), false)

            if (tools[tool_default]) {
                tool = new tools[tool_default]();
                tool_select.value = tool_default;
            }

            canvas.addEventListener('mousedown', ev_canvas, false);
            canvas.addEventListener('mousemove', ev_canvas, false);
            canvas.addEventListener('mouseup', ev_canvas, false);
        }

        function ev_canvas(ev) {
            if (ev.layerX || ev.layerX === 0) { // Firefox
                ev._x = ev.layerX;
                ev._y = ev.layerY;
            } else if (ev.offsetX || ev.offsetX === 0) { // Opera
                ev._x = ev.offsetX;
                ev._y = ev.offsetY;
            }

            const func = tool[ev.type];
            if (func) {
                func(ev);
            }
        }

        function ev_tool_change(ev) {
            if (tools[this.value]) {
                tool = new tools[this.value]();
            }
        }

        function img_update() {
            contexto.drawImage(canvas, 0, 0);
            context.clearRect(0, 0, canvas.width, canvas.height);
        }


        tools.chalk = function () {
            const tool = this;
            this.started = false;
            this.mousedown = function (ev) {
                context.beginPath();
                context.moveTo(ev._x, ev._y);
                tool.started = true;
            };
            this.mousemove = function (ev) {
                if (tool.started) {
                    context.lineTo(ev._x, ev._y);
                    context.stroke();
                }
            };
            this.mouseup = function (ev) {
                if (tool.started) {
                    tool.mousemove(ev);
                    tool.started = false;
                    img_update();
                }
            };
        };
        tools.square = function () {
            const tool = this;
            this.started = false;
            this.mousedown = function (ev) {
                tool.started = true;
                tool.x0 = ev._x;
                tool.y0 = ev._y;
            };
            this.mousemove = function (ev) {
                if (!tool.started) {
                    return;
                }
                const x = Math.min(ev._x, tool.x0),
                    y = Math.min(ev._y, tool.y0),
                    w = Math.abs(ev._x - tool.x0),
                    h = Math.abs(ev._y - tool.y0);
                context.clearRect(0, 0, canvas.width, canvas.height);// Clears the rectangle onload.

                if (!w || !h) {
                    return;
                }
                context.strokeRect(x, y, w, h);
            };
            this.mouseup = function (ev) {
                if (tool.started) {
                    tool.mousemove(ev);
                    tool.started = false;
                    img_update();
                }
            };
        };
        tools.line = function () {
            const tool = this;
            this.started = false;
            this.mousedown = function (ev) {
                tool.started = true;
                tool.x0 = ev._x;
                tool.y0 = ev._y;
            };
            this.mousemove = function (ev) {
                if (!tool.started) {
                    return;
                }
                context.clearRect(0, 0, canvas.width, canvas.height);
                // Begin the line.
                context.beginPath();
                context.moveTo(tool.x0, tool.y0);
                context.lineTo(ev._x, ev._y);
                context.stroke();
                context.closePath();
            };
            this.mouseup = function (ev) {
                if (tool.started) {
                    tool.mousemove(ev);
                    tool.started = false;
                    img_update();
                }
            };
        };
        init();
    }, false);
}

const imageButton = document.getElementById('strokeButton');
const selector = document.getElementById('strokeSelector');

function toggleElementWithId(id) {
    document.getElementById(id).classList.toggle('hidden');
}


function changeColor(value) {
    const colors = [
        "#FFFFFF",
        "#F7F4F1",
        "#EEE6E1",
        "#E3D7CF",
        "#DACBBF",
        "#D1BEB0",
        "#C8B1A0",
        "#BDA18D",
        "#B2927A",
        "#AA866C",
        "#A17B5E",
        "#986E4E",
        "#895935",
        "#835029",
        "#6E3306",
        "#682D00",
        "#622A00",
        "#5B2700",
        "#552400",
        "#502200",
        "#471E00",
        "#421C00",
        "#3B1900",
        "#331600",
        "#2D1300",
        "#271100",
        "#200E00",
        "#180A00",
        "#140800",
        "#0D0600",
        "#040100"
    ];
    console.log(colors.length);
    context.strokeStyle = colors[Math.round(value)];
}




