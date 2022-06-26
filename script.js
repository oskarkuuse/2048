let board = [[2, 2, 2, 2],
             [0, 0, 0, 0],
             [2, 0, 2, 0],
             [0, 0, 0, 0]]

function getCellInfo() {
    let table = document.getElementById("gameBoardTable");
    console.log(table.rows[0].cells[1].innerHTML)
    console.log(table.rows[1].cells[2].innerHTML)
    console.log(table.rows[2].cells[3].innerHTML)
}

function changeCellTest() {
    let table = document.getElementById("gameBoardTable");
    table.rows[0].cells[3].innerHTML = '<div>2</div>';
    table.rows[0].cells[3].querySelector("div").classList.add("gameBoardCell");
}

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
            if (gameBoardInfo[i][j] === gameBoardInfo[i][j - 1]) {
                gameBoardInfo[i][j - 1] = gameBoardInfo[i][j] * 2;
                gameBoardInfo[i][j] = 0;
                j--;
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

// getCellInfo();

// document.addEventListener('click', changeCellTest)

updateGameBoardCells(board)

moveTilesRight(board)

document.addEventListener('click', function() {updateGameBoardCells(board)})

