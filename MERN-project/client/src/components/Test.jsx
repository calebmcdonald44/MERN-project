import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
// import './App.css';

function Test() {
    const [socket] = useState(() => io(':8001'));
    useEffect(() => {
        console.log('Is this running?')
        // socket.on('Welcome', data => console.log(data))
        socket.emit('event_from_client', () => "Hello from client")
        return () => socket.removeAllListeners
    }, [socket])

    return (
        <div className='Test'>
            <h1>Socket Test</h1>
        </div>
    )
}
export default Test