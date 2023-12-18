import React, { useEffect, useState } from 'react'
import Chat from '../components/Chat';
import io from 'socket.io-client'

const socket = io.connect('http://localhost:8000');

const ConnectForm = () => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [userName, setUserName] = useState("");
    const [room, setRoom] = useState("");

    const joinRoom = () => {
        if (userName !== "" && room !== "") {
            socket.emit("join_room", room)
            console.log(room)
            setLoggedIn(true)
        }
    }

    return (
        <>
            {!loggedIn ? (
                <div className='logIn'>
                    <div className='inputs'>
                        <input className="input" type="text" placeholder="Name..." onChange={(e) => {setUserName(e.target.value)}}/>
                        <input className="input" type="text" placeholder="Room..." onChange={(e) => {setRoom(e.target.value)}}/>
                    </div>
                    <button className='logBtn' onClick={() => joinRoom()}>Enter Game</button>
                </div>
            ) : (
                <Chat socket={socket} userName={userName} room={room}/>
            )}
        </>
    )
}
export default ConnectForm