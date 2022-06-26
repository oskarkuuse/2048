let board = [[2, 2, 2, 2],
             [0, 0, 0, 0],
             [2, 0, 0, 2],
             [8, 4, 4, 8]]

function updateGameBoardCells(gameBoardInfo) {
    let table = document.getElementById("gameBoardTable");
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (gameBoardInfo[i][j] !== 0) {
                table.rows[i].cells[j].innerHTML = "<div></div>";
                table.rows[i].cells[j].querySelector("div").innerText = gameBoardInfo[i][j];
                table.rows[i].cells[j].querySelector("div").classList.add("gameBoardCell");
            } else {
                table.rows[i].cells[j].innerHTML = "";
            }
        }
    }
}

function moveTilesRight(gameBoardInfo) {
    for (let i = 0; i < 4; i++) {
        for (let j = 3; j > 0; j--) {
            if (gameBoardInfo[i][j] !== 0 && gameBoardInfo[i][j] === gameBoardInfo[i][j - 1]) {
                gameBoardInfo[i][j - 1] = gameBoardInfo[i][j] * 2;
                gameBoardInfo[i][j] = 0;
                j--;
            } else if (j - 2 >= 0 && gameBoardInfo[j - 2] !== 0 && gameBoardInfo[i][j - 1] === 0 && gameBoardInfo[i][j] === gameBoardInfo[i][j - 2]) {
                gameBoardInfo[i][j - 2] = gameBoardInfo[i][j] * 2;
                gameBoardInfo[i][j] = 0;
            } else if (j - 3 >= 0 && gameBoardInfo[j - 3] !== 0 && gameBoardInfo[i][j - 2] === 0 && gameBoardInfo[i][j - 1] === 0 && gameBoardInfo[i][j] === gameBoardInfo[i][j - 3]) {
                gameBoardInfo[i][j - 3] = gameBoardInfo[i][j] * 2;
                gameBoardInfo[i][j] = 0;
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
            if (gameBoardInfo[i][j] === gameBoardInfo[i][j + 1]) {
                gameBoardInfo[i][j + 1] = gameBoardInfo[i][j] * 2;
                gameBoardInfo[i][j] = 0;
                j++;
            } else if (j + 2 <= 3 && gameBoardInfo[j + 2] !== 0 && gameBoardInfo[i][j] === gameBoardInfo[i][j + 2]) {
                gameBoardInfo[i][j + 2] = gameBoardInfo[i][j] * 2;
                gameBoardInfo[i][j] = 0;
            } else if (j + 3 <= 3 && gameBoardInfo[j + 3] !== 0 && gameBoardInfo[i][j] === gameBoardInfo[i][j + 3]) {
                gameBoardInfo[i][j + 3] = gameBoardInfo[i][j] * 2;
                gameBoardInfo[i][j] = 0;
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

function copyBoard(gameBoardInfo) {
    let newBoard = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            newBoard[i][j] = gameBoardInfo[i][j];
        }
    }
    return newBoard;
}

updateGameBoardCells(board)

// moveTilesRight(board)

// document.addEventListener("click", function() {moveTilesRight(board)})

document.addEventListener("keydown", (event) => {
    if (event.code === "ArrowRight") {
        moveTilesRight(board)
    } else if (event.code === "ArrowLeft") {
        moveTilesLeft(board)
    }
})

