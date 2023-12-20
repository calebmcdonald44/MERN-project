import React, { useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';


// const socket = io.connect('http://localhost:8000');

const ConnectForm = (props) => {
    const { socket } = props;

    const { userName } = props;
    const { setUserName } = props;

    const { room } = props;
    const { setRoom } = props;

    const [errorsArray, setErrorsArray] = useState([]);

    
    const navigate = useNavigate();
    
    const joinRoom = () => {
        const errors = [];
        
        if (userName.length < 1) {
            errors.push("You must input a user name.")
        }
        if (room < 1) {
            errors.push("You must set a room id")
        }

        setErrorsArray(errors)

        if (errors.length === 0) {
            socket.emit("join_room", room)
            console.log(room)
            navigate(`/connect-four/${userName}/${room}`)
        }
    
    }
        
        return (
        <>
            <div className='logIn'>
                <h1>Create a username and a input a room number!</h1>
                <div className='inputs flex-column'>
                    {errorsArray.map((error, idx) => {
                        return <p key={idx} style={{color: "red"}}>{error}</p>
                    })}
                    <input className="input" type="text" placeholder="Name..." onChange={(e) => {setUserName(e.target.value)}}/>
                    <input className="input" type="text" placeholder="Room..." onChange={(e) => {setRoom(e.target.value)}}/>
                </div>
                <div className='button flex'>
                    <button className='logBtn' onClick={() => joinRoom()}>Enter Game</button>
                </div>
                <p style={{color: "white", marginLeft: "140px", marginTop: "50px"}}>Matchmaking coming soon! (Or when we get around to it.)</p>
            </div>
        </>
        )
}
export default ConnectForm