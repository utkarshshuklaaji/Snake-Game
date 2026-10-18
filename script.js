let playground =document.getElementById("playground");
let startButton=document.querySelector("#scoreboard button");

let hScore=document.getElementById("highcore")

console.log(playground);

let HorizontalBoxes=Math.floor(playground.clientWidth /50);   //colmn
let VerticalBoxes =Math.floor(playground.clientHeight / 50);  
 //row

 let grid=[];

for(let i=0;i<VerticalBoxes;i++)
    {
     for( let j=0;j<HorizontalBoxes;j++)
        {
        let block=document.createElement("div");

       block.classList.add("box");

       grid[j+ ","+i]= block;
        
        playground.append(block); 
    }
}

let snake= [
    {x:2, y:1},
    {x:1,y:1},
    {x:0,y:1}
];

let direction ="right";
let foodX;
let foodY;
let score = 0;
let hscore=0;

function renderSaap(){
    snake.forEach((segment)=>{
        grid[segment.x+","+segment.y].classList.add("snake");
    })
}

let gameInterval;
function startGame(){

    startButton.setAttribute("disabled" ,"true");

    renderSaap();
    GenerateFood();

    setInterval(()=>{
        snake.forEach((segment)=>{
            grid[segment.x+","+segment.y].classList.remove("snake");
        })
        let head={...snake[0]};
        switch(direction){
            case "right":
                head.x++;
                break;
            case "left":
                head.x--;
                break;
            case "up":
                head.y--;
                break;
            case "down":
                head.y++;
                break;
        }
        snake.unshift(head);
         if(head.x<0||head.y<0||head.x>= HorizontalBoxes||head.y>=VerticalBoxes){
            clearInterval(gameInterval);
if(localStorage.getItem("score"<score)){
    localStorage.setItem("score",score);
    hScore.textContent=localStorage.getItem("score");
}

            alert("Game Over");
         }

        if(foodX === head.x && foodY === head.y)
        {
            grid[foodX+","+foodY].classList.remove("food");
            score++;
            document.getElementById("score").textContent = score;
            GenerateFood();
        }
        else{
               snake.pop();
        }

        renderSaap();
    },200)
}

function GenerateFood(){
    foodX=Math.floor(Math.random() * HorizontalBoxes);
    foodY=Math.floor(Math.random() * VerticalBoxes);
    //console.log(foodX,foodY,HorizontalBoxes,VerticalBoxes);

    while(snake.some((segment) => segment.x === foodX && segment.y === foodY)){
        foodX = Math.floor(Math.random() * HorizontalBoxes);
        foodY = Math.floor(Math.random() * VerticalBoxes);
    }

    grid[foodX+ "," +foodY].classList.add("food");
}

window.addEventListener("keydown",(evt)=>{
    console.log(evt.key);
    if(evt.key=="ArrowLeft"&&direction!="right")direction="left"
    if(evt.key=="ArrowRight"&&direction!="left")direction="right"
    if(evt.key=="ArrowUp"&&direction!="down")direction="up"
    if(evt.key=="ArrowDown"&&direction!="up")direction="down"
})
window.addEventListener("load",()=>{
    hScore.textContent=localStorage.getItem("score");
})