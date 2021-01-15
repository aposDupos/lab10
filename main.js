window.onload = function () {
    let canvas = document.getElementById('field')
    let context = canvas.getContext('2d')
    const canvasWidth = 300
    const cellWidth = canvasWidth / 3
    const winLine = [[0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]]
    let board = ['', '', '', '', '', '', '', '', '']
    let firstWin = 0
    let secondWin = 0
    let roundPlayer = ['первый', 'второй']
    let xPos = 0
    let yPos = 0
    let winner = 'первый'
    let isWinnerr = 0
    document.getElementById('first').innerText = 'Первый игрок: ' + firstWin
    document.getElementById('second').innerText = 'Второй игрок: ' + secondWin
    document.getElementById('hod').innerText = 'Ходит ' + roundPlayer[0] + ' игрок - ' + (roundPlayer[0] === winner ? 'X' : 'O')

    document.getElementById('reset').onclick = function () {
        reset()
    }

    document.getElementById('newRound').onclick = function () {
        newRound()
    }

    canvas.onclick = function (e) {
        if (isWinnerr)
            return
        turn(e, context)
    }
    newRound()

    function newRound() {
        isWinnerr = 0
        canvas.width = canvas.width
        board = ['', '', '', '', '', '', '', '', '']
        context.beginPath()
        context.lineWidth = 5
        for (let i = 0; i < 4; i++) {
            context.moveTo(0, cellWidth * i)
            context.lineTo(canvasWidth, cellWidth * i)
            context.stroke()

            context.moveTo(cellWidth * i, 0)
            context.lineTo(cellWidth * i, canvasWidth)
            context.stroke()
        }
    }

    function reset() {
        newRound()
        winner = 'первый'
        roundPlayer = ['первый', 'второй']
        firstWin = secondWin = 0
        document.getElementById('first').innerText = 'Первый игрок: ' + firstWin
        document.getElementById('second').innerText = 'Второй игрок: ' + secondWin
        document.getElementById('hod').innerText = 'Ходит ' + roundPlayer[0] + ' игрок - ' + (roundPlayer[0] === winner ? 'X' : 'O')
    }

    function turn(e) {
        const target = canvas.getBoundingClientRect()
        xPos = e.clientX - target.left
        yPos = e.clientY - target.top
        let x = 0
        let y = 0
        let counter = 0
        for (let j = 0; j < 3; j++) {
            for (let i = 0; i < 3; i++) {
                if (cellWidth * i <= xPos && xPos <= cellWidth * (i + 1) && cellWidth * j <= yPos && yPos <= cellWidth * (j + 1)) {
                    x = cellWidth / 2 * (2 * i + 1)
                    y = cellWidth / 2 * (2 * j + 1)
                }
                if (!x && !y)
                    counter++
            }
        }
        if (board[counter] === '') {
            board[counter] = roundPlayer[0]
            winner === roundPlayer[0] ? drawX(x, y) : drawO(x, y)
        }
        isWinner()
        turnChange()
    }

    function turnChange() {
        [roundPlayer[0], roundPlayer[1]] = [roundPlayer[1], roundPlayer[0]]
        document.getElementById('hod').innerText = 'Ходит ' + roundPlayer[0] + ' игрок - ' + (roundPlayer[0] === winner ? 'X' : 'O')
    }

    function drawX(x, y) {
        context.beginPath()
        context.lineWidth = 5

        context.moveTo(x - 25, y - 25)
        context.lineTo(x + 25, y + 25)
        context.stroke()

        context.moveTo(x + 25, y - 25)
        context.lineTo(x - 25, y + 25)
        context.stroke()
    }

    function drawO(x, y) {
        context.beginPath()
        context.lineWidth = 5

        context.arc(x, y, 25, 0, Math.PI * 2)
        context.stroke()
    }

    function isWinner() {
        winLine.map(combo => {
            if (board[combo[0]] === roundPlayer[0] && board[combo[1]] === roundPlayer[0] && board[combo[2]] === roundPlayer[0]) { // проходится по массивам в winLine, находя выигрышную комбинацию
                winner = roundPlayer[0]
                context.fillStyle = 'rgba(255,255,255,.8)'
                context.fillRect(0, 0, canvasWidth, canvasWidth)
                context.font = '25px Open Sans'
                context.fillStyle = '#000'
                context.textAlign = "center"

                if (winner === 'первый') {
                    context.fillText('Победил первый игрок', canvasWidth / 2, canvasWidth / 2)
                    firstWin += 1
                } else {
                    context.fillText('Победил второй игрок', canvasWidth / 2, canvasWidth / 2)
                    secondWin += 1
                }
                document.getElementById('first').innerText = 'Первый игрок: ' + firstWin
                document.getElementById('second').innerText = 'Второй игрок: ' + secondWin
                turnChange()
                isWinnerr = 1
                return true
            }
        })
    }
}


