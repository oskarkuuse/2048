const shadowOpacity = {128: 0.24, 256: 0.32, 512: 0.4, 1024: 0.48, 2048: 0.55};

function updateGameBoardCells(gameBoardInfo) {
    let table = document.getElementById("gameBoardTable");
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (gameBoardInfo[i][j] !== 0) {
                table.rows[i].cells[j].innerHTML = "<div></div>";
                table.rows[i].cells[j].querySelector("div").innerText = gameBoardInfo[i][j];
                table.rows[i].cells[j].querySelector("div").classList.add("gameBoardCell");
                table.rows[i].cells[j].querySelector("div").style.background = pickCellColor(gameBoardInfo[i][j]);
                if (gameBoardInfo[i][j] >= 8) {
                    table.rows[i].cells[j].querySelector("div").style.color = "white";
                }
                if (gameBoardInfo[i][j] >= 128) {
                    table.rows[i].cells[j].querySelector("div").style.boxShadow = "0 0 30px 10px rgba(243, 215, 116, " + shadowOpacity[gameBoardInfo[i][j]] + ")";
                }
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
        return "#edcc62";
    else if (cellValue === 512)
        return "#edc950";
    else if (cellValue === 1024)
        return "#edc53f";
    else if (cellValue === 2048)
        return "#edc22e";

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
    return randomTile;
}

function addRandomTile(board) {
    if (boardHasFreeCells(board)) {
        let value = Math.random() < 0.9 ? 2 : 4;
        let randomTile = insertRandomTile(board, value);
        return ".cell" + randomTile;
        // updateGameBoardCells(board);
        // $(randomTileClass).children().addClass("newTileAnimation");
    }
    return "none";

}

function initializeGame(board) {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            board[i][j] = 0;
        }
    }
    addRandomTile(board);
    addRandomTile(board);
    updateGameBoardCells(board);
    $(".gameBoardCell").addClass("newTileAnimation");
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
    // let leftPos = ($(".cell3").offset().left - $(".cell0").offset().left) + "px";
    // $(".cell0").children().css({position: "relative"}).animate({left: leftPos}, 100);
    // updateGameBoardCells(gameBoardInfo);
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

function compareBoards(board1, board2) {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (board1[i][j] !== board2[i][j])
                return false;
        }
    }
    return true;
}

function rightLeftAnimationTilePosition(i, j, target) {
    let startCell = ".cell" + (i * 4 + j);
    let endCell = ".cell" + (i * 4 + target);
    let startEndOffset = ($(endCell).offset().left -  $(startCell).offset().left) + "px";
    $(startCell).children().css({position: "relative"}).animate({left: startEndOffset}, 100);
}

function upDownAnimationTilePosition(i, j, target) {
    let startCell = ".cell" + (i * 4 + j);
    let endCell = ".cell" + (target * 4 + j);
    let startEndOffset = ($(endCell).offset().top -  $(startCell).offset().top) + "px";
    $(startCell).children().css({position: "relative"}).animate({top: startEndOffset}, 100);
}

function moveTilesRightAnimation(board, previousBoard) {
    for (let i = 0; i < 4; i++) {
        let target = 3;
        let targetValue = board[i][target];
        for (let j = 3; j >= 0; j--) {
            if (previousBoard[i][j] === 0)
                continue;
            rightLeftAnimationTilePosition(i, j, target)
            if (targetValue - previousBoard[i][j] === 0) {
                target--;
                targetValue = board[i][target];
            } else {
                targetValue -= previousBoard[i][j];
            }
        }
    }
}

function moveTilesLeftAnimation(board, previousBoard) {
    for (let i = 0; i < 4; i++) {
        let target = 0;
        let targetValue = board[i][target];
        for (let j = 0; j < 4; j++) {
            if (previousBoard[i][j] === 0)
                continue;
            rightLeftAnimationTilePosition(i, j, target);
            if (targetValue - previousBoard[i][j] === 0) {
                target++;
                targetValue = board[i][target];
            } else {
                targetValue -= previousBoard[i][j];
            }
        }
    }
}

function moveTilesDownAnimation(board, previousBoard) {
    for (let j = 0; j < 4; j++) {
        let target = 3;
        let targetValue = board[target][j];
        for (let i = 3; i >= 0; i--) {
            if (previousBoard[i][j] === 0)
                continue;
            upDownAnimationTilePosition(i, j, target);
            if (targetValue - previousBoard[i][j] === 0) {
                target--;
                if (target >= 0)
                    targetValue = board[target][j];
            } else {
                targetValue -= previousBoard[i][j];
            }
        }
    }
}

function moveTilesUpAnimation(board, previousBoard) {
    for (let j = 0; j < 4; j++) {
        let target = 0;
        let targetValue = board[target][j];
        for (let i = 0; i < 4; i++) {
            if (previousBoard[i][j] === 0)
                continue;
            upDownAnimationTilePosition(i, j, target);
            if (targetValue - previousBoard[i][j] === 0) {
                target++;
                if (target <= 3)
                    targetValue = board[target][j];
            } else {
                targetValue -= previousBoard[i][j];
            }
        }
    }
}

function isGameOver(board) {
    if (boardHasFreeCells(board))
        return false;

    let movedBoard = copyBoard(board);
    moveTilesRight(movedBoard);
    if (!compareBoards(board, movedBoard))
        return false;

    movedBoard = copyBoard(board);
    moveTilesLeft(movedBoard);
    if (!compareBoards(board, movedBoard))
        return false;

    movedBoard = copyBoard(board);
    moveTilesUp(movedBoard);
    if (!compareBoards(board, movedBoard))
        return false;

    movedBoard = copyBoard(board);
    moveTilesDown(movedBoard);
    return compareBoards(board, movedBoard);

}

