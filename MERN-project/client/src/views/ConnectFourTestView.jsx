import React, { useEffect, useState } from 'react'
import ConnectFourTest from '../components/ConnectFourTest.jsx'
import Chat from '../components/Chat.jsx'

const ConnectFourTestView = (props) => {
    const { socket } = props;

    return (
        <>
            <div>
                <Chat socket={socket}/>
            </div>
            <ConnectFourTest></ConnectFourTest>
        </>
    )
}
export default ConnectFourTestView