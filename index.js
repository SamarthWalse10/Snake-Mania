// Game variables and constants
let inputDir = { x: 0, y: 0 };
let snakeArry = [{ x: 13, y: 15 }];
let food = { x: 6, y: 7 }
let score = 0;

let lastPaintTime = 0;
let speed = 5;



// Game functions
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) {
    // If you bump into your self
    for (let i = 1; i < snakeArry.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    // If you bump into the wall
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }
}

function gameEngine() {
    // Updating the snake array and food
    if (isCollide(snakeArry)) {
        inputDir = { x: 0, y: 0 };
        alert('Game Over!\nPress any key to play again');
        let snakeArry = [{ x: 13, y: 15 }];
        score = 0;
    }

    // If you have eaten the food, increment the score and regenerate the food
    if (snakeArry[0].x === food.x && snakeArry[0].y === food.y) {
        score += 1;
        scoreBox.innerHTML = "Score: " + score;
        snakeArry.unshift({ x: snakeArry[0].x + inputDir.x, y: snakeArry[0].y + inputDir.y });
        food = { x: Math.round(2 + (16 - 2) * Math.random()), y: Math.round(2 + (16 - 2) * Math.random()) };
    }

    // Moving the snake
    for (let i = snakeArry.length - 2; i >= 0; i--) {
        snakeArry[i + 1] = { ...snakeArry[i] };
    }
    snakeArry[0].x += inputDir.x;
    snakeArry[0].y += inputDir.y;

    // Display the snake and food
    // Display the snake
    board.innerHTML = "";
    snakeArry.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index == 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    // Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}



// Main logic stars here
window.requestAnimationFrame(main);

window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 }   // start the game
    switch (e.key) {
        case 'ArrowUp':
            console.log('ArrowUp');
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case 'ArrowDown':
            console.log('ArrowDown');
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case 'ArrowLeft':
            console.log('ArrowLeft');
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case 'ArrowRight':
            console.log('ArrowRight');
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
});