function winningBoard(board) {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (board[i][j] === 2048)
                return true;
        }
    }
    return false;
}

let board = [[0, 0, 0, 0],
             [0, 0, 0, 0],
             [0, 0, 0, 0],
             [0, 0, 0, 0]]

initializeGame(board);

document.addEventListener("keydown", (event) => {

    let previousBoard = copyBoard(board);
    let gameOverParent = $(".gameOverParent");

    if (event.code === "ArrowRight" && !winningBoard(board)) {
        moveTilesRight(board)
        moveTilesRightAnimation(board, previousBoard)
    } else if (event.code === "ArrowLeft" && !winningBoard(board)) {
        moveTilesLeft(board)
        moveTilesLeftAnimation(board, previousBoard)
    } else if (event.code === "ArrowUp" && !winningBoard(board)) {
        moveTilesUp(board)
        moveTilesUpAnimation(board, previousBoard)
    } else if (event.code === "ArrowDown" && !winningBoard(board)) {
        moveTilesDown(board)
        moveTilesDownAnimation(board, previousBoard)
    } else if (event.code === "KeyR") {
        initializeGame(board)
        gameOverParent.animate({opacity: 0}, 0)
    }

    if (event.code === "ArrowRight" || event.code === "ArrowUp" || event.code === "ArrowDown" || event.code === "ArrowLeft") {
        if (compareBoards(board, previousBoard)) {
            window.setTimeout(function() {updateGameBoardCells(board)}, 100);
        } else {
            let randomTileClass = addRandomTile(board);
            window.setTimeout(function() {updateGameBoardCells(board); $(randomTileClass).children().addClass("newTileAnimation")}, 100);
        }
    }

    if (winningBoard(board) && gameOverParent.css("opacity") === "0") {
        gameOverParent.children("b").text("Well done!")
        $("button").children().text("Play again")
        gameOverParent.animate({opacity: 1}, 2000);
    } else if (isGameOver(board) && gameOverParent.css("opacity") === "0") {
        gameOverParent.children("b").text("Game over!")
        $("button").children().text("Try again")
        gameOverParent.animate({opacity: 1}, 2000);
    }
})

let startX = null;
let startY = null;


document.addEventListener('touchstart', (e) => {
    e.preventDefault()
    startX = e.touches[0].clientX
    startY = e.touches[0].pageY
});

document.addEventListener('touchend', (e) => {

    e.preventDefault()
    let previousBoard = copyBoard(board);
    let gameOverParent = $(".gameOverParent");

    if (startX == null || startY == null) {
        return;
    }
    let endX = e.touches[0].pageX;
    let endY = e.touches[0].pageY;

    let changeX = endX - startX;
    let changeY = endY - startY;
    let horizontalMovement = Math.abs(changeX) > Math.abs(changeY);
    startX = null;
    startY = null;

    if (changeX > 0 && horizontalMovement) {
        moveTilesRight(board)
        moveTilesRightAnimation(board, previousBoard)
    } else if (changeX < 0 && horizontalMovement) {
        moveTilesLeft(board)
        moveTilesLeftAnimation(board, previousBoard)
    } else if (changeY < 0 && !horizontalMovement) {
        moveTilesUp(board)
        moveTilesUpAnimation(board, previousBoard)
    } else if (changeY > 0 && !horizontalMovement) {
        moveTilesDown(board)
        moveTilesDownAnimation(board, previousBoard)
    }

    if (compareBoards(board, previousBoard)) {
        window.setTimeout(function() {updateGameBoardCells(board)}, 100);
    } else {
        let randomTileClass = addRandomTile(board);
        window.setTimeout(function() {updateGameBoardCells(board); $(randomTileClass).children().addClass("newTileAnimation")}, 100);
    }

});




// document.addEventListener('mousedown', (e) => {
//     startX = e.pageX
//     startY = e.pageY
// });


// document.addEventListener('mouseup', (e) => {
//
//     let previousBoard = copyBoard(board);
//     let gameOverParent = $(".gameOverParent");
//
//     if (startX == null || startY == null) {
//         return;
//     }
//     let endX = e.pageX;
//     let endY = e.pageY;
//
//     let changeX = endX - startX;
//     let changeY = endY - startY;
//     let horizontalMovement = Math.abs(changeX) > Math.abs(changeY);
//     startX = null;
//     startY = null;
//
//     if (changeX > 0 && horizontalMovement) {
//         moveTilesRight(board)
//         moveTilesRightAnimation(board, previousBoard)
//     } else if (changeX < 0 && horizontalMovement) {
//         moveTilesLeft(board)
//         moveTilesLeftAnimation(board, previousBoard)
//     } else if (changeY < 0 && !horizontalMovement) {
//         moveTilesUp(board)
//         moveTilesUpAnimation(board, previousBoard)
//     } else if (changeY > 0 && !horizontalMovement) {
//         moveTilesDown(board)
//         moveTilesDownAnimation(board, previousBoard)
//     }
//
//     if (compareBoards(board, previousBoard)) {
//         window.setTimeout(function() {updateGameBoardCells(board)}, 100);
//     } else {
//         let randomTileClass = addRandomTile(board);
//         window.setTimeout(function() {updateGameBoardCells(board); $(randomTileClass).children().addClass("newTileAnimation")}, 100);
//     }
//
// });


$(".restartButton").click(function () {
    let gameOverParent = $(".gameOverParent");
    if (gameOverParent.css("opacity") !== "0") {
        initializeGame(board);
        gameOverParent.animate({opacity: 0}, 0)
    }
});
