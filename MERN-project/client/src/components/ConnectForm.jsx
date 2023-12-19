import React, { useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';


// const socket = io.connect('http://localhost:8000');

const ConnectForm = (props) => {
    const { socket } = props;

    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [room, setRoom] = useState("");

    const joinRoom = () => {
        if (userName !== "" && room !== "") {
            socket.emit("join_room", room)
            console.log(room)
            navigate(`/connect-four/${userName}/${room}`)
        }
    }

    return (
        <>
            <div className='logIn'>
                <h1>Create a username to be paired with a random opponent!</h1>
                <div className='inputs flex-column'>
                    <input className="input" type="text" placeholder="Name..." onChange={(e) => {setUserName(e.target.value)}}/>
                    <input className="input" type="text" placeholder="Room..." onChange={(e) => {setRoom(e.target.value)}}/>
                </div>
                <div className='button flex'>
                    <button className='logBtn' onClick={() => joinRoom()}>Enter Game</button>
                </div>
            </div>
        </>
    )
}
export default ConnectForm