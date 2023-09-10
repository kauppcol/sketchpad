// -----------------------------------------------------------------------------------
// Grid logic secion
// -----------------------------------------------------------------------------------//
let boxes = [];
const board = document.querySelector('.board');
const slider = document.querySelector('#slider');
updateGrid();

// Clears board, creates n x n grid, adds listeners to each box
function updateGrid() {
    board.replaceChildren();
    let numBoxes = Math.pow(slider.value, 2);
    for (let i = 0; i < numBoxes; i++) {
        const box = document.createElement('div');
        box.style.flexBasis = 100/slider.value + '%';
        board.appendChild(box);
    }
    boxes = document.querySelectorAll('.board div');
    setBoxListeners();
}

// Allows box coloring/erasing on click and hover
function setBoxListeners() {
    boxes.forEach((box) => {
        box.addEventListener('mousedown', (e) => {
            // Prevents not-allowed cursor when dragging undraggable box
            e.preventDefault();
            updateColor(box);
        });
    });
    
    boxes.forEach((box) => {
        box.addEventListener('mouseover', (e) => {
            console.log('hover');
            if (e.buttons == 1) {
                console.log("hover update");
                updateColor(box);
            }
        });
    });
}

// Color changing functionality
function updateColor(box) {
    if (eraseMode) {
        box.style.backgroundColor = clearColor;
    }
    else {
        box.style.backgroundColor = document.querySelector('#color-picker').value;
    }
}

// -----------------------------------------------------------------------------------
// Settings logic secion
// -----------------------------------------------------------------------------------
const draw = document.querySelector('#draw');
const eraser = document.querySelector('#erase');
const clear = document.querySelector('#clear');
const selectedColor = getComputedStyle(draw).getPropertyValue('--selected-color');
const buttonColor = getComputedStyle(eraser).getPropertyValue('--button-color');
const clearColor = getComputedStyle(board).getPropertyValue('--board-color');
let eraseMode = false;

// Draw button logic
draw.addEventListener('click', () => {
    eraseMode = false;
    draw.style.backgroundColor = selectedColor;
    eraser.style.backgroundColor = buttonColor;
})

// Eraser button logic
eraser.addEventListener('click', () => {
    eraseMode = true;
    eraser.style.backgroundColor = selectedColor;
    draw.style.backgroundColor = buttonColor;
})

// Clear button logic
clear.addEventListener('click', () => {
    boxes.forEach((box) => {
        box.style.backgroundColor = clearColor;
    });
});

// Slider logic
slider.oninput = function() {
    document.querySelector('#dimensions').textContent = slider.value + " x " + slider.value;
}

slider.addEventListener('mouseup', () => {
    updateGrid();
})
