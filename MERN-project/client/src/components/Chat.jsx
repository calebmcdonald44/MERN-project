import React, { useState, useEffect } from 'react';
// import './App.css';
import { Link } from 'react-router-dom';

function Chat (props) {
    const { socket, userName, room } = props;

    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                room: room,
                sender: userName,
                message: currentMessage
            };

            await socket.emit("send_message", messageData);
            setMessageList((list) => [...list, messageData]);
        }
    }

    useEffect(() => {
        socket.on("receive_message", (data) => {
            console.log(data);
            setMessageList((list) => [...list, data]);
        })
    })


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
                    <input className="message" type="text" placeholder="Write your message here..." onChange={(e) => {
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