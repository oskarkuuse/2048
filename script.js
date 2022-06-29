let board = [[0, 0, 0, 0],
             [0, 0, 0, 0],
             [0, 0, 0, 0],
             [0, 0, 0, 0]]

function updateGameBoardCells(gameBoardInfo) {
    let table = document.getElementById("gameBoardTable");
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (gameBoardInfo[i][j] !== 0) {
                table.rows[i].cells[j].innerHTML = "<div></div>";
                table.rows[i].cells[j].querySelector("div").innerText = gameBoardInfo[i][j];
                table.rows[i].cells[j].querySelector("div").classList.add("gameBoardCell");
                table.rows[i].cells[j].querySelector("div").style.background = pickCellColor(gameBoardInfo[i][j]);
            } else {
                table.rows[i].cells[j].innerHTML = "";
            }
        }
    }
}

function pickCellColor(cellValue) {
    if (cellValue === 2)
        return "#eee4da";
    else if (cellValue === 4)
        return "#eee1c9";
    else if (cellValue === 8)
        return "#f3b27a";
    else if (cellValue === 16)
        return "#f69664";
    else if (cellValue === 32)
        return "#f77c5f";
    else if (cellValue === 64)
        return "#f75f3b";
    else if (cellValue === 128)
        return "#edd073";
    else if (cellValue === 256)
        return "#edcc61";
    else if (cellValue === 512)
        return "#edc354";
    else if (cellValue === 1024)
        return "#edc33e";
    else if (cellValue === 2048)
        return "#edc32e";

}

function boardHasFreeCells(board) {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (board[i][j] === 0)
                return true;
        }
    }
    return false;
}

function generateRandomInt(maxValue) {
    return Math.floor(Math.random() * maxValue);
}

function insertRandomTile(board, value) {
    let freeCells = [];
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (board[i][j] === 0) {
                freeCells.push(i * 4 + j);
            }
        }
    }
    let randomTile = freeCells[generateRandomInt(freeCells.length)];
    board[(randomTile - (randomTile % 4)) / 4][randomTile % 4] = value;
}

function addRandomTile(board) {
    if (boardHasFreeCells(board)) {
        let value = Math.random() < 0.9 ? 2 : 4;
        insertRandomTile(board, value);
    }
    updateGameBoardCells(board);
}

function initializeGame(board) {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            board[i][j] = 0;
        }
    }
    addRandomTile(board);
    addRandomTile(board);
}

function moveTilesRight(gameBoardInfo) {
    for (let i = 0; i < 4; i++) {
        for (let j = 3; j > 0; j--) {
            if (gameBoardInfo[i][j] !== 0 && gameBoardInfo[i][j] === gameBoardInfo[i][j - 1]) {
                gameBoardInfo[i][j - 1] = gameBoardInfo[i][j] * 2;
                gameBoardInfo[i][j] = 0;
                j--;
            } else if (j - 2 >= 0 && gameBoardInfo[i][j] !== 0 && gameBoardInfo[i][j - 1] === 0 && gameBoardInfo[i][j] === gameBoardInfo[i][j - 2]) {
                gameBoardInfo[i][j - 2] = gameBoardInfo[i][j] * 2;
                gameBoardInfo[i][j] = 0;
                j -= 2;
            } else if (j - 3 >= 0 && gameBoardInfo[i][j] !== 0 && gameBoardInfo[i][j - 2] === 0 && gameBoardInfo[i][j - 1] === 0 && gameBoardInfo[i][j] === gameBoardInfo[i][j - 3]) {
                gameBoardInfo[i][j - 3] = gameBoardInfo[i][j] * 2;
                gameBoardInfo[i][j] = 0;
                j -= 3;
            }
        }

        let newRow = [0, 0, 0, 0];
        let k = 3;
        for (let j = 3; j >= 0; j--) {
            if (gameBoardInfo[i][j] !== 0) {
                newRow[k] = gameBoardInfo[i][j];
                k--;
            }
        }
        gameBoardInfo[i] = newRow;
    }
    updateGameBoardCells(gameBoardInfo);
}

function moveTilesLeft(gameBoardInfo) {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 3; j++) {
            if (gameBoardInfo[i][j] !== 0 && gameBoardInfo[i][j] === gameBoardInfo[i][j + 1]) {
                gameBoardInfo[i][j + 1] = gameBoardInfo[i][j] * 2;
                gameBoardInfo[i][j] = 0;
                j++;
            } else if (j + 2 <= 3 && gameBoardInfo[i][j] !== 0 && gameBoardInfo[i][j + 1] === 0 && gameBoardInfo[i][j] === gameBoardInfo[i][j + 2]) {
                gameBoardInfo[i][j + 2] = gameBoardInfo[i][j] * 2;
                gameBoardInfo[i][j] = 0;
                j += 2;
            } else if (j + 3 <= 3 && gameBoardInfo[i][j] !== 0 && gameBoardInfo[i][j + 1] === 0 && gameBoardInfo[i][j + 2] === 0 && gameBoardInfo[i][j] === gameBoardInfo[i][j + 3]) {
                gameBoardInfo[i][j + 3] = gameBoardInfo[i][j] * 2;
                gameBoardInfo[i][j] = 0;
                j += 3;
            }
        }

        let newRow = [0, 0, 0, 0];
        let k = 0;
        for (let j = 0; j <= 3; j++) {
            if (gameBoardInfo[i][j] !== 0) {
                newRow[k] = gameBoardInfo[i][j];
                k++;
            }
        }
        gameBoardInfo[i] = newRow;
    }
    updateGameBoardCells(gameBoardInfo);
}

