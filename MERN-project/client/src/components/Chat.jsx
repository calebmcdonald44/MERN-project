import React, { useState, useEffect } from 'react';
// import './App.css';
import { Link, useParams } from 'react-router-dom';
import io, { Socket } from 'socket.io-client'


// const socket = io.connect('http://localhost:8000');



function Chat (props) {
    const { socket } = props;

    const { userName, room} = useParams();

    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

    const sendMessage = () => {
        if (currentMessage !== "") {
            const messageData = {
                room: room,
                sender: userName,
                message: currentMessage
            };

            socket.emit("send_message", messageData);
            setMessageList((messages) => [...messages, messageData]);
        }
    }

    const receiveMessage =  (data) => {
        console.log(data);
        setMessageList((messages) => [...messages, data]);
    }

    useEffect(() => {
        console.log("Triggered")
        socket.on("receive_message", receiveMessage)

        return () => {
            socket.off("receive_message", receiveMessage)
        }
    }, [])


    return (
        <>
            <div className='chatBox'>
                <div className='chat-header'>
                    <p>REACT Chat</p>
                </div>
                    <div className='chat-body scroll'>
                        {messageList.map((messageContent, idx) => {
                            return (
                                <div key={idx} className='message-content' id={userName === messageContent.sender ? "you" : "other"}>
                                    <p>{messageContent.message}</p>
                                </div>
                            )
                        })}
                    </div>
                <div className='chat-footer'>
                    <input className="message" type="text" placeholder="Message here..." onChange={(e) => {
                        setCurrentMessage(e.target.value)
                    }}
                    onKeyDown={(e) => {
                        e.key === "Enter" && sendMessage();
                    }}
                    />
                    <button className="sendBtn" onClick={() => sendMessage()}>Send</button>
                </div>
            </div>
        </>
    )
}
export default Chat