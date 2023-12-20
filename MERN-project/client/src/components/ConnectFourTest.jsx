import React, { useState, useEffect } from 'react';
import io from 'socket.io-client'
import { useNavigate } from 'react-router-dom';

// TO DO
// - create "waiting..." page while waiting for other player to join
// - rematch functionality
// - fix chat scroll?/notification numbers
// - profit $$$
// - play a game of connect four for the ages

const ConnectFourTest = (props) => {
    const { socket, userName, room } = props;

    const [currentColor, setCurrentColor] = useState("r");
    const [playerColor, setPlayerColor] = useState("")
    const [ winState, setWinState ] = useState(false)
    const [opponentData, setOpponentData] = useState("")

    const navigate = useNavigate()

    const receivePlayerData = (data) => {
        if (opponentData == "") {
            console.log(data)
            setOpponentData(data)
            console.log(opponentData)
            socket.emit("emit_again", {room: room, userName: userName})
        } 
    }

    useEffect(() => {
        socket.on("receive_player_data", receivePlayerData)

        return () => [
            socket.off("receive_player_data", receivePlayerData)
        ]
    }, [opponentData])

    // assigning color upon joining room
    useEffect(() => {
        socket.on("color_assigned", (data) => {
            setPlayerColor(data)
            console.log(data)
        })
    })


    const [winner, setWinner] = useState(false)
    const [board, setBoard] = useState([["-", "-", "-", "-", "-", "-", "-"],
                                        ["-", "-", "-", "-", "-", "-", "-"],
                                        ["-", "-", "-", "-", "-", "-", "-"],
                                        ["-", "-", "-", "-", "-", "-", "-"],
                                        ["-", "-", "-", "-", "-", "-", "-"],
                                        ["-", "-", "-", "-", "-", "-", "-"],
                                        ])
    
    // checking for any instances of 4 in a row
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
                        setWinState(true)
                        break
                    }
                } else {
                    count = 1;
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
                    setWinState(true)
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
                        setWinState(true)
                        break
                    }
                    // up and to the left
                    else if(boardCopy[i-1][j-1] === boardCopy[i][j] && boardCopy[i-2][j-2] === boardCopy[i][j] && boardCopy[i-3][j-3] === boardCopy[i][j]){
                        console.log(`${boardCopy[i][j]} wins!`)
                        setWinState(true)
                        break
                    }
                }
            }
        }
    }
    // updating board with most recent move
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

    const changeCurrentColor = (color) => {
        color == "r" ? setCurrentColor("b") : setCurrentColor("r");
    }

    // emits move to server to make sure both players' DOMS are properly updated
    const sendMove = (column, color) => {
        if (currentColor == playerColor) {
            const moveData = {
                room: room,
                column: column,
                color: color,
                currentColor: currentColor
            }
    
            socket.emit("player_move", moveData);
            makeMove(column, color)
            changeCurrentColor(currentColor)
        } else {
            console.log("Shut up")
        }
    }

    // receives move from server
    const receiveMove = (data) => {
        console.log(data)
        makeMove(data.column, data.color, data.currentColor)
        changeCurrentColor(data.currentColor)
    }

    // turns off socket after move is received
    useEffect(() => {
        socket.on("receive_move", receiveMove)

        return () => {
            socket.off("receive_move", receiveMove)
        }
    }, [])

    // rendering game board if no one has won yet
    if(winState === false) {
        return (
            <div className='flex space-evenly'>
                <div className={`flex-column player-stats ${playerColor===currentColor ? 'selected' : 'zzzzz'}`}>
                    <h3 className={`${playerColor}-text`}>{userName}</h3>
                    <h1>W's</h1>
                    <h3>wins</h3>
                </div>
                <div className='connect-four'>
                    <h1 className='turn-display'><span className={`${currentColor}-text`}>{currentColor === 'r' ? 'Red' : 'Black'}</span> to move</h1>
                    <div className='column-buttons'>
                        <div onClick={() => sendMove(0, playerColor)}><p className={currentColor===playerColor ? 'arrow-move' : 'arrow'}>↓</p></div>
                        <div onClick={() => sendMove(1, playerColor)}><p className={currentColor===playerColor ? 'arrow-move' : 'arrow'}>↓</p></div>
                        <div onClick={() => sendMove(2, playerColor)}><p className={currentColor===playerColor ? 'arrow-move' : 'arrow'}>↓</p></div>
                        <div onClick={() => sendMove(3, playerColor)}><p className={currentColor===playerColor ? 'arrow-move' : 'arrow'}>↓</p></div>
                        <div onClick={() => sendMove(4, playerColor)}><p className={currentColor===playerColor ? 'arrow-move' : 'arrow'}>↓</p></div>
                        <div onClick={() => sendMove(5, playerColor)}><p className={currentColor===playerColor ? 'arrow-move' : 'arrow'}>↓</p></div>
                        <div onClick={() => sendMove(6, playerColor)}><p className={currentColor===playerColor ? 'arrow-move' : 'arrow'}>↓</p></div>
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
                </div>
                <div className={`flex-column player-stats ${playerColor!==currentColor ? 'selected' : 'zzzzz'}`}>
                    <h3 className={`${playerColor === "r" ? "b" : "r"}-text`}>{opponentData}</h3>
                    <h1>W's</h1>
                    <h3>wins</h3>
                </div>
            </div>
        )
    // rendering rematch options once game has been completed
    }
    else if(winState===true) {
        return (
            <div className='connect-four'>
                <h1 className='turn-display'><span className={currentColor === 'r' ? 'b-text' : 'r-text'}>{currentColor === 'r' ? 'Black' : 'Red'}</span> wins!</h1>
                <div className='blue'>
                        {board.map((row, i) => 
                            <div className='row' key={i}>
                                {row.map((cell, j) => 
                                    <div key={j} className={`cell ${cell}`}></div>
                                )}
                            </div>
                        )}
                </div>
                <div className='flex buttonDiv'>
                    {/* have rematch clear board and winState for both players */}
                    <button>Rematch</button>
                    <button onClick={() => navigate('/')}>Find New Game</button>
                </div>
            </div>
        )
    }
}
export default ConnectFourTest