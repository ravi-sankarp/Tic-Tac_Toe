'use strict'
//selecting html elements
let tiles = document.querySelectorAll('.play-cell');
let playAgainGameBtn = document.querySelector('.again-btn');
let resetGameBtn = document.querySelector('.reset-btn');
let playerZero = document.querySelector('.player-0');
let playerOne = document.querySelector('.player-1');
let playerZeroScore = document.querySelector('.score-X');
let playerOneScore = document.querySelector('.score-O');
let announceEle=document.querySelector('.announce');

//creating variables
let currentPlayer = 'X';
let playing = true;
let score = {
    X: 0,
    O: 0,
    draw: 0
};
let board = new Array(8).fill(' ');
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]
//function to reset the whole game
function resetGame() {
    playAgain();
    score = {
        X: 0,
        O: 0,
        draw: 0
    };
    playerZeroScore.textContent = '0';
    playerOneScore.textContent = '0';
}

//function to play again
function playAgain() {
    playing = true;
    tiles.forEach(tile => {
        tile.textContent = '';
        tile.style.backgroundColor = 'transparent';
        tile.style.color = '#fff';
    });
    board.fill(' ');
    currentPlayer = 'X';
    playerZero.classList.add('current-player');
    playerOne.classList.remove('current-player');
    announceEle.style.display='none';
    mainEventCall();
}

//function to check if game is won or ended in a draw
function checkGameWon() {
    for (let i = 0; i < 8; i++) {
        const WINCHECK = WINNING_COMBINATIONS[i];
        let a = board[WINCHECK[0]];
        let b = board[WINCHECK[1]];
        let c = board[WINCHECK[2]];
        if (a === ' ' || b === ' ' || c === ' ') {
            continue;
        }
        if (a === b && b === c) {
            updateScore();
            playing = false;
            for (let i = 0; i < 3; i++) {
                tiles[WINCHECK[i]].style.backgroundColor = 'rgb(255 236 236 / 10%)';
                tiles[WINCHECK[i]].style.color = 'rgb(28,31,21)';
            }
            announceEle.style.display='block';
            announceEle.textContent=` ${currentPlayer} Won 🏆`
            break;
        }
        if(!board.includes(' ')){
            announceEle.style.display='block';
            announceEle.textContent=` It's a tie....`
            score.draw+=1;
        }
    }
}

//function to update the score if a player wins
function updateScore() {
    score[currentPlayer] += 1;
    document.querySelector(`.score-${currentPlayer}`).textContent = score[currentPlayer];
}

//function when user clicks the field
function userAction(tile, index) {
    tile.textContent = (currentPlayer === 'X' ? 'X' : 'O');
    board[index] = (currentPlayer === 'X' ? 'X' : 'O');
    checkGameWon();
    switchPlayer();

}

//function for switching player
function switchPlayer() {
    if (playing) {
        currentPlayer = (currentPlayer === 'X' ? 'O' : 'X');
        playerZero.classList.toggle('current-player');
        playerOne.classList.toggle('current-player');
    }
}

//function for adding eventlistener to every play-cell
function mainEventCall(){
    for (let i = 0; i < tiles.length; i++) {
        tiles[i].addEventListener('click', function () {
            if (playing) {
                userAction(tiles[i], i);
            }
        }, { once: true });
    };
};
mainEventCall();

//adding event listener to play again button
playAgainGameBtn.addEventListener('click', playAgain);

//adding eventlistener to reset game button
resetGameBtn.addEventListener('click', resetGame)




















