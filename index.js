var cards = "";
players = "";
let isCardFlipped = false;
let firstCard, secondCard, maxMatch,
    numOfMatchCrads = 0;
var gameOver;
var player1Turn = true;
var txtPlayer1 = document.getElementById('p1');
var txtPlayer2 = document.getElementById('p2');
var boardSize;
let p = new Promise((resolve, reject) => {
    boardSize = localStorage.getItem('selecetedValue');
    if (boardSize == JSON.stringify("board4X4")) {
        cards = document.querySelectorAll('.memory-card');
        maxMatch = 8;
        resolve();
    } else if (boardSize == JSON.stringify("board5X5")) {
        cards = document.querySelectorAll('.memory-card5');
        maxMatch = 12;
        resolve();


    } else {
        reject('Error loading board');
    }
})
p.then(() => {
    console.log("the " + boardSize + " has been successfully loaded");
}).catch((message) => {

    console.log(message);
})


const urlParams = new URLSearchParams(window.location.search);
const first = urlParams.get('first');
const second = urlParams.get('second');





window.addEventListener('load', () => {


    if (!localStorage.getItem(first + 'player1GamesWin') || (!localStorage.getItem(first))) {

        console.log(localStorage.getItem(first + 'player1GamesWin'));
        let gamesWinPlayer1 = 0;
        localStorage.setItem(first + 'player1GamesWin', gamesWinPlayer1);

    }
    if (!localStorage.getItem(second + 'player2GamesWin') || (!localStorage.getItem(second))) {
        console.log(localStorage.getItem(second + 'player1GamesWin'));

        let gamesWinPlayer2 = 0;
        localStorage.setItem(second + 'player2GamesWin', gamesWinPlayer2);

    }

    players = { // json'
        p1: {
            name: first,
            gameWin: parseInt(localStorage.getItem(first + 'player1GamesWin')),
            score: 0
        },

        p2: {
            name: second,
            gameWin: parseInt(localStorage.getItem(second + 'player2GamesWin')),
            score: 0
        }
    }
    localStorage.setItem(first, JSON.stringify(players.p1.name));
    localStorage.setItem(second, JSON.stringify(players.p2.name));




    document.getElementById('p1').innerHTML = ` ${players.p1.name}'s num of wins: ${players.p1.gameWin} score:${players.p1.score}`;
    txtPlayer1.innerHTML = ` ${players.p1.name}'s num of wins: ${players.p1.gameWin} score:${players.p1.score}`;
    document.getElementById('p2').innerHTML = ` ${players.p2.name}'s num of wins: ${players.p2.gameWin} score:${players.p2.score}`;


    txtPlayer1.style.color = "red";



})

function update() {

    localStorage.setItem(first + 'player1GamesWin', players.p1.gameWin);

    localStorage.setItem(second + 'player2GamesWin', players.p2.gameWin);
    document.getElementById('p1').innerHTML = ` ${players.p1.name}'s num of wins: ${players.p1.gameWin} score:${players.p1.score}`;
    document.getElementById('p2').innerHTML = ` ${players.p2.name}'s num of wins: ${players.p2.gameWin} score:${players.p2.score}`;
}

function gameover(string) {
    alert(string);
    resetBoard();
}

function resetBoard() {

    players.p1.score = 0;
    players.p2.score = 0;
    document.location.reload();
    update();
}


function flipCard() {


    if (player1Turn) {
        txtPlayer1.innerHTML = ` ${players.p1.name}'s num of wins: ${players.p1.gameWin} score:${players.p1.score}`;
        txtPlayer1.style.color = "red";
        this.classList.toggle('flip');
        if (!isCardFlipped) {
            isCardFlipped = true;
            firstCard = this;
        } else {
            isCardFlipped = false;
            secondCard = this;
            if (firstCard.dataset.name === secondCard.dataset.name) {
                players.p1.score = players.p1.score + 1;
                update();
                firstCard.removeEventListener('click', flipCard);
                secondCard.removeEventListener('click', flipCard);
                if (players.p1.score + players.p2.score == maxMatch) {
                    firstCard.classList.remove('flip');
                    secondCard.classList.remove('flip');
                    setTimeout(() => {}, 3000);
                    if (players.p1.score > players.p2.score) {
                        gameOver = players.p1.name + " WINS!!!\nPress OK to play again."
                        players.p1.gameWin = players.p1.gameWin + 1;
                        update();
                        gameover(gameOver);
                    } else if (players.p1.score < players.p2.score) {
                        players.p2.gameWin = players.p2.gameWin + 1;
                        update();
                        gameOver = players.p2.name + " WINS!!!\nPress OK to play again."
                        gameover(gameOver);

                    } else { //drow
                        players.p2.gameWin = players.p2.gameWin + 1;
                        players.p2.gameWin = players.p2.gameWin + 1;
                        update();
                        gameOver = " its a draw!!!\nPress OK to play again."
                    }
                }
            } else {
                player1Turn = false;
                txtPlayer1.style.color = "black";
                txtPlayer2.style.color = "red";
                setTimeout(() => {
                    firstCard.classList.remove('flip');
                    secondCard.classList.remove('flip');

                }, 500);
            }
        }
    } else {
        txtPlayer2.innerHTML = ` ${players.p2.name}'s num of wins: ${players.p2.gameWin} score:${players.p2.score}`;
        txtPlayer2.style.color = "red";
        this.classList.toggle('flip');
        if (!isCardFlipped) {
            isCardFlipped = true;
            firstCard = this;
        } else {
            isCardFlipped = false;
            secondCard = this;
            if (firstCard.dataset.name === secondCard.dataset.name) {
                players.p2.score = players.p2.score + 1;
                update();
                firstCard.removeEventListener('click', flipCard);
                secondCard.removeEventListener('click', flipCard);
                if (players.p1.score + players.p2.score == maxMatch) {
                    firstCard.classList.remove('flip');
                    secondCard.classList.remove('flip');
                    setTimeout(() => {}, 3000);
                    if (players.p1.score > players.p2.score) {
                        gameOver = players.p1.name + " WINS!!!\nPress OK to play again."
                        players.p1.gameWin = players.p1.gameWin + 1;
                        update();
                        gameover(gameOver);
                    } else if (players.p1.score < players.p2.score) {
                        players.p2.gameWin = players.p2.gameWin + 1;
                        update();
                        gameOver = players.p2.name + " WINS!!!\nPress OK to play again."
                        gameover(gameOver);

                    } else { //drow
                        players.p2.gameWin = players.p2.gameWin + 1;
                        players.p2.gameWin = players.p2.gameWin + 1;
                        update();
                        gameOver = " its a draw!!!\nPress OK to play again."
                    }
                }
            } else {
                txtPlayer2.style.color = "black";
                txtPlayer1.style.color = "red";

                player1Turn = true;
                setTimeout(() => {
                    firstCard.classList.remove('flip');
                    secondCard.classList.remove('flip');

                }, 500);
            }
        }
    }
}
cards.forEach((card) => {
    card.addEventListener('click', flipCard);
});


(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });


})();



cards.forEach(card => card.addEventListener('click', flipCard));