import React, { useState, useEffect } from 'react';

const ConnectFourTest = () => {
    const [winner, setWinner] = useState(false)
    const [board, setBoard] = useState([["-", "-", "-", "-", "-", "-", "-"],
                                        ["-", "-", "-", "-", "-", "-", "-"],
                                        ["-", "-", "-", "-", "-", "-", "-"],
                                        ["-", "-", "-", "-", "-", "-", "b"],
                                        ["-", "-", "-", "-", "-", "b", "b"],
                                        ["-", "-", "-", "-", "b", "b", "b"],
                                        ])


    const winCheck = (boardCopy, color) => {
        // once sockets installed, add check that looks only at color of player who just went
        // use returns to exit entire function when win condition is met to save runtime
        // horizonal check
        for(let i = 5; i >= 0; i--) {
            let count = 1
            for(let j = 1; j < 7; j++) {
                if(boardCopy[i][j] === '-') {
                    count = 1
                }
                else if(boardCopy[i][j] === boardCopy[i][j-1]){
                    count += 1
                    if(count === 4) {
                        console.log(`${boardCopy[i][j]} wins!`)
                        break
                    }
                }
            }
        }
        // vertical check
        let column = 0
        let count = 1
        for(let i = 4; column < 7; i--) {
            if(i < 0 || boardCopy[i][column] === '-') {
                count = 1
                i = 5
                column += 1
            }
            else if(boardCopy[i][column] === boardCopy[i+1][column]) {
                count +=1
                if(count === 4) {
                    console.log(`${boardCopy[i][column]} wins!`)
                    break
                }
            }
            else {
                count = 1
            }
        }
        // diagonal check
        for(let i = 5; i >=3; i--) {
            for(let j = 0; j < 7; j++) {
                if(boardCopy[i][j] !== '-') {
                    // up and to the right
                    if(boardCopy[i-1][j+1] === boardCopy[i][j] && boardCopy[i-2][j+2] === boardCopy[i][j] && boardCopy[i-3][j+3] === boardCopy[i][j]){
                        console.log(`${boardCopy[i][j]} wins!`)
                        break
                    }
                    // up and to the left
                    else if(boardCopy[i-1][j-1] === boardCopy[i][j] && boardCopy[i-2][j-2] === boardCopy[i][j] && boardCopy[i-3][j-3] === boardCopy[i][j]){
                        console.log(`${boardCopy[i][j]} wins!`)
                        break
                    }
                }
            }
        }
    }
    
    const makeMove = (column, color) => {
        let boardCopy = [...board]
        for(let i = 5; i >= 0; i--) {
            if(board[i][column]==='-') {
                console.log(i, column)
                boardCopy[i][column] = color
                setBoard(boardCopy)
                winCheck(boardCopy)
                break
            }
        }
    }

    return (
        <>
            <div className='column-buttons'>
                <button onClick={() => makeMove(0, 'r')}>v</button>
                <button onClick={() => makeMove(1, 'r')}>v</button>
                <button onClick={() => makeMove(2, 'r')}>v</button>
                <button onClick={() => makeMove(3, 'r')}>v</button>
                <button onClick={() => makeMove(4, 'r')}>v</button>
                <button onClick={() => makeMove(5, 'r')}>v</button>
                <button onClick={() => makeMove(6, 'r')}>v</button>
                
            </div>
            <div className='blue'>
                {board.map((row, i) => 
                    <div className='row' key={i}>
                        {row.map((cell, j) => 
                            <div key={j} className={`cell ${cell}`}></div>
                        )}
                    </div>
                )}
            </div>
        </>
    )
}
export default ConnectFourTest