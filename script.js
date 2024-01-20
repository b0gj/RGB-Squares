let squares = {
    blue: document.getElementById("blue"),
    green: document.getElementById("green"),
    red: document.getElementById("red")
}
squares.blue.style.background = "blue";
squares.green.style.background = "green";
squares.red.style.background = "red";
squares.blue.style.transition = 'left 0.5s, top 0.5s';
squares.green.style.transition = 'left 0.5s, top 0.5s';
squares.red.style.transition = 'left 0.5s, top 0.5s';
window.active = undefined;
// localStorage.setItem('active', 'none');

let step = document.getElementById("input");
let stepValue = step.value;

let squaresX = squares.blue.offsetWidth * 0.5;
let squaresY = squares.blue.offsetHeight * 0.5;
document.querySelectorAll('.squares').forEach((square) => {
    square.style.left = squaresX + "px";
    square.style.top = squaresY + "px";
    squaresX += square.offsetWidth * 1.5;
});

document.getElementById('controls').addEventListener('click', (event) => {
    event.stopPropagation();
});

displayCoords();

//Mouse movement
addEventListener("click", (e) => {
    if (active == undefined)
        return;
    active.style.left = e.pageX - active.offsetWidth / 2 + "px";
    active.style.top = e.pageY - active.offsetHeight / 2 + "px";

    displayCoords()
});

addEventListener("keydown", handleKeyDown);
function handleKeyDown(e){
    let key = e.key.toLowerCase();

    //Extras (home)
    if (key == 'h') {
        document.querySelectorAll('.squares').forEach((square) => {
            square.style.left = 0;
            square.style.top = 0;
        });
    }

    //Select active
    if (key == 'r' || key == 'g' || key == 'b') {
        if (active) {
            active.style.borderStyle = 'none';
            active.style.zIndex = 1;
            // active.style.transition = 'none';
        }

        switch (key) {
            case 'r':
                active = squares.red;
                // localStorage.setItem('active', 'red');
                break;
            case 'g':
                active = squares.green;
                // localStorage.setItem('active', 'green');
                break;
            case 'b':
                active = squares.blue;
                // localStorage.setItem('active', 'blue');
                break;
        }
        active.style.borderStyle = "solid";
        active.style.zIndex = 2;
        // active.style.transition = 'left 0.5s, top 0.5s';
        displayCoords();
        return;
    }

    if (active == undefined)
        return;

    //Keys movement
    if (key == 'arrowleft' || key == 'arrowright' || key == 'arrowup' || key == 'arrowdown'
        || key == 'a' || key == 'd' || key == 'w' || key == 's') {
        stepValue = step.value;
        switch (key) {
            case 'ArrowLeft'.toLowerCase():
            case 'a':
                active.style.left = parseInt(active.style.left) - parseInt(stepValue) + "px";
                break;
            case 'ArrowRight'.toLowerCase():
            case 'd':
                active.style.left = parseInt(active.style.left) + parseInt(stepValue) + "px";
                break;
            case 'ArrowUp'.toLowerCase():
            case 'w':
                active.style.top = parseInt(active.style.top) - parseInt(stepValue) + "px";
                break;
            case 'ArrowDown'.toLowerCase():
            case 's':
                active.style.top = parseInt(active.style.top) + parseInt(stepValue) + "px";
                break;
        }
        displayCoords();
    }

    //Extras (circle, square)
    if (key == 'h' || key == 'c' || key == 's') {
        switch (key) {
            case 'c':
                active.style.borderRadius = '50%'
                break;
            case 's':
                active.style.borderRadius = 0;
                break;
        }
    }
}
// });

//Control panel movement
function control(xDirection, yDirection) {
    if (active == undefined)
        return;

    if (xDirection == 2) {
        active.style.left = window.innerWidth / 2 - active.offsetWidth / 2 + "px";
        active.style.top = window.innerHeight / 2 - active.offsetHeight / 2 + "px";
        displayCoords();
    }
    else {
        stepValue = step.value;
        active.style.left = parseInt(active.style.left) + parseInt(stepValue) * xDirection + "px";
        active.style.top = parseInt(active.style.top) + parseInt(stepValue) * yDirection + "px";
        displayCoords();
    }
}

//Drag and drop movement
let isDragging = false, offsetX, offsetY;
document.querySelectorAll('.squares').forEach((square) => {
    square.addEventListener('mousedown', (e) => {
        if (active) {
            active.style.borderStyle = "none";
            active.style.zIndex = 1;
        }
        active = square;
        active.style.transition = 'none';
        active.style.borderStyle = "solid";
        offsetX = e.clientX - parseInt(active.style.left);
        offsetY = e.clientY - parseInt(active.style.top);
        square.style.zIndex = 10;
        isDragging = true;
        displayCoords();
    });
});

addEventListener("mousemove", (e) => {
    if (isDragging) {
        active.style.left = e.clientX - offsetX + "px";
        active.style.top = e.clientY - offsetY + "px";
        displayCoords();
    }
});
addEventListener("mouseup", () => {
    if (isDragging) {
        active.style.borderStyle = 'none';
        active.style.zIndex = 1;
        active.style.transition = 'left 0.5s, top 0.5s';
        active = undefined;
        // localStorage.setItem('active', 'none');
        displayCoords();
    }
    isDragging = false;
});


//Display the coordinates of the active square
function displayCoords() {
    let coordsText = document.getElementById("coords");


    if (active == undefined) {
        step.style.color = 'black';
        coordsText.style.color = 'black';
        coordsText.textContent = "Select a square (r, g, b)";
        return;
    }
    step.style.color = active.style.background;
    coordsText.style.color = active.style.background;
    coordsText.textContent = "X = " + parseInt(active.style.left) + " Y = " + parseInt(active.style.top);

    if (remoteControlWindow && !remoteControlWindow.closed) {
        remoteControlWindow.displayCoords();
    }
}

let mainRemote = document.getElementById("controls");
let remoteControlWindow;
let unloadCounter = 0;

function hide() {
    mainRemote.style.display = 'none';

    remoteControlWindow = window.open('remoteWindow.html', 'Remote Window',
        `toolbar=no,
         location=no,
         status=no,
         menubar=no,
         scrollbars=yes,
         resizable=yes,
         width=400,
         height=600`);

}