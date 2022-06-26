let board = [[0, 0, 0, 0],
             [0, 0, 0, 0],
             [0, 0, 0, 0],
             [0, 0, 0, 0]]

function getCellInfo() {
    let table = document.getElementById("gameBoardTable");
    console.log(table.rows[0].cells[1].innerHTML)
    console.log(table.rows[1].cells[2].innerHTML)
}

getCellInfo();

