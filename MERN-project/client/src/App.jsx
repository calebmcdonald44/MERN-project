import { useState } from 'react'
import './App.css'
import {
  Routes,
  Route,
  Link
} from "react-router-dom";
import axios from 'axios'
import ConnectForm from './components/ConnectForm.jsx';
import ConnectFourTestView from './views/ConnectFourTestView.jsx';
import io from 'socket.io-client'


function App() {
  const [socket] = useState(() => io(":8000"));

  const [userName, setUserName] = useState("");
  const [room, setRoom] = useState("");

  return (
    <>
      <div className="nav-bar space-between">
        <h1>Connect<span>Four</span></h1>
        <div className="nav-items flex">
            <a href=""></a>
            <a href=""></a>
            <a href=""></a>
        </div>
      </div>
      <div className="content">
        <Routes>
          <Route path='/' element={<ConnectForm socket={socket} userName={userName} setUserName={setUserName} room={room} setRoom={setRoom}/>}></Route>
          <Route path='/connect-four/:userName/:room' element={<ConnectFourTestView socket={socket} userName={userName} room={room}/>}></Route>
        </Routes>
      </div>
    </>
  )
}

export default App