function moveTilesUp(gameBoardInfo) {
    for (let j = 0; j < 4; j++) {
        for (let i = 0; i < 3; i++) {
            if (gameBoardInfo[i][j] !== 0 && gameBoardInfo[i][j] === gameBoardInfo[i + 1][j]) {
                gameBoardInfo[i + 1][j] = gameBoardInfo[i][j] * 2;
                gameBoardInfo[i][j] = 0;
                i++;
            } else if (i + 2 <= 3 && gameBoardInfo[i][j] !== 0 && gameBoardInfo[i + 1][j] === 0 && gameBoardInfo[i][j] === gameBoardInfo[i + 2][j]) {
                gameBoardInfo[i + 2][j] = gameBoardInfo[i][j] * 2;
                gameBoardInfo[i][j] = 0;
                i += 2;
            } else if (i + 3 <= 3 && gameBoardInfo[i][j] !== 0 && gameBoardInfo[i + 1][j] === 0 && gameBoardInfo[i + 2][j] === 0 && gameBoardInfo[i][j] === gameBoardInfo[i + 3][j]) {
                gameBoardInfo[i + 3][j] = gameBoardInfo[i][j] * 2;
                gameBoardInfo[i][j] = 0;
                i += 3;
            }
        }

        let newColumn = [0, 0, 0, 0];
        let k = 0;
        for (let i = 0; i <= 3; i++) {
            if (gameBoardInfo[i][j] !== 0) {
                newColumn[k] = gameBoardInfo[i][j];
                k++;
            }
        }

        for (let i = 0; i <= 3; i++) {
            gameBoardInfo[i][j] = newColumn[i];
        }

    }
    updateGameBoardCells(gameBoardInfo);
}

function moveTilesDown(gameBoardInfo) {
    for (let j = 0; j < 4; j++) {
        for (let i = 3; i > 0; i--) {
            if (gameBoardInfo[i][j] !== 0 && gameBoardInfo[i][j] === gameBoardInfo[i - 1][j]) {
                gameBoardInfo[i - 1][j] = gameBoardInfo[i][j] * 2;
                gameBoardInfo[i][j] = 0;
                i--;
            } else if (i - 2 >= 0 && gameBoardInfo[i][j] !== 0 && gameBoardInfo[i - 1][j] === 0 && gameBoardInfo[i][j] === gameBoardInfo[i - 2][j]) {
                gameBoardInfo[i - 2][j] = gameBoardInfo[i][j] * 2;
                gameBoardInfo[i][j] = 0;
                i -= 2;
            } else if (i - 3 >= 0 && gameBoardInfo[i][j] !== 0 && gameBoardInfo[i - 1][j] === 0 && gameBoardInfo[i - 2][j] === 0 && gameBoardInfo[i][j] === gameBoardInfo[i - 3][j]) {
                gameBoardInfo[i - 3][j] = gameBoardInfo[i][j] * 2;
                gameBoardInfo[i][j] = 0;
                i -= 3;
            }
        }

        let newColumn = [0, 0, 0, 0];
        let k = 3;
        for (let i = 3; i >= 0; i--) {
            if (gameBoardInfo[i][j] !== 0) {
                newColumn[k] = gameBoardInfo[i][j];
                k--;
            }
        }

        for (let i = 3; i >= 0; i--) {
            gameBoardInfo[i][j] = newColumn[i];
        }

    }
    updateGameBoardCells(gameBoardInfo);
}

function copyBoard(gameBoardInfo) {
    let newBoard = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            newBoard[i][j] = gameBoardInfo[i][j];
        }
    }
    return newBoard;
}

// Jquery demo
$(".gameBoard").click(function(){
    // $("td").css({position: "relative"})
    $(".gameBoardCell").css({position: "relative"}).animate({position: "relative", opacity: 1, left: "248px"});


    // modify children of certain class demo
    // name = ".cell"
    // $(name).children().css({position: "relative"}).animate({position: "relative", opacity: 0.25, left: "124px"});
});

initializeGame(board);

document.addEventListener("keydown", (event) => { // Note: when no tiles move no new cells are added!
    if (event.code === "ArrowRight") {
        moveTilesRight(board)
        addRandomTile(board)
    } else if (event.code === "ArrowLeft") {
        moveTilesLeft(board)
        addRandomTile(board)
    } else if (event.code === "ArrowUp") {
        moveTilesUp(board)
        addRandomTile(board)
    } else if (event.code === "ArrowDown") {
        moveTilesDown(board)
        addRandomTile(board)
    } else if (event.code === "KeyI") { // temp. help feature
        let info = prompt("rida veerg")
        let numbers = info.split(" ")
        board[parseInt(numbers[0]) - 1][parseInt(numbers[1]) - 1] = 2
        updateGameBoardCells(board)
    } else if (event.code === "KeyR") {
        initializeGame(board)
    }
})
