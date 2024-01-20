let active = window.opener.active;
let step = document.getElementById("input");
step.value = window.opener.document.getElementById('input').value;

document.getElementById('controls').style.left = window.innerWidth / 2 - document.getElementById('controls').offsetWidth / 2 + "px";
document.getElementById('controls').style.top = window.innerHeight / 2 - document.getElementById('controls').offsetHeight / 2 + "px";

function remoteControl(xDirection, yDirection){
    active = window.opener.active;

    if (active == undefined)
        return;

    if (xDirection == 2) {
        active.style.left = window.opener.window.innerWidth / 2 - active.offsetWidth / 2 + "px";
        active.style.top = window.opener.window.innerHeight / 2 - active.offsetHeight / 2 + "px";
        displayCoords();
    }
    else {
        active.style.left = parseInt(active.style.left) + parseInt(step.value) * xDirection + "px";
        active.style.top = parseInt(active.style.top) + parseInt(step.value) * yDirection + "px";
        displayCoords();
    }

    displayCoords();
}

displayCoords();
function displayCoords(){
    active = window.opener.active;
    let coordsText = document.getElementById("coords");

    if(active == undefined){
        step.style.color = 'black';
        coordsText.style.color = 'black';
        coordsText.textContent = "Select a square (r, g, b)";
        return;
    }
    step.style.color = active.style.background;
    coordsText.style.color = active.style.background;
    coordsText.textContent = "X = " + parseInt(active.style.left) + " Y = " + parseInt(active.style.top);
}

addEventListener("keydown", (e) => {
    window.opener.handleKeyDown(e);
    displayCoords();
});

function closeRemote() {
    window.opener.document.getElementById('input').value = step.value;
    window.opener.displayCoords();
    window.opener.document.getElementById('controls').style.display = 'block';
    window.close();
}

window.onbeforeunload = function(){
    closeRemote();
};