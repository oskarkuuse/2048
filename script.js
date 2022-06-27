let board = [[0, 0, 0, 0],
             [2, 0, 0, 0],
             [0, 0, 0, 0],
             [0, 2, 0, 0]]

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
// $(".gameBoard").click(function(){
//     // $("td").css({position: "relative"})
//     $(".gameBoardCell").css({position: "relative"}).animate({position: "relative", opacity: 0.25, left: "124px"});
// });

updateGameBoardCells(board)

document.addEventListener("keydown", (event) => {
    if (event.code === "ArrowRight") {
        moveTilesRight(board)
    } else if (event.code === "ArrowLeft") {
        moveTilesLeft(board)
    } else if (event.code === "ArrowUp") {
        moveTilesUp(board)
    } else if (event.code === "ArrowDown") {
        moveTilesDown(board)
    } else if (event.code === "KeyR") {
        let info = prompt("rida veerg")
        let numbers = info.split(" ")
        board[parseInt(numbers[0]) - 1][parseInt(numbers[1]) - 1] = 2
        updateGameBoardCells(board)
    }
})
