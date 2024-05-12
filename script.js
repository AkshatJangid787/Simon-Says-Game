let gameSeq = [];
let userSeq = [];
let btns = ["Red", "Green", "Yellow", "Orange"]; 
let started = false;
let level = 0;
let countdownActive = false;
let p = document.querySelector('p');

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
const startMessage = isMobile ? "Tap to start the Game" : "Press any key to start the Game";

if (isMobile) {
    p.innerText = startMessage;
    document.body.classList.add("p");
} else {
    p.innerText = startMessage;
}

function startGame() {
    if (!started && !countdownActive) {
        countdownActive = true;
        console.log("Game is starting in 3 seconds...");
        let countdown = 3;
        let countdownInterval = setInterval(() => {
            if (countdown > 0) {
                p.innerText = `Starting in ${countdown}...`;
                countdown--;
            } else {
                clearInterval(countdownInterval);
                started = true;
                countdownActive = false;
                p.innerText = '';
                levelUP();
            }
        }, 1000);
    }
}

document.addEventListener(isMobile ? "touchstart" : "keypress", startGame);

function levelUP() {
    userSeq = [];
    level++;
    p.innerText = `Level ${level}`;

    let randmInd = Math.floor(Math.random() * 4);
    let randmColor = btns[randmInd];
    let randBtn = document.querySelector(`.${randmColor}`);
    gameSeq.push(randmColor);
    console.log(gameSeq);
    gameFlash(randBtn);
}

function checkAns() {
    for (let i = 0; i < userSeq.length; i++) {
        if (userSeq[i] !== gameSeq[i]) {
            p.innerText = `Game Over! Your Score is ${level} ${isMobile ? "Tap" : "Press Enter"} to restart.`;
            document.addEventListener(isMobile ? "touchstart" : "keypress", restartGame);
            return;
        }
    }

    if (userSeq.length === gameSeq.length) {
        setTimeout(levelUP, 1000);
    }
}

function restartGame(event) {
    if (started && !countdownActive) {
        if ((isMobile && event.type === "touchstart") || (!isMobile && event.key === "Enter")) {
            console.log("Game restarts");
            reset();
            document.removeEventListener(isMobile ? "touchstart" : "keypress", restartGame);
        }
    }
}

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 200);
}

function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(function () {
        btn.classList.remove("userFlash");
    }, 200);
}

function btnPress() {
    if (started && !countdownActive) {
        let btn = this;
        userFlash(btn);
        userColor = btn.getAttribute("id");
        userSeq.push(userColor);
        checkAns();
    }
}

let allBtns = document.querySelectorAll('.btn');

for (btn of allBtns) {
    btn.addEventListener('click', btnPress);
}

function reset() {
    started = false;
    userSeq = [];
    gameSeq = [];
    level = 0;
    startGame();
}
