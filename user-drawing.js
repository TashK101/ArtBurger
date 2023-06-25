var context;

function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

if (window.addEventListener) {
    window.addEventListener('load', function () {
        const tools = {};
        let canvas, canvaso, contexto;
        let currColor = 'black';
        let wasEraserUsed = false;
        // Default tool. (chalk, line, rectangle)
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
            const img  = canvaso.toDataURL('image/png');
            document.write('<img src="'+img+'" alt="Image"/>');
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
            context.fillRect(0, 0, 897, 532);

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
            if (ev.layerX || ev.layerX == 0) { // Firefox
                ev._x = ev.layerX;
                ev._y = ev.layerY;
            } else if (ev.offsetX || ev.offsetX == 0) { // Opera
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

imageButton.addEventListener('click', toggleSelector);

function toggleElementWithId(id) {
    document.getElementById(id).classList.toggle('hidden');
}



function changeColor(value) {
    const colors = [
        "#FFFFFF",
        "#FEF4D4",
        "#FCE9A7",
        "#F9DF76",
        "#F5D34A",
        "#F1C51D",
        "#EFC400",
        "#D7AF00",
        "#C69E00",
        "#B28D00",
        "#9D7C00",
        "#886B00",
        "#724E00",
        "#5B3C00",
        "#472C00",
        "#331D00",
        "#1F0E00",
        "#0A0000"
    ];
    context.strokeStyle = colors[Math.round(value)];
}




