let boxes = document.querySelectorAll(".box");
let resetBtn= document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-game-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let winSound = new Audio('win-sound.mp3');

let turnofO = true; 

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0,4, 8],
    [2, 4, 6],
];

const resetGame = () => {
    turnofO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    boxes.forEach((box) => {
        box.classList.remove("strike");
    });

};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnofO){
            box.innerText = 'O';
            box.style.color = "black";
            turnofO = false;
        }else {
            box.innerText = 'X';
            turnofO = true;
            box.style.color = "blue";
        }
        box.disabled = true;

        checkWinner();
    })
});

const disableBoxes = () => {
    for(let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for(let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner = (winner) => {
    msg.innerText = `${winner} won, congrats!`
    msgContainer.classList.remove("hide");
    disableBoxes();
    winSound.play();

};

const showGameDraw = () => {
    msg.innerText = "Game Draw"
    msgContainer.classList.remove("hide");
    disableBoxes();
}
const addStrike = (pattern) => {
    pattern.forEach(index => {
        boxes[index].classList.add("strike");
    });
};

const checkWinner = () => {
    let isWinner = false;
    for(let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                isWinner = true;
                addStrike(pattern);
                showWinner(pos1Val);
                return;

            }
        }
    }
    if (!isWinner && Array.from(boxes).every(box => box.innerText !== "")) {
        showGameDraw();
    }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);