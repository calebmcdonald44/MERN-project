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
                <div className='inputs'>
                    <input className="input" type="text" placeholder="Name..." onChange={(e) => {setUserName(e.target.value)}}/>
                    <input className="input" type="text" placeholder="Room..." onChange={(e) => {setRoom(e.target.value)}}/>
                </div>
                <button className='logBtn' onClick={() => joinRoom()}>Enter Game</button>
            </div>
        </>
    )
}
export default ConnectForm