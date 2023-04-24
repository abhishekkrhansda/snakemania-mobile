//variables and constants


let direction={x:0,y:0};

const snakelength=1;
// const foodSound=new Audio('food.mp3');
// const gameoverSound=new Audio('gameover.mp3');
// const moveSound=new Audio('move.mp3');
// const gameSound=new Audio('game.mp3');

let lastPaintTime=0;
let speed=6;
let score=0;

let snakeArr=[{
    x:12,y:15
}]

let food={
    x:3,y:7
}

buttons=document.querySelectorAll('button');

//methods and function

function main (ctime){

    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();

}

function isCollide(snake) {
    // If you bump into yourself 
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // If you bump into the wall
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
        return true;
    }
        
    return false;
}

function gameEngine(){
    // Part 1: Updating the snake array & Food
    if(isCollide(snakeArr)){
        // gameOverSound.play();
        // musicSound.pause();
        direction =  {x: 0, y: 0}; 
        score=0;
        alert("Game Over. Press any key to play again!");
        snakeArr = [{x: 12, y: 15}];
    }

    // If you have eaten the food, increment the score and regenerate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x ===food.x){
        // foodSound.play();
        score += 1;
        speed+=0.5;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("Highscore", JSON.stringify(hiscoreval));
            highscorebox.innerHTML = "Highscore: " + hiscoreval;
        }
        scorebox.innerHTML = "Score: " + score;
        snakeArr.unshift({x: snakeArr[0].x + direction.x, y: snakeArr[0].y + direction.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }

    // Moving the snake
    for (let i = snakeArr.length - 2; i>=0; i--) { 
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += direction.x;
    snakeArr[0].y += direction.y;

    // Part 2: Display the snake and Food
    // Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    // Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);


}

// musicSound.play();
let highscore = localStorage.getItem("highscore");
if(highscore === null){
    hiscoreval = 0;
    localStorage.setItem("highscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(highscore);
    highscorebox.innerHTML = "HiScore: " + highscore;
}

// window.requestAnimationFrame(main);
// window.addEventListener('keydown', e =>{
//     direction = {x: 0, y: 1};


//      // Start the game


//     // moveSound.play();
//     switch (e.key) {
//         case "ArrowUp":
//             console.log("ArrowUp");
//             direction.x = 0;
//             direction.y = -1;
//             break;

//         case "ArrowDown":
//             console.log("ArrowDown");
//             direction.x = 0;
//             direction.y = 1;
//             break;

//         case "ArrowLeft":
//             console.log("ArrowLeft");
//             direction.x = -1;
//             direction.y = 0;
//             break;

//         case "ArrowRight":
//             console.log("ArrowRight");
//             direction.x = 1;
//             direction.y = 0;
//             break;
//         default:
//             break;
//     }

// });


   

for(window of buttons)  {
    window.requestAnimationFrame(main);
    window.addEventListener('click', e =>{
    direction = {x: 0, y: 1};
    controls=e.target.innerText;


//      // Start the game


    // moveSound.play();
    if(controls=="U") {
            console.log("up");
            direction.x = 0;
            direction.y = -1;
    }

    else if(controls=="D"){
            console.log("down");
            direction.x = 0;
            direction.y = 1;
    }

    else if(controls=="L"){
            console.log("ArrowLeft");
            direction.x = -1;
            direction.y = 0;
    }

    else if(controls=="R"){
            console.log("ArrowRight");
            direction.x = 1;
            direction.y = 0;
    }
    else{
        console.log("no movement");
        direction.x= 0;
        direction.y= 0;
    }
        
    });
}












