import React, { useState, useEffect } from 'react';

const ConnectFourTest = () => {
    const [winner, setWinner] = useState(false)
    const [board, setBoard] = useState([["-", "-", "-", "-", "-", "-", "-"],
                                        ["-", "-", "-", "-", "-", "-", "-"],
                                        ["-", "-", "-", "-", "-", "-", "-"],
                                        ["-", "-", "-", "-", "-", "-", "-"],
                                        ["-", "-", "-", "-", "-", "-", "-"],
                                        ["-", "-", "-", "-", "-", "-", "-"],
                                        ])


    const winCheck = (boardCopy) => {
        // horizonal check
        for(let i = 5; i >= 0; i--) {
            let count = 1
            for(let j = 1; j < 7; j++) {
                if(boardCopy[i][j] === '-') {
                    count = 1
                }
                if(boardCopy[i][j] === boardCopy[i][j-1]){
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
            if(boardCopy[i][column] === '-' || i < 0) {
                count = 1
                i = 4
                column += 1
            }
            else if(boardCopy[i][column] === boardCopy[i+1][column]) {
                count +=1
                if(count === 4) {
                    console.log(`${boardCopy[i][column]} wins!`)
                    break
                }
            }
        }
        // diagonal check
        
    }
    
    const makeMove = (column) => {
        let boardCopy = [...board]
        for(let i = 5; i >= 0; i--) {
            if(board[i][column]==='-') {
                console.log(i, column)
                boardCopy[i][column] = 'r'
                setBoard(boardCopy)
                winCheck(boardCopy)
                break
            }
        }
    }

    return (
        <>
            <div className='column-buttons'>
                <button onClick={() => makeMove(0)}>v</button>
                <button onClick={() => makeMove(1)}>v</button>
                <button onClick={() => makeMove(2)}>v</button>
                <button onClick={() => makeMove(3)}>v</button>
                <button onClick={() => makeMove(4)}>v</button>
                <button onClick={() => makeMove(5)}>v</button>
                <button onClick={() => makeMove(6)}>v</button>
                
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