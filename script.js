const capitals = [
"TIRANA","ANDORA","BEČ","MINSK","BRISEL","SARAJEVO","SOFIJA","ZAGREB","NIKOZIJA","PRAG","KOPENHAGEN","TALIN","HELSINKI","PARIZ","BERLIN","ATINA","BUDIMPEŠTA","REJKJAVIK","DABLIN","RIM","RIGA","VADUZ","VILNUS","LUKSEMBURG","VALETA","KIŠINJEV","MONAKO","PODGORICA","AMSTERDAM","SKOPLJE","OSLO","VARŠAVA","LISABON","BUKUREŠT","BEOGRAD","BRATISLAVA","LJUBLJANA","MADRID","STOKHOLM","BERN","ANKARA","KIJEV","LONDON","VATIKAN"];

const alphabet = [
"A","B","C","Č","Ć","D","Đ","E","F","G","H","I","J","K","L","M",
"N","O","P","Q","R","S","Š","T","U","V","W","X","Y","Z","Ž"
];

let chosenWord, lives, correctLetters;

const wordDiv = document.getElementById("word");
const livesDiv = document.getElementById("lives");
const keyboardDiv = document.getElementById("keyboard");
const messageDiv = document.getElementById("message");
const restartBtn = document.getElementById("restartBtn");

const canvas = document.getElementById("hangmanCanvas");
const ctx = canvas.getContext("2d");

function initGame() {
    chosenWord = capitals[Math.floor(Math.random() * capitals.length)];
    lives = 6;
    correctLetters = [];

    messageDiv.innerText = "";
    livesDiv.innerText = "Životi: 6";
    restartBtn.style.display = "none";

    keyboardDiv.innerHTML = "";
    ctx.clearRect(0,0,canvas.width,canvas.height);

    drawBase();
    displayWord();
    createKeyboard();
}

function drawBase() {
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(10,240);
    ctx.lineTo(190,240);
    ctx.moveTo(50,240);
    ctx.lineTo(50,20);
    ctx.lineTo(130,20);
    ctx.lineTo(130,40);
    ctx.stroke();
}

function drawHangman(stage) {
    switch(stage) {
        case 5:
            ctx.beginPath();
            ctx.arc(130,60,20,0,Math.PI*2);
            ctx.stroke();
            break;
        case 4:
            ctx.beginPath();
            ctx.moveTo(130,80);
            ctx.lineTo(130,150);
            ctx.stroke();
            break;
        case 3:
            ctx.beginPath();
            ctx.moveTo(130,100);
            ctx.lineTo(100,120);
            ctx.stroke();
            break;
        case 2:
            ctx.beginPath();
            ctx.moveTo(130,100);
            ctx.lineTo(160,120);
            ctx.stroke();
            break;
        case 1:
            ctx.beginPath();
            ctx.moveTo(130,150);
            ctx.lineTo(110,190);
            ctx.stroke();
            break;
        case 0:
            ctx.beginPath();
            ctx.moveTo(130,150);
            ctx.lineTo(150,190);
            ctx.stroke();
            break;
    }
}

function displayWord() {
    let display = "";
    for (let letter of chosenWord) {
        if (letter === " ") {
            display += "  ";
        } else if (correctLetters.includes(letter)) {
            display += letter + " ";
        } else {
            display += "_ ";
        }
    }
    wordDiv.innerText = display;
}

function createKeyboard() {
    alphabet.forEach(letter => {
        const button = document.createElement("button");
        button.innerText = letter;
        button.onclick = () => handleGuess(letter, button);
        keyboardDiv.appendChild(button);
    });
}

function handleGuess(letter, button) {
    button.disabled = true;

    if (chosenWord.includes(letter)) {
        correctLetters.push(letter);
    } else {
        lives--;
        livesDiv.innerText = "Životi: " + lives;
        drawHangman(lives);
    }

    displayWord();
    checkGameOver();
}

function checkGameOver() {
    let won = true;

    for (let letter of chosenWord) {
        if (letter !== " " && !correctLetters.includes(letter)) {
            won = false;
        }
    }

    if (won) endGame(true);
    if (lives === 0) endGame(false);
}

function endGame(win) {
    messageDiv.innerText = win
        ? "POBJEDILI STE! 🎉 Riječ je bila " + chosenWord
        : "IZGUBILI STE! Riječ je bila " + chosenWord;

    restartBtn.style.display = "inline-block";

    const buttons = document.querySelectorAll("button");
    buttons.forEach(btn => btn.disabled = true);
}

restartBtn.onclick = initGame;

initGame();