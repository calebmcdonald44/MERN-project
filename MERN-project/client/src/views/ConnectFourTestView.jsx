import React, { useEffect, useState } from 'react'
import ConnectFourTest from '../components/ConnectFourTest.jsx'
import Chat from '../components/Chat.jsx'

const ConnectFourTestView = (props) => {
    const { socket } = props;
    const { userName } = props;
    const { room } = props;

    return (
        <>
            <ConnectFourTest socket={socket} userName={userName} room={room}></ConnectFourTest>
            <div className='chat-window'>
                <Chat socket={socket}/>
            </div>
        </>
    )
}
export default ConnectFourTestView