let gameBoardModule = (function () {
    const gameArray = ["initial"];

    function initializeArray() {
        if (gameArray.length > 0) {
            gameArray.splice(0);
        }
        // gameArray[0] = "0";
        // gameArray[1] = "1";
        // gameArray[2] = "2";
        // gameArray[3] = "3";
        // gameArray[4] = "4";
        // gameArray[5] = "5";
        // gameArray[6] = "6";
        // gameArray[7] = "7";
        // gameArray[8] = "8";

        gameArray[0] = "X";
        gameArray[1] = "X";
        gameArray[2] = "X";
        gameArray[3] = "3";
        gameArray[4] = "4";
        gameArray[5] = "5";
        gameArray[6] = "6";
        gameArray[7] = "7";
        gameArray[8] = "8";
    }

    function getGameArray() {
        return gameArray;
    }

    return { initializeArray, getGameArray };
})();

const playerFactory = (name, letter) => {
    let gamesPlayed = 0;
    let wins = 0;
    let losses = 0;
    return { name, gamesPlayed, wins, losses, letter };
};

let gameModule = (function () {
    let player1, player2;

    let round = {
        num: 0,
        currPlayer: 0,
        game: 0
    };

    let currPos = {
        tile: 9,
        letter: 'Z'
    }

    //sets up a new game
    function newGame(p1name, p1letter, p2name, p2letter) {
        player1 = playerFactory(p1name, p1letter);
        player2 = playerFactory(p2name, p2letter);

        round.num = 1;
        round.currPlayer = 1;
    }

    function playRound(currPos) {
        if (round.num == 0){
            round.game++;
            round.currPlayer = 1;
        }

    }

    //Checks if there is a win. Parameter - Current Position (Object?)
    function checkWin(currPos) {
        let gameArray = gameBoardModule.getGameArray();

        if (gameArray[0] == gameArray[1] && gameArray[0] == gameArray[2]) {
            winGame(currPos);
        } else if (
            gameArray[3] == gameArray[4] &&
            gameArray[3] == gameArray[5]
        ) {
            winGame(currPos);
        } else if (
            gameArray[6] == gameArray[7] &&
            gameArray[6] == gameArray[8]
        ) {
            winGame(currPos);
        } else if (
            gameArray[0] == gameArray[4] &&
            gameArray[0] == gameArray[8]
        ) {
            winGame(currPos);
        } else if (
            gameArray[0] == gameArray[3] &&
            gameArray[0] == gameArray[6]
        ) {
            winGame(currPos);
        } else if (
            gameArray[1] == gameArray[4] &&
            gameArray[1] == gameArray[7]
        ) {
            winGame(currPos);
        } else if (
            gameArray[2] == gameArray[5] &&
            gameArray[2] == gameArray[8]
        ) {
            winGame(currPos);
        } else if (
            gameArray[2] == gameArray[4] &&
            gameArray[2] == gameArray[6]
        ) {
            winGame(currPos);
        } else {
            checkGame(currPos);
        }
    }

    function winGame(currPos) {
        console.log("win");
    }

    function checkGame(currPos) {}

    return { checkWin, newGame };
})();

const displayControlModule = (function () {

    function handleClick(e){
        console.log(e);
    }

    function initializeGame(){
        let tiles = document.querySelectorAll('.tile');
        tiles.forEach((tile) => {
            tile.addEventListener('click', handleClick);
        })
    }

    return ({initializeGame});
})();

console.log(gameBoardModule.getGameArray());
gameBoardModule.initializeArray();
console.log(gameBoardModule.getGameArray());
gameModule.checkWin(5);

displayControlModule.initializeGame();
