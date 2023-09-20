let gameBoardModule = (function () {
    const gameArray = ["initial"];

    function initializeArray() {
        if (gameArray.length > 0) {
            gameArray.splice(0);
        }

        gameArray[0] = "0";
        gameArray[1] = "1";
        gameArray[2] = "2";
        gameArray[3] = "3";
        gameArray[4] = "4";
        gameArray[5] = "5";
        gameArray[6] = "6";
        gameArray[7] = "7";
        gameArray[8] = "8";
    }

    function getGameArray() {
        return [...gameArray]; // Returning a copy. Not sure if not returning a copy returns reference
    }

    function setGameArray(index, letter) {
        gameArray[index] = letter;
    }

    return { initializeArray, getGameArray, setGameArray };
})();

// ----------------------------------------------------------------- //

const playerFactory = (name, letter) => {
    let gamesPlayed = 0;
    let wins = 0;
    let losses = 0;
    return { name, gamesPlayed, wins, losses, letter };
};

// ----------------------------------------------------------------- //

let gameModule = (function () {
    let player1, player2;

    let round = {
        num: 0,
        currPlayer: 0,
        game: 0,
    };

    let currPos = {
        tile: 9,
        player: 0,
    };

    //sets up a new game
    function newGame(p1name, p1letter, p2name, p2letter) {
        gameBoardModule.initializeArray();

        player1 = playerFactory(p1name, p1letter);
        player2 = playerFactory(p2name, p2letter);

        round.num = 1;
        round.currPlayer = 1;
        currPos.player = 1;

        return "New Game Successfully Created";
    }

    function playRound(tile) {
        if (round.num == 1) {
            round.game++;
        }

        currPos.tile = tile;
        currPos.player = round.currPlayer;

        let currLetter =
            currPos.player == 1
                ? player1.letter
                : currPos.player == 2
                ? player2.letter
                : "ERROR";
        gameBoardModule.setGameArray(currPos.tile, currLetter);

        function gameOver() {}

        let status = checkWin(currPos);
        if (status === true) {
            gameOver();
            return "WIN";
        } else if (status == "DRAW") {
            gameOver();
            return "DRAW";
        } else {
            round.currPlayer = round.currPlayer == 1 ? 2 : 1;
            round.num++;
            return "GAME CONTINUES";
        }
    }

    //Checks if there is a win. Parameter - Current Position (Object?)
    function checkWin(currPos) {
        let gameArray = gameBoardModule.getGameArray();

        if (gameArray[0] == gameArray[1] && gameArray[0] == gameArray[2]) {
            return true;
        } else if (
            gameArray[3] == gameArray[4] &&
            gameArray[3] == gameArray[5]
        ) {
            return true;
        } else if (
            gameArray[6] == gameArray[7] &&
            gameArray[6] == gameArray[8]
        ) {
            return true;
        } else if (
            gameArray[0] == gameArray[4] &&
            gameArray[0] == gameArray[8]
        ) {
            return true;
        } else if (
            gameArray[0] == gameArray[3] &&
            gameArray[0] == gameArray[6]
        ) {
            return true;
        } else if (
            gameArray[1] == gameArray[4] &&
            gameArray[1] == gameArray[7]
        ) {
            return true;
        } else if (
            gameArray[2] == gameArray[5] &&
            gameArray[2] == gameArray[8]
        ) {
            return true;
        } else if (
            gameArray[2] == gameArray[4] &&
            gameArray[2] == gameArray[6]
        ) {
            return true;
        } else if (
            gameBoardModule.getGameArray().every((elem) => {
                if (elem == "X" || elem == "O") return true;
                else return false;
            })
        ) {
            return "DRAW";
        } else {
            return false;
        }
    }

    function getPlayer(num) {
        return num == 1 ? player1 : num == 2 ? player2 : -1;
    }

    function getRound() {
        return round;
    }

    return { checkWin, newGame, playRound, getPlayer, getRound };
})();

// ----------------------------------------------------------------- //

const displayControlModule = (function () {
    const gameDisplay = document.getElementById("game-display");

    function updateBoard(tileNum, letter) {
        let tile = document.querySelector(`.tile${tileNum}`);
        tile.innerText = letter;
    }

    function gameOver() {
        let tiles = document.querySelectorAll(".tile");
        tiles.forEach((tile) => {
            tile.removeEventListener("click", handleClick);
        });
    }

    function handleClick(e) {
        const tileNum = parseInt(e.target.dataset.tile);

        // Prevents playing in spots that are already taken
        const gameArray = gameBoardModule.getGameArray();
        if (gameArray[tileNum] == "X" || gameArray[tileNum] == "O") {
            alert("Invalid Move! Select an empty position");
            return;
        }

        // BEFORE ROUND PLAYS
        let round = gameModule.getRound();
        let player = gameModule.getPlayer(round.currPlayer);
        updateBoard(tileNum, player.letter);

        // AFTER ROUND PLAYS
        const status = gameModule.playRound(tileNum);
        round = gameModule.getRound();
        player = gameModule.getPlayer(round.currPlayer);

        switch (status) {
            case "GAME CONTINUES":
                gameDisplay.innerText = `Round ${round.num}: Player ${round.currPlayer} (${player.letter})`;
                break;

            case "DRAW":
                gameDisplay.innerText = "Draw";
                gameOver();
                break;

            case "WIN":
                gameDisplay.innerText = "WIN";
                gameOver();
                break;

            default:
                break;
        }
    }

    function initializeGame() {
        let player1 = document.getElementById("player-1-input");
        let player2 = document.getElementById("player-2-input");

        gameModule.newGame(
            player1.value || "Player 1",
            "X",
            player2.value || "Player 2",
            "O"
        ); //TODO Add error check using return value of gameModule.newGame

        let tiles = document.querySelectorAll(".tile");
        tiles.forEach((tile) => {
            tile.innerText = " ";
            tile.addEventListener("click", handleClick);
        });

        gameDisplay.innerText = "Round 1: Player 1 (X)";
    }

    return { initializeGame };
})();

// ----------------------------------------------------------------- //

let btnNewGame = document.querySelector("#new-game-btn");
btnNewGame.addEventListener("click", () => {
    let newGameDialog = document.getElementById("new-game-dialog");
    newGameDialog.showModal();

    let btnGameStart = document.getElementById("btn-game-start");
    btnGameStart.addEventListener("click", displayControlModule.initializeGame);
});